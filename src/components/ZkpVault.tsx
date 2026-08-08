import React, { useState } from 'react';
import Papa from 'papaparse';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Key, 
  FileCode2, 
  RefreshCw, 
  Shield, 
  Sparkles, 
  Check, 
  Copy,
  Database,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import { Language, ZkpProof, ZkpProofType, AuditLog } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ZkpVaultProps {
  language: Language;
}

export const ZkpVault: React.FC<ZkpVaultProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedScenario, setSelectedScenario] = useState<ZkpProofType>('BALANCE_THRESHOLD');
  const [proverEngine, setProverEngine] = useState<'Groth16 ZK-SNARK' | 'Bulletproofs'>('Groth16 ZK-SNARK');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [currentProof, setCurrentProof] = useState<ZkpProof | null>({
    id: 'zkp-proof-9842',
    type: 'BALANCE_THRESHOLD',
    titleEn: 'Account Balance > ৳50,000 Zero-Knowledge Proof',
    titleBn: 'ব্যালেন্স > ৳৫০,০০০ জিরো-নলেজ প্রুফ',
    proofHash: '0x8f1e94a20b7218cf5d9a0413e61819fa281c742d',
    witnessHash: '0x3c990a12e8b70a5d214c771890ef14',
    commitment: '0x7a89b0d1e2f3c4a5b6',
    isVerified: true,
    timestamp: 'Just now',
    publicInputs: { thresholdBDT: 50000, isGreater: true, currency: 'BDT' },
    proofTimeMs: 1.4,
    proverEngine: 'Groth16 ZK-SNARK'
  });

  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedProof, setCopiedProof] = useState(false);

  // Mock Room Encrypted Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'AUD-9912',
      timestamp: '2026-08-08 09:32:10',
      action: 'ZKP_BALANCE_THRESHOLD_GEN',
      user: 'RB-BD-8812-4910-ZKP',
      encryptedHash: 'f4e2b819a00714c3e8912d09121f6a5b4c3d2e1a',
      status: 'TAMPER_PROOF',
      aesCipherSample: 'U2FsdGVkX19xN819zK...== [AES-256-GCM]'
    },
    {
      id: 'AUD-9911',
      timestamp: '2026-08-08 09:14:02',
      action: 'SHIELDED_TRANSFER_EXECUTE',
      user: 'RB-BD-8812-4910-ZKP',
      encryptedHash: '09a8b7c6d5e4f3a2b10987654321fedcba987654',
      status: 'VERIFIED',
      aesCipherSample: 'U2FsdGVkX1+x98AaP1...== [AES-256-GCM]'
    },
    {
      id: 'AUD-9910',
      timestamp: '2026-08-08 08:45:18',
      action: 'TOTP_2FA_CHALLENGE_SUCCESS',
      user: 'RB-BD-8812-4910-ZKP',
      encryptedHash: 'a1b2c3d4e5f60718293a4b5c6d7e8f9012345678',
      status: 'ENCRYPTED',
      aesCipherSample: 'U2FsdGVkX19P0a811L...== [AES-256-GCM]'
    }
  ]);

  const handleGenerateProof = () => {
    setIsGenerating(true);
    setGenStep(1);

    setTimeout(() => setGenStep(2), 400);
    setTimeout(() => setGenStep(3), 800);
    setTimeout(() => {
      setGenStep(4);
      const randomHex = () => Math.random().toString(16).substring(2, 10);
      const newHash = `0x${randomHex()}${randomHex()}${randomHex()}${randomHex()}`;
      const newWitness = `0x${randomHex()}${randomHex()}`;
      const newCommitment = `0x${randomHex()}${randomHex()}`;

      let titleEn = 'Zero-Knowledge Proof';
      let titleBn = 'জিরো-নলেজ প্রুফ';
      let inputs = {};

      if (selectedScenario === 'BALANCE_THRESHOLD') {
        titleEn = 'Account Balance > ৳50,000 Zero-Knowledge Proof';
        titleBn = 'অ্যাকাউন্ট ব্যালেন্স > ৳৫০,০০০ জিরো-নলেজ প্রুফ';
        inputs = { thresholdBDT: 50000, result: 'SATISFIED', currency: 'BDT' };
      } else if (selectedScenario === 'KYC_ELIGIBILITY') {
        titleEn = 'National ID & Age Eligibility ZK Proof';
        titleBn = 'এনআইডি এবং বয়স যাচাইকরণ জিরো-নলেজ প্রুফ';
        inputs = { ageOver18: true, kycVerified: true, country: 'BD' };
      } else if (selectedScenario === 'SHIELDED_TRANSFER') {
        titleEn = 'Shielded BDT Transfer Validity Proof';
        titleBn = 'এনক্রিপ্টেড বিডিটি স্থানান্তরের বৈধতা প্রুফ';
        inputs = { senderShielded: true, balanceSufficient: true, nonce: 9021 };
      } else {
        titleEn = 'Credit Solvency Score > 750 Proof';
        titleBn = 'ক্রেডিট সচ্ছলতা স্কোর > ৭৫০ প্রুফ';
        inputs = { solvencyRatio: '0.84', scoreBucket: 'TIER_1' };
      }

      setCurrentProof({
        id: `zkp-proof-${Math.floor(Math.random() * 9000 + 1000)}`,
        type: selectedScenario,
        titleEn,
        titleBn,
        proofHash: newHash,
        witnessHash: newWitness,
        commitment: newCommitment,
        isVerified: true,
        timestamp: 'Just now',
        publicInputs: inputs,
        proofTimeMs: parseFloat((Math.random() * 0.8 + 0.8).toFixed(2)),
        proverEngine
      });

      // Append new entry to audit log
      const newAudit: AuditLog = {
        id: `AUD-${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        action: `ZKP_${selectedScenario}_GEN`,
        user: 'RB-BD-8812-4910-ZKP',
        encryptedHash: newHash.substring(0, 32),
        status: 'TAMPER_PROOF',
        aesCipherSample: `U2FsdGVkX1${newHash.substring(2, 10)}...== [AES-256-GCM]`
      };
      setAuditLogs((prev) => [newAudit, ...prev]);

      setIsGenerating(false);
      setGenStep(0);
    }, 1300);
  };

  const copyText = (text: string, type: 'hash' | 'proof') => {
    navigator.clipboard.writeText(text);
    if (type === 'hash') {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedProof(true);
      setTimeout(() => setCopiedProof(false), 2000);
    }
  };

  const handleExportAuditCSV = () => {
    const dataToExport = auditLogs.map((log) => ({
      'Log ID': log.id,
      'Timestamp': log.timestamp,
      'Action': log.action,
      'User ID': log.user,
      'SHA-256 Tamper Hash': log.encryptedHash,
      'AES-256 Cipher Sample': log.aesCipherSample,
      'Status': log.status
    }));

    const csvString = Papa.unparse(dataToExport);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RubelBank_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Vault Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {t.zkpVaultTitle}
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {t.zkpVaultSubtitle}
          </p>
        </div>

        {/* Engine Toggle Pills */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setProverEngine('Groth16 ZK-SNARK')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              proverEngine === 'Groth16 ZK-SNARK'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Groth16 ZK-SNARK
          </button>
          <button
            onClick={() => setProverEngine('Bulletproofs')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              proverEngine === 'Bulletproofs'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bulletproofs
          </button>
        </div>
      </div>

      {/* Main Interactive ZKP Prover Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Proof Generator Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              {language === 'bn' ? 'জেডকে প্রুফ জেনারেটর কনসোল' : 'Groth16 Cryptographic Prover'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'bn' ? 'প্রুফ ধরণ নির্বাচন করে এনক্রিপ্টেড উইটনেস তৈরি করুন' : 'Select a proof scenario to construct a zero-knowledge circuit.'}
            </p>
          </div>

          {/* Scenario Options */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">
              {t.selectProofType}:
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              
              <button
                type="button"
                onClick={() => setSelectedScenario('BALANCE_THRESHOLD')}
                className={`p-3 rounded-xl text-left text-xs transition-all border ${
                  selectedScenario === 'BALANCE_THRESHOLD'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{t.proofBalanceThreshold}</div>
                <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                  Proves account holds over 50,000 BDT without showing actual total balance.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedScenario('KYC_ELIGIBILITY')}
                className={`p-3 rounded-xl text-left text-xs transition-all border ${
                  selectedScenario === 'KYC_ELIGIBILITY'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{t.proofKycEligibility}</div>
                <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                  Proves age & Bangladeshi citizenship compliance without revealing NID digits.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedScenario('SHIELDED_TRANSFER')}
                className={`p-3 rounded-xl text-left text-xs transition-all border ${
                  selectedScenario === 'SHIELDED_TRANSFER'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Shielded BDT Transfer Validity</div>
                <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                  Proves transfer liquidity & nonce integrity without exposing sender/recipient address.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedScenario('CREDIT_SCORE')}
                className={`p-3 rounded-xl text-left text-xs transition-all border ${
                  selectedScenario === 'CREDIT_SCORE'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{t.proofCreditScore}</div>
                <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                  Proves credit solvency tier without revealing income or debt statements.
                </div>
              </button>

            </div>
          </div>

          {/* Pipeline Step Animation Box during generation */}
          {isGenerating && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                  Generating {proverEngine} Circuit...
                </span>
                <span>Step {genStep}/4</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className={genStep >= 1 ? "text-emerald-300 font-semibold" : "text-slate-600"}>
                  [1] Constructing Private Witness Vector & Constraint System...
                </div>
                <div className={genStep >= 2 ? "text-emerald-300 font-semibold" : "text-slate-600"}>
                  [2] Computing Rank-1 Constraint System (R1CS) Polynomials...
                </div>
                <div className={genStep >= 3 ? "text-emerald-300 font-semibold" : "text-slate-600"}>
                  [3] Evaluating Elliptic Curve BN-254 Pairings & Commitment...
                </div>
                <div className={genStep >= 4 ? "text-emerald-300 font-semibold" : "text-slate-600"}>
                  [4] Finalizing Proof Matrix (π_a, π_b, π_c)...
                </div>
              </div>
            </div>
          )}

          {/* Action Generate Button */}
          <button
            onClick={handleGenerateProof}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Computing ZK Proof...' : t.generateProof}</span>
          </button>
        </div>

        {/* Right Column: Generated Proof Display */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          {currentProof ? (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                  {currentProof.proverEngine} Proof Matrix
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {t.proofValid}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-100">
                  {language === 'bn' ? currentProof.titleBn : currentProof.titleEn}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Computed in {currentProof.proofTimeMs}ms • Timestamp: {currentProof.timestamp}
                </p>
              </div>

              {/* Cryptographic Hashes */}
              <div className="space-y-3 font-mono text-xs">
                
                {/* Proof Hash */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{t.proofHash} (π Matrix)</span>
                    <button 
                      onClick={() => copyText(currentProof.proofHash, 'proof')}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedProof ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedProof ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-emerald-300 font-bold truncate">
                    {currentProof.proofHash}
                  </div>
                </div>

                {/* Witness Commitment */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>{t.witnessHash}</span>
                    <button 
                      onClick={() => copyText(currentProof.witnessHash, 'hash')}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      {copiedHash ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-slate-200 font-bold truncate">
                    {currentProof.witnessHash}
                  </div>
                </div>

                {/* Public Inputs */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">Public Verifier Inputs:</div>
                  <pre className="text-[11px] text-teal-300 overflow-x-auto p-1 bg-slate-900/60 rounded border border-slate-800">
                    {JSON.stringify(currentProof.publicInputs, null, 2)}
                  </pre>
                </div>

              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Generate a ZK proof to inspect witness hashes and verifier public inputs.
            </div>
          )}

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {language === 'bn' 
                ? 'জিরো-নলেজ প্রুফ প্রযুক্তি ব্যবহার করে আপনার ব্যাংক একাউন্টের ব্যালেন্স ও এনআইডি নম্বর সবসময় সম্পূর্ণ গোপন থাকে।'
                : 'Zero-Knowledge proofs guarantee that your balance and personal ID remain 100% private during inter-node verification.'}
            </p>
          </div>
        </div>

      </div>

      {/* Room Encrypted Security Audit Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              {t.auditLogsTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.tamperProofHeader}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportAuditCSV}
              className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Download audit logs as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportCsv}</span>
            </button>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              ROOM AES-256 CIPHER ACTIVE
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Log ID</th>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Event Action</th>
                <th className="py-2.5 px-4">SHA-256 Tamper Hash</th>
                <th className="py-2.5 px-4">AES-256 Cipher Sample</th>
                <th className="py-2.5 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">{log.id}</td>
                  <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{log.action}</td>
                  <td className="py-3 px-4 text-slate-400 truncate max-w-[160px]">{log.encryptedHash}</td>
                  <td className="py-3 px-4 text-teal-300 truncate max-w-[180px]">{log.aesCipherSample}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      {log.status}
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
