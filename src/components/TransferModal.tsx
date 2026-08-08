import React, { useState } from 'react';
import { X, Send, ShieldCheck, MapPin, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DistrictNode, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  districtNodes: DistrictNode[];
  onExecuteTransfer: (amount: number, recipient: string, districtTo: string, isShielded: boolean) => void;
  onRequestBiometricConfirmation: (callback: () => void) => void;
  biometricEnabled: boolean;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  language,
  districtNodes,
  onExecuteTransfer,
  onRequestBiometricConfirmation,
  biometricEnabled
}) => {
  const t = TRANSLATIONS[language];
  const [recipient, setRecipient] = useState('');
  const [targetDistrict, setTargetDistrict] = useState('chattogram');
  const [amount, setAmount] = useState<number | ''>(15000);
  const [isShielded, setIsShielded] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickAmount = (val: number) => {
    setAmount(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setErrorMsg('Please enter a valid BDT transfer amount.');
      return;
    }
    if (!recipient.trim()) {
      setErrorMsg('Please enter recipient name or Crypto ID.');
      return;
    }

    setErrorMsg('');

    const doTransfer = () => {
      onExecuteTransfer(Number(amount), recipient, targetDistrict, isShielded);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onClose();
    };

    if (biometricEnabled) {
      onRequestBiometricConfirmation(doTransfer);
    } else {
      doTransfer();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100">{t.transferModalTitle}</h3>
              <p className="text-xs text-slate-400">Groth16 Shielded Inter-District Clearing</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
          
          {/* Recipient Input */}
          <div>
            <label className="text-slate-300 block mb-1.5 font-bold">
              Recipient Name / Crypto ID
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. RB-BD-9012-4410-ZKP or Sheikh Farid"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* District Route Selection */}
          <div>
            <label className="text-slate-300 block mb-1.5 font-bold">
              {t.recipientDistrict}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={targetDistrict}
                onChange={(e) => setTargetDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {districtNodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.nameEn} ({n.nameBn}) • {n.division.toUpperCase()} ({n.latencyMs}ms)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-slate-300 block mb-1.5 font-bold">
              {t.amountBDT}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="10000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-bold text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500"
            />

            {/* Quick Presets */}
            <div className="flex gap-2 mt-2">
              {[5000, 10000, 25000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleQuickAmount(val)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors"
                >
                  ৳ {val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Shielded Checkbox */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-start gap-3">
            <input
              type="checkbox"
              id="shieldedCheck"
              checked={isShielded}
              onChange={(e) => setIsShielded(e.target.checked)}
              className="mt-0.5 accent-emerald-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="shieldedCheck" className="text-slate-300 text-[11px] leading-relaxed cursor-pointer select-none">
              <span className="font-bold text-emerald-400 block">Attach Groth16 ZK-SNARK Proof</span>
              {t.zkpProofNotice}
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.sendNow}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
