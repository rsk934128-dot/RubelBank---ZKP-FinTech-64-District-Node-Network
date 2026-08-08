import React, { useState } from 'react';
import Papa from 'papaparse';
import { 
  ShieldCheck, 
  Send, 
  Lock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldAlert, 
  Fingerprint, 
  RefreshCw, 
  CheckCircle2, 
  MapPin, 
  ExternalLink,
  Zap,
  Shield,
  Layers,
  FileCode2,
  Download
} from 'lucide-react';
import { UserProfile, Transaction, DistrictNode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface DashboardProps {
  user: UserProfile;
  hideBalance: boolean;
  language: Language;
  onOpenTransferModal: () => void;
  onNavigateTab: (tab: string) => void;
  transactions: Transaction[];
  districtNodes: DistrictNode[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  hideBalance,
  language,
  onOpenTransferModal,
  onNavigateTab,
  transactions,
  districtNodes
}) => {
  const t = TRANSLATIONS[language];

  // Quick stats
  const activeNodes = districtNodes.filter(n => n.status === 'active').length;
  const avgLatency = Math.round(districtNodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / districtNodes.length);
  const totalTps = districtNodes.reduce((acc, curr) => acc + curr.tps, 0);

  // CSV Export handler
  const handleExportCSV = () => {
    const dataToExport = transactions.map((tx) => ({
      'Transaction ID': tx.id,
      'Type': tx.isShielded ? 'SHIELDED (Groth16 ZKP)' : 'PUBLIC BDT',
      'Sender': tx.sender,
      'Recipient': tx.recipient,
      'From District': tx.districtFrom,
      'To District': tx.districtTo,
      'Amount (BDT ৳)': tx.amount,
      'Groth16 ZK Hash': tx.zkpHash,
      'Timestamp': tx.timestamp,
      'Status': tx.status.toUpperCase()
    }));

    const csvString = Papa.unparse(dataToExport);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RubelBank_Transaction_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Account Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main BDT Balance Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  {t.welcomeBack}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-0.5">
                  {language === 'bn' ? user.banglaName : user.name}
                </h1>
              </div>

              {/* District & Division Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Node Origin: {user.district}, {user.division.toUpperCase()}</span>
              </div>
            </div>

            {/* Balances Display Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Shielded Balance */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-500/30 backdrop-blur-sm space-y-2 relative group hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <Shield className="w-3.5 h-3.5" />
                    {t.shieldedBalance}
                  </span>
                  <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    Groth16
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  {hideBalance ? "৳ ••••••••" : `৳ ${user.shieldedBalance.toLocaleString('en-IN')}`}
                </div>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'গোপন ভল্ট এনক্রিপশনে সুরক্ষিত' : 'Protected inside ZK-SNARKs Private Vault'}
                </p>
              </div>

              {/* Public Balance */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{t.publicBalance}</span>
                  <span className="font-mono text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    Public BDT
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
                  {hideBalance ? "৳ ••••••••" : `৳ ${user.accountBalance.toLocaleString('en-IN')}`}
                </div>
                <p className="text-[11px] text-slate-400">
                  {language === 'bn' ? 'পাবলিক ইন্টার-ব্যাংক সার্ভিস' : 'Standard clearing house BDT balance'}
                </p>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenTransferModal}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{t.quickTransfer}</span>
              </button>

              <button
                onClick={() => onNavigateTab('vault')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{language === 'bn' ? 'জেডকে প্রুফ জেনারেট' : 'ZK Proof Vault'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('corridor')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{language === 'bn' ? '৬৪-জেলা নোড ক্যানভাস' : '64-District Map'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Security & System Status Card */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                {language === 'bn' ? 'সিকিউরিটি স্ট্যাটাস' : 'Security Vector'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                L3 ENCRYPTED
              </span>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Biometrics Status */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Fingerprint className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 font-medium">Biometric Hardware</span>
                </div>
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Bound
                </span>
              </div>

              {/* TOTP Status */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-300 font-medium">TOTP 2FA Rolling</span>
                </div>
                <span className="text-amber-400 font-mono font-semibold">Active</span>
              </div>

              {/* Room Audit DB */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 font-medium">Room Cipher Storage</span>
                </div>
                <span className="text-cyan-400 font-mono font-semibold">AES-256</span>
              </div>

            </div>
          </div>

          <button
            onClick={() => onNavigateTab('biometric')}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 font-semibold text-xs border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
          >
            <Fingerprint className="w-4 h-4" />
            <span>{language === 'bn' ? 'বায়োমেট্রিক ও ২এফএ সেটিংস' : 'Manage Biometrics & 2FA Keys'}</span>
          </button>
        </div>

      </div>

      {/* Network Live Corridor Quick Ticker */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              {t.corridorTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.corridorSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              {activeNodes}/64 {language === 'bn' ? 'নোড অনলাইন' : 'Nodes Live'}
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400">
              {avgLatency}ms Avg Latency
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-400">
              {totalTps.toLocaleString()} TPS
            </span>
          </div>
        </div>

        {/* Top District Nodes Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {districtNodes.slice(0, 8).map((node) => (
            <div 
              key={node.id} 
              onClick={() => onNavigateTab('corridor')}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-200">
                  {language === 'bn' ? node.nameBn : node.nameEn}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>{node.latencyMs}ms</span>
                <span className="text-emerald-400">{node.tps} TPS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Cryptographic Transactions Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-emerald-400" />
              {t.recentTransactions}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'bn' ? 'Groth16 জেডকে-স্নার্কস সিকিউরড বিডিটি লেজার' : 'Groth16 ZK-SNARKs Cryptographic Audit Log'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Download transaction history as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCsv}</span>
            </button>

            <button
              onClick={() => onNavigateTab('vault')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>{language === 'bn' ? 'সকল অডিট লগ দেখুন' : 'View Full ZK Vault'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">District Route</th>
                <th className="py-3 px-4">Amount (BDT)</th>
                <th className="py-3 px-4">Groth16 ZK Hash</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">
                    {tx.id}
                  </td>
                  <td className="py-3 px-4">
                    {tx.isShielded ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold text-[10px]">
                        <Shield className="w-3 h-3" />
                        SHIELDED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                        PUBLIC
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {tx.districtFrom} → {tx.districtTo}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-100">
                    {tx.isShielded && hideBalance ? "৳ ••••••" : `৳ ${tx.amount.toLocaleString('en-IN')}`}
                  </td>
                  <td className="py-3 px-4 text-slate-400 truncate max-w-[140px]" title={tx.zkpHash}>
                    {tx.zkpHash.substring(0, 16)}...
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {tx.timestamp}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
