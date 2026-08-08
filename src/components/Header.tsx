import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Activity, 
  Lock, 
  LayoutDashboard, 
  MapPin, 
  KeyRound, 
  BarChart3, 
  Terminal, 
  Code2, 
  Bot,
  Fingerprint
} from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  user: UserProfile;
  hideBalance: boolean;
  setHideBalance: React.Dispatch<React.SetStateAction<boolean>>;
  activeNodesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  user,
  hideBalance,
  setHideBalance,
  activeNodesCount
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.cryptoId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'corridor', label: t.navCorridor, icon: MapPin },
    { id: 'vault', label: t.navVault, icon: Lock },
    { id: 'biometric', label: t.navBiometric, icon: Fingerprint },
    { id: 'analytics', label: t.navAnalytics, icon: BarChart3 },
    { id: 'cli', label: t.navCli, icon: Terminal },
    { id: 'sandbox', label: t.navSandbox, icon: Code2 },
    { id: 'advisor', label: t.navAdvisor, icon: Bot },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 text-slate-100 shadow-xl">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ZKP-BD-v2.6
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* User Crypto Identity & Quick Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live Node Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{activeNodesCount}/64 {t.nodeStatusOnline}</span>
            </div>

            {/* Crypto ID Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
              <KeyRound className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-none">{user.cryptoId}</span>
              <button 
                onClick={handleCopyId}
                title={t.copyCryptoId}
                className="p-1 hover:bg-emerald-800/40 rounded transition-colors text-emerald-400"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Privacy Shield Toggle Button */}
            <button
              onClick={() => setHideBalance(!hideBalance)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="Toggle Balance Stealth Mode"
            >
              {hideBalance ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Shielded</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Visible</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  language === 'bn'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                বাংলা
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="border-t border-slate-800 bg-slate-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
