import { MythFactItem } from "@/types/nuclear";

export const MYTH_FACT_ITEMS: MythFactItem[] = [
  {
    id: "myth-waste-unsolved",
    category: "waste",
    myth: "Nuclear waste is an unsolved catastrophe sitting around leaking into the environment.",
    fact: "All commercial nuclear fuel ever used in 70 years is 100% accounted for, solid (ceramic oxide), encapsulated in dry casks that withstand missile strikes, and 95% reusable.",
    scientificExplanation: "Unlike fossil fuel waste (billions of tons of greenhouse gases and toxic particulate spewed directly into the open atmosphere), high-level nuclear waste is a solid ceramic pellet sealed inside zirconium rods and steel/concrete dry casks. The total commercial spent fuel produced in the entire history of the United States would fit on a single football field stacked just 10 yards high. Furthermore, Finland's Onkalo repository is already operational, sealing waste in stable 2-billion-year-old bedrock, while fast reactors and PUREX/MOX recycling can extract remaining energy and reduce radioactivity timelines to centuries.",
    dataPoints: [
      {
        label: "US 70-Year Nuclear Waste Volume",
        value: "90,000 Metric Tons (Solid)",
        benchmark: "Fits on 1 football field (10 yards deep)",
      },
      {
        label: "US Annual Coal Ash Toxic Waste",
        value: "70,000,000+ Tons/yr",
        benchmark: "Contains toxic arsenic, mercury, lead & natural uranium/thorium",
      },
      {
        label: "Reusable Potential via Fast Reactors",
        value: "95.5% Usable Energy",
        benchmark: "Less than 5% is true fission product waste",
      },
    ],
    verifiedSources: [
      "U.S. Department of Energy (DOE) - Nuclear Waste Realities (2024)",
      "Posiva Oy - Onkalo Deep Geological Repository Safety Case",
      "IAEA Nuclear Energy Series - Status and Trends in Spent Fuel Management",
    ],
  },
  {
    id: "myth-radiation-exposure",
    category: "radiation",
    myth: "Living near a nuclear power plant exposes you to dangerous, life-threatening radiation.",
    fact: "Living next to an operating nuclear plant for an entire year delivers less radiation than eating one banana, and 100x less than living near a coal-fired plant.",
    scientificExplanation: "Natural background radiation (cosmic rays, radon in soil, potassium-40 inside our bodies) averages 2.4 to 3.1 milliSieverts (mSv) annually. A commercial nuclear plant releases virtually zero ionizing radiation during normal operations (less than 0.0001 mSv/year at the site boundary). In comparison, coal combustion releases natural fly-ash containing radium and thorium, delivering over 100 times more radiation to surrounding communities than a nuclear plant. A single transcontinental flight exposes passengers to ~0.04 mSv (400x a year of nuclear fence-line exposure).",
    dataPoints: [
      {
        label: "Annual Plant Boundary Exposure",
        value: "< 0.0001 mSv / yr",
        benchmark: "0.01% of a standard dental X-ray (0.01 mSv)",
      },
      {
        label: "Eating One Single Banana",
        value: "0.0001 mSv",
        benchmark: "Natural Potassium-40 isotope radioactive decay",
      },
      {
        label: "Transatlantic Flight (Cosmic Exposure)",
        value: "0.04 - 0.08 mSv",
        benchmark: "Equivalent to 400 - 800 years of living at a nuclear plant gate",
      },
    ],
    verifiedSources: [
      "UNSCEAR - Sources and Effects of Ionizing Radiation",
      "U.S. Nuclear Regulatory Commission (NRC) - Radiation Protection Standards",
      "Oak Ridge National Laboratory (ORNL) - Coal Combustion byproducts vs Nuclear",
    ],
  },
  {
    id: "myth-safety-mortality",
    category: "safety",
    myth: "Nuclear power is the most dangerous form of energy generation.",
    fact: "Statistical mortality data from the Lancet and World Health Organization proves Nuclear is the safest power source per unit of electricity alongside Solar and Wind.",
    scientificExplanation: "When calculating life-cycle mortality per Terawatt-hour (TWh)—including mining, construction, operation, and industrial accidents—fossil fuels kill over 8 million people per year from ambient PM2.5 air pollution and particulate inhalation. Coal causes 24.6 deaths/TWh; oil causes 18.4 deaths/TWh; natural gas causes 2.8 deaths/TWh. Nuclear fission records just 0.03 deaths/TWh (over 800x safer than coal and 90x safer than gas). Modern Western reactors employ multi-barrier containment domes that withstand jet airliner impacts and have zero radiation releases.",
    dataPoints: [
      {
        label: "Coal Mortality Rate",
        value: "24.6 Deaths / TWh",
        benchmark: "PM2.5 particulate pollution, lung cancer & cardiopulmonary disease",
      },
      {
        label: "Natural Gas Mortality Rate",
        value: "2.8 Deaths / TWh",
        benchmark: "Pipelines, explosions, and nitrogen oxide smog",
      },
      {
        label: "Nuclear Power Mortality Rate",
        value: "0.03 Deaths / TWh",
        benchmark: "Equivalent to rooftop solar (0.04) and wind (0.04)",
      },
    ],
    verifiedSources: [
      "Our World in Data - What are the safest and cleanest sources of energy? (Hannah Ritchie, 2020)",
      "The Lancet - Electricity generation and health (Markandya & Wilkinson)",
      "World Health Organization (WHO) - Global Air Quality and Mortality Statistics",
    ],
  },
  {
    id: "myth-renewables-alone",
    category: "grid",
    myth: "100% Solar and Wind with lithium batteries can easily power the modern global economy.",
    fact: "Solar and wind generate power only when weather permits (20-35% capacity factor). Decarbonizing the grid without nuclear requires mathematically prohibitive battery storage and 100x more land.",
    scientificExplanation: "During multi-week winter atmospheric calms ('Dunkelflaute') across Europe and North America, wind and solar output can collapse to less than 5% of rated capacity for 14+ consecutive days. Storing 2 weeks of US or European electric demand with lithium-ion batteries would cost over $20 Trillion, exhaust global cobalt/lithium supply chains, and require unprecedented land deforestation. Nuclear provides the heavy rotational mechanical inertia and 24/7/365 baseload power required to keep high-voltage transmission grids stable and prevent catastrophic cascade blackouts.",
    dataPoints: [
      {
        label: "Nuclear Capacity Factor (24/7)",
        value: "92.5% 24/7 Availability",
        benchmark: "Operates continuously through blizzards, heatwaves & nights",
      },
      {
        label: "Solar PV Capacity Factor",
        value: "24.8% Intermittent",
        benchmark: "Zero night-time output; drops 70% in cloudy winter",
      },
      {
        label: "Battery Storage Cost for 2-Week Dunkelflaute",
        value: "$18.4 Trillion (US Grid)",
        benchmark: "Exceeds annual US federal budget by 300%",
      },
    ],
    verifiedSources: [
      "MIT Energy Initiative - The Future of Nuclear Energy in a Carbon-Constrained World",
      "National Renewable Energy Laboratory (NREL) - Grid Inertia and System Flexibility",
      "U.S. Energy Information Administration (EIA) - Electric Power Monthly",
    ],
  },
  {
    id: "myth-economics-build-time",
    category: "economics",
    myth: "Nuclear power plants are too expensive and take 20 years to build.",
    fact: "Historical standardized fleet rollouts (France, South Korea, Japan) built full gigawatt reactors in 4 to 6 years. Next-gen SMRs use modular factory fabrication to eliminate custom on-site construction delays.",
    scientificExplanation: "In the 1980s, France decarbonized 80% of its entire national electrical grid in just 15 years using standardized reactor designs ('Plan Messmer'), delivering the cheapest and cleanest electricity in Western Europe. South Korea's KEPCO consistently built APR-1400 reactors in 5-6 years on-budget. Cost inflation in individual Western one-off projects stems from regulatory ratcheting and unstandardized first-of-a-kind designs. Gen IV SMRs are manufactured on standardized assembly lines like commercial jetliners, shifting capital recovery from decades to years.",
    dataPoints: [
      {
        label: "French Fleet Decarbonization Timeline",
        value: "15 Years (80% Grid)",
        benchmark: "Fastest national per-capita clean energy buildout in human history",
      },
      {
        label: "South Korea Barakah Average Build Time",
        value: "5.5 Years per 1,400 MWe Unit",
        benchmark: "Built on-budget and on-schedule in UAE",
      },
      {
        label: "SMR Factory Build Cycle Goal",
        value: "24 - 36 Months",
        benchmark: "Pre-assembled modules shipped directly by rail/barge",
      },
    ],
    verifiedSources: [
      "International Energy Agency (IEA) - Projected Costs of Generating Electricity",
      "World Nuclear Association - Nuclear Power in France & South Korea Case Studies",
      "LucidCatalyst - Missing Link to a Livable Climate (SMR Cost Models)",
    ],
  },
];
