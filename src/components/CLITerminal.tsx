import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Trash2, CornerDownLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { DistrictNode, Language, UserProfile } from '../types';

interface CLITerminalProps {
  districtNodes: DistrictNode[];
  user: UserProfile;
  language: Language;
}

interface LogLine {
  id: string;
  type: 'cmd' | 'output' | 'error' | 'system';
  text: string;
  time: string;
}

export const CLITerminal: React.FC<CLITerminalProps> = ({
  districtNodes,
  user,
  language
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: 'log-1',
      type: 'system',
      text: 'RubelBank ZKP System Console v2.6.0 [64-District Node Network]',
      time: '09:35:00'
    },
    {
      id: 'log-2',
      type: 'system',
      text: 'Connected to node corridor via AES-256 Room Cipher. Type "help" for command listing.',
      time: '09:35:01'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const timeStr = new Date().toTimeString().split(' ')[0];
    const newLogs: LogLine[] = [
      ...logs,
      { id: `cmd-${Date.now()}`, type: 'cmd', text: `> ${cmd}`, time: timeStr }
    ];

    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];

    if (main === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    }

    if (main === 'help') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `Available RubelBank CLI Commands:
  rubelbank status           - Show 64-district node corridor status & active validators
  zkp prove [--amount BDT]   - Generate Groth16 ZK-SNARK proof matrix
  node list                  - List all 64 district node IDs and latency
  node ping <district>       - Ping specific district node (e.g., node ping dhaka)
  node sync <district>       - Re-synchronize district validator node
  audit verify               - Check Room AES-256 encrypted database integrity
  whoami                     - Print current cryptographic profile ID
  clear                      - Clear CLI terminal screen`,
        time: timeStr
      });
    } else if (cmd.startsWith('rubelbank status')) {
      const activeCount = districtNodes.filter(n => n.status === 'active').length;
      const totalTps = districtNodes.reduce((acc, curr) => acc + curr.tps, 0);
      const avgLat = Math.round(districtNodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / districtNodes.length);

      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `[SYSTEM STATUS OK]
  Active District Nodes: ${activeCount}/64
  Total Network TPS: ${totalTps} TPS
  Avg Corridor Latency: ${avgLat} ms
  Prover Engine: Groth16 ZK-SNARKs & Bulletproofs
  Cipher Suite: AES-256-GCM + SHA-256 Tamper Proofing`,
        time: timeStr
      });
    } else if (cmd.startsWith('zkp prove')) {
      const proofHash = `0x${Math.random().toString(16).substring(2, 14)}${Math.random().toString(16).substring(2, 14)}`;
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `[ZKP PROVER ENGINE]
  Scenario: Account Balance Threshold (> 50,000 BDT)
  Constructing Witness Vector... [OK]
  R1CS Polynomial Evaluation... [OK]
  BN-254 Pairings Computed in 1.28ms.
  Proof Hash (π): ${proofHash}
  Verification Result: VALID_PROOF`,
        time: timeStr
      });
    } else if (cmd.startsWith('node list')) {
      const listText = districtNodes.slice(0, 10).map(n => `  #${n.id.padEnd(16)} | ${n.nameEn.padEnd(14)} | ${n.latencyMs}ms | ${n.tps} TPS`).join('\n');
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `District Nodes Sample (Showing 10 of 64):\n${listText}\n  ... use 'node ping <district>' for full diagnostic.`,
        time: timeStr
      });
    } else if (cmd.startsWith('node ping')) {
      const target = parts[2];
      const node = districtNodes.find(n => n.id === target || n.nameEn.toLowerCase() === target);
      if (node) {
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `Pinging node #${node.id} (${node.nameEn}, ${node.ipAddress})...
  64 bytes from ${node.ipAddress}: icmp_seq=1 ttl=64 time=${node.latencyMs} ms
  64 bytes from ${node.ipAddress}: icmp_seq=2 ttl=64 time=${node.latencyMs - 1} ms
  --- ${node.nameEn} node ping statistics ---
  2 packets transmitted, 2 received, 0% packet loss, time 1002ms`,
          time: timeStr
        });
      } else {
        newLogs.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: `Error: District node "${target || ''}" not found. Try 'node ping dhaka' or 'node ping sylhet'.`,
          time: timeStr
        });
      }
    } else if (cmd.startsWith('audit verify')) {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `[ROOM AUDIT INTEGRITY CHECK]
  Scanning AES-256 cipher blocks... [100%]
  Evaluating SHA-256 tamper-evident merkle roots... [OK]
  Status: 0 Corrupted Entries. All 1,420 Audit Logs Verified.`,
        time: timeStr
      });
    } else if (cmd === 'whoami') {
      newLogs.push({
        id: `out-${Date.now()}`,
        type: 'output',
        text: `Active Session Identity:
  Name: ${user.name} (${user.banglaName})
  Crypto ID: ${user.cryptoId}
  Origin District: ${user.district}, ${user.division.toUpperCase()}
  Shielded Balance: ৳ ${user.shieldedBalance.toLocaleString()}`,
        time: timeStr
      });
    } else {
      newLogs.push({
        id: `err-${Date.now()}`,
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`,
        time: timeStr
      });
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-extrabold text-slate-100">
            {language === 'bn' ? 'রুবেল ব্যাংক সিএলআই কনসোল' : 'RubelBank System Terminal CLI'}
          </h2>
        </div>

        <button
          onClick={() => setLogs([])}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center gap-1 transition-colors"
          title="Clear screen"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs h-[420px] overflow-y-auto space-y-2 custom-scrollbar select-text">
        {logs.map((log) => (
          <div key={log.id} className="leading-relaxed">
            <span className="text-slate-600 mr-2 text-[10px]">[{log.time}]</span>
            {log.type === 'cmd' && (
              <span className="text-emerald-400 font-bold">{log.text}</span>
            )}
            {log.type === 'output' && (
              <pre className="text-slate-300 whitespace-pre-wrap pl-4 border-l-2 border-emerald-500/30 my-1">
                {log.text}
              </pre>
            )}
            {log.type === 'error' && (
              <div className="text-rose-400 font-semibold pl-4 border-l-2 border-rose-500/30">
                {log.text}
              </div>
            )}
            {log.type === 'system' && (
              <div className="text-cyan-400 font-semibold">
                {log.text}
              </div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleCommand} className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 font-mono font-bold text-xs">
            &gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={language === 'bn' ? 'কমান্ড লিখুন (যেমন: help, rubelbank status)...' : 'Type command (e.g., help, rubelbank status, zkp prove)...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-slate-100 font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
