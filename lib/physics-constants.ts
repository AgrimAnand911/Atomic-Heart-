import { EnergySourceProfile, EnergySourceType, ComparisonResults } from "@/types/nuclear";

export const ENERGY_PROFILES: Record<EnergySourceType, EnergySourceProfile> = {
  nuclear: {
    id: "nuclear",
    name: "Nuclear Fission (U-235)",
    category: "Clean Baseload",
    color: "emerald",
    accentHex: "#10b981",
    energyDensityMJkg: 3900000, // 3.9 Million MJ/kg enriched fuel equivalent in thermal LWR
    energyDensityText: "3,900,000 MJ/kg (1 pellet = 1 ton of coal)",
    landUseKm2PerTWh: 0.13, // UNECE 2021 & Our World in Data
    carbonIntensityGCO2eqPerKWh: 12, // IPCC AR5 & UNECE median
    capacityFactorPercent: 92.5, // US EIA 2023
    deathsPerTWh: 0.03, // Lancet / Markandya & Wilkinson (safest energy source alongside solar/wind)
    criticalMineralIntensityTonsPerTWh: 140, // IEA 2022 Materials Report (concrete & steel per TWh)
    storageRequirementHours: 0, // Inherent 24/7 spinning synchronous baseload
    description: "Ultra-high energy density zero-carbon baseload requiring microscopic fuel volume and smallest ecological land footprint.",
  },
  coal: {
    id: "coal",
    name: "Coal (Anthracite/Bituminous)",
    category: "Fossil Baseload",
    color: "amber",
    accentHex: "#f59e0b",
    energyDensityMJkg: 24,
    energyDensityText: "24 MJ/kg",
    landUseKm2PerTWh: 4.0,
    carbonIntensityGCO2eqPerKWh: 820,
    capacityFactorPercent: 40.2,
    deathsPerTWh: 24.6,
    criticalMineralIntensityTonsPerTWh: 980,
    storageRequirementHours: 0,
    description: "Highest greenhouse gas emissions, vast open-pit mining footprint, and massive airborne particulate pollution.",
  },
  gas: {
    id: "gas",
    name: "Natural Gas (Combined Cycle)",
    category: "Fossil Peaker",
    color: "orange",
    accentHex: "#f97316",
    energyDensityMJkg: 55,
    energyDensityText: "55 MJ/kg",
    landUseKm2PerTWh: 1.8,
    carbonIntensityGCO2eqPerKWh: 490,
    capacityFactorPercent: 56.6,
    deathsPerTWh: 2.8,
    criticalMineralIntensityTonsPerTWh: 430,
    storageRequirementHours: 0,
    description: "Fast-ramping fossil fuel with high methane leakage risk and unsustainable carbon emissions.",
  },
  solar: {
    id: "solar",
    name: "Utility-Scale Solar PV",
    category: "Clean Intermittent",
    color: "yellow",
    accentHex: "#eab308",
    energyDensityMJkg: 0.001, // Ambient diffuse solar irradiance ~1 kW/m² peak
    energyDensityText: "Diffuse Ambient Photons (~150-250 W/m² avg)",
    landUseKm2PerTWh: 19.0, // NREL / UNECE 2021
    carbonIntensityGCO2eqPerKWh: 41, // IPCC AR5 life-cycle median
    capacityFactorPercent: 24.8, // US EIA 2023
    deathsPerTWh: 0.04,
    criticalMineralIntensityTonsPerTWh: 2870, // High silicon, copper, aluminum, silver per TWh
    storageRequirementHours: 12, // Requires multi-hour battery storage for nighttime supply
    description: "Clean day-time generation requiring large land acreage and massive battery buffering for night-time reliability.",
  },
  wind: {
    id: "wind",
    name: "Onshore Wind Turbines",
    category: "Clean Intermittent",
    color: "cyan",
    accentHex: "#06b6d4",
    energyDensityMJkg: 0.002, // Atmospheric kinetic energy
    energyDensityText: "Kinetic Fluid Flow (~500 W/m² swept area)",
    landUseKm2PerTWh: 72.0, // UNECE 2021 total footprint (1.5 km² direct footprint)
    carbonIntensityGCO2eqPerKWh: 11,
    capacityFactorPercent: 35.4,
    deathsPerTWh: 0.04,
    criticalMineralIntensityTonsPerTWh: 4150, // Massive steel, fiberglass, rare earths (Neodymium/Dysprosium)
    storageRequirementHours: 48, // Vulnerable to prolonged atmospheric calm (Dunkelflaute)
    description: "Low-carbon generation subject to unpredictable weather calms and vast geographic transmission lines.",
  },
};

export function calculateEnergyComparison(mwhDemand: number): ComparisonResults {
  const twhDemand = mwhDemand / 1000000;
  const kwhDemand = mwhDemand * 1000;

  // Nuclear Fuel calculation (1 kg U-235 yields ~24,000,000 kWh thermal = ~8,000,000 kWh electric @ 33% efficiency)
  const nuclearFuelKg = kwhDemand / 8000000;
  
  // Coal calculation (1 kg Coal ~ 2.4 kWh electric @ 36% thermal efficiency)
  const coalFuelKg = kwhDemand / 2.4;

  // Gas calculation (1 kg Methane ~ 7.0 kWh electric @ 50% CCGT efficiency)
  const gasFuelKg = kwhDemand / 7.0;

  const hoursInYear = 8760;

  const computeSourceMetrics = (type: EnergySourceType) => {
    const profile = ENERGY_PROFILES[type];
    const landAreaKm2 = twhDemand * profile.landUseKm2PerTWh;
    const landAreaSoccerFields = Math.round((landAreaKm2 * 1000000) / 7140); // Standard FIFA pitch 7,140 m²
    const lifecycleCO2MetricTons = (kwhDemand * profile.carbonIntensityGCO2eqPerKWh) / 1000000;
    const coalCO2MetricTons = (kwhDemand * ENERGY_PROFILES.coal.carbonIntensityGCO2eqPerKWh) / 1000000;
    const co2AvoidedVsCoalTons = Math.max(0, coalCO2MetricTons - lifecycleCO2MetricTons);
    const mineralDemandTons = twhDemand * profile.criticalMineralIntensityTonsPerTWh;
    const nameplateCapacityMWNeeded = (mwhDemand / (hoursInYear * (profile.capacityFactorPercent / 100)));

    let fuelMassKg = 0;
    let fuelMassFormatted = "0 kg (Natural Flux)";
    let fuelComparisonRatio = 1;

    if (type === "nuclear") {
      fuelMassKg = nuclearFuelKg;
      fuelMassFormatted = `${fuelMassKg.toFixed(2)} kg (Enriched UO₂)`;
      fuelComparisonRatio = 1;
    } else if (type === "coal") {
      fuelMassKg = coalFuelKg;
      fuelMassFormatted = `${(fuelMassKg / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })} Metric Tons`;
      fuelComparisonRatio = coalFuelKg / (nuclearFuelKg || 1);
    } else if (type === "gas") {
      fuelMassKg = gasFuelKg;
      fuelMassFormatted = `${(fuelMassKg / 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })} Metric Tons (LNG)`;
      fuelComparisonRatio = gasFuelKg / (nuclearFuelKg || 1);
    }

    return {
      fuelMassKg,
      fuelMassFormatted,
      fuelComparisonRatio,
      landAreaKm2,
      landAreaSoccerFields,
      lifecycleCO2MetricTons,
      co2AvoidedVsCoalTons,
      mineralDemandTons,
      capacityFactor: profile.capacityFactorPercent,
      nameplateCapacityMWNeeded,
    };
  };

  return {
    mwhDemand,
    twhDemand,
    sources: {
      nuclear: computeSourceMetrics("nuclear"),
      coal: computeSourceMetrics("coal"),
      gas: computeSourceMetrics("gas"),
      solar: computeSourceMetrics("solar"),
      wind: computeSourceMetrics("wind"),
    },
  };
}
