"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  Tv, 
  Truck, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calculator, 
  Flame, 
  Zap, 
  Search, 
  Loader2, 
  Navigation, 
  ChevronUp, 
  ChevronDown,
  Sun,
  Moon,
  Swords
} from "lucide-react";
import { PaketKey, PaketItem, GameItem, FaqItem } from "@/types";

// =========================================================
// KOMPONEN SVG KHUSUS UNTUK LOGO MEDSOS RESMI
// =========================================================

// Component SVG Logo TikTok Resmi
function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-5.2-1.74 2.89 2.89 0 012.31-1.33V9.12a6.32 6.32 0 00-1.12-.1 6.34 6.34 0 106.34 6.34V9.38a8.16 8.16 0 004.89 1.62V7.55a4.81 4.81 0 01-3-.86z" />
    </svg>
  );
}

// Component SVG Logo WhatsApp Resmi
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// =========================================================
// KOMPONEN UTAMA HOMEPAGE
// =========================================================

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  // Nomor Admin WhatsApp Akiba Core
  const NOMOR_WA_ADMIN = "6285121263131"; 

  // Koordinat Basecamp Akiba Core (Jombang, Cilegon)
  const BASECAMP_LAT = -6.015243;
  const BASECAMP_LNG = 106.052026;

  // Jam Operasional
  const JAM_WEEKDAY = "Senin - Jumat: 10.00 - 02.00 WIB";
  const JAM_WEEKEND = "Sabtu - Minggu: 09.00 - 02.00 WIB";

  // State untuk form dan interaksi
  const [paketPilihan, setPaketPilihan] = useState<PaketKey>("48jam");
  const [jarakKm, setJarakKm] = useState<number>(3);
  const [nama, setNama] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [jamAntar, setJamAntar] = useState<string>("");

  const [isSearchingAddress, setIsSearchingAddress] = useState<boolean>(false);
  const [addressNotice, setAddressNotice] = useState<string>("");

  const [gameCategory, setGameCategory] = useState<string>("all");
  const [searchGame, setSearchGame] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Data Katalog Paket Sewa
  const paketList: Record<PaketKey, PaketItem> = {
    "12jam": { nama: "PLAYBOX 12 JAM", durasi: "12 Jam", harga: 90000, badge: null, bonus: null },
    "24jam": { nama: "PLAYBOX 24 JAM", durasi: "24 Jam (1 Hari)", harga: 150000, badge: "POPULER", bonus: null },
    "36jam": { nama: "PLAYBOX 36 JAM", durasi: "36 Jam", harga: 225000, badge: null, bonus: null },
    "48jam": { nama: "PLAYBOX 48 JAM + BONUS", durasi: "48 Jam + Bonus 12 Jam (Total 60 Jam!)", harga: 300000, badge: "BEST VALUE", bonus: "GRATIS TAMBAHAN 12 JAM" }
  };

  // Data Katalog Game
  const gameCatalog: GameItem[] = [
    { title: "EA Sports FC 27 / FIFA", category: "sports", icon: "⚽", popular: true },
    { title: "PES Bitbox 2027", category: "sports", icon: "🎮", popular: true },
    { title: "GTA V (Grand Theft Auto)", category: "action", icon: "🚗", popular: true },
    { title: "God of War Ragnarök", category: "action", icon: "🪓", popular: true },
    { title: "Tekken 7 / Tekken 8", category: "fighting", icon: "🥊", popular: true },
    { title: "Mortal Kombat 11", category: "fighting", icon: "🐲", popular: false },
    { title: "Naruto Shippuden: Ultimate Ninja STORM 4", category: "fighting", icon: "🍃", popular: true },
    { title: "Gran Turismo Sport", category: "racing", icon: "🏎️", popular: false },
    { title: "Need for Speed Heat", category: "racing", icon: "🚘", popular: false },
    { title: "Resident Evil 4 Remake", category: "horror", icon: "🧟", popular: true },
    { title: "It Takes Two (Co-Op Special)", category: "coop", icon: "🧩", popular: true },
    { title: "A Way Out (Co-Op Special)", category: "coop", icon: "🔗", popular: true },
    { title: "Crash Team Racing (CTR) Nitro-Fueled", category: "racing", icon: "🏎️", popular: true },
  ];

  // Data FAQ
  const faqList: FaqItem[] = [
    { q: "Apa itu Playbox PS4 Pro?", a: "Playbox adalah konsol PlayStation 4 Pro yang telah terintegrasi di dalam koper/box khusus lengkap dengan Layar/Monitor Gaming Portable. Tinggal colok listrik & main!" },
    { q: "Bagaimana sistem perhitungan ongkir antar-jemputnya?", a: "Jarak pengiriman <= 5 KM GRATIS (Rp 0). Di atas 5 KM dikenakan tambahan Rp 10.000 untuk setiap kelipatan 5 KM berikutnya." },
    { q: "Persyaratan apa saja yang dibutuhkan?", a: "Cukup melampirkan foto Kartu Identitas Asli (KTP/SIM/Kartu Pelajar) saat verifikasi." },
    { q: "Fasilitas apa saja yang didapatkan dalam 1 paket?", a: "1 Unit Playbox PS4 Pro, Monitor Gaming Portable, 2 Stick DualShock 4 Original, Kabel Power & HDMI, serta puluhan Game Siap Main." }
  ];

  // Fungsi Kalkulasi Jarak Haversine
  const calculateHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.ceil(R * c);
  };

  // Handler Ambil Lokasi via GPS Perangkat
  const handleGetGPSLocation = () => {
    if (!navigator.geolocation) {
      setAddressNotice("⚠️ Perangkat Anda tidak mendukung fitur GPS.");
      return;
    }

    setIsSearchingAddress(true);
    setAddressNotice("Mengambil koordinat GPS & mencari nama lokasi...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateHaversineDistance(BASECAMP_LAT, BASECAMP_LNG, userLat, userLng);
        setJarakKm(distance);

        try {
          const revGeoUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`;
          const res = await fetch(revGeoUrl, {
            headers: { "User-Agent": "AkibaCore-PlayboxApp" }
          });
          const geoData = await res.json();

          const namaAlamat = geoData?.display_name || "Lokasi GPS Terdeteksi";
          const linkMaps = `https://maps.google.com/?q=${userLat},${userLng}`;

          setAlamat(`${namaAlamat}\n📍 Pinpoint Maps: ${linkMaps}`);
          setAddressNotice(`✓ Lokasi Terdeteksi: ${distance} KM (${distance <= 5 ? 'Gratis Ongkir' : 'Ongkir Disesuaikan'})`);
        } catch {
          setAlamat(`Lokasi GPS: https://maps.google.com/?q=${userLat},${userLng}`);
          setAddressNotice(`✓ Terdeteksi via GPS: ${distance} KM`);
        } finally {
          setIsSearchingAddress(false);
        }
      },
      () => {
        setIsSearchingAddress(false);
        setAddressNotice("⚠️ Akses GPS ditolak. Silakan ketik alamat manual atau geser slider jarak.");
      }
    );
  };

  // Handler Cek Jarak Alamat Manual via OpenStreetMap (API Route)
  const handleCheckAddressDistance = async () => {
    if (!alamat || alamat.trim().length < 5 || alamat.includes("Pinpoint Maps")) return;

    setIsSearchingAddress(true);
    setAddressNotice("Mengecek jarak alamat di peta...");

    try {
      const res = await fetch("/api/distance-osm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationAddress: alamat }),
      });

      const data = await res.json();

      if (data.success) {
        setJarakKm(data.distanceKm);
        setAddressNotice(`✓ Alamat terdeteksi: ${data.distanceKm} KM (${data.distanceKm <= 5 ? 'Gratis Ongkir' : 'Ongkir Disesuaikan'})`);
      } else {
        setAddressNotice("⚠️ Alamat belum spesifik, Anda dapat menyesuaikan slider jarak di bawah.");
      }
    } catch {
      setAddressNotice("⚠️ Gagal memuat peta, silakan atur slider jarak secara manual.");
    } finally {
      setIsSearchingAddress(false);
    }
  };

  // Fungsi Hitung Ongkir Berdasarkan Jarak
  const hitungOngkir = (km: number): number => {
    if (isNaN(km) || km <= 5) return 0;
    const sisaJarak = km - 5;
    return Math.ceil(sisaJarak / 5) * 10000;
  };

  // Kalkulasi Total Biaya
  const hargaSewa = paketList[paketPilihan].harga;
  const biayaOngkir = hitungOngkir(jarakKm);
  const totalBiaya = hargaSewa + biayaOngkir;

  // Formatter Mata Uang Rupiah
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Handler Submit Booking (Simpan ke Sheet + Buka WA)
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPaketInfo = paketList[paketPilihan];

    const bookingData = {
      timestamp: new Date().toISOString(),
      nama,
      paket: selectedPaketInfo.nama,
      jamAntar: jamAntar || "Secepatnya",
      alamat,
      jarakKm,
      biayaOngkir: biayaOngkir === 0 ? "GRATIS" : biayaOngkir,
      totalBiaya,
    };

    try {
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
    } catch (err) {
      console.error("Gagal simpan ke sheet:", err);
    }

    let textPesan = `*HALO AKIBA CORE, SAYA MAU SEWA PLAYBOX!* 🎮⚡\n\n`;
    textPesan += `*Detail Pelanggan:*\n• Nama: ${nama || '-'}\n• Alamat:\n${alamat || '-'}\n• Jam Request Antar: ${jamAntar || 'Secepatnya'}\n\n`;
    textPesan += `*Detail Paket:*\n• Paket: ${selectedPaketInfo.nama}\n• Harga Sewa: ${formatRupiah(hargaSewa)}\n\n`;
    textPesan += `*Delivery:*\n• Jarak: ${jarakKm} KM\n• Ongkir: ${biayaOngkir === 0 ? 'GRATIS' : formatRupiah(biayaOngkir)}\n\n`;
    textPesan += `*TOTAL ESTIMASI: ${formatRupiah(totalBiaya)}*`;

    window.open(`https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(textPesan)}`, '_blank');
  };

  // Filter Game Berdasarkan Kategori dan Pencarian
  const filteredGames = gameCatalog.filter(game => {
    const matchesCategory = gameCategory === "all" || game.category === gameCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchGame.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#f3f0f9] dark:bg-[#0b0416] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#ff007f] selection:text-white overflow-hidden relative transition-colors duration-300">
      
      {/* BACKGROUND GRAFFITI STATIS RINGAN */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-300/30 dark:from-[#581c87]/40 via-transparent to-transparent pointer-events-none z-0"></div>
      
      {/* Watermark Katakana Background */}
      <div className="absolute top-10 left-5 text-[80px] md:text-[120px] font-black text-purple-900/10 dark:text-purple-900/10 select-none pointer-events-none font-mono z-0">
        アキバコア
      </div>

      {/* =========================================================
         1. NAVBAR
         ========================================================= */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0b0416]/80 backdrop-blur-xl border-b border-purple-200 dark:border-purple-500/20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center relative z-10">
          
          {/* Kolom Kiri: Logo Brand Next Image */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff007f] via-purple-400 to-[#00f0ff] p-[2px] shadow-[0_0_20px_rgba(255,0,127,0.5)] overflow-hidden">
              <div className="w-full h-full bg-white dark:bg-[#0b0416] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="/logo-akiba.png" 
                  alt="Logo Akiba Core Resmi" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#ff007f] via-purple-900 dark:via-white to-[#00f0ff] uppercase" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
                AKIBA CORE
              </span>
              <span className="block text-[9px] text-[#ff007f] tracking-widest uppercase font-mono font-bold -mt-1">
                PLAYBOX RENTAL
              </span>
            </div>
          </div>
          
          {/* Kolom Kanan: Sosmed Resmi (SVG), Theme Toggle & Sewa */}
          <div className="flex items-center gap-1.5 md:gap-3">
            
            {/* Instagram Resmi - Menggunakan URL yang Benar dan Ikon Logo */}
            <a
              href="https://www.instagram.com/akibacore.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/40 text-pink-600 dark:text-pink-400 hover:scale-110 transition-all shadow-md flex items-center justify-center"
              title="Buka Instagram @akibacore.id Resmi"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* TikTok Resmi - Menggunakan SVG Kustom */}
            <a
              href="https://tiktok.com/@akibacore7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/40 text-slate-900 dark:text-[#00f0ff] hover:scale-110 transition-all shadow-md flex items-center justify-center"
              title="Buka TikTok @akibacore Resmi"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>

            {/* WhatsApp Resmi - Menggunakan SVG Kustom */}
            <a
              href={`https://wa.me/6285121263131`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 md:p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/40 text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-all shadow-md flex items-center justify-center"
              title="Chat WhatsApp Admin Akiba Core"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* Separator Garis Vertikal */}
            <div className="w-[1px] h-6 bg-purple-200 dark:bg-purple-800 transition-colors mx-1"></div>

            {/* Toggle Dark/Light Mode */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 md:p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-[#00f0ff] hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all shadow-md flex items-center justify-center"
                title="Ganti Mode Tampilan"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-purple-900" />
                )}
              </button>
            )}

            {/* Tombol Sewa Sekarang */}
            <motion.a 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#booking-section" 
              className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-black rounded-xl bg-gradient-to-r from-[#ff007f] to-purple-600 text-white shadow-[0_0_20px_rgba(255,0,127,0.6)] flex items-center gap-1.5 md:gap-2 border-2 border-white/80"
            >
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current animate-pulse shrink-0" />
              <span className="xs:hidden">SEWA</span>
              <span className="hidden xs:inline">SEKARANG</span>
            </motion.a>
          </div>

        </div>
      </nav>

      {/* =========================================================
         2. HERO SECTION
         ========================================================= */}
      <section className="relative pt-10 pb-20 px-4 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Kolom Teks Kiri */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-left space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-md bg-purple-200/80 dark:bg-purple-950/80 border border-purple-400/50 dark:border-purple-500/50 text-xs font-mono text-purple-900 dark:text-[#00f0ff] shadow-lg">
              <span className="text-[#ff007f]">ドミノ</span>
              <span>SEASON 2026 : AKIBA CORE</span>
            </div>

            <div className="space-y-1">
              <p className="text-[#00f0ff] text-xl font-bold tracking-widest uppercase" style={{ fontFamily: "var(--font-marker), cursive" }}>
                #morethanjustagames
              </p>
              <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase text-slate-900 dark:text-white drop-shadow-md transition-colors" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
                PLAYBOX <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff007f] via-purple-600 dark:via-purple-300 to-[#00f0ff]">PS4 PRO</span>
              </h1>
              <div className="inline-block bg-[#ff007f] text-white dark:text-slate-950 px-3 py-1 text-base xs:text-xl md:text-2xl font-black uppercase -rotate-2 shadow-[4px_4px_0px_#00f0ff]" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
                SIAP ANTAR DAN JEMPUT!
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-medium max-w-xl leading-relaxed transition-colors">
              Konsol PS4 Pro terintegrasi dengan Monitor Portable di dalam Box Koper eksklusif. Colok listrik langsung mabar di mana saja! Area Cilegon & Serang.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs font-bold">
              <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/80 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md transition-colors">
                <Truck className="text-[#00f0ff] w-4 h-4 shrink-0" />
                <span className="text-slate-900 dark:text-slate-100">Antar Jemput Lokasi</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/80 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md transition-colors">
                <Tv className="text-[#ff007f] w-4 h-4 shrink-0" />
                <span className="text-slate-900 dark:text-slate-100">Monitor Portable Built-in</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white/80 dark:bg-purple-950/60 rounded-xl border border-purple-200 dark:border-purple-800 shadow-md transition-colors">
                <Clock className="text-amber-400 w-4 h-4 shrink-0" />
                <span className="text-slate-900 dark:text-slate-100">Buka Hingga 02.00 WIB</span>
              </div>
            </div>
          </motion.div>

          {/* Kolom Visual Kanan: 3D Floating & Interactive Playbox Showcase */}
{/* Kolom Visual Kanan: Standalone Floating Playbox PNG Only */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
        >
          {/* Element Glow Neon Background (Bulat Berdenyut) */}
          <div className="absolute w-64 h-64 xs:w-80 xs:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-[#ff007f] via-purple-600 to-[#00f0ff] rounded-full blur-[80px] md:blur-[110px] opacity-60 animate-pulse pointer-events-none"></div>

          {/* FOTO PLAYBOX PNG DENGAN ANIMASI MELAYANG (FLOATING) */}
          <div className="relative w-full max-w-sm md:max-w-md h-64 xs:h-72 md:h-80 flex items-center justify-center z-10">
            <motion.div
              animate={{ 
                y: [-8, 8, -8],
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_20px_35px_rgba(0,240,255,0.45)] hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <Image 
                src="/playbox.png" 
                alt="Akiba Core Playbox PS4 Pro Unit" 
                width={450}
                height={450}
                className="object-contain max-h-full max-w-full"
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        </div>
      </section>

      {/* =========================================================
         3. PRICING CARDS
         ========================================================= */}
      <section className="py-12 px-4 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10 space-y-1 relative z-10">
          <p className="text-[#ff007f] font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-marker), cursive" }}>PILIH PAKET SEWA</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 dark:text-white tracking-wide transition-colors" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
            PRICING <span className="text-[#00f0ff]">CATALOG</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {Object.entries(paketList).map(([key, item]) => {
            const isSelected = paketPilihan === key;
            return (
              <motion.div
                key={key}
                whileHover={{ y: -8 }}
                onClick={() => setPaketPilihan(key as PaketKey)}
                className={`cursor-pointer relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border-2 ${
                  isSelected 
                    ? 'bg-white dark:bg-[#180c33] border-[#00f0ff] shadow-xl dark:shadow-[0_0_30px_rgba(0,240,255,0.4)] scale-[1.02]' 
                    : 'bg-white/80 dark:bg-[#120826]/80 border-purple-200 dark:border-purple-900/60 hover:border-purple-500'
                }`}
              >
                {item.badge && (
                  <div className={`absolute -top-3.5 right-4 px-3 py-0.5 font-black text-[10px] uppercase tracking-wider rounded ${
                    item.badge === 'BEST VALUE' ? 'bg-[#ff007f] text-white' : 'bg-[#00f0ff] text-slate-950'
                  }`}>
                    {item.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300 text-xs mb-2 font-mono transition-colors">
                    <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span>{item.durasi}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 transition-colors" style={{ fontFamily: "var(--font-teko), sans-serif" }}>{item.nama}</h3>

                  <div className="mb-4">
                    <span className="text-3xl font-black text-purple-900 dark:text-[#00f0ff] transition-colors">{formatRupiah(item.harga)}</span>
                  </div>

                  {item.bonus && (
                    <div className="mb-4 p-2 bg-[#ff007f]/20 border border-[#ff007f]/50 text-[#ff007f] font-bold text-xs rounded flex items-center gap-2">
                      <Flame className="w-4 h-4 shrink-0" />
                      <span>{item.bonus}</span>
                    </div>
                  )}

                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 mb-6 font-medium transition-colors">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> PS4 Pro (Full Games)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> Monitor Portable Built-in</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" /> 2 Controller DualShock 4</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 font-black text-xs uppercase tracking-wider rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#00f0ff] text-slate-950 shadow-md'
                      : 'bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 hover:bg-purple-200'
                  }`}
                >
                  {isSelected ? 'PAKET TERPILIH' : 'PILIH PAKET'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
         4. KATALOG GAME GRID
         ========================================================= */}
      <section className="py-12 px-4 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 space-y-1 relative z-10">
          <p className="text-[#00f0ff] font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-marker), cursive" }}>GAME SELECTION</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 dark:text-white tracking-wide transition-colors" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
            AVAILABLE <span className="text-[#ff007f]">GAMES</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'Semua Game' },
              { id: 'sports', label: 'Sports' },
              { id: 'action', label: 'Action' },
              { id: 'fighting', label: 'Fighting' },
              { id: 'racing', label: 'Balapan' },
              { id: 'coop', label: 'Co-Op' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setGameCategory(cat.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  gameCategory === cat.id
                    ? 'bg-[#ff007f] text-white shadow-md'
                    : 'bg-white dark:bg-[#140a28] text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Cari game..."
              value={searchGame}
              onChange={(e) => setSearchGame(e.target.value)}
              className="w-full bg-white dark:bg-[#140a28] border border-purple-200 dark:border-purple-900 focus:border-[#00f0ff] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
          {filteredGames.map((game, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-[#140a28]/80 border border-purple-200 dark:border-purple-900/60 hover:border-[#00f0ff] transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-2xl p-2 rounded-lg bg-purple-50 dark:bg-[#0b0416] border border-purple-200 dark:border-purple-900 transition-colors shrink-0">{game.icon}</span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#00f0ff] transition-colors truncate">{game.title}</h4>
                  <span className="text-[10px] text-purple-500 dark:text-purple-400 uppercase font-mono transition-colors">{game.category}</span>
                </div>
              </div>
              {game.popular && <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/30 shrink-0">HOT</span>}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
         5. FORM BOOKING & ONGKIR KALKULATOR
         ========================================================= */}
      <section id="booking-section" className="py-12 px-4 max-w-4xl mx-auto relative z-10">
        <div className="bg-white/90 dark:bg-[#140a28]/90 border-2 border-purple-300 dark:border-purple-500/40 rounded-3xl p-6 md:p-10 shadow-xl dark:shadow-[0_0_50px_rgba(123,44,191,0.5)] space-y-6 backdrop-blur-md transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl border border-purple-300 dark:border-purple-500/50 text-[#00f0ff] transition-colors">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase" style={{ fontFamily: "var(--font-teko), sans-serif" }}>FORM BOOKING & KALKULATOR ONGKIR</h2>
              <p className="text-xs text-slate-600 dark:text-purple-300 transition-colors">Hitung jarak pengiriman otomatis via GPS</p>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-purple-200 uppercase mb-1.5 transition-colors">Pilih Paket Playbox</label>
              <select 
                value={paketPilihan} 
                onChange={(e) => setPaketPilihan(e.target.value as PaketKey)}
                className="w-full bg-purple-50 dark:bg-[#0b0416] border border-purple-200 dark:border-purple-800 focus:border-[#00f0ff] rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors"
              >
                {Object.entries(paketList).map(([k, p]) => (
                  <option key={k} value={k}>{p.nama} — {formatRupiah(p.harga)}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-purple-200 uppercase flex items-center gap-1 transition-colors">
                  <span>Alamat Pengiriman Lengkap</span>
                  {isSearchingAddress && <Loader2 className="w-3.5 h-3.5 text-[#00f0ff] animate-spin" />}
                </label>

                <button
                  type="button"
                  onClick={handleGetGPSLocation}
                  className="px-3 py-1 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] text-[11px] font-extrabold flex items-center gap-1 hover:bg-[#00f0ff]/20 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>Deteksi Lokasi GPS Saya</span>
                </button>
              </div>

              <textarea 
                required 
                rows={3} 
                placeholder="Ketik alamat lengkap atau klik 'Deteksi Lokasi GPS Saya'..." 
                value={alamat} 
                onChange={(e) => setAlamat(e.target.value)} 
                onBlur={handleCheckAddressDistance}
                className="w-full bg-purple-50 dark:bg-[#0b0416] border border-purple-200 dark:border-purple-800 focus:border-[#00f0ff] rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-colors" 
              />
              {addressNotice && (
                <p className="text-[11px] font-mono mt-1 text-[#00f0ff]">{addressNotice}</p>
              )}
            </div>

            <div className="p-4 bg-purple-50 dark:bg-[#0b0416] rounded-2xl border border-purple-200 dark:border-purple-900 space-y-2 transition-colors">
              <div className="flex justify-between text-xs">
                <span className="font-bold flex items-center gap-1 text-slate-700 dark:text-purple-200 transition-colors"><MapPin className="w-4 h-4 text-[#ff007f]" /> Jarak Delivery (Manual):</span>
                <span className="text-[#00f0ff] font-mono font-bold">{jarakKm} KM</span>
              </div>
              <input type="range" min="1" max="30" value={jarakKm} onChange={(e) => setJarakKm(Number(e.target.value))} className="w-full accent-[#00f0ff]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-purple-300 uppercase mb-1 transition-colors">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Contoh: Dika Pradika" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  className="w-full bg-purple-50 dark:bg-[#0b0416] border border-purple-200 dark:border-purple-800 rounded-xl p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00f0ff] transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[11px] md:text-xs font-bold text-slate-700 dark:text-purple-300 uppercase mb-1 transition-colors">
                  Request Jam Pengantaran
                </label>
                <select
                  required
                  value={jamAntar}
                  onChange={(e) => setJamAntar(e.target.value)}
                  className="w-full h-11 md:h-12 bg-purple-50 dark:bg-[#0b0416] border border-purple-200 dark:border-purple-800 rounded-lg md:rounded-xl px-3 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00f0ff] transition-colors cursor-pointer"
                >
                  <option value="" disabled>-- Pilih Jam Pengantaran --</option>
                  
                  {/* Opsi Fleksibel/Ketersediaan Admin */}
                  <option value="Fleksibel / Konfirmasi Admin">
                    ⚡ Fleksibel / Konfirmasi Admin
                  </option>
                  
                  {/* Pilihan Jam Reguler (11.00 - 20.00 WIB) */}
                  <option value="11:00 WIB">11:00 WIB</option>
                  <option value="12:00 WIB">12:00 WIB</option>
                  <option value="13:00 WIB">13:00 WIB</option>
                  <option value="14:00 WIB">14:00 WIB</option>
                  <option value="15:00 WIB">15:00 WIB</option>
                  <option value="16:00 WIB">16:00 WIB</option>
                  <option value="17:00 WIB">17:00 WIB</option>
                  <option value="18:00 WIB">18:00 WIB</option>
                  <option value="19:00 WIB">19:00 WIB</option>
                  <option value="20:00 WIB">20:00 WIB</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-[#0b0416] border border-[#ff007f]/40 font-mono text-xs space-y-2 transition-colors">
              <div className="flex justify-between text-slate-700 dark:text-purple-200 transition-colors"><span>Sewa Paket:</span><span>{formatRupiah(hargaSewa)}</span></div>
              <div className="flex justify-between text-slate-700 dark:text-purple-200 transition-colors"><span>Ongkir ({jarakKm} KM):</span><span className="text-[#ff007f] font-bold">{biayaOngkir === 0 ? 'GRATIS' : formatRupiah(biayaOngkir)}</span></div>
              <div className="flex justify-between text-base font-black text-purple-900 dark:text-[#00f0ff] pt-2 border-t border-purple-200 dark:border-purple-900 transition-colors"><span>TOTAL ESTIMASI:</span><span>{formatRupiah(totalBiaya)}</span></div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-3 md:py-4 rounded-xl font-black text-[11px] md:text-sm bg-gradient-to-r from-[#ff007f] to-purple-600 text-white flex justify-center items-center gap-2 md:gap-3 shadow-lg border border-white/20 mb-8 md:mb-0"
            >
              <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5 fill-current shrink-0" /> 
              <span className="leading-tight text-center">KONFIRMASI BOOKING VIA WHATSAPP</span>
            </motion.button>
          </form>
        </div>
      </section>

      {/* =========================================================
         6. FAQ ACCORDION
         ========================================================= */}
      <section className="py-12 px-4 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 space-y-1 relative z-10">
          <p className="text-[#00f0ff] font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-marker), cursive" }}>PERTANYAAN UMUM</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase text-slate-900 dark:text-white tracking-wide transition-colors" style={{ fontFamily: "var(--font-teko), sans-serif" }}>
            FREQUENTLY ASKED <span className="text-[#ff007f]">QUESTIONS</span>
          </h2>
        </div>

        <div className="space-y-3 relative z-10">
          {faqList.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="rounded-xl bg-white dark:bg-[#140a28] border border-purple-200 dark:border-purple-900 overflow-hidden shadow-sm transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 dark:text-white flex justify-between items-center gap-4 hover:text-[#00f0ff] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#ff007f]" /> : <ChevronDown className="w-5 h-5 text-[#00f0ff]" />}
                </button>
                {isOpen && <div className="px-4 pb-4 text-xs text-slate-600 dark:text-purple-300 border-t border-purple-100 dark:border-purple-900/60 pt-3 leading-relaxed transition-colors">{faq.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
         7. FOOTER LENGKAP DENGAN ALAMAT & LOKASI GOOGLE MAPS
         ========================================================= */}
      <footer className="py-10 border-t border-purple-200 dark:border-purple-950 relative z-10 bg-white/50 dark:bg-[#0b0416]/50 backdrop-blur-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 space-y-6 text-center">
          
          {/* Informasi Lokasi Basecamp Lengkap */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-500/40 text-xs font-mono text-purple-900 dark:text-[#00f0ff] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#ff007f]" />
              <span>LOKASI AKIBA CORE</span>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug max-w-lg mx-auto transition-colors">
              Sebrang Jombang Business Center, Jl. Nurul Ikhlas Jl. Jombang Masjid, Jombang Wetan, Kec. Jombang, Kota Cilegon, Banten
            </p>
            <p className="text-xs text-slate-500 dark:text-purple-300 max-w-md mx-auto leading-relaxed transition-colors">
              Layanan Antar-Jemput Sewa Playbox PS4 Pro Area Cilegon, Serang & Sekitarnya (Gratis Ongkir ≤ 5 KM).
            </p>

            <a
              href={`https://maps.app.goo.gl/zwD8bzy81csQ2yLB8`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00f0ff] hover:underline pt-1"
            >
              <span>📍 Buka Petunjuk Arah di Google Maps</span>
            </a>
          </div>

             {/* Box Rincian Jam Operasional */}
            <div className="inline-block p-3 rounded-xl bg-purple-100/70 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-xs text-slate-800 dark:text-purple-200 text-center space-y-1">
              <div className="font-bold flex items-center justify-center gap-1 text-[#ff007f] text-[9px] md:text-xs">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>JAM OPERASIONAL & BUKA TUTUP</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 font-mono text-[9px] md:text-[11px] justify-center">
                <span>🗓️ {JAM_WEEKDAY}</span>
                <span>🔥 {JAM_WEEKEND}</span>
              </div>
            </div>

          <hr className="border-purple-200 dark:border-purple-900/50 max-w-xs mx-auto" />

          {/* Tautan Media Sosial Resmi dengan Ikon SVG di Footer */}
          <div className="flex justify-center items-center gap-6 font-bold text-xs text-slate-700 dark:text-purple-300 transition-colors">
            {/* WhatsApp Footer */}
            <a 
              href="https://wa.me/6285121263131"
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-500 flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-500" /> WhatsApp
            </a>
            
            {/* Instagram Footer - URL diperbaiki */}
            <a 
              href="https://www.instagram.com/akibacore.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-pink-500 flex items-center gap-1.5 transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500" /> Instagram
            </a>
            
            {/* TikTok Footer */}
            <a 
              href="https://tiktok.com/@akibacore7" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#00f0ff] flex items-center gap-1.5 transition-colors"
            >
              <TikTokIcon className="w-4 h-4 text-slate-900 dark:text-[#00f0ff]" /> TikTok
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate-500 dark:text-purple-400 font-mono transition-colors">
            © 2026 AKIBA CORE • All Rights Reserved
          </p>

        </div>
      </footer>
    </main>
  );
}