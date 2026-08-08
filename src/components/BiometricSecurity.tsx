import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  KeyRound, 
  QrCode, 
  Copy, 
  Check, 
  Zap, 
  Smartphone, 
  ShieldAlert, 
  CheckCircle2, 
  RefreshCw,
  User,
  MapPin,
  Lock
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BiometricSecurityProps {
  user: UserProfile;
  language: Language;
  onTestBiometricPrompt: () => void;
}

export const BiometricSecurity: React.FC<BiometricSecurityProps> = ({
  user,
  language,
  onTestBiometricPrompt
}) => {
  const t = TRANSLATIONS[language];
  const [copiedId, setCopiedId] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(user.biometricEnabled);

  // TOTP 30-second rolling timer logic
  const [totpCode, setTotpCode] = useState('842 910');
  const [totpSecondsLeft, setTotpSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotpSecondsLeft((prev) => {
        if (prev <= 1) {
          // Generate new 6-digit TOTP
          const rand = Math.floor(100000 + Math.random() * 900000).toString();
          setTotpCode(`${rand.substring(0, 3)} ${rand.substring(3)}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const copyId = () => {
    navigator.clipboard.writeText(user.cryptoId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copySecret = () => {
    navigator.clipboard.writeText(user.totpSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Fingerprint className="w-5 h-5 stroke-[2.5]" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {t.biometricTitle}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.biometricSubtitle}
          </p>
        </div>

        <button
          onClick={onTestBiometricPrompt}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Fingerprint className="w-4 h-4" />
          <span>{t.verifyBiometric}</span>
        </button>
      </div>

      {/* Grid: Profile Card & TOTP Authenticator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RubelBank Digital Identity Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-extrabold shadow-md">
                RB
              </div>
              <div>
                <h3 className="font-extrabold text-slate-100 text-base">RubelBank FinTech</h3>
                <p className="text-[11px] text-emerald-400 font-mono">ZKP-BD-CRYPTO-CARD</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
              PASSPORT APPROVED
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">Account Holder</span>
              <span className="text-slate-100 font-bold text-sm">
                {language === 'bn' ? user.banglaName : user.name}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400">{t.cryptoIdLabel}</span>
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <span>{user.cryptoId}</span>
                <button 
                  onClick={copyId}
                  className="p-1 hover:bg-slate-800 rounded text-emerald-400"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">Home District</span>
                <div className="text-slate-200 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {user.district}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400">Division Corridor</span>
                <div className="text-emerald-400 font-bold uppercase">
                  {user.division}
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              AES-256 Room Storage Encrypted
            </span>
            <span className="font-mono text-[11px] text-slate-500">ID: #9028-BD</span>
          </div>
        </div>

        {/* TOTP 2FA Authenticator Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                {t.totpTitle}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
                HMAC-SHA1
              </span>
            </div>

            <p className="text-xs text-slate-400">
              {t.totpSubtitle} — Enter this code in external authenticators (Google Authenticator / Authy).
            </p>

            {/* TOTP Code Display */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/30 text-center space-y-3 relative overflow-hidden">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Rolling TOTP Token
              </div>
              <div className="text-4xl font-extrabold font-mono text-amber-400 tracking-wider">
                {totpCode}
              </div>

              {/* Progress Bar Timer */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(totpSecondsLeft / 30) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 pt-1">
                <span>Refreshes in {totpSecondsLeft}s</span>
                <span className="text-amber-400 font-semibold">Live 2FA active</span>
              </div>
            </div>

            {/* Secret Key Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <div className="text-[10px] text-slate-400">Secret Base32 Token:</div>
                <div className="text-slate-200 font-bold">{user.totpSecret}</div>
              </div>
              <button
                onClick={copySecret}
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSecret ? 'Copied' : 'Copy Key'}</span>
              </button>
            </div>

          </div>

          {/* Biometric Toggle Switch */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-slate-200">{t.biometricPromptTitle}</div>
                <div className="text-[11px] text-slate-400">Require fingerprint on BDT transfers & ZKP export</div>
              </div>
            </div>

            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${
                biometricEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  biometricEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
