# AtomicHorizon — The Zero-Carbon Foundation for a High-Energy Future

An interactive engineering and scientific platform demonstrating Nuclear Energy, Small Modular Reactors (SMRs), Gen IV fission architectures, and commercial fusion as the indispensable foundation for global decarbonization and AI compute infrastructure.

---

## ⚡ Key Interactive Modules

### 1. Multi-Variable Energy Density & Resource Footprint Engine
* **Physics & Engineering Basis**: Computes real physical fuel mass, surface land area (km²), life-cycle greenhouse gas emissions ($g\ \text{CO}_2\text{eq}/\text{kWh}$), and critical mineral consumption (steel, concrete, rare earths) across **Nuclear (U-235)**, **Coal**, **Natural Gas**, **Utility Solar PV**, and **Onshore Wind**.
* **Presets Included**: Hyperscale AI Datacenter (876,000 MWh/yr), Industrial Metropolis (12,000,000 MWh/yr), Heavy Chemical / Steel Refinery (3,500,000 MWh/yr).

### 2. Next-Gen Reactor Architectural Explorer
* Comprehensive architectural cutaways, thermodynamics, and coolant dynamics for:
  * **Small Modular Light Water Reactors (SMR)** (NuScale VOYGR, GE Hitachi BWRX-300)
  * **High-Temperature Gas-Cooled Reactors (HTGR)** (X-energy Xe-100, Kairos Hermes with TRISO fuel)
  * **Sodium-Cooled Fast Breeder Reactors (SFR)** (TerraPower Natrium, GE PRISM)
  * **Magnetic Confinement Fusion** (Commonwealth Fusion Systems SPARC, ITER)
* Inherent passive safety laws: Natural convection heat dissipation, TRISO ceramic containment ($>1,600^\circ\text{C}$ thermal margin), and gravity-actuated isolation.

### 3. Virtual SMR Control Room & Physics Engine
* Live simulated telemetry tracking:
  * Control Rod Insertion Depth ($0\%\to 100\%$)
  * Primary Coolant Circulation Flow (Nominal, Reduced, $0\%$ Passive Natural Convection)
  * Real-time Reactivity ($\text{pcm}$) with **Doppler Resonance Broadening** negative temperature coefficient ($\approx -3.5\ \text{pcm}/^\circ\text{C}$)
  * Core Temperature, Thermal Output ($\text{MWth}$), and Net Electric Power ($\text{MWe}$)
  * Emergency SCRAM gravity shutdown mechanism.

### 4. 24/7 Grid Baseload & Intermittency Balancer
* Continuous 24-hour diurnal grid modeling simulating weather anomalies:
  * *Dunkelflaute* (multi-week winter cloud cover and wind calm)
  * Summer Heatwaves & Peak Air Conditioning Demand
  * Grid Rotational Inertia scoring ($0\to 100$) and synchronous frequency resilience.

### 5. Scientific Myth vs. Fact Debunker Matrix
* Filterable peer-reviewed evidence matrix covering:
  * Solid ceramic spent fuel dry cask engineering & deep geological repositories (Onkalo, Finland).
  * Low-dose radiation in context (Banana Equivalent Dose vs. Coal Ash).
  * Historical life-cycle mortality statistics (Lancet, WHO, Our World in Data).
  * SMR factory standardized economics and rapid serial production.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 15 (App Router, Server & Client Component architecture)
* **Language**: TypeScript 5 (Strict mode)
* **Styling & Design System**: Tailwind CSS v3.4, Vanilla CSS Custom Variables, Custom Obsidian Dark Theme (`#09090b`), Radial Atomic Glows
* **Icons & Visual Components**: Lucide React
* **State & Physics Computations**: Client-side reactive math engines with zero external runtime telemetry latency

---

## 🚀 Local Development Setup

### Prerequisites
* Node.js v18+ (tested on Node v22.14.0)
* npm v9+

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/atomic-horizon.git
cd atomic-horizon

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📊 Scientific Data Sources & Citations

1. **IPCC Assessment Reports (AR5/AR6)** — *Working Group III: Mitigation of Climate Change (Lifecycle electricity emissions).*
2. **United Nations Economic Commission for Europe (UNECE, 2021)** — *Life Cycle Assessment of Electricity Generation Options.*
3. **U.S. Energy Information Administration (EIA, 2023)** — *Electric Power Monthly: Capacity Factors by Energy Source.*
4. **Our World in Data (Hannah Ritchie, 2020)** — *What are the safest and cleanest sources of energy?*
5. **MIT Energy Initiative** — *The Future of Nuclear Energy in a Carbon-Constrained World.*
6. **Oak Ridge National Laboratory (ORNL)** — *Radioactivity from Coal Combustion vs. Nuclear Power Plants.*

---

## 📄 License
MIT Open Source License.
