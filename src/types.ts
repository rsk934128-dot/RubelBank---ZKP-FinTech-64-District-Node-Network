export type Language = 'en' | 'bn';

export type DivisionId = 
  | 'dhaka' 
  | 'chattogram' 
  | 'sylhet' 
  | 'rajshahi' 
  | 'khulna' 
  | 'barishal' 
  | 'rangpur' 
  | 'mymensingh';

export interface DivisionInfo {
  id: DivisionId;
  nameEn: string;
  nameBn: string;
  color: string;
  center: { x: number; y: number };
}

export type NodeStatus = 'active' | 'syncing' | 'standby' | 'congested';

export interface DistrictNode {
  id: string; // e.g., 'dhaka', 'gazipur'
  nameEn: string;
  nameBn: string;
  division: DivisionId;
  lat: number;
  lng: number;
  // Relative map coordinates projected for clean Bangladesh SVG rendering
  mapX: number;
  mapY: number;
  latencyMs: number;
  tps: number;
  status: NodeStatus;
  ipAddress: string;
  activeValidators: number;
  totalShieldedVolumeBDT: number;
}

export type ZkpProofType = 
  | 'BALANCE_THRESHOLD' 
  | 'SHIELDED_TRANSFER' 
  | 'KYC_ELIGIBILITY' 
  | 'CREDIT_SCORE';

export interface ZkpProof {
  id: string;
  type: ZkpProofType;
  titleEn: string;
  titleBn: string;
  proofHash: string;
  witnessHash: string;
  commitment: string;
  isVerified: boolean;
  timestamp: string;
  publicInputs: Record<string, any>;
  proofTimeMs: number;
  proverEngine: 'Groth16 ZK-SNARK' | 'Bulletproofs' | 'Plonk';
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: string;
  sender: string;
  isShielded: boolean;
  zkpHash: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  districtFrom: string;
  districtTo: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  encryptedHash: string;
  status: 'VERIFIED' | 'TAMPER_PROOF' | 'ENCRYPTED';
  aesCipherSample: string;
}

export interface UserProfile {
  id: string;
  name: string;
  banglaName: string;
  email: string;
  phone: string;
  cryptoId: string; // RB-BD-XXXX-XXXX-ZKP
  accountBalance: number;
  shieldedBalance: number;
  division: DivisionId;
  district: string;
  biometricEnabled: boolean;
  totpEnabled: boolean;
  totpSecret: string;
}

export interface NetworkStats {
  totalNodes: number;
  activeNodes: number;
  avgLatencyMs: number;
  totalTps: number;
  shieldedRatioPercent: number;
  totalVolume24hBDT: number;
}

export interface NetworkPacketAnimation {
  id: string;
  fromNode: DistrictNode;
  toNode: DistrictNode;
  progress: number;
  amountBDT: number;
  isShielded: boolean;
}
