export type EnergySourceType = "nuclear" | "coal" | "gas" | "solar" | "wind";

export interface EnergySourceProfile {
  id: EnergySourceType;
  name: string;
  category: "Clean Baseload" | "Fossil Baseload" | "Fossil Peaker" | "Clean Intermittent";
  color: string;
  accentHex: string;
  energyDensityMJkg: number; // MegaJoules per kg of fuel
  energyDensityText: string;
  landUseKm2PerTWh: number; // km² land footprint per TWh generated
  carbonIntensityGCO2eqPerKWh: number; // Life-cycle g CO2-eq/kWh (IPCC AR5/AR6 median)
  capacityFactorPercent: number; // Average capacity factor %
  deathsPerTWh: number; // Mortality rate per TWh (Our World in Data / Lancet)
  criticalMineralIntensityTonsPerTWh: number; // Steel, concrete, rare earths (IEA 2022)
  storageRequirementHours: number; // Backup battery/gas storage needed for 99.99% reliability
  description: string;
}

export interface ComparisonResults {
  mwhDemand: number;
  twhDemand: number;
  sources: {
    [key in EnergySourceType]: {
      fuelMassKg: number;
      fuelMassFormatted: string;
      fuelComparisonRatio: number;
      landAreaKm2: number;
      landAreaSoccerFields: number;
      lifecycleCO2MetricTons: number;
      co2AvoidedVsCoalTons: number;
      mineralDemandTons: number;
      capacityFactor: number;
      nameplateCapacityMWNeeded: number;
    };
  };
}

export interface ReactorArchitecture {
  id: string;
  name: string;
  category: "SMR (Light Water)" | "Gen IV High-Temp Gas" | "Gen IV Sodium Fast" | "Next-Gen Fusion";
  status: "Commercial / Near-Deployment" | "Licensed Construction" | "Advanced Demo" | "Active Pilot R&D";
  thermalOutputMWth: number;
  electricOutputMWe: number;
  efficiencyPercent: number;
  fuelType: string;
  coolant: string;
  operatingTempC: number;
  deploymentFootprintAcres: number;
  safetyParadigm: string;
  passiveSafetyMechanisms: {
    title: string;
    description: string;
    physicsLaw: string;
  }[];
  keyAdvantages: string[];
  industrialUseCases: string[];
  commercialLeaders: string[];
  schematicDetails: {
    coreType: string;
    containmentBarrier: string;
    refuelingIntervalMonths: number;
    decayHeatRemovalTimeDays: string;
  };
}

export interface MythFactItem {
  id: string;
  category: "waste" | "radiation" | "safety" | "economics" | "grid";
  myth: string;
  fact: string;
  scientificExplanation: string;
  dataPoints: {
    label: string;
    value: string;
    benchmark: string;
  }[];
  verifiedSources: string[];
}

export interface GridSimulationState {
  nuclearPercent: number;
  solarPercent: number;
  windPercent: number;
  gasPercent: number;
  batteryStorageGWh: number;
  currentHour: number;
  weatherPattern: "normal" | "dunkelflaute" | "heatwave" | "wind_storm";
}

export interface GridSimulationResult {
  hourlySupply: {
    hour: number;
    demandMW: number;
    nuclearMW: number;
    solarMW: number;
    windMW: number;
    gasMW: number;
    batteryDischargeMW: number;
    batteryChargeMW: number;
    totalGeneratedMW: number;
    curtailmentMW: number;
    unmetDemandMW: number;
  }[];
  overallReliabilityScore: number;
  gridInertiaScore: number; // 0 to 100
  totalCarbonIntensityGPerKWh: number;
  totalLandImpactKm2: number;
  estimatedSystemLCOE: number; // $ / MWh
  blackoutRisk: "Negligible (<0.01%)" | "Moderate (2.4%)" | "Severe Critical (18.7%)" | "High Grid Failure";
}

export interface ControlRoomTelemetry {
  controlRodDepth: number; // 0% (out, max reactivity) to 100% (fully inserted, shutdown)
  coolantFlowRate: number; // % of nominal
  turbineLoadDemandMWe: number;
  coreTempC: number;
  neutronFluxPercent: number;
  thermalPowerMWth: number;
  electricPowerMWe: number;
  reactivityPcm: number;
  dopplerFeedbackPcm: number;
  pressureBar: number;
  isScrammed: boolean;
  passiveCoolingActive: boolean;
  status: "NOMINAL BASELOAD" | "LOAD FOLLOWING" | "DOPPLER STABILIZED" | "EMERGENCY SCRAM (SAFE PASSIVE SHUTDOWN)";
}
