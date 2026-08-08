import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DistrictNodeCorridor } from './components/DistrictNodeCorridor';
import { ZkpVault } from './components/ZkpVault';
import { BiometricSecurity } from './components/BiometricSecurity';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CLITerminal } from './components/CLITerminal';
import { ApiSandbox } from './components/ApiSandbox';
import { AiAdvisor } from './components/AiAdvisor';
import { TransferModal } from './components/TransferModal';
import { BiometricModal } from './components/BiometricModal';
import { Language, UserProfile, Transaction, DistrictNode } from './types';
import { BANGLADESH_DISTRICTS } from './data/districtsData';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
  const [biometricActionCallback, setBiometricActionCallback] = useState<(() => void) | null>(null);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    id: 'usr-9021-bd',
    name: 'Sheikh Farid',
    banglaName: 'শেখ ফরিদ',
    email: 'sheikhfaridbangladash@gmail.com',
    phone: '+880 1712-345678',
    cryptoId: 'RB-BD-8812-4910-ZKP',
    accountBalance: 485000,
    shieldedBalance: 1250000,
    division: 'dhaka',
    district: 'Dhaka',
    biometricEnabled: true,
    totpEnabled: true,
    totpSecret: 'RBBD-ZKP2-2026-X991'
  });

  // District Nodes
  const [districtNodes, setDistrictNodes] = useState<DistrictNode[]>(BANGLADESH_DISTRICTS);

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TX-BD-99120',
      amount: 45000,
      recipient: 'Kazi Nazrul (RB-BD-1029-ZKP)',
      sender: 'Sheikh Farid',
      isShielded: true,
      zkpHash: '0x8f1e94a20b7218cf5d9a0413e61819fa281c742d',
      timestamp: 'Today, 09:14 AM',
      status: 'completed',
      districtFrom: 'Dhaka',
      districtTo: 'Chattogram'
    },
    {
      id: 'TX-BD-98412',
      amount: 120000,
      recipient: 'RubelBank Liquidity Pool',
      sender: 'Sheikh Farid',
      isShielded: true,
      zkpHash: '0x3c990a12e8b70a5d214c771890ef1409a82f110c',
      timestamp: 'Yesterday, 04:30 PM',
      status: 'completed',
      districtFrom: 'Dhaka',
      districtTo: 'Sylhet'
    },
    {
      id: 'TX-BD-97201',
      amount: 25000,
      recipient: 'Anisur Rahman',
      sender: 'Sheikh Farid',
      isShielded: false,
      zkpHash: '0x7a89b0d1e2f3c4a5b678901234567890abcdef12',
      timestamp: '07 Aug 2026, 02:15 PM',
      status: 'completed',
      districtFrom: 'Dhaka',
      districtTo: 'Rajshahi'
    }
  ]);

  // Execute BDT Transfer
  const handleExecuteTransfer = (
    amountBDT: number, 
    recipientName: string, 
    districtTo: string, 
    isShielded: boolean
  ) => {
    const targetNode = districtNodes.find(n => n.id === districtTo) || districtNodes[0];
    const newTx: Transaction = {
      id: `TX-BD-${Math.floor(Math.random() * 90000 + 10000)}`,
      amount: amountBDT,
      recipient: recipientName,
      sender: user.name,
      isShielded,
      zkpHash: `0x${Math.random().toString(16).substring(2, 14)}${Math.random().toString(16).substring(2, 14)}`,
      timestamp: 'Just now',
      status: 'completed',
      districtFrom: user.district,
      districtTo: targetNode.nameEn
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Update balances
    if (isShielded) {
      setUser((prev) => ({
        ...prev,
        shieldedBalance: Math.max(0, prev.shieldedBalance - amountBDT)
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        accountBalance: Math.max(0, prev.accountBalance - amountBDT)
      }));
    }
  };

  const handleRequestBiometric = (callback: () => void) => {
    setBiometricActionCallback(() => callback);
    setIsBiometricModalOpen(true);
  };

  const handleBiometricSuccess = () => {
    setIsBiometricModalOpen(false);
    if (biometricActionCallback) {
      biometricActionCallback();
      setBiometricActionCallback(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        user={user}
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
        activeNodesCount={districtNodes.filter(n => n.status === 'active').length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentTab === 'dashboard' && (
          <Dashboard
            user={user}
            hideBalance={hideBalance}
            language={language}
            onOpenTransferModal={() => setIsTransferModalOpen(true)}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            transactions={transactions}
            districtNodes={districtNodes}
          />
        )}

        {currentTab === 'corridor' && (
          <DistrictNodeCorridor
            districtNodes={districtNodes}
            language={language}
          />
        )}

        {currentTab === 'vault' && (
          <ZkpVault
            language={language}
          />
        )}

        {currentTab === 'biometric' && (
          <BiometricSecurity
            user={user}
            language={language}
            onTestBiometricPrompt={() => {
              handleRequestBiometric(() => {
                // Success feedback
              });
            }}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsDashboard
            districtNodes={districtNodes}
            language={language}
          />
        )}

        {currentTab === 'cli' && (
          <CLITerminal
            districtNodes={districtNodes}
            user={user}
            language={language}
          />
        )}

        {currentTab === 'sandbox' && (
          <ApiSandbox
            language={language}
          />
        )}

        {currentTab === 'advisor' && (
          <AiAdvisor
            language={language}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500 text-center font-mono space-y-2">
        <p>
          © 2026 RubelBank (রুবেল ব্যাংক) FinTech Ecosystem • 64-District Node Network Bangladesh
        </p>
        <p className="text-[11px] text-slate-600">
          Groth16 ZK-SNARKs & Bulletproofs Prover Engine • Room Encrypted AES-256 Audit Vault • TOTP 2FA Security
        </p>
      </footer>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        language={language}
        districtNodes={districtNodes}
        onExecuteTransfer={handleExecuteTransfer}
        onRequestBiometricConfirmation={handleRequestBiometric}
        biometricEnabled={user.biometricEnabled}
      />

      {/* Biometric Prompt Modal */}
      <BiometricModal
        isOpen={isBiometricModalOpen}
        onClose={() => setIsBiometricModalOpen(false)}
        onSuccess={handleBiometricSuccess}
        actionTitle={language === 'bn' ? 'লেনদেন নিশ্চিতকরণ বায়োমেট্রিক আনলক' : 'Biometric BDT Transfer Authorization'}
      />

    </div>
  );
}
