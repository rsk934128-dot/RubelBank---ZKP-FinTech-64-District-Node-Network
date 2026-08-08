import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    appName: "RubelBank",
    tagline: "64-District Node Network & ZKP FinTech",
    navDashboard: "Dashboard",
    navCorridor: "64-District Corridor",
    navVault: "ZKP Vault & Audit",
    navBiometric: "Biometric & 2FA",
    navAnalytics: "Live Analytics",
    navCli: "CLI Terminal",
    navSandbox: "API Sandbox",
    navAdvisor: "AI Advisor",
    nodeStatusOnline: "Node Network Active",
    shieldedBalance: "Shielded Balance",
    publicBalance: "Public BDT Balance",
    copyCryptoId: "Copy Crypto ID",

    // Dashboard
    welcomeBack: "Welcome back, Sheikh Farid",
    cryptoIdLabel: "Cryptographic ID",
    quickTransfer: "Shielded BDT Transfer",
    transferModalTitle: "Send Shielded BDT",
    recipientDistrict: "Recipient District Node",
    amountBDT: "Amount in BDT (৳)",
    zkpProofNotice: "Groth16 ZK-SNARK proof will be attached to hide transaction amount from public view.",
    sendNow: "Execute ZK Transfer",
    recentTransactions: "Recent Cryptographic Transactions",
    exportCsv: "Export CSV",
    allShielded: "Shielded ZKP",
    statusCompleted: "Verified",

    // 64 District Node Corridor
    corridorTitle: "64-District Node Corridor",
    corridorSubtitle: "Real-time latency, TPS, and validator status across all 64 districts in Bangladesh.",
    filterDivision: "Division Filter",
    allDivisions: "All 64 Districts",
    totalNodes: "District Nodes",
    activeNodes: "Active Validators",
    avgLatency: "Avg Network Latency",
    totalTps: "Network Throughput",
    stressTest: "Trigger Simulated TPS Surge",
    nodeInspector: "Node Inspector",
    validatorCount: "Active Validators",
    shieldedVolume: "24h Shielded BDT Volume",
    pingNode: "Ping District Node",

    // ZKP Vault
    zkpVaultTitle: "Zero-Knowledge Proof Vault",
    zkpVaultSubtitle: "Generate cryptographic proofs using Groth16 and Bulletproofs without exposing raw balances.",
    generateProof: "Generate ZK Proof",
    selectProofType: "Proof Scenario",
    proofBalanceThreshold: "Account Balance > ৳50,000 Proof",
    proofKycEligibility: "KYC Compliance & Age Verification Proof",
    proofCreditScore: "Solvency & Creditworthiness Proof",
    witnessHash: "Witness Commitment Hash",
    proofHash: "SNARK Proof Matrix",
    verifyProof: "Cryptographically Verify",
    proofValid: "VALID PROOF (Verification Time: 1.2ms)",
    proofInvalid: "INVALID PROOF",
    auditLogsTitle: "Room Encrypted Security Audit Logs",
    tamperProofHeader: "AES-256 Encrypted & SHA-256 Tamper-Proof Trail",

    // Biometric & 2FA
    biometricTitle: "Biometric & 2FA Security",
    biometricSubtitle: "Manage device fingerprint, Face Unlock, and TOTP Authenticator keys.",
    totpTitle: "TOTP 2FA Authenticator",
    totpSubtitle: "30-Second Rolling Security Key",
    biometricPromptTitle: "Device Biometrics",
    enableBiometrics: "Enable Fingerprint / Face Unlock",
    biometricActive: "Biometric Hardware Key Bound",
    verifyBiometric: "Test Biometric Prompt",

    // CLI & API
    cliTitle: "RubelBank Interactive CLI Console",
    cliPlaceholder: "Enter command (e.g., rubelbank status, zkp prove, node sync dhaka, help)...",
    apiTitle: "FinTech API Sandbox",
    apiSubtitle: "Test REST endpoints and ZKP payloads in Node.js, Kotlin, or cURL.",

    // AI Advisor
    aiAdvisorTitle: "Gemini AI FinTech & ZKP Advisor",
    aiAdvisorSubtitle: "Get instant security insights, ZKP explanations, and financial recommendations.",
    askAi: "Ask Financial AI",
    aiThinking: "Analyzing Cryptographic Ledger..."
  },
  bn: {
    // Header & Nav
    appName: "রুবেল ব্যাংক",
    tagline: "৬৪-জেলা নোড নেটওয়ার্ক ও জিরো-নলেজ প্রুফ ফিনটেক",
    navDashboard: "ড্যাশবোর্ড",
    navCorridor: "৬৪-জেলা করিডোর",
    navVault: "জেডকেপি ভল্ট ও অডিট",
    navBiometric: "বায়োমেট্রিক ও ২এফএ",
    navAnalytics: "লাইভ অ্যানালিটিক্স",
    navCli: "সিএলআই টার্মিনাল",
    navSandbox: "এপিআই স্যান্ডবক্স",
    navAdvisor: "এআই উপদেষ্টা",
    nodeStatusOnline: "নোড নেটওয়ার্ক সচল",
    shieldedBalance: "গোপন ব্যালেন্স (Shielded)",
    publicBalance: "পাবলিক বিডিটি ব্যালেন্স",
    copyCryptoId: "ক্রিপ্টো আইডি কপি করুন",

    // Dashboard
    welcomeBack: "স্বাগতম, শেখ ফরিদ",
    cryptoIdLabel: "ক্রিপ্টোগ্রাফিক প্রফাইল আইডি",
    quickTransfer: "এনক্রিপ্টেড বিডিটি ট্রান্সফার",
    transferModalTitle: "গোপন বিডিটি প্রেরণ করুন",
    recipientDistrict: "প্রাপকের জেলা নোড",
    amountBDT: "পরিমাণ (৳)",
    zkpProofNotice: "Groth16 ZK-SNARK প্রুফ যুক্ত হবে যা পাবলিক লেজার থেকে টাকার পরিমাণ গোপন রাখবে।",
    sendNow: "জেডকে ট্রান্সফার সম্পন্ন করুন",
    recentTransactions: "সাম্প্রতিক ক্রিপ্টোগ্রাফিক লেনদেন",
    exportCsv: "সিএসভি এক্সপোর্ট",
    allShielded: "এনক্রিপ্টেড জেডকেপি",
    statusCompleted: "ভেরিফাইড",

    // 64 District Node Corridor
    corridorTitle: "৬৪-জেলা নোড করিডোর",
    corridorSubtitle: "বাংলাদেশের ৬৪টি জেলা নোডের রিয়েল-টাইম লেটেন্সি, টিপিএস ও ভ্যালিডেটর স্ট্যাটাস।",
    filterDivision: "বিভাগ ফিল্টার",
    allDivisions: "সকল ৬৪ জেলা",
    totalNodes: "মোট জেলা নোড",
    activeNodes: "সক্রিয় ভ্যালিডেটর",
    avgLatency: "গড় নেটওয়ার্ক লেটেন্সি",
    totalTps: "নেটওয়ার্ক থ্রুপুট",
    stressTest: "টিপিএস স্ট্রেস টেস্ট সিমুলেট করুন",
    nodeInspector: "নোড ইন্সপেক্টর",
    validatorCount: "সক্রিয় ভ্যালিডেটর সংখ্যা",
    shieldedVolume: "২৪ ঘণ্টার এনক্রিপ্টেড ভলিউম",
    pingNode: "জেলা নোড পিং করুন",

    // ZKP Vault
    zkpVaultTitle: "জিরো-নলেজ প্রুফ ভল্ট",
    zkpVaultSubtitle: "মূল অ্যাকাউন্ট ব্যালেন্স প্রকাশ না করেই Groth16 এবং Bulletproofs দিয়ে গাণিতিক প্রমাণ তৈরি করুন।",
    generateProof: "জেডকে প্রুফ জেনারেট করুন",
    selectProofType: "প্রুফ দৃশ্যপট নির্বাচন করুন",
    proofBalanceThreshold: "অ্যাকাউন্ট ব্যালেন্স > ৳৫০,০০০ এর প্রমাণ",
    proofKycEligibility: "কেওয়াইসি এবং বয়স যাচাইকরণ প্রমাণ",
    proofCreditScore: "ক্রেডিট স্কোর ও সচ্ছলতার প্রমাণ",
    witnessHash: "উইটনেস কমিটমেন্ট হ্যাশ",
    proofHash: "স্নার্ক প্রুফ ম্যাট্রিক্স",
    verifyProof: "ক্রিপ্টোগ্রাফিক ভেরিফিকেশন",
    proofValid: "সঠিক প্রুফ (ভেরিফিকেশন সময়: ১.২ মিলি-সেকেন্ড)",
    proofInvalid: "ত্রুটিপূর্ণ প্রুফ",
    auditLogsTitle: "রুম এনক্রিপ্টেড সিকিউরিটি অডিট লগ",
    tamperProofHeader: "AES-256 এনক্রিপ্টেড ও SHA-256 ট্যাম্পার-প্রুফ হিস্ট্রি",

    // Biometric & 2FA
    biometricTitle: "বায়োমেট্রিক ও ২এফএ নিরাপত্তা",
    biometricSubtitle: "ডিভাইস ফিঙ্গারপ্রিন্ট, ফেস আনলক এবং টিওটিপি অথেনটিকেটর কী পরিচালনা করুন।",
    totpTitle: "টিওটিপি ২এফএ অথেনটিকেটর",
    totpSubtitle: "৩০-সেকেন্ডের পরিবর্তনশীল সিকিউরিটি কোড",
    biometricPromptTitle: "ডিভাইস বায়োমেট্রিক",
    enableBiometrics: "ফিঙ্গারপ্রিন্ট / ফেস আনলক চালু করুন",
    biometricActive: "বায়োমেট্রিক সিকিউরিটি হার্ডওয়্যার যুক্ত করা হয়েছে",
    verifyBiometric: "বায়োমেট্রিক পরীক্ষা করুন",

    // CLI & API
    cliTitle: "রুবেল ব্যাংক ইন্টারেক্টিভ সিএলআই কনসোল",
    cliPlaceholder: "কমান্ড লিখুন (যেমন: rubelbank status, zkp prove, node sync dhaka, help)...",
    apiTitle: "ফিনটেক এপিআই স্যান্ডবক্স",
    apiSubtitle: "Node.js, Kotlin বা cURL কোড দিয়ে টেস্ট করুন।",

    // AI Advisor
    aiAdvisorTitle: "জেসিমিনাই এআই ফিনটেক ও জেডকেপি উপদেষ্টা",
    aiAdvisorSubtitle: "তাৎক্ষণিক নিরাপত্তা ইনসাইট ও পরামর্শ পান।",
    askAi: "এআই উপদেষ্টাকে প্রশ্ন করুন",
    aiThinking: "ক্রিপ্টোগ্রাফিক লেজার বিশ্লেষণ করা হচ্ছে..."
  }
};
