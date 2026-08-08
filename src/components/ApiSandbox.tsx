import React, { useState } from 'react';
import { Code2, Play, Check, Copy, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface ApiSandboxProps {
  language: Language;
}

export const ApiSandbox: React.FC<ApiSandboxProps> = ({ language }) => {
  const [codeLang, setCodeLang] = useState<'kotlin' | 'node' | 'curl'>('kotlin');
  const [amount, setAmount] = useState<number>(25000);
  const [recipient, setRecipient] = useState<string>('RB-BD-9012-4410-ZKP');
  const [district, setDistrict] = useState<string>('dhaka');
  const [isShielded, setIsShielded] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate code snippet dynamically based on inputs
  const getSnippet = () => {
    if (codeLang === 'kotlin') {
      return `// Kotlin Jetpack Compose / MVVM RubelBank SDK
val rubelClient = RubelBankClient.Builder()
    .setNodeCorridor("${district}")
    .setCipherSuite("AES-256-GCM")
    .build()

val zkpPayload = ShieldedTransferRequest(
    recipientCryptoId = "${recipient}",
    amountBDT = ${amount},
    isShielded = ${isShielded},
    proofEngine = "Groth16"
)

val response = rubelClient.executeZkpTransfer(zkpPayload)
println("ZKP Hash: \${response.zkpProofHash}")`;
    } else if (codeLang === 'node') {
      return `import { RubelBankClient } from '@rubelbank/zkp-sdk';

const client = new RubelBankClient({
  nodeCorridor: '${district}',
  apiKey: process.env.RUBEL_API_KEY
});

const result = await client.shieldedTransfer({
  recipient: '${recipient}',
  amountBDT: ${amount},
  isShielded: ${isShielded},
  proofEngine: 'Groth16'
});

console.log('ZKP Status:', result.status);`;
    } else {
      return `curl -X POST https://rubelbank.fintech.bd/api/v1/transfer \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer rb_live_zkp_9021" \\
  -d '{
    "nodeCorridor": "${district}",
    "recipient": "${recipient}",
    "amountBDT": ${amount},
    "isShielded": ${isShielded},
    "proofEngine": "Groth16"
  }'`;
    }
  };

  const handleTestApi = () => {
    setIsLoading(true);
    setApiResponse(null);

    setTimeout(() => {
      const mockResult = {
        status: 200,
        message: "Shielded BDT Transfer Proof Verified",
        transactionId: `TX-BD-${Math.floor(Math.random() * 90000 + 10000)}`,
        zkpHash: `0x${Math.random().toString(16).substring(2, 14)}${Math.random().toString(16).substring(2, 14)}`,
        witnessCommitment: `0x${Math.random().toString(16).substring(2, 10)}`,
        nodeRoute: `${district} -> recipient_node`,
        verificationTimeMs: 1.18,
        amountBDT: isShielded ? "[SHIELDED_BY_ZK_SNARK]" : amount,
        auditLogStatus: "AES-256_ROOM_ENCRYPTED_SAVED"
      };
      setApiResponse(JSON.stringify(mockResult, null, 2));
      setIsLoading(false);
    }, 500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              RubelBank Developer API Sandbox
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test interactive ZKP FinTech payloads in Kotlin 100%, Node.js, and cURL endpoints.
          </p>
        </div>

        {/* Language Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setCodeLang('kotlin')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              codeLang === 'kotlin' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kotlin Android
          </button>
          <button
            onClick={() => setCodeLang('node')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              codeLang === 'node' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Node.js TS
          </button>
          <button
            onClick={() => setCodeLang('curl')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              codeLang === 'curl' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            cURL REST
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
            Payload Parameters
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Target District Node</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="dhaka">Dhaka Node (#dhaka)</option>
                <option value="chattogram">Chattogram Node (#chattogram)</option>
                <option value="sylhet">Sylhet Node (#sylhet)</option>
                <option value="rajshahi">Rajshahi Node (#rajshahi)</option>
                <option value="khulna">Khulna Node (#khulna)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Recipient Crypto ID</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Amount (BDT ৳)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Groth16 Shielded Mode</span>
              <button
                onClick={() => setIsShielded(!isShielded)}
                className={`w-10 h-5 rounded-full transition-colors relative ${
                  isShielded ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div 
                  className={`w-3.5 h-3.5 rounded-full bg-slate-950 transition-transform ${
                    isShielded ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={handleTestApi}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isLoading ? 'Executing Request...' : 'Send Test API Request'}</span>
          </button>
        </div>

        {/* Snippet & Response Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Code Snippet Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Generated Code Snippet ({codeLang.toUpperCase()})
              </span>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono flex items-center gap-1"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
              {getSnippet()}
            </pre>
          </div>

          {/* Response Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                API Response Output
              </span>
              {apiResponse && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  200 OK
                </span>
              )}
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 min-h-[120px] overflow-x-auto">
              {apiResponse || '// Click "Send Test API Request" to view live JSON response payload.'}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
