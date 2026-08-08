import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Activity, 
  Zap, 
  Filter, 
  RefreshCw, 
  Wifi, 
  ShieldCheck, 
  Layers, 
  Radio, 
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';
import { DistrictNode, DivisionId, Language, NetworkPacketAnimation } from '../types';
import { DIVISIONS, BANGLADESH_DISTRICTS } from '../data/districtsData';
import { TRANSLATIONS } from '../data/translations';

interface DistrictNodeCorridorProps {
  districtNodes: DistrictNode[];
  language: Language;
  onSendFromDistrict?: (districtId: string) => void;
}

export const DistrictNodeCorridor: React.FC<DistrictNodeCorridorProps> = ({
  districtNodes,
  language,
  onSendFromDistrict
}) => {
  const t = TRANSLATIONS[language];
  const [selectedDivision, setSelectedDivision] = useState<DivisionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<DistrictNode | null>(districtNodes[0]);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [activePackets, setActivePackets] = useState<NetworkPacketAnimation[]>([]);

  // Filter districts based on division and search
  const filteredNodes = districtNodes.filter((node) => {
    const matchesDivision = selectedDivision === 'all' || node.division === selectedDivision;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      node.nameEn.toLowerCase().includes(query) || 
      node.nameBn.includes(query) || 
      node.id.includes(query);
    return matchesDivision && matchesSearch;
  });

  // Simulate ping to selected district node
  const handlePingNode = () => {
    if (!selectedNode) return;
    setIsPinging(true);
    setPingLatency(null);
    setTimeout(() => {
      const simulatedMs = Math.max(2, Math.round(selectedNode.latencyMs + (Math.random() * 4 - 2)));
      setPingLatency(simulatedMs);
      setIsPinging(false);
    }, 600);
  };

  // Trigger TPS Stress Test simulation across Bangladesh
  const handleTriggerStressTest = () => {
    setIsStressTesting(true);
    
    // Spawn 8 animated network packets across random nodes
    const newPackets: NetworkPacketAnimation[] = [];
    for (let i = 0; i < 8; i++) {
      const from = districtNodes[Math.floor(Math.random() * districtNodes.length)];
      let to = districtNodes[Math.floor(Math.random() * districtNodes.length)];
      while (to.id === from.id) {
        to = districtNodes[Math.floor(Math.random() * districtNodes.length)];
      }
      newPackets.push({
        id: `pkt-${Date.now()}-${i}`,
        fromNode: from,
        toNode: to,
        progress: 0,
        amountBDT: Math.floor(Math.random() * 50000) + 5000,
        isShielded: Math.random() > 0.3
      });
    }
    setActivePackets(newPackets);

    // Animate packet progress over 2 seconds
    const interval = setInterval(() => {
      setActivePackets((prev) => 
        prev.map((p) => ({
          ...p,
          progress: Math.min(1, p.progress + 0.1)
        })).filter((p) => p.progress < 1)
      );
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setIsStressTesting(false);
      setActivePackets([]);
    }, 3000);
  };

  const getDivisionColor = (divId: DivisionId) => {
    const div = DIVISIONS.find(d => d.id === divId);
    return div ? div.color : '#3B82F6';
  };

  return (
    <div className="space-y-6">
      
      {/* Top Title & Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Radio className="w-5 h-5 animate-pulse" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {t.corridorTitle}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.corridorSubtitle}
          </p>
        </div>

        {/* Stress Test Button */}
        <button
          onClick={handleTriggerStressTest}
          disabled={isStressTesting}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
            isStressTesting
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20 active:scale-95'
          }`}
        >
          <Zap className={`w-4 h-4 ${isStressTesting ? 'animate-spin' : ''}`} />
          <span>{isStressTesting ? 'Executing TPS Surge (3000 TPS)...' : t.stressTest}</span>
        </button>
      </div>

      {/* Division Tabs & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
        
        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedDivision('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDivision === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.allDivisions} (64)
          </button>
          {DIVISIONS.map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDivision === div.id
                  ? 'bg-slate-700 text-slate-100 border border-slate-600'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: div.color }} />
              <span>{language === 'bn' ? div.nameBn : div.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Search District Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'জেলা খুঁজুন (যেমন: ঢাকা, সিলেট)...' : 'Search district (e.g. Dhaka)...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

      </div>

      {/* Main Map & Node Detail Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bangladesh Interactive SVG Map */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[520px]">
          <div className="flex items-center justify-between mb-4 z-10">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Bangladesh 64-District Topology Projection
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {filteredNodes.length} Districts Visible
            </span>
          </div>

          {/* Canvas SVG Bangladesh Map Container */}
          <div className="relative w-full h-[420px] flex items-center justify-center bg-slate-950/70 rounded-xl border border-slate-800/80 p-4 overflow-hidden">
            
            {/* Bangladesh Map Background Outlines */}
            <svg 
              viewBox="0 0 800 700" 
              className="w-full h-full max-h-[400px] select-none"
            >
              <defs>
                {/* Glow Filter for Active Nodes */}
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Connection Mesh Grid */}
              <g className="opacity-15 stroke-slate-700" strokeWidth="0.5" strokeDasharray="3 3">
                {DIVISIONS.map((d1, i) => 
                  DIVISIONS.slice(i + 1).map((d2) => (
                    <line 
                      key={`mesh-${d1.id}-${d2.id}`}
                      x1={d1.center.x} y1={d1.center.y}
                      x2={d2.center.x} y2={d2.center.y}
                    />
                  ))
                )}
              </g>

              {/* Live Active Animated Packet Connection Lines */}
              {activePackets.map((pkt) => {
                const x1 = pkt.fromNode.mapX;
                const y1 = pkt.fromNode.mapY;
                const x2 = pkt.toNode.mapX;
                const y2 = pkt.toNode.mapY;
                const currentX = x1 + (x2 - x1) * pkt.progress;
                const currentY = y1 + (y2 - y1) * pkt.progress;

                return (
                  <g key={pkt.id}>
                    <line 
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={pkt.isShielded ? "#10B981" : "#06B6D4"}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-60"
                    />
                    {/* Animated Packet Pulse */}
                    <circle 
                      cx={currentX} cy={currentY} r="5" 
                      fill={pkt.isShielded ? "#10B981" : "#38BDF8"} 
                      filter="url(#nodeGlow)"
                    />
                  </g>
                );
              })}

              {/* District Node Points */}
              {districtNodes.map((node) => {
                const isFiltered = filteredNodes.some(n => n.id === node.id);
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getDivisionColor(node.division);

                if (!isFiltered) return null;

                return (
                  <g 
                    key={node.id} 
                    onClick={() => {
                      setSelectedNode(node);
                      setPingLatency(null);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Ripple ring for selected node */}
                    {isSelected && (
                      <circle 
                        cx={node.mapX} 
                        cy={node.mapY} 
                        r="14" 
                        className="fill-none stroke-emerald-400 animate-ping opacity-75 stroke-[1.5]"
                      />
                    )}

                    {/* Outer node dot */}
                    <circle 
                      cx={node.mapX} 
                      cy={node.mapY} 
                      r={isSelected ? "7" : "4.5"} 
                      fill={nodeColor}
                      filter="url(#nodeGlow)"
                      className="transition-all duration-300 group-hover:r-6"
                    />

                    {/* District Name Label */}
                    <text 
                      x={node.mapX + 8} 
                      y={node.mapY + 3} 
                      fill={isSelected ? "#F8FAFC" : "#94A3B8"}
                      fontSize={isSelected ? "11" : "9"}
                      fontWeight={isSelected ? "700" : "500"}
                      className="font-mono pointer-events-none select-none transition-colors"
                    >
                      {language === 'bn' ? node.nameBn : node.nameEn}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-[10px] space-y-1 font-mono">
              <div className="text-slate-400 font-semibold mb-1">Division Node Colors:</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                {DIVISIONS.map((d) => (
                  <div key={d.id} className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span>{language === 'bn' ? d.nameBn : d.nameEn}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Drawer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          {selectedNode ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-semibold">
                    District Node Inspector
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-100 mt-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  {language === 'bn' ? selectedNode.nameBn : selectedNode.nameEn}
                </h2>
                <p className="text-xs text-slate-400">
                  Division: {selectedNode.division.toUpperCase()} • Node ID: #{selectedNode.id}
                </p>
              </div>

              {/* Node Metrics Grid */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* IP Address */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Node IP Endpoint</span>
                  <span className="text-slate-200 font-semibold">{selectedNode.ipAddress}</span>
                </div>

                {/* Active Validators */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">{t.validatorCount}</span>
                  <span className="text-emerald-400 font-bold">{selectedNode.activeValidators} Nodes</span>
                </div>

                {/* Latency */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Average Ping</span>
                  <span className="text-cyan-400 font-bold">{selectedNode.latencyMs} ms</span>
                </div>

                {/* TPS */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Current Throughput</span>
                  <span className="text-amber-400 font-bold">{selectedNode.tps} TPS</span>
                </div>

                {/* 24h Volume */}
                <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">{t.shieldedVolume}</span>
                  <span className="text-slate-100 font-bold">
                    ৳ {(selectedNode.totalShieldedVolumeBDT / 1000000).toFixed(1)}M BDT
                  </span>
                </div>

              </div>

              {/* Ping Test Button & Result */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handlePingNode}
                  disabled={isPinging}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <Wifi className={`w-4 h-4 text-cyan-400 ${isPinging ? 'animate-ping' : ''}`} />
                  <span>{isPinging ? 'Pinging Node Endpoint...' : `${t.pingNode} (${selectedNode.nameEn})`}</span>
                </button>

                {pingLatency !== null && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-center font-mono text-xs text-emerald-300">
                    Ping Response: <span className="font-bold text-emerald-400">{pingLatency}ms</span> (ICMP ECHO OK)
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a district node on the Bangladesh map to view live validator telemetry.
            </div>
          )}

          {/* Quick Node List */}
          <div className="border-t border-slate-800 pt-4">
            <div className="text-[11px] font-mono text-slate-400 mb-2 font-semibold">
              Filtered Districts ({filteredNodes.length}):
            </div>
            <div className="max-h-[140px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedNode(n);
                    setPingLatency(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex items-center justify-between transition-colors ${
                    selectedNode?.id === n.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{language === 'bn' ? n.nameBn : n.nameEn}</span>
                  <span className="text-[10px] text-slate-500">{n.latencyMs}ms</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
