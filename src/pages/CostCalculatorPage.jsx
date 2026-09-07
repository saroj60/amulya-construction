import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Check, ArrowRight, HelpCircle, HardHat, Info, 
  ShieldAlert, Sparkles, Loader, Ruler, MapPin, Layers, 
  ChevronDown, ChevronUp, RefreshCw, Compass
} from 'lucide-react';
import { COMPANY, CALCULATOR_CONFIG } from '@/data';
import { api } from '@/services/api';
import SectionHeader from '../components/ui/SectionHeader';
import { staggerContainer, fadeUp, viewportOnce } from '@/utils/animations';

// ============================================================
// NEPALI LAND MEASUREMENT CONVERSION CONSTANTS & HELPERS
// ============================================================
// 1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 sq. ft. = 508.72 sq. m.
// 1 Aana = 4 Paisa = 16 Daam = 342.25 sq. ft. = 31.795 sq. m.
// 1 Paisa = 4 Daam = 85.5625 sq. ft.
// 1 Daam = 21.390625 sq. ft.
//
// 1 Bigha = 20 Kattha = 400 Dhur = 72,900 sq. ft. = 6,772.63 sq. m.
// 1 Kattha = 20 Dhur = 3,645 sq. ft. = 338.63 sq. m.
// 1 Dhur = 182.25 sq. ft. = 16.93 sq. m.
//
// 1 sq. meter = 10.7639104 sq. ft.

export const SQFT_PER_ROPANI = 5476;
export const SQFT_PER_AANA = 342.25;
export const SQFT_PER_PAISA = 85.5625;
export const SQFT_PER_DAAM = 21.390625;

export const SQFT_PER_BIGHA = 72900;
export const SQFT_PER_KATTHA = 3645;
export const SQFT_PER_DHUR = 182.25;

export const SQFT_PER_SQM = 10.7639104;

export function sqFtToNepaliUnits(sqFt) {
  const s = Math.max(0, Number(sqFt) || 0);

  // Ropani System (Hills / Kathmandu Valley)
  const ropani = Math.floor(s / SQFT_PER_ROPANI);
  let remR = s % SQFT_PER_ROPANI;
  const aana = Math.floor(remR / SQFT_PER_AANA);
  remR = remR % SQFT_PER_AANA;
  const paisa = Math.floor(remR / SQFT_PER_PAISA);
  remR = remR % SQFT_PER_PAISA;
  const daam = Number((remR / SQFT_PER_DAAM).toFixed(1));
  const totalAana = Number((s / SQFT_PER_AANA).toFixed(2));
  const totalRopani = Number((s / SQFT_PER_ROPANI).toFixed(3));

  // Bigha System (Terai / Madhesh)
  const bigha = Math.floor(s / SQFT_PER_BIGHA);
  let remB = s % SQFT_PER_BIGHA;
  const kattha = Math.floor(remB / SQFT_PER_KATTHA);
  remB = remB % SQFT_PER_KATTHA;
  const dhur = Number((remB / SQFT_PER_DHUR).toFixed(1));
  const totalKattha = Number((s / SQFT_PER_KATTHA).toFixed(2));
  const totalDhur = Number((s / SQFT_PER_DHUR).toFixed(1));

  // Metric System (Square Meters)
  const sqM = Number((s / SQFT_PER_SQM).toFixed(2));

  return {
    sqFt: Math.round(s),
    sqM,
    // Ropani
    ropani,
    aana,
    paisa,
    daam,
    totalAana,
    totalRopani,
    ropaniCode: `${ropani}-${aana}-${paisa}-${daam}`,
    ropaniText: `${ropani > 0 ? `${ropani} Ropani ` : ''}${aana} Aana${paisa > 0 ? ` ${paisa} Paisa` : ''}${daam > 0 ? ` ${daam} Daam` : ''}`.trim() || '0 Aana',
    // Bigha
    bigha,
    kattha,
    dhur,
    totalKattha,
    totalDhur,
    bighaCode: `${bigha}-${kattha}-${dhur}`,
    bighaText: `${bigha > 0 ? `${bigha} Bigha ` : ''}${kattha} Kattha${dhur > 0 ? ` ${dhur} Dhur` : ''}`.trim() || '0 Dhur',
  };
}

export function ropaniToSqFt(r = 0, a = 0, p = 0, d = 0) {
  return Math.round(
    (Number(r) || 0) * SQFT_PER_ROPANI +
    (Number(a) || 0) * SQFT_PER_AANA +
    (Number(p) || 0) * SQFT_PER_PAISA +
    (Number(d) || 0) * SQFT_PER_DAAM
  );
}

export function bighaToSqFt(b = 0, k = 0, d = 0) {
  return Math.round(
    (Number(b) || 0) * SQFT_PER_BIGHA +
    (Number(k) || 0) * SQFT_PER_KATTHA +
    (Number(d) || 0) * SQFT_PER_DHUR
  );
}

export function sqMToSqFt(sqM) {
  return Math.round((Number(sqM) || 0) * SQFT_PER_SQM);
}

export default function CostCalculatorPage() {
  const navigate = useNavigate();
  
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // State values for calculator inputs
  const [area, setArea] = useState(1800);
  const [areaUnitMode, setAreaUnitMode] = useState('sqft'); // 'sqft' | 'ropani' | 'bigha' | 'sqm'
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTerrain, setSelectedTerrain] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);

  // Land Plot to Built-up Area Helper Tool State
  const [showPlotHelper, setShowPlotHelper] = useState(false);
  const [plotSize, setPlotSize] = useState(4);
  const [plotUnit, setPlotUnit] = useState('aana'); // 'aana' | 'ropani' | 'kattha' | 'dhur' | 'sqft'
  const [coveragePercent, setCoveragePercent] = useState(70); // 70% typical bylaw
  const [targetFloors, setTargetFloors] = useState(2.5);
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  // Calculations states
  const [baseCost, setBaseCost] = useState(0);
  const [finalCost, setFinalCost] = useState(0);
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(0);

  // Computed Nepali land units representation
  const nepaliUnits = useMemo(() => sqFtToNepaliUnits(area), [area]);

  // Fetch configuration from API
  useEffect(() => {
    setLoading(true);
    api.getCalculatorConfig()
      .then((data) => {
        setConfig(data);
        setSelectedPackage(data.packages[1].id);
        setSelectedFloor(data.floors[2].id);
        setSelectedLocation(data.locations[0].id);
        setSelectedTerrain(data.terrains[0].id);
        setSelectedStyle(data.styles[0].id);
      })
      .catch((err) => {
        console.error('Failed to fetch calculator config, using fallback data:', err);
        const data = CALCULATOR_CONFIG;
        setConfig(data);
        setSelectedPackage(data.packages[1].id);
        setSelectedFloor(data.floors[2].id);
        setSelectedLocation(data.locations[0].id);
        setSelectedTerrain(data.terrains[0].id);
        setSelectedStyle(data.styles[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  // Run calculation logic when states change
  useEffect(() => {
    if (!config) return;

    const pkg = config.packages.find(p => p.id === selectedPackage) || config.packages[1];
    const flr = config.floors.find(f => f.id === selectedFloor) || config.floors[0];
    const loc = config.locations.find(l => l.id === selectedLocation) || config.locations[0];
    const trn = config.terrains.find(t => t.id === selectedTerrain) || config.terrains[0];
    const sty = config.styles.find(s => s.id === selectedStyle) || config.styles[0];

    // 1. Base Construction Cost = Area * Selected Package Rate
    const computedBase = area * pkg.rate;
    setBaseCost(computedBase);

    // 2. Apply location, terrain, floor, and style factors
    let computedFinal = computedBase * flr.factor * loc.factor * trn.factor * sty.factor;

    // 3. Add flat upgrades
    const upgradeCost = selectedUpgrades.reduce((sum, upgradeId) => {
      const upgradeItem = config.upgrades.find(u => u.id === upgradeId);
      return sum + (upgradeItem ? upgradeItem.cost : 0);
    }, 0);

    computedFinal += upgradeCost;

    setFinalCost(computedFinal);
    setMinCost(Math.round(computedFinal * (1 - config.variance)));
    setMaxCost(Math.round(computedFinal * (1 + config.variance)));
  }, [area, selectedPackage, selectedFloor, selectedLocation, selectedTerrain, selectedStyle, selectedUpgrades, config]);

  // Format currency to Nepalese standard lakhs/crores formatting (NPR ##,##,###)
  const formatNPR = (val) => {
    const numStr = Math.round(val).toString();
    if (numStr.length <= 3) return `NPR ${numStr}`;
    const lastThree = numStr.substring(numStr.length - 3);
    const otherParts = numStr.substring(0, numStr.length - 3);
    const formattedOthers = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return `NPR ${formattedOthers},${lastThree}`;
  };

  const toggleUpgrade = (upgradeId) => {
    setSelectedUpgrades(prev => 
      prev.includes(upgradeId) 
        ? prev.filter(id => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  if (loading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-blue-800 animate-spin" />
          <span className="text-sm text-gray-400 font-semibold">Loading Cost Estimator...</span>
        </div>
      </div>
    );
  }

  const { packages, floors: floorOptions, locations, terrains, styles, upgrades, distribution, variance } = config;

  const handleConsultationRedirect = () => {
    const pkgLabel = packages.find(p => p.id === selectedPackage)?.title;
    const floorLabel = floorOptions.find(f => f.id === selectedFloor)?.title;
    const locLabel = locations.find(l => l.id === selectedLocation)?.title;
    const trnLabel = terrains.find(t => t.id === selectedTerrain)?.title;
    const styLabel = styles.find(s => s.id === selectedStyle)?.title;
    const activeUpgrades = selectedUpgrades.map(id => upgrades.find(u => u.id === id)?.title).join(', ');

    const message = `Hello Amulya Builders team, I used your online Cost Estimator and would like to request a formal engineering consultation.
My selected parameters are:
- Total Built-up Area: ${area} sq. ft. (~${nepaliUnits.totalAana} Aana | ${nepaliUnits.ropaniCode} R-A-P-D | ${nepaliUnits.sqM} m²)
- Construction Package: ${pkgLabel}
- Floors: ${floorLabel}
- Project Location: ${locLabel}
- Terrain Profile: ${trnLabel}
- Architectural Style: ${styLabel}
- Selected Upgrades: ${activeUpgrades || 'None'}
- Estimate Range: ${formatNPR(minCost)} - ${formatNPR(maxCost)}

Please contact me to arrange a site visit and detailed structural survey!`;

    navigate(`/contact?message=${encodeURIComponent(message)}`);
  };

  return (
    <>
      <Helmet>
        <title>Nepal House Construction Cost Estimator | {COMPANY.name}</title>
        <meta
          name="description"
          content="Estimate your residential building budgets in Nepal with our interactive cost estimator. Configured for Kathmandu, Pokhara, Terai, and Hill regions."
        />
        <meta
          name="keywords"
          content="House construction cost in Nepal, Nepal House Construction Cost Estimator, house construction cost calculator Nepal, construction cost per square foot Nepal, house design cost Kathmandu, residential building cost Nepal"
        />
        <link rel="canonical" href="https://amulyabuilders.com.np/cost-calculator" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amulyabuilders.com.np/cost-calculator" />
        <meta property="og:title" content={`Nepal House Construction Cost Estimator | ${COMPANY.name}`} />
        <meta property="og:description" content="Estimate your residential building budgets in Nepal with our interactive cost estimator. Configured for Kathmandu, Pokhara, Terai, and Hill regions." />
        <meta property="og:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://amulyabuilders.com.np/cost-calculator" />
        <meta name="twitter:title" content={`Nepal House Construction Cost Estimator | ${COMPANY.name}`} />
        <meta name="twitter:description" content="Estimate your residential building budgets in Nepal with our interactive cost estimator. Configured for Kathmandu, Pokhara, Terai, and Hill regions." />
        <meta name="twitter:image" content="https://amulyabuilders.com.np/amulyalogo1.png" />
      </Helmet>

      {/* Page Hero Banner */}
      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-br from-[#012352] via-[#02336e] to-[#011738] text-white overflow-hidden border-b border-white/10"
        aria-label="Cost Estimator Hero"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#cd0102] to-transparent z-10 opacity-80" />
        <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 container-custom text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label justify-center"
          >
            <span className="w-5 h-0.5 bg-orange-400" /> Dynamic Budgeting
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold mt-2 mb-4"
          >
            House Construction Cost Estimator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg"
          >
            An interactive budgeting tool customized for Nepal's regional construction variables. Select package specifications, locations, and terrain dynamics for a personalized estimate.
          </motion.p>
        </div>
      </section>

      {/* Calculator Main Section */}
      <section className="section-padding bg-gray-50 font-sans" aria-label="Nepal Market Estimator Form">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs Panel (7-Columns) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 card-shadow space-y-8">
              
              {/* 1. Built-up Area & Nepali Land Measurement Input */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">1</span>
                      Total Built-up Area
                    </label>
                    <p className="text-xs text-gray-400 font-medium">
                      Enter building area or convert from Nepali land units (Aana, Ropani, Kattha, Dhur, m²)
                    </p>
                  </div>
                </div>

                {/* Unit Mode Switcher Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-xl">
                  {[
                    { id: 'sqft', label: 'Sq. Feet', sub: 'वर्ग फिट' },
                    { id: 'ropani', label: 'Ropani - Aana', sub: 'काठमाडौं / पहाड' },
                    { id: 'bigha', label: 'Bigha - Kattha', sub: 'तराई / मधेश' },
                    { id: 'sqm', label: 'Sq. Meters', sub: 'वर्ग मिटर (m²)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAreaUnitMode(tab.id)}
                      className={`py-2 px-2.5 rounded-lg text-center transition-all cursor-pointer ${
                        areaUnitMode === tab.id
                          ? 'bg-white text-blue-900 shadow-sm font-bold border border-gray-200/80'
                          : 'text-gray-600 hover:text-gray-900 font-medium'
                      }`}
                    >
                      <span className="text-xs block font-bold leading-tight">{tab.label}</span>
                      <span className="text-[10px] text-gray-400 block leading-tight">{tab.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Mode 1: Square Feet Input (Default) */}
                {areaUnitMode === 'sqft' && (
                  <div className="space-y-3 bg-blue-50/30 p-4 rounded-xl border border-blue-100/80">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700">Area in Square Feet:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={area}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              setArea('');
                            } else {
                              const num = Number(val);
                              setArea(isNaN(num) ? 0 : num);
                            }
                          }}
                          onBlur={() => {
                            if (area === '' || area <= 0) setArea(500);
                          }}
                          className="w-28 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-black text-gray-900 text-sm focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 bg-white"
                        />
                        <span className="text-sm font-bold text-gray-600">sq. ft.</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="50"
                      value={Math.max(500, Math.min(10000, Number(area) || 500))}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-800"
                    />
                    <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                      <span>500 sq. ft.</span>
                      <span>5,000 sq. ft.</span>
                      <span>10,000 sq. ft.</span>
                    </div>
                  </div>
                )}

                {/* Mode 2: Ropani - Aana - Paisa - Daam (Hilly / Kathmandu Valley) */}
                {areaUnitMode === 'ropani' && (
                  <div className="space-y-3 bg-orange-50/30 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        Kathmandu & Hilly Region (रोपनी - आना - पैसा - दाम)
                      </span>
                      <span className="text-[11px] font-extrabold text-orange-600 bg-orange-100/80 px-2 py-0.5 rounded">
                        Total: {nepaliUnits.totalAana} Aana
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Ropani (रोपनी)</label>
                        <input
                          type="number"
                          min="0"
                          value={nepaliUnits.ropani}
                          onChange={(e) => {
                            const newR = Math.max(0, parseInt(e.target.value) || 0);
                            setArea(ropaniToSqFt(newR, nepaliUnits.aana, nepaliUnits.paisa, nepaliUnits.daam));
                          }}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-900 text-sm focus:outline-none focus:border-orange-500 bg-white"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 R = 16 Aana</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Aana (आना)</label>
                        <input
                          type="number"
                          min="0"
                          max="15"
                          value={nepaliUnits.aana}
                          onChange={(e) => {
                            const newA = Math.max(0, parseInt(e.target.value) || 0);
                            setArea(ropaniToSqFt(nepaliUnits.ropani, newA, nepaliUnits.paisa, nepaliUnits.daam));
                          }}
                          className="w-full px-2 py-2 border border-orange-300 rounded-lg text-center font-bold text-orange-600 text-sm focus:outline-none focus:border-orange-500 bg-white ring-1 ring-orange-200"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 A = 342.25 sq ft</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Paisa (पैसा)</label>
                        <input
                          type="number"
                          min="0"
                          max="3"
                          value={nepaliUnits.paisa}
                          onChange={(e) => {
                            const newP = Math.max(0, parseInt(e.target.value) || 0);
                            setArea(ropaniToSqFt(nepaliUnits.ropani, nepaliUnits.aana, newP, nepaliUnits.daam));
                          }}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-900 text-sm focus:outline-none focus:border-orange-500 bg-white"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 P = 4 Daam</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Daam (दाम)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={nepaliUnits.daam}
                          onChange={(e) => {
                            const newD = Math.max(0, parseFloat(e.target.value) || 0);
                            setArea(ropaniToSqFt(nepaliUnits.ropani, nepaliUnits.aana, nepaliUnits.paisa, newD));
                          }}
                          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-900 text-sm focus:outline-none focus:border-orange-500 bg-white"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 D = 21.39 sq ft</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 3: Bigha - Kattha - Dhur (Terai / Madhesh) */}
                {areaUnitMode === 'bigha' && (
                  <div className="space-y-3 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        Terai & Madhesh Region (बिघा - कठ्ठा - धुर)
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                        Total: {nepaliUnits.totalDhur} Dhur
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Bigha (बिघा)</label>
                        <input
                          type="number"
                          min="0"
                          value={nepaliUnits.bigha}
                          onChange={(e) => {
                            const newB = Math.max(0, parseInt(e.target.value) || 0);
                            setArea(bighaToSqFt(newB, nepaliUnits.kattha, nepaliUnits.dhur));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-900 text-sm focus:outline-none focus:border-emerald-600 bg-white"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 Bigha = 20 Kattha</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Kattha (कठ्ठा)</label>
                        <input
                          type="number"
                          min="0"
                          max="19"
                          value={nepaliUnits.kattha}
                          onChange={(e) => {
                            const newK = Math.max(0, parseInt(e.target.value) || 0);
                            setArea(bighaToSqFt(nepaliUnits.bigha, newK, nepaliUnits.dhur));
                          }}
                          className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-center font-bold text-emerald-700 text-sm focus:outline-none focus:border-emerald-600 bg-white ring-1 ring-emerald-200"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 Kattha = 3,645 sq ft</span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Dhur (धुर)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={nepaliUnits.dhur}
                          onChange={(e) => {
                            const newD = Math.max(0, parseFloat(e.target.value) || 0);
                            setArea(bighaToSqFt(nepaliUnits.bigha, nepaliUnits.kattha, newD));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold text-gray-900 text-sm focus:outline-none focus:border-emerald-600 bg-white"
                        />
                        <span className="text-[9px] text-gray-400 block mt-0.5">1 Dhur = 182.25 sq ft</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 4: Square Meters (Metric) */}
                {areaUnitMode === 'sqm' && (
                  <div className="space-y-3 bg-purple-50/30 p-4 rounded-xl border border-purple-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-purple-600" />
                        Metric System (वर्ग मिटर):
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="1"
                          value={nepaliUnits.sqM}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setArea(sqMToSqFt(isNaN(val) ? 0 : val));
                          }}
                          className="w-28 px-3 py-1.5 border border-purple-300 rounded-lg text-right font-black text-purple-900 text-sm focus:outline-none focus:border-purple-600 bg-white"
                        />
                        <span className="text-sm font-bold text-gray-600">m²</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      1 Square Meter ≈ 10.764 Square Feet (100 m² = 1,076.4 sq. ft.)
                    </div>
                  </div>
                )}

                {/* Live Real-time Unit Equivalent Comparison Grid (4 Cards Strip) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="bg-gray-50 border border-gray-200/70 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Square Feet</span>
                    <span className="text-sm font-black text-gray-900 block mt-0.5">{area.toLocaleString()} sq. ft.</span>
                    <span className="text-[10px] text-gray-500 block">Imperial Standard</span>
                  </div>

                  <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">Ropani System</span>
                    <span className="text-sm font-black text-slate-900 block mt-0.5">{nepaliUnits.ropaniCode}</span>
                    <span className="text-[10px] text-orange-600 font-semibold block">{nepaliUnits.totalAana} Aana</span>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Bigha System</span>
                    <span className="text-sm font-black text-slate-900 block mt-0.5">{nepaliUnits.bighaCode}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold block">{nepaliUnits.totalDhur} Dhur</span>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-2.5">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Square Meters</span>
                    <span className="text-sm font-black text-slate-900 block mt-0.5">{nepaliUnits.sqM} m²</span>
                    <span className="text-[10px] text-blue-600 font-semibold block">Metric (वर्ग मिटर)</span>
                  </div>
                </div>

                {/* Quick Nepali Land Size Presets (1-Click Buttons) */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Quick Nepali Land Size Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '3 Aana', sqFt: 1027, desc: '1,027 sq ft' },
                      { label: '4 Aana', sqFt: 1369, desc: '1,369 sq ft' },
                      { label: '5 Aana', sqFt: 1711, desc: '1,711 sq ft' },
                      { label: '8 Aana (½ Ropani)', sqFt: 2738, desc: '2,738 sq ft' },
                      { label: '1 Ropani', sqFt: 5476, desc: '5,476 sq ft' },
                      { label: '10 Dhur', sqFt: 1823, desc: '1,823 sq ft' },
                      { label: '1 Kattha', sqFt: 3645, desc: '3,645 sq ft' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setArea(preset.sqFt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          Math.abs(area - preset.sqFt) < 20
                            ? 'bg-blue-800 text-white border-blue-800 font-bold shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-800 hover:bg-blue-50/50 font-medium'
                        }`}
                        title={`${preset.desc}`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smart Land Plot-to-Built-up Area Estimator (Accordion) */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPlotHelper(!showPlotHelper)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200 text-left cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-800" />
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Have Land / Plot Size? Calculate Built-up Area
                        </span>
                        <span className="text-[10px] text-gray-500 block">
                          Convert plot size + ground coverage + floors into total construction area
                        </span>
                      </div>
                    </div>
                    {showPlotHelper ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showPlotHelper && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-slate-50/80 rounded-b-xl border-x border-b border-slate-200 p-4 space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                              Land Plot Size
                            </label>
                            <div className="flex gap-1.5">
                              <input
                                type="number"
                                min="0.5"
                                step="0.5"
                                value={plotSize}
                                onChange={(e) => setPlotSize(Math.max(0.1, parseFloat(e.target.value) || 1))}
                                className="w-full px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-slate-900 text-right"
                              />
                              <select
                                value={plotUnit}
                                onChange={(e) => setPlotUnit(e.target.value)}
                                className="px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                              >
                                <option value="aana">Aana</option>
                                <option value="ropani">Ropani</option>
                                <option value="kattha">Kattha</option>
                                <option value="dhur">Dhur</option>
                                <option value="sqft">Sq. Ft.</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                              Ground Coverage %
                            </label>
                            <select
                              value={coveragePercent}
                              onChange={(e) => setCoveragePercent(Number(e.target.value))}
                              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-800 cursor-pointer"
                            >
                              <option value="60">60% (Suburban Bylaw)</option>
                              <option value="70">70% (Standard Urban / Kathmandu)</option>
                              <option value="80">80% (High Density / Commercial)</option>
                              <option value="100">100% (Full Plot Footprint)</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-gray-600 uppercase block mb-1">
                              Target Floors
                            </label>
                            <select
                              value={targetFloors}
                              onChange={(e) => setTargetFloors(Number(e.target.value))}
                              className="w-full px-2.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-bold text-slate-800 cursor-pointer"
                            >
                              <option value="1">1 Storey (Ground Floor)</option>
                              <option value="1.5">1.5 Storeys</option>
                              <option value="2">2 Storeys</option>
                              <option value="2.5">2.5 Storeys (Most Popular)</option>
                              <option value="3">3 Storeys</option>
                              <option value="3.5">3.5 Storeys</option>
                              <option value="4">4 Storeys</option>
                            </select>
                          </div>
                        </div>

                        {/* Calculated Footprint Summary */}
                        {(() => {
                          const pSqFt = 
                            plotUnit === 'aana' ? plotSize * SQFT_PER_AANA :
                            plotUnit === 'ropani' ? plotSize * SQFT_PER_ROPANI :
                            plotUnit === 'kattha' ? plotSize * SQFT_PER_KATTHA :
                            plotUnit === 'dhur' ? plotSize * SQFT_PER_DHUR :
                            Number(plotSize) || 0;
                          const footprint = Math.round(pSqFt * (coveragePercent / 100));
                          const totalBuilt = Math.round(footprint * targetFloors);

                          return (
                            <div className="bg-white p-3 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="text-xs space-y-0.5">
                                <span className="text-[10px] text-gray-400 font-bold uppercase block">
                                  Estimated Built-up Area:
                                </span>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-base font-black text-blue-900">
                                    {totalBuilt.toLocaleString()} sq. ft.
                                  </span>
                                  <span className="text-[11px] text-gray-500">
                                    ({footprint} sq. ft. footprint × {targetFloors} floors)
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setArea(totalBuilt);
                                  setAppliedFeedback(true);
                                  setTimeout(() => setAppliedFeedback(false), 2500);
                                }}
                                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                              >
                                {appliedFeedback ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-green-400" />
                                    <span>Applied to Estimator!</span>
                                  </>
                                ) : (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Apply {totalBuilt.toLocaleString()} sq. ft.</span>
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 2. Construction Package Selection */}
              <div className="space-y-4">
                <div>
                  <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">2</span>
                    Select Construction Package
                  </label>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    *Rates shown below are indicative market estimates in Nepal, not government or NBC fixed building rates.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`text-left p-4 rounded-xl border-2 transition-all flex flex-col justify-between ${
                        selectedPackage === pkg.id
                          ? 'border-blue-800 bg-blue-50/40 ring-1 ring-blue-800'
                          : 'border-gray-200 hover:border-blue-800 bg-white'
                      }`}
                      aria-pressed={selectedPackage === pkg.id}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-extrabold text-gray-900 text-sm">{pkg.title}</span>
                          {selectedPackage === pkg.id && (
                            <span className="w-4 h-4 rounded-full bg-blue-800 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{pkg.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-gray-100 w-full">
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">Est. Rate</span>
                        <span className="text-base font-black text-blue-800">
                          {formatNPR(pkg.rate)}
                          <span className="text-[10px] text-gray-500 font-normal">/sq.ft.</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Package Specifications Details List */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-800" />
                    Key Materials Included (Selected Package)
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700" role="list">
                    {(packages.find(p => p.id === selectedPackage) || packages[1]).includes.map((specItem, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{specItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. Floors Selection & Location Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Floors */}
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">3</span>
                    Floor Selection
                  </label>
                  <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 cursor-pointer"
                  >
                    {floorOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.title} {opt.factor !== 1.0 ? `(x${opt.factor} load adjustment)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">4</span>
                    Project Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 cursor-pointer"
                  >
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.title} {loc.factor !== 1.0 ? `(Rate Factor: ${loc.factor}x)` : '(Base Rate Factor)'}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* 4. Terrain Selector */}
              <div className="space-y-3">
                <div>
                  <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">5</span>
                    Terrain & Soil Profile
                  </label>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    *Actual foundation and structural sizing require detailed site geotechnical investigation and engineering analysis.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {terrains.map((trn) => (
                    <label
                      key={trn.id}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedTerrain === trn.id
                          ? 'border-blue-800 bg-blue-50/20'
                          : 'border-gray-200 hover:border-blue-800 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="terrain"
                        value={trn.id}
                        checked={selectedTerrain === trn.id}
                        onChange={() => setSelectedTerrain(trn.id)}
                        className="mt-1 text-blue-800 focus:ring-blue-800 cursor-pointer"
                      />
                      <div>
                        <span className="text-sm font-bold text-gray-900 block">{trn.title}</span>
                        <span className="text-xs text-gray-500 block mt-0.5 leading-relaxed">{trn.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Architectural Style & Upgrades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Architectural Style */}
                <div className="space-y-2">
                  <div>
                    <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">6</span>
                      Design Style
                    </label>
                    <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
                      Style choice adjustments reflect layout complexities. Chosen style does not determine Building Code compliance.
                    </p>
                  </div>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl font-medium text-gray-900 text-sm focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 cursor-pointer"
                  >
                    {styles.map((sty) => (
                      <option key={sty.id} value={sty.id}>
                        {sty.title} {sty.factor !== 1.0 ? `(+${Math.round((sty.factor - 1.0) * 100)}%)` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Upgrades */}
                <div className="space-y-2">
                  <label className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold">7</span>
                    Optional Upgrades
                  </label>
                  <div className="space-y-2 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                    {upgrades.map((upg) => (
                      <label key={upg.id} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={selectedUpgrades.includes(upg.id)}
                          onChange={() => toggleUpgrade(upg.id)}
                          className="rounded text-blue-800 focus:ring-blue-800 cursor-pointer"
                        />
                        <div className="flex-grow">
                          <span>{upg.title}</span>
                          <span className="text-[10px] text-gray-400 block font-normal mt-0.5">+{formatNPR(upg.cost)}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Right Estimations Panel (5-Columns) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {/* Cost Results Display */}
              <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 z-0" />
                <div className="relative z-10 space-y-6">
                  
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5" />
                      Indicative Budget Estimate
                    </span>
                    <h3 className="text-lg font-bold text-gray-300 mt-1">Calculated Range Cost</h3>
                  </div>

                  {/* Calculated Range Cost Box */}
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center relative">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Estimated Cost Range</span>
                    <span className="text-2xl md:text-3xl font-black text-orange-400 block mt-2">
                      {formatNPR(minCost)} - {formatNPR(maxCost)}
                    </span>
                    
                    {/* Estimate may vary indicator */}
                    <div className="inline-flex items-center gap-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full px-2.5 py-0.5 text-[9px] font-semibold mt-3">
                      <Sparkles className="w-2.5 h-2.5" />
                      Estimate may vary based on exact layout
                    </div>
                  </div>

                  {/* Nepali Land Units Equivalent Summary */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between items-center text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                      <span>Total Built-up Area</span>
                      <span className="text-orange-400 font-extrabold text-xs">{area.toLocaleString()} sq. ft.</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-2 border-t border-white/10">
                      <span className="text-slate-400 font-medium">🏔️ Ropani System (पहाड):</span>
                      <span className="text-white font-bold">{nepaliUnits.ropaniCode} <span className="text-orange-300 font-normal">({nepaliUnits.totalAana} Aana)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-medium">🌾 Bigha System (तराई):</span>
                      <span className="text-white font-bold">{nepaliUnits.bighaCode} <span className="text-emerald-300 font-normal">({nepaliUnits.totalDhur} Dhur)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-medium">📐 Metric Standard:</span>
                      <span className="text-white font-bold">{nepaliUnits.sqM} m² <span className="text-blue-300 font-normal">(वर्ग मिटर)</span></span>
                    </div>
                  </div>

                  {/* Estimated Cost Distribution Progress Bars */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Estimated Cost Distribution</h4>
                      <p className="text-[9px] text-gray-400 leading-tight mt-0.5">
                        *Values are planning estimation assumptions, not Nepal Building Code requirements.
                      </p>
                    </div>
                    
                    {/* Civil works (55%) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-300">
                        <span>Civil & Structure (55%)</span>
                        <span>{formatNPR(Math.round(finalCost * distribution.civil))}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full rounded-full" style={{ width: `${distribution.civil * 100}%` }} />
                      </div>
                    </div>

                    {/* Finishes (25%) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-300">
                        <span>Finishing & Woodwork (25%)</span>
                        <span>{formatNPR(Math.round(finalCost * distribution.finishes))}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${distribution.finishes * 100}%` }} />
                      </div>
                    </div>

                    {/* MEP (15%) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-300">
                        <span>MEP (Sanitary & Electrical) (15%)</span>
                        <span>{formatNPR(Math.round(finalCost * distribution.mep))}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: `${distribution.mep * 100}%` }} />
                      </div>
                    </div>

                    {/* Permits (5%) */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-gray-300">
                        <span>Bylaw Permits & PM (5%)</span>
                        <span>{formatNPR(Math.round(finalCost * distribution.permits))}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${distribution.permits * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Form Submission Call To Action */}
                  <div className="pt-2">
                    <button
                      onClick={handleConsultationRedirect}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20"
                    >
                      Submit Estimate for Review
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* NBC Building standards callout */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 space-y-3">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <HardHat className="w-4 h-4 text-blue-800" />
                  Nepal Building Standards (NBC) Info
                </h4>
                <p className="text-[11px] text-blue-800 leading-relaxed">
                  Final structural designs and building calculations must comply with municipal building bylaws and national codes, including:
                </p>
                <ul className="text-[10px] text-blue-900 font-semibold space-y-1 list-disc pl-4" role="list">
                  <li>NBC 206:2024 – Architectural Design Requirements</li>
                  <li>NBC 205:2024 – Low-Rise RCC Building Detailing</li>
                  <li>NBC 105:2025 – Seismic Design of Buildings</li>
                </ul>
                <p className="text-[9px] text-blue-700/80 leading-normal italic">
                  *Disclaimer: This estimator does not certify municipal permit compliance or structural adequacy.
                </p>
              </div>

            </div>

          </div>

          {/* Standard Nepal building disclaimers */}
          <div className="mt-8 bg-gray-100 rounded-2xl p-6 border border-gray-200/60 max-w-4xl mx-auto flex gap-4">
            <ShieldAlert className="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest block">Nepal Building Standards Disclaimer</span>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                This calculator provides an indicative construction cost estimate based on selected project parameters and current market assumptions. It is not a structural design, engineering calculation, building permit approval, or fixed government/Nepal Building Code rate. Final construction cost and design requirements depend on architectural design, structural engineering, soil investigation, site conditions, material specifications, labor rates, municipal bylaws, and applicable Nepal Building Codes.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
