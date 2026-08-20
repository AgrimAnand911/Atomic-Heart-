import { GridSimulationState, GridSimulationResult } from "@/types/nuclear";

// Standard 24-hour normalized municipal demand profile (relative to 10,000 MW peak)
const BASE_DEMAND_CURVE_MW = [
  6200, 5800, 5600, 5500, 5800, 6700, 7800, 8900, 9300, 9500, 9700, 9800,
  9600, 9400, 9300, 9200, 9500, 10000, 9800, 9400, 8800, 8100, 7400, 6800,
];

export function runGridSimulation(state: GridSimulationState): GridSimulationResult {
  const { nuclearPercent, solarPercent, windPercent, gasPercent, batteryStorageGWh, weatherPattern } = state;
  const targetPeakDemandMW = 10000;
  const batteryCapacityMWh = batteryStorageGWh * 1000;
  let currentBatteryLevelMWh = batteryCapacityMWh * 0.5; // Start at 50% capacity

  const hourlySupply = [];
  let totalDemandKWh = 0;
  let totalCarbonGrams = 0;
  let totalUnmetMWh = 0;
  let totalGeneratedMWh = 0;

  for (let hour = 0; hour < 24; hour++) {
    const demandMW = BASE_DEMAND_CURVE_MW[hour];
    totalDemandKWh += demandMW * 1000;

    // Nuclear (constant 24/7 baseload)
    const nuclearCapacityMW = (nuclearPercent / 100) * targetPeakDemandMW;
    const nuclearMW = nuclearCapacityMW;

    // Solar generation (bell curve peaking at hour 12-13)
    let solarMultiplier = 0;
    if (hour >= 6 && hour <= 19) {
      // Sinusoidal curve between 6 AM and 7 PM
      solarMultiplier = Math.sin(((hour - 6) / 13) * Math.PI);
    }

    if (weatherPattern === "dunkelflaute") {
      solarMultiplier *= 0.15; // 85% reduction during dense winter cloud cover
    } else if (weatherPattern === "heatwave") {
      solarMultiplier *= 1.1;
    }

    const solarCapacityMW = (solarPercent / 100) * targetPeakDemandMW * 3.5; // Overbuild factor for solar
    const solarMW = solarCapacityMW * solarMultiplier;

    // Wind generation (weather-dependent profile)
    let windBaseFactor = 0.35 + 0.2 * Math.cos(((hour - 3) / 12) * Math.PI);
    if (weatherPattern === "dunkelflaute") {
      windBaseFactor = 0.04; // Atmospheric high pressure calm
    } else if (weatherPattern === "wind_storm") {
      windBaseFactor = 0.85;
    } else if (weatherPattern === "heatwave") {
      windBaseFactor = 0.18;
    }

    const windCapacityMW = (windPercent / 100) * targetPeakDemandMW * 2.5; // Overbuild factor
    const windMW = windCapacityMW * windBaseFactor;

    // Net generation before gas and battery
    const rawDirectGeneration = nuclearMW + solarMW + windMW;
    let netDifference = rawDirectGeneration - demandMW;

    let batteryChargeMW = 0;
    let batteryDischargeMW = 0;
    let curtailmentMW = 0;
    let gasMW = 0;
    let unmetDemandMW = 0;

    if (netDifference > 0) {
      // Surplus power -> charge battery
      const spaceInBattery = batteryCapacityMWh - currentBatteryLevelMWh;
      const chargeRate = Math.min(netDifference, spaceInBattery, batteryCapacityMWh * 0.25); // 4-hour max C-rate
      batteryChargeMW = chargeRate;
      currentBatteryLevelMWh += chargeRate;
      curtailmentMW = netDifference - batteryChargeMW;
    } else {
      // Deficit -> discharge battery first, then dispatch natural gas
      const deficit = Math.abs(netDifference);
      const availableBatteryDischarge = Math.min(deficit, currentBatteryLevelMWh, batteryCapacityMWh * 0.25);
      batteryDischargeMW = availableBatteryDischarge;
      currentBatteryLevelMWh -= availableBatteryDischarge;

      const remainingDeficit = deficit - batteryDischargeMW;
      if (remainingDeficit > 0) {
        const gasAvailableMW = (gasPercent / 100) * targetPeakDemandMW;
        gasMW = Math.min(remainingDeficit, gasAvailableMW);
        unmetDemandMW = remainingDeficit - gasMW;
      }
    }

    const totalGeneratedForHour = nuclearMW + solarMW + windMW + gasMW + batteryDischargeMW;
    totalGeneratedMWh += totalGeneratedForHour;
    totalUnmetMWh += unmetDemandMW;

    // Carbon emissions calculation (g CO2)
    const nuclearCarbon = nuclearMW * 1000 * 12;
    const solarCarbon = solarMW * 1000 * 41;
    const windCarbon = windMW * 1000 * 11;
    const gasCarbon = gasMW * 1000 * 490;
    totalCarbonGrams += nuclearCarbon + solarCarbon + windCarbon + gasCarbon;

    hourlySupply.push({
      hour,
      demandMW: Math.round(demandMW),
      nuclearMW: Math.round(nuclearMW),
      solarMW: Math.round(solarMW),
      windMW: Math.round(windMW),
      gasMW: Math.round(gasMW),
      batteryDischargeMW: Math.round(batteryDischargeMW),
      batteryChargeMW: Math.round(batteryChargeMW),
      totalGeneratedMW: Math.round(totalGeneratedForHour),
      curtailmentMW: Math.round(curtailmentMW),
      unmetDemandMW: Math.round(unmetDemandMW),
    });
  }

  // Calculate high-level system indicators
  const totalCarbonKWh = totalCarbonGrams / totalDemandKWh;
  const overallReliabilityScore = Math.max(0, Math.min(100, 100 - (totalUnmetMWh / (totalDemandKWh / 1000)) * 100));

  // Grid Inertia score (synchronous rotating mass from nuclear and thermal turbines vs inverter-based power)
  const synchronousFraction = (nuclearPercent * 1.0 + gasPercent * 0.7) / (nuclearPercent + solarPercent + windPercent + gasPercent || 1);
  const gridInertiaScore = Math.min(100, Math.round(synchronousFraction * 100));

  // Land impact in km²
  const totalLandImpactKm2 = 
    (nuclearPercent / 100) * 1.3 +
    (solarPercent / 100) * 190.0 +
    (windPercent / 100) * 720.0 +
    (gasPercent / 100) * 18.0;

  // System LCOE estimation including overbuilding and battery CAPEX ($/MWh)
  const baseGenCost = 
    (nuclearPercent * 75 + solarPercent * 45 + windPercent * 50 + gasPercent * 90) / 100;
  const batteryCapexPerMWh = (batteryStorageGWh * 150000) / (totalDemandKWh / 1000 || 1);
  const estimatedSystemLCOE = Math.round(baseGenCost + batteryCapexPerMWh);

  let blackoutRisk: GridSimulationResult["blackoutRisk"] = "Negligible (<0.01%)";
  if (totalUnmetMWh > 5000) {
    blackoutRisk = "High Grid Failure";
  } else if (totalUnmetMWh > 1000) {
    blackoutRisk = "Severe Critical (18.7%)";
  } else if (totalUnmetMWh > 50 || gridInertiaScore < 30) {
    blackoutRisk = "Moderate (2.4%)";
  }

  return {
    hourlySupply,
    overallReliabilityScore: Number(overallReliabilityScore.toFixed(2)),
    gridInertiaScore,
    totalCarbonIntensityGPerKWh: Math.round(totalCarbonKWh),
    totalLandImpactKm2: Math.round(totalLandImpactKm2),
    estimatedSystemLCOE,
    blackoutRisk,
  };
}
