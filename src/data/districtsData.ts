import { DistrictNode, DivisionInfo } from '../types';

export const DIVISIONS: DivisionInfo[] = [
  { id: 'dhaka', nameEn: 'Dhaka', nameBn: 'ঢাকা', color: '#3B82F6', center: { x: 480, y: 380 } },
  { id: 'chattogram', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', color: '#10B981', center: { x: 620, y: 520 } },
  { id: 'sylhet', nameEn: 'Sylhet', nameBn: 'সিলেট', color: '#EC4899', center: { x: 640, y: 260 } },
  { id: 'rajshahi', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', color: '#F59E0B', center: { x: 260, y: 280 } },
  { id: 'khulna', nameEn: 'Khulna', nameBn: 'খুলনা', color: '#8B5CF6', center: { x: 310, y: 500 } },
  { id: 'barishal', nameEn: 'Barishal', nameBn: 'বরিশাল', color: '#06B6D4', center: { x: 440, y: 540 } },
  { id: 'rangpur', nameEn: 'Rangpur', nameBn: 'রংপুর', color: '#EF4444', center: { x: 280, y: 140 } },
  { id: 'mymensingh', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', color: '#14B8A6', center: { x: 470, y: 240 } },
];

export const BANGLADESH_DISTRICTS: DistrictNode[] = [
  // --- DHAKA DIVISION (13) ---
  {
    id: 'dhaka', nameEn: 'Dhaka', nameBn: 'ঢাকা', division: 'dhaka',
    lat: 23.8103, lng: 90.4125, mapX: 480, mapY: 380,
    latencyMs: 4, tps: 2840, status: 'active', ipAddress: '103.14.28.1',
    activeValidators: 64, totalShieldedVolumeBDT: 485000000
  },
  {
    id: 'gazipur', nameEn: 'Gazipur', nameBn: 'গাজীপুর', division: 'dhaka',
    lat: 23.9999, lng: 90.4203, mapX: 478, mapY: 345,
    latencyMs: 6, tps: 1420, status: 'active', ipAddress: '103.14.29.12',
    activeValidators: 32, totalShieldedVolumeBDT: 192000000
  },
  {
    id: 'narayanganj', nameEn: 'Narayanganj', nameBn: 'নারায়ণগঞ্জ', division: 'dhaka',
    lat: 23.6238, lng: 90.5000, mapX: 495, mapY: 405,
    latencyMs: 5, tps: 1850, status: 'active', ipAddress: '103.14.30.5',
    activeValidators: 28, totalShieldedVolumeBDT: 230000000
  },
  {
    id: 'tangail', nameEn: 'Tangail', nameBn: 'টাঙ্গাইল', division: 'dhaka',
    lat: 24.2513, lng: 89.9167, mapX: 430, mapY: 310,
    latencyMs: 9, tps: 890, status: 'active', ipAddress: '103.14.31.88',
    activeValidators: 18, totalShieldedVolumeBDT: 85000000
  },
  {
    id: 'faridpur', nameEn: 'Faridpur', nameBn: 'ফরিদপুর', division: 'dhaka',
    lat: 23.6071, lng: 89.8429, mapX: 415, mapY: 410,
    latencyMs: 12, tps: 640, status: 'active', ipAddress: '103.14.32.14',
    activeValidators: 14, totalShieldedVolumeBDT: 62000000
  },
  {
    id: 'manikganj', nameEn: 'Manikganj', nameBn: 'মানিকগঞ্জ', division: 'dhaka',
    lat: 23.8644, lng: 90.0047, mapX: 440, mapY: 375,
    latencyMs: 8, tps: 510, status: 'active', ipAddress: '103.14.33.22',
    activeValidators: 12, totalShieldedVolumeBDT: 45000000
  },
  {
    id: 'munshiganj', nameEn: 'Munshiganj', nameBn: 'মুন্সীগঞ্জ', division: 'dhaka',
    lat: 23.5422, lng: 90.5305, mapX: 500, mapY: 420,
    latencyMs: 7, tps: 720, status: 'active', ipAddress: '103.14.34.90',
    activeValidators: 16, totalShieldedVolumeBDT: 78000000
  },
  {
    id: 'narsingdi', nameEn: 'Narsingdi', nameBn: 'নরসিংদী', division: 'dhaka',
    lat: 23.9193, lng: 90.7176, mapX: 520, mapY: 355,
    latencyMs: 8, tps: 810, status: 'active', ipAddress: '103.14.35.41',
    activeValidators: 15, totalShieldedVolumeBDT: 91000000
  },
  {
    id: 'gopalganj', nameEn: 'Gopalganj', nameBn: 'গোপালগঞ্জ', division: 'dhaka',
    lat: 23.0050, lng: 89.8266, mapX: 410, mapY: 470,
    latencyMs: 14, tps: 430, status: 'syncing', ipAddress: '103.14.36.19',
    activeValidators: 10, totalShieldedVolumeBDT: 38000000
  },
  {
    id: 'madaripur', nameEn: 'Madaripur', nameBn: 'মাদারীপুর', division: 'dhaka',
    lat: 23.1641, lng: 90.1897, mapX: 445, mapY: 455,
    latencyMs: 11, tps: 390, status: 'active', ipAddress: '103.14.37.7',
    activeValidators: 11, totalShieldedVolumeBDT: 34000000
  },
  {
    id: 'rajbari', nameEn: 'Rajbari', nameBn: 'রাজবাড়ী', division: 'dhaka',
    lat: 23.7574, lng: 89.6444, mapX: 390, mapY: 385,
    latencyMs: 13, tps: 310, status: 'active', ipAddress: '103.14.38.61',
    activeValidators: 8, totalShieldedVolumeBDT: 29000000
  },
  {
    id: 'shariatpur', nameEn: 'Shariatpur', nameBn: 'শরীয়তপুর', division: 'dhaka',
    lat: 23.2423, lng: 90.4348, mapX: 480, mapY: 450,
    latencyMs: 12, tps: 360, status: 'active', ipAddress: '103.14.39.11',
    activeValidators: 9, totalShieldedVolumeBDT: 31000000
  },
  {
    id: 'kishoreganj', nameEn: 'Kishoreganj', nameBn: 'কিশোরগঞ্জ', division: 'dhaka',
    lat: 24.4449, lng: 90.7765, mapX: 535, mapY: 285,
    latencyMs: 10, tps: 680, status: 'active', ipAddress: '103.14.40.8',
    activeValidators: 16, totalShieldedVolumeBDT: 67000000
  },

  // --- CHATTOGRAM DIVISION (11) ---
  {
    id: 'chattogram', nameEn: 'Chattogram', nameBn: 'চট্টগ্রাম', division: 'chattogram',
    lat: 22.3569, lng: 91.7832, mapX: 630, mapY: 530,
    latencyMs: 7, tps: 2150, status: 'active', ipAddress: '103.22.10.1',
    activeValidators: 48, totalShieldedVolumeBDT: 380000000
  },
  {
    id: 'coxsbazar', nameEn: 'Cox\'s Bazar', nameBn: 'কক্সবাজার', division: 'chattogram',
    lat: 21.4272, lng: 92.0058, mapX: 650, mapY: 620,
    latencyMs: 11, tps: 940, status: 'active', ipAddress: '103.22.11.4',
    activeValidators: 20, totalShieldedVolumeBDT: 110000000
  },
  {
    id: 'comilla', nameEn: 'Cumilla', nameBn: 'কুমিল্লা', division: 'chattogram',
    lat: 23.4607, lng: 91.1809, mapX: 565, mapY: 420,
    latencyMs: 8, tps: 1350, status: 'active', ipAddress: '103.22.12.89',
    activeValidators: 26, totalShieldedVolumeBDT: 165000000
  },
  {
    id: 'brahmanbaria', nameEn: 'Brahmanbaria', nameBn: 'ব্রাহ্মণবাড়িয়া', division: 'chattogram',
    lat: 23.9571, lng: 91.1119, mapX: 560, mapY: 350,
    latencyMs: 9, tps: 780, status: 'active', ipAddress: '103.22.13.15',
    activeValidators: 16, totalShieldedVolumeBDT: 72000000
  },
  {
    id: 'feni', nameEn: 'Feni', nameBn: 'ফেনী', division: 'chattogram',
    lat: 23.0159, lng: 91.3976, mapX: 590, mapY: 470,
    latencyMs: 9, tps: 820, status: 'active', ipAddress: '103.22.14.33',
    activeValidators: 15, totalShieldedVolumeBDT: 88000000
  },
  {
    id: 'noakhali', nameEn: 'Noakhali', nameBn: 'নোয়াখালী', division: 'chattogram',
    lat: 22.8696, lng: 91.0993, mapX: 560, mapY: 485,
    latencyMs: 10, tps: 910, status: 'active', ipAddress: '103.22.15.52',
    activeValidators: 17, totalShieldedVolumeBDT: 95000000
  },
  {
    id: 'chandpur', nameEn: 'Chandpur', nameBn: 'চাঁদপুর', division: 'chattogram',
    lat: 23.2332, lng: 90.6712, mapX: 525, mapY: 450,
    latencyMs: 9, tps: 690, status: 'active', ipAddress: '103.22.16.8',
    activeValidators: 14, totalShieldedVolumeBDT: 64000000
  },
  {
    id: 'lakshmipur', nameEn: 'Lakshmipur', nameBn: 'লক্ষ্মীপুর', division: 'chattogram',
    lat: 22.9447, lng: 90.8282, mapX: 535, mapY: 480,
    latencyMs: 11, tps: 450, status: 'active', ipAddress: '103.22.17.2',
    activeValidators: 10, totalShieldedVolumeBDT: 42000000
  },
  {
    id: 'rangamati', nameEn: 'Rangamati', nameBn: 'রাঙ্গামাটি', division: 'chattogram',
    lat: 22.6533, lng: 92.1789, mapX: 670, mapY: 510,
    latencyMs: 16, tps: 310, status: 'syncing', ipAddress: '103.22.18.91',
    activeValidators: 8, totalShieldedVolumeBDT: 28000000
  },
  {
    id: 'bandarban', nameEn: 'Bandarban', nameBn: 'বান্দরবান', division: 'chattogram',
    lat: 22.1953, lng: 92.2184, mapX: 675, mapY: 570,
    latencyMs: 18, tps: 240, status: 'standby', ipAddress: '103.22.19.4',
    activeValidators: 6, totalShieldedVolumeBDT: 19000000
  },
  {
    id: 'khagrachhari', nameEn: 'Khagrachhari', nameBn: 'খাগড়াছড়ি', division: 'chattogram',
    lat: 23.1192, lng: 91.9846, mapX: 650, mapY: 460,
    latencyMs: 15, tps: 290, status: 'active', ipAddress: '103.22.20.77',
    activeValidators: 7, totalShieldedVolumeBDT: 22000000
  },

  // --- SYLHET DIVISION (4) ---
  {
    id: 'sylhet', nameEn: 'Sylhet', nameBn: 'সিলেট', division: 'sylhet',
    lat: 24.8949, lng: 91.8687, mapX: 645, mapY: 240,
    latencyMs: 8, tps: 1650, status: 'active', ipAddress: '103.45.10.1',
    activeValidators: 36, totalShieldedVolumeBDT: 290000000
  },
  {
    id: 'moulvibazar', nameEn: 'Moulvibazar', nameBn: 'মৌলভীবাজার', division: 'sylhet',
    lat: 24.4829, lng: 91.7774, mapX: 635, mapY: 280,
    latencyMs: 10, tps: 840, status: 'active', ipAddress: '103.45.11.23',
    activeValidators: 16, totalShieldedVolumeBDT: 85000000
  },
  {
    id: 'habiganj', nameEn: 'Habiganj', nameBn: 'হবিগঞ্জ', division: 'sylhet',
    lat: 24.3749, lng: 91.4155, mapX: 595, mapY: 295,
    latencyMs: 11, tps: 620, status: 'active', ipAddress: '103.45.12.9',
    activeValidators: 13, totalShieldedVolumeBDT: 58000000
  },
  {
    id: 'sunamganj', nameEn: 'Sunamganj', nameBn: 'সুনামগঞ্জ', division: 'sylhet',
    lat: 25.0658, lng: 91.3950, mapX: 590, mapY: 220,
    latencyMs: 13, tps: 410, status: 'active', ipAddress: '103.45.13.6',
    activeValidators: 10, totalShieldedVolumeBDT: 37000000
  },

  // --- RAJSHAHI DIVISION (8) ---
  {
    id: 'rajshahi', nameEn: 'Rajshahi', nameBn: 'রাজশাহী', division: 'rajshahi',
    lat: 24.3745, lng: 88.6042, mapX: 255, mapY: 290,
    latencyMs: 10, tps: 1280, status: 'active', ipAddress: '103.56.10.1',
    activeValidators: 28, totalShieldedVolumeBDT: 145000000
  },
  {
    id: 'bogra', nameEn: 'Bogra', nameBn: 'বগুড়া', division: 'rajshahi',
    lat: 24.8481, lng: 89.3730, mapX: 350, mapY: 235,
    latencyMs: 9, tps: 1120, status: 'active', ipAddress: '103.56.11.14',
    activeValidators: 22, totalShieldedVolumeBDT: 120000000
  },
  {
    id: 'pabna', nameEn: 'Pabna', nameBn: 'পাবনা', division: 'rajshahi',
    lat: 24.0108, lng: 89.2326, mapX: 330, mapY: 335,
    latencyMs: 11, tps: 760, status: 'active', ipAddress: '103.56.12.8',
    activeValidators: 15, totalShieldedVolumeBDT: 71000000
  },
  {
    id: 'sirajganj', nameEn: 'Sirajganj', nameBn: 'সিরাজগঞ্জ', division: 'rajshahi',
    lat: 24.4534, lng: 89.7008, mapX: 395, mapY: 280,
    latencyMs: 10, tps: 830, status: 'active', ipAddress: '103.56.13.91',
    activeValidators: 17, totalShieldedVolumeBDT: 82000000
  },
  {
    id: 'naogaon', nameEn: 'Naogaon', nameBn: 'নওগাঁ', division: 'rajshahi',
    lat: 24.8103, lng: 88.9414, mapX: 295, mapY: 240,
    latencyMs: 12, tps: 580, status: 'active', ipAddress: '103.56.14.3',
    activeValidators: 12, totalShieldedVolumeBDT: 51000000
  },
  {
    id: 'natore', nameEn: 'Natore', nameBn: 'নাটোর', division: 'rajshahi',
    lat: 24.4206, lng: 89.0003, mapX: 300, mapY: 295,
    latencyMs: 11, tps: 520, status: 'active', ipAddress: '103.56.15.22',
    activeValidators: 11, totalShieldedVolumeBDT: 46000000
  },
  {
    id: 'chapainawabganj', nameEn: 'Chapainawabganj', nameBn: 'চাঁপাইনবাবগঞ্জ', division: 'rajshahi',
    lat: 24.5965, lng: 88.2775, mapX: 210, mapY: 270,
    latencyMs: 14, tps: 410, status: 'active', ipAddress: '103.56.16.5',
    activeValidators: 9, totalShieldedVolumeBDT: 33000000
  },
  {
    id: 'joypurhat', nameEn: 'Joypurhat', nameBn: 'জয়পুরহাট', division: 'rajshahi',
    lat: 25.1017, lng: 89.0270, mapX: 310, mapY: 205,
    latencyMs: 13, tps: 340, status: 'active', ipAddress: '103.56.17.81',
    activeValidators: 8, totalShieldedVolumeBDT: 29000000
  },

  // --- KHULNA DIVISION (10) ---
  {
    id: 'khulna', nameEn: 'Khulna', nameBn: 'খুলনা', division: 'khulna',
    lat: 22.8456, lng: 89.5403, mapX: 375, mapY: 510,
    latencyMs: 9, tps: 1480, status: 'active', ipAddress: '103.78.10.1',
    activeValidators: 30, totalShieldedVolumeBDT: 175000000
  },
  {
    id: 'jessore', nameEn: 'Jashore', nameBn: 'যশোর', division: 'khulna',
    lat: 23.1664, lng: 89.2081, mapX: 330, mapY: 450,
    latencyMs: 10, tps: 980, status: 'active', ipAddress: '103.78.11.12',
    activeValidators: 20, totalShieldedVolumeBDT: 98000000
  },
  {
    id: 'kushtia', nameEn: 'Kushtia', nameBn: 'কুষ্টিয়া', division: 'khulna',
    lat: 23.9013, lng: 89.1204, mapX: 320, mapY: 360,
    latencyMs: 11, tps: 710, status: 'active', ipAddress: '103.78.12.44',
    activeValidators: 14, totalShieldedVolumeBDT: 65000000
  },
  {
    id: 'satkhira', nameEn: 'Satkhira', nameBn: 'সাতক্ষীরা', division: 'khulna',
    lat: 22.7185, lng: 89.0705, mapX: 315, mapY: 535,
    latencyMs: 13, tps: 490, status: 'active', ipAddress: '103.78.13.9',
    activeValidators: 11, totalShieldedVolumeBDT: 41000000
  },
  {
    id: 'bagerhat', nameEn: 'Bagerhat', nameBn: 'বাগেরহাট', division: 'khulna',
    lat: 22.6516, lng: 89.7859, mapX: 405, mapY: 530,
    latencyMs: 12, tps: 430, status: 'active', ipAddress: '103.78.14.77',
    activeValidators: 10, totalShieldedVolumeBDT: 37000000
  },
  {
    id: 'jhenaidah', nameEn: 'Jhenaidah', nameBn: 'ঝিনাইদহ', division: 'khulna',
    lat: 23.5450, lng: 89.1726, mapX: 325, mapY: 405,
    latencyMs: 11, tps: 560, status: 'active', ipAddress: '103.78.15.3',
    activeValidators: 12, totalShieldedVolumeBDT: 48000000
  },
  {
    id: 'chuadanga', nameEn: 'Chuadanga', nameBn: 'চুয়াডাঙ্গা', division: 'khulna',
    lat: 23.6401, lng: 88.8418, mapX: 285, mapY: 395,
    latencyMs: 13, tps: 380, status: 'active', ipAddress: '103.78.16.8',
    activeValidators: 9, totalShieldedVolumeBDT: 31000000
  },
  {
    id: 'magura', nameEn: 'Magura', nameBn: 'মাগুরা', division: 'khulna',
    lat: 23.4873, lng: 89.4199, mapX: 355, mapY: 415,
    latencyMs: 12, tps: 340, status: 'active', ipAddress: '103.78.17.61',
    activeValidators: 8, totalShieldedVolumeBDT: 28000000
  },
  {
    id: 'meherpur', nameEn: 'Meherpur', nameBn: 'মেহেরপুর', division: 'khulna',
    lat: 23.7622, lng: 88.6318, mapX: 260, mapY: 375,
    latencyMs: 15, tps: 260, status: 'syncing', ipAddress: '103.78.18.2',
    activeValidators: 6, totalShieldedVolumeBDT: 21000000
  },
  {
    id: 'narail', nameEn: 'Narail', nameBn: 'নড়াইল', division: 'khulna',
    lat: 23.1725, lng: 89.5127, mapX: 370, mapY: 460,
    latencyMs: 12, tps: 310, status: 'active', ipAddress: '103.78.19.15',
    activeValidators: 7, totalShieldedVolumeBDT: 24000000
  },

  // --- BARISHAL DIVISION (6) ---
  {
    id: 'barishal', nameEn: 'Barishal', nameBn: 'বরিশাল', division: 'barishal',
    lat: 22.7010, lng: 90.3535, mapX: 470, mapY: 535,
    latencyMs: 11, tps: 920, status: 'active', ipAddress: '103.89.10.1',
    activeValidators: 20, totalShieldedVolumeBDT: 89000000
  },
  {
    id: 'bhola', nameEn: 'Bhola', nameBn: 'ভোলা', division: 'barishal',
    lat: 22.6859, lng: 90.6482, mapX: 510, mapY: 530,
    latencyMs: 14, tps: 480, status: 'active', ipAddress: '103.89.11.45',
    activeValidators: 10, totalShieldedVolumeBDT: 39000000
  },
  {
    id: 'patuakhali', nameEn: 'Patuakhali', nameBn: 'পটুয়াখালী', division: 'barishal',
    lat: 22.3596, lng: 90.3298, mapX: 470, mapY: 585,
    latencyMs: 13, tps: 420, status: 'active', ipAddress: '103.89.12.8',
    activeValidators: 9, totalShieldedVolumeBDT: 35000000
  },
  {
    id: 'pirojpur', nameEn: 'Pirojpur', nameBn: 'পিরোজপুর', division: 'barishal',
    lat: 22.5841, lng: 89.9720, mapX: 425, mapY: 540,
    latencyMs: 12, tps: 380, status: 'active', ipAddress: '103.89.13.19',
    activeValidators: 8, totalShieldedVolumeBDT: 31000000
  },
  {
    id: 'barguna', nameEn: 'Barguna', nameBn: 'বরগুনা', division: 'barishal',
    lat: 22.1522, lng: 90.1256, mapX: 440, mapY: 610,
    latencyMs: 16, tps: 290, status: 'syncing', ipAddress: '103.89.14.3',
    activeValidators: 7, totalShieldedVolumeBDT: 22000000
  },
  {
    id: 'jhalokati', nameEn: 'Jhalokati', nameBn: 'ঝালকাঠি', division: 'barishal',
    lat: 22.6406, lng: 90.1987, mapX: 450, mapY: 545,
    latencyMs: 13, tps: 310, status: 'active', ipAddress: '103.89.15.7',
    activeValidators: 7, totalShieldedVolumeBDT: 25000000
  },

  // --- RANGPUR DIVISION (8) ---
  {
    id: 'rangpur', nameEn: 'Rangpur', nameBn: 'রংপুর', division: 'rangpur',
    lat: 25.7439, lng: 89.2752, mapX: 340, mapY: 130,
    latencyMs: 12, tps: 1100, status: 'active', ipAddress: '103.95.10.1',
    activeValidators: 24, totalShieldedVolumeBDT: 115000000
  },
  {
    id: 'dinajpur', nameEn: 'Dinajpur', nameBn: 'দিনাজপুর', division: 'rangpur',
    lat: 25.6217, lng: 88.6354, mapX: 250, mapY: 140,
    latencyMs: 13, tps: 740, status: 'active', ipAddress: '103.95.11.18',
    activeValidators: 15, totalShieldedVolumeBDT: 68000000
  },
  {
    id: 'gaibandha', nameEn: 'Gaibandha', nameBn: 'গাইবান্ধা', division: 'rangpur',
    lat: 25.3288, lng: 89.5403, mapX: 370, mapY: 180,
    latencyMs: 14, tps: 490, status: 'active', ipAddress: '103.95.12.9',
    activeValidators: 11, totalShieldedVolumeBDT: 42000000
  },
  {
    id: 'kurigram', nameEn: 'Kurigram', nameBn: 'কুড়িগ্রাম', division: 'rangpur',
    lat: 25.8054, lng: 89.6361, mapX: 385, mapY: 125,
    latencyMs: 15, tps: 420, status: 'active', ipAddress: '103.95.13.7',
    activeValidators: 10, totalShieldedVolumeBDT: 36000000
  },
  {
    id: 'nilphamari', nameEn: 'Nilphamari', nameBn: 'নীলফামারী', division: 'rangpur',
    lat: 25.9317, lng: 88.8560, mapX: 280, mapY: 110,
    latencyMs: 14, tps: 450, status: 'active', ipAddress: '103.95.14.88',
    activeValidators: 10, totalShieldedVolumeBDT: 38000000
  },
  {
    id: 'panchagarh', nameEn: 'Panchagarh', nameBn: 'পঞ্চগড়', division: 'rangpur',
    lat: 26.3411, lng: 88.5542, mapX: 240, mapY: 60,
    latencyMs: 17, tps: 320, status: 'syncing', ipAddress: '103.95.15.4',
    activeValidators: 8, totalShieldedVolumeBDT: 26000000
  },
  {
    id: 'thakurgaon', nameEn: 'Thakurgaon', nameBn: 'ঠাকুরগাঁও', division: 'rangpur',
    lat: 26.0337, lng: 88.4617, mapX: 230, mapY: 95,
    latencyMs: 16, tps: 360, status: 'active', ipAddress: '103.95.16.2',
    activeValidators: 8, totalShieldedVolumeBDT: 29000000
  },
  {
    id: 'lalmonirhat', nameEn: 'Lalmonirhat', nameBn: 'লালমনিরহাট', division: 'rangpur',
    lat: 25.9165, lng: 89.4532, mapX: 360, mapY: 110,
    latencyMs: 15, tps: 310, status: 'active', ipAddress: '103.95.17.6',
    activeValidators: 7, totalShieldedVolumeBDT: 24000000
  },

  // --- MYMENSINGH DIVISION (4) ---
  {
    id: 'mymensingh', nameEn: 'Mymensingh', nameBn: 'ময়মনসিংহ', division: 'mymensingh',
    lat: 24.7471, lng: 90.4203, mapX: 480, mapY: 240,
    latencyMs: 8, tps: 1320, status: 'active', ipAddress: '103.112.10.1',
    activeValidators: 26, totalShieldedVolumeBDT: 140000000
  },
  {
    id: 'jamalpur', nameEn: 'Jamalpur', nameBn: 'জামালপুর', division: 'mymensingh',
    lat: 24.9375, lng: 89.9377, mapX: 420, mapY: 215,
    latencyMs: 11, tps: 610, status: 'active', ipAddress: '103.112.11.8',
    activeValidators: 14, totalShieldedVolumeBDT: 56000000
  },
  {
    id: 'netrokona', nameEn: 'Netrokona', nameBn: 'নেত্রকোণা', division: 'mymensingh',
    lat: 24.8709, lng: 90.7279, mapX: 525, mapY: 225,
    latencyMs: 12, tps: 480, status: 'active', ipAddress: '103.112.12.33',
    activeValidators: 11, totalShieldedVolumeBDT: 41000000
  },
  {
    id: 'sherpur', nameEn: 'Sherpur', nameBn: 'শেরপুর', division: 'mymensingh',
    lat: 25.0205, lng: 90.0153, mapX: 430, mapY: 200,
    latencyMs: 13, tps: 390, status: 'active', ipAddress: '103.112.13.7',
    activeValidators: 9, totalShieldedVolumeBDT: 32000000
  }
];
