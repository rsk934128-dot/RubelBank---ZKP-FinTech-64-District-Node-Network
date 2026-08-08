import React from 'react';
import { 
  BarChart3, 
  Activity, 
  Zap, 
  Clock, 
  ShieldCheck, 
  PieChart as PieIcon, 
  Layers, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { DistrictNode, Language } from '../types';
import { DIVISIONS } from '../data/districtsData';
import { TRANSLATIONS } from '../data/translations';

interface AnalyticsDashboardProps {
  districtNodes: DistrictNode[];
  language: Language;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  districtNodes,
  language
}) => {
  const t = TRANSLATIONS[language];

  // Aggregate division latency and TPS data
  const divisionData = DIVISIONS.map((div) => {
    const divNodes = districtNodes.filter(n => n.division === div.id);
    const avgLatency = divNodes.length > 0 
      ? Math.round(divNodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / divNodes.length)
      : 10;
    const totalTps = divNodes.reduce((acc, curr) => acc + curr.tps, 0);
    const totalVolumeM = Math.round(divNodes.reduce((acc, curr) => acc + curr.totalShieldedVolumeBDT, 0) / 1000000);

    return {
      name: language === 'bn' ? div.nameBn : div.nameEn,
      latency: avgLatency,
      tps: totalTps,
      volumeM: totalVolumeM,
      color: div.color
    };
  });

  // Simulated 24-hour network throughput history
  const historyData = [
    { time: '00:00', tps: 4200, latency: 8, zkpMs: 1.2 },
    { time: '04:00', tps: 2800, latency: 6, zkpMs: 1.1 },
    { time: '08:00', tps: 8900, latency: 12, zkpMs: 1.5 },
    { time: '12:00', tps: 12400, latency: 14, zkpMs: 1.6 },
    { time: '16:00', tps: 11200, latency: 11, zkpMs: 1.4 },
    { time: '20:00', tps: 9800, latency: 9, zkpMs: 1.3 },
    { time: '23:59', tps: 6400, latency: 7, zkpMs: 1.2 },
  ];

  const pieData = [
    { name: 'Shielded ZK-SNARKs', value: 78, color: '#10B981' },
    { name: 'Public Clearing', value: 22, color: '#38BDF8' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart3 className="w-5 h-5 stroke-[2.5]" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {t.navAnalytics}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry across Bangladesh's 64-district node corridor and Groth16 proving benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400">
            Node Health: 100% Operational
          </span>
        </div>
      </div>

      {/* Top 4 Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Network Throughput</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {divisionData.reduce((a, b) => a + b.tps, 0).toLocaleString()} TPS
          </div>
          <div className="text-[11px] text-emerald-400 font-mono font-semibold">
            ↑ 14% vs previous hour
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average Corridor Latency</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            {Math.round(divisionData.reduce((a, b) => a + b.latency, 0) / divisionData.length)} ms
          </div>
          <div className="text-[11px] text-cyan-400 font-mono font-semibold">
            Sub-15ms National Target Met
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ZKP Proving Overhead</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            1.32 ms
          </div>
          <div className="text-[11px] text-emerald-400 font-mono font-semibold">
            BN-254 Pairings Benchmark
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>24h Shielded BDT Volume</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">
            ৳ {divisionData.reduce((a, b) => a + b.volumeM, 0).toLocaleString()}M
          </div>
          <div className="text-[11px] text-purple-400 font-mono font-semibold">
            78% Private Volume
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Division Latency Comparison Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Division Latency Distribution (ms)
            </h3>
            <p className="text-xs text-slate-400">
              Average network ping across Bangladesh's 8 major division node corridors.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={divisionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
                  itemStyle={{ color: '#38BDF8' }}
                />
                <Bar dataKey="latency" radius={[6, 6, 0, 0]} fill="#38BDF8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 24-Hour TPS Load Area Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              24-Hour Network Load Curve (TPS)
            </h3>
            <p className="text-xs text-slate-400">
              Simulated 24h transaction volume curve across peak business hours.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tpsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
                  itemStyle={{ color: '#10B981' }}
                />
                <Area type="monotone" dataKey="tps" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#tpsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Division Volume & Shielded Ratio Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Division BDT Volume Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              24h Division Volume Breakdown (Million BDT ৳)
            </h3>
            <p className="text-xs text-slate-400">
              Total transaction volume processed per division in the last 24 hours.
            </p>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={divisionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} />
                <YAxis stroke="#94A3B8" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
                  itemStyle={{ color: '#C084FC' }}
                />
                <Bar dataKey="volumeM" radius={[6, 6, 0, 0]} fill="#A855F7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shielded vs Public Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              Privacy Ratio
            </h3>
            <p className="text-xs text-slate-400">
              Shielded ZKP transfers vs public clearing house BDT.
            </p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#F8FAFC' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center text-emerald-400">
              <span>● Shielded ZK-SNARKs</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="flex justify-between items-center text-sky-400">
              <span>● Public Clearing</span>
              <span className="font-bold">22%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
