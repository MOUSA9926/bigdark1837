import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Clock, Target, Crown, Building2, Users, Swords, Zap, AlertTriangle, ArrowDown, Youtube, ListChecks, Music, Pause, Play, X, PawPrint, Loader2, Globe, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { WolfEye, BackgroundTheme } from "../components/BackgroundTheme";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLanguage } from "../lib/i18n";

const kingsLeaders = ["Percival", "no time"];
const towerLeaders = ["云公馆", "보단이", "LanceHiro"];
const kingsSupporters = ["Venus S2", "Avatar", "Ally", "ゆきちゃん", "Jharoth", "Asif", "Mineaw", "Desperado", "Sona", "RedDotz", "DNA", "MOUSA", "『σXσ』", "梁小凱", "Alaz", "Ꮢᴇᴅ〆Evɪʟ"];
const towerSupporters = ["NATi", "Polar Bear", "دحوم", "DARK", "kondom bocor", "Gulu_Gulu", "Ahmed", "Dracula", "02AB", "QryptoxX", "Dratharox", "Brigade", "오징어게임", "Batman", "F5M", "sang", "MAGO", "KingArthur", "Chaos", "AlfonsoG", "ADY", "LaShawna", "RoboticLoger"];

const warLeaders = [
  { name: "云公馆", gradient: "from-orange-500 to-orange-700" },
  { name: "LanceHiro", gradient: "from-gray-600 to-gray-800" },
  { name: "no time", gradient: "from-cyan-500 to-cyan-700" },
  { name: "Percival", gradient: "from-cyan-500 to-cyan-700" },
  { name: "Venus S2", gradient: "from-gray-600 to-gray-800" },
  { name: "보단이", gradient: "from-orange-500 to-orange-700" },
];

const characterAvatars: Record<string, string> = {
  "no time": "https://got-global-avatar.akamaized.net/avatar/2026/04/20/z5ZJ8y_1776714284.png",
  "Percival": "https://got-global-avatar.akamaized.net/avatar/2026/03/26/gKzvoG_1774564335.png",
  "LanceHiro": "https://got-global-avatar.akamaized.net/avatar/2026/05/06/gKmyYG_1778025634.png",
  "Avatar": "https://got-global-avatar.akamaized.net/avatar/2026/04/07/pKMBky_1775547583.png",
  "Venus S2": "https://got-global-avatar.akamaized.net/avatar/2026/03/26/m6vZ8p_1774542997.png",
  "ゆきちゃん": "https://got-global-avatar.akamaized.net/avatar/2026/04/13/XwNqnv_1776104565.png",
  "Jharoth": "https://got-global-avatar.akamaized.net/avatar/2026/05/04/lLrgvM_1777925249.png",
  "云公馆": "https://got-global-avatar.akamaized.net/avatar/2026/03/24/m6vkYO_1774349810.png",
  "보단이": "https://got-global-avatar.akamaized.net/avatar/2026/03/23/oKL14K_1774259025.png",
  "بو دان": "https://got-global-avatar.akamaized.net/avatar/2026/03/23/oKL14K_1774259025.png", // just keeping existing structure if needed, the lines above have "보단이" etc.
  "Ally": "https://got-global-avatar.akamaized.net/avatar/2026/03/28/6yO5VN_1774724294.png",
  "Ymfalex115": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "stratusjmd": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "تشينكو": "https://www.kingshotguide.org/images/heroes/chenko.webp",
  "هاورد": "https://got-global-wiki.s3.us-west-1.amazonaws.com/wp-content/uploads/2025/10/%E7%B4%AB%E3%80%90.png",
  "Howard": "https://got-global-wiki.s3.us-west-1.amazonaws.com/wp-content/uploads/2025/10/%E7%B4%AB%E3%80%90.png",
  "جورودن": "https://www.allclash.com/wp-content/uploads/2025/03/Screenshot-111.png",
  "Gordon": "https://www.allclash.com/wp-content/uploads/2025/03/Screenshot-111.png",
  "Asif": "https://got-global-avatar.akamaized.net/avatar/2026/04/29/KB36jn_1777486506.png",
  "Mineaw": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1004.png",
  "Desperado": "https://got-global-avatar.akamaized.net/avatar/2026/05/04/r5OKLE_1777906209.png",
  "Sona": "https://got-global-avatar.akamaized.net/avatar/2026/03/20/v5G9N0_1774049643.png",
  "RedDotz": "https://got-global-avatar.akamaized.net/avatar/2026/04/22/Nj3x2L_1776880956.png",
  "DNA": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1002.png",
  "NATi": "https://got-global-avatar.akamaized.net/avatar/2026/04/10/Ao4l31_1775844983.png",
  "Polar Bear": "https://got-global-avatar.akamaized.net/avatar/2026/04/08/jMDK45_1775610465.png",
  "دحوم": "https://got-global-avatar.akamaized.net/avatar/2026/03/20/1qRq1j_1773968963.png",
  "DARK": "https://got-global-avatar.akamaized.net/avatar/2026/03/20/kKqvAX_1773969639.png",
  "梁小凱": "https://got-global-avatar.akamaized.net/avatar/2026/03/27/1qR7lP_1774583756.png",
  "Alaz": "https://got-global-avatar.akamaized.net/avatar/2026/04/17/0pQE65_1776455082.png",
  "kondom bocor": "https://got-global-avatar.akamaized.net/avatar/2026/04/14/q5Nzgy_1776204173.png",
  "Gulu_Gulu": "https://got-global-avatar.akamaized.net/avatar/2026/04/29/Ev38W4_1777451644.png",
  "Ahmed": "https://got-global-avatar.akamaized.net/avatar/2026/04/28/v5V6Jm_1777413346.png",
  "Dracula": "https://got-global-avatar.akamaized.net/avatar/2026/04/06/8A400m_1775437639.png",
  "『σXσ』": "https://got-global-avatar.akamaized.net/avatar/2026/04/29/8A4PXW_1777475885.png",
  "02AB": "https://got-global-avatar.akamaized.net/avatar/2026/03/24/lLrw9j_1774315145.png",
  "QryptoxX": "https://got-global-avatar.akamaized.net/avatar/2026/05/06/Dr4VV6_1778078622.png",
  "Dratharox": "https://got-global-avatar.akamaized.net/avatar/2026/04/17/gKzAgZ_1776384184.png",
  "Brigade": "https://got-global-avatar.akamaized.net/avatar/2026/04/24/Gx30yy_1777019429.png",
  "오징어게임": "https://got-global-avatar.akamaized.net/avatar/2026/03/19/Gx4W8r_1773891374.png",
  "Batman": "https://got-global-avatar.akamaized.net/avatar/2026/04/27/8A4RW5_1777307535.png",
  "F5M": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1011.png",
  "sang": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "MAGO": "https://got-global-avatar.akamaized.net/avatar/2026/04/22/nXKVmp_1776888790.png",
  "KingArthur": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "Chaos": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1005.png",
  "AlfonsoG": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1033.png",
  "ADY": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1032.png",
  "LaShawna": "https://got-global-avatar.akamaized.net/avatar/2026/03/27/Ao4xBP_1774653131.png",
  "RoboticLoger": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "Ꮢᴇᴅ〆Evɪʟ": "https://got-global-avatar.akamaized.net/avatar/2026/04/21/LD42qA_1776793734.png",
  "MOUSA": "https://got-global-avatar.akamaized.net/avatar/2026/04/21/Mg4N4m_1776752064.png",
  "hank": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "Idle": "https://got-global-avatar.akamaized.net/avatar/2026/05/06/w5W66z_1778106583.png",
  "King Strong": "https://got-global-avatar.akamaized.net/avatar-dev/2023/07/17/1001.png",
  "Esrarengiz": "https://got-global-avatar.akamaized.net/avatar/2026/05/05/Gx4ky8_1777996107.png"
};

const pieData = [
  { name: 'مشاة', value: 60, color: '#3b82f6' }, // blue-500
  { name: 'فرسان', value: 20, color: '#f97316' }, // orange-500
  { name: 'رماة', value: 20, color: '#22c55e' }, // green-500
];

const attackPieData = [
  { name: 'مشاة', value: 50, color: '#3b82f6' }, // blue-500
  { name: 'فرسان', value: 20, color: '#f97316' }, // orange-500
  { name: 'رماة', value: 30, color: '#22c55e' }, // green-500
];


const CharacterCard = ({ name, gradient, size = "normal" }: { name: string, gradient: string, size?: "normal" | "small" }) => {
  const initial = typeof name === 'string' && name.length > 0 ? name[0] : '?';
  const avatarUrl = characterAvatars[name];
  
  if (size === "small") {
    return (
      <div className="flex flex-col items-center gap-1 p-1 sm:p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 w-full shrink-0">
        <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-[10px] bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md border border-white/20 overflow-hidden`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className="text-sm sm:text-lg font-bold text-white drop-shadow-md">{initial.toUpperCase()}</span>
          )}
        </div>
        <span className="text-[9px] sm:text-xs text-center font-medium text-gray-200 truncate w-full px-0.5" title={name}>{name}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5 p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300 w-[80px] sm:w-[90px] shrink-0">
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg border border-white/20 overflow-hidden`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="text-lg sm:text-xl font-bold text-white drop-shadow-md">{initial.toUpperCase()}</span>
        )}
      </div>
      <span className="text-[11px] sm:text-xs text-center font-medium text-gray-200 truncate w-full" title={name}>{name}</span>
    </div>
  );
};

const HeroCard = ({ name }: { name: string }) => {
  const avatarUrl = characterAvatars[name];
  
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 bg-[#121316] rounded-2xl border border-white/5 w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] shrink-0 shadow-lg hover:bg-[#16181b] transition-colors duration-300">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-dashed border-gray-600/70 flex items-center justify-center ${avatarUrl ? 'bg-transparent overflow-hidden border-none' : 'bg-transparent'} shrink-0`}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" strokeWidth={1.5} />
        )}
      </div>
      <span className="text-sm sm:text-base font-bold text-white drop-shadow-md">{name}</span>
    </div>
  );
};

const LoginGate = ({ onLogin }: { onLogin: () => void }) => {
  const [state, setState] = useState<'initial' | 'inputting' | 'verifying' | 'error' | 'success'>('initial');
  const [password, setPassword] = useState('');
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (state === 'inputting' && password === '' && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setState('initial');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state, password]);

  useEffect(() => {
    if (state === 'inputting') {
      inputRef.current?.focus();
    }
  }, [state]);

  const isInputState = state !== 'initial';

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!password) return;
    setState('verifying');
    try {
      await signInWithEmailAndPassword(auth, "19omg20@gmail.com", password);
      setState('success');
      setTimeout(() => {
         onLogin();
      }, 500);
    } catch (err) {
      setState('error');
      setTimeout(() => {
        setState('inputting');
        setPassword('');
        inputRef.current?.focus();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center relative z-[60] w-full mt-6 justify-center h-[55px]">
      <motion.form
        ref={containerRef}
        animate={{ 
          width: isInputState ? 280 : 215,
          backgroundColor: isInputState ? '#121316' : '#18181b'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onSubmit={handleLogin}
        onClick={() => { if (!isInputState) setState('inputting'); }}
        className={`relative flex items-center h-[54px] rounded-[18px] ${isInputState ? 'border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'shadow-lg cursor-pointer hover:bg-[#1f1f23]'} transition-colors duration-300 overflow-hidden`}
        dir="ltr"
      >
        {/* Colorful edges for initial state */}
        {!isInputState && (
          <div className="absolute inset-0 rounded-[18px] pointer-events-none z-20 shadow-[inset_1.5px_0_0_rgba(34,211,238,0.5),inset_-1.5px_0_0_rgba(249,115,22,0.5),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(255,255,255,0.05),inset_8px_0_20px_rgba(34,211,238,0.1),inset_-8px_0_20px_rgba(249,115,22,0.1)]" />
        )}

        {/* ICON ON THE LEFT */}
        <div className={`absolute left-0 top-0 bottom-0 w-[70px] flex items-center justify-center z-10 transition-colors pointer-events-none ${!isInputState ? 'bg-[#121214]' : ''}`}>
            {state === 'verifying' ? (
               <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-spin" />
            ) : state === 'success' ? (
               <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
            ) : state === 'error' ? (
               <PawPrint className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
            ) : (
               <PawPrint className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${isInputState ? (password.length > 0 ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'text-gray-400') : 'text-[#8ba2b8]'}`} />
            )}
        </div>

        {/* Separator line (only in initial state) */}
        {!isInputState && (
          <div className="absolute left-[70px] top-px bottom-px w-px bg-white/5 z-0" />
        )}

        {/* Text for initial state */}
        <div 
          className={`absolute inset-0 left-[70px] flex items-center justify-center font-bold text-white tracking-wide pointer-events-none transition-opacity duration-300 ${!isInputState ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-[16px] sm:text-[17px] whitespace-nowrap drop-shadow-sm text-[#e4e4e7]">{t('login')}</span>
        </div>

        {/* Input for typing */}
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('password_placeholder')}
          disabled={!isInputState}
          className={`w-full h-full bg-transparent text-white pl-[70px] pr-12 outline-none transition-opacity duration-300 text-right opacity-0 ${isInputState ? 'opacity-100 pointer-events-auto' : 'pointer-events-none'}`}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        />

        {/* Submit arrow on the RIGHT when typing */}
        <div 
          className={`absolute right-1 top-0 bottom-0 w-12 flex items-center justify-center z-10 transition-opacity duration-300 ${isInputState ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <button
            type="submit"
            disabled={!isInputState || password.length === 0}
            className={`w-8 h-8 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${password.length > 0 ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/40 hover:scale-110 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-gray-600'}`}
          >
             <ArrowDown className="w-4 h-4 rotate-[135deg]" />
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const wasPlayingBeforeModal = useRef(false);
  const hasInteractedRef = useRef(false);
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openYoutubeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsYoutubeModalOpen(true);
    if (audioRef.current) {
      if (isPlaying) {
        wasPlayingBeforeModal.current = true;
      }
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeYoutubeModal = () => {
    setIsYoutubeModalOpen(false);
    if (wasPlayingBeforeModal.current && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      wasPlayingBeforeModal.current = false;
    }
  };

  useEffect(() => {
    if (isYoutubeModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isYoutubeModalOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio && !hasInteractedRef.current && !isYoutubeModalOpen) {
      audio.play().then(() => {
        setIsPlaying(true);
        hasInteractedRef.current = true;
      }).catch(() => {
        // Autoplay prevented by browser
      });
    }

    const handleFirstInteraction = () => {
      if (hasInteractedRef.current || isYoutubeModalOpen) return;
      
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          hasInteractedRef.current = true;
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchend', handleFirstInteraction);
          window.removeEventListener('keydown', handleFirstInteraction);
        }).catch((e) => {
           console.log("Audio play failed on interaction:", e);
        });
      }
    };

    if (!hasInteractedRef.current) {
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchend', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchend', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isYoutubeModalOpen]);

  const togglePlay = () => {
    hasInteractedRef.current = true;
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  return (
    <BackgroundTheme>
      <main className="min-h-screen flex flex-col items-center justify-start relative overflow-x-hidden pb-20 pt-16 sm:pt-24 lg:pt-32">
        {/* Floating Top Bar (Player & Language) */}
        <div className="fixed top-0 inset-x-0 z-[100] bg-[#080b0f]/90 backdrop-blur-md border-b border-white/5 shadow-sm">
          <div className="w-full h-9 flex items-center justify-between mx-auto max-w-7xl px-4 lg:px-8">
            {/* Music Player */}
            <button 
              onClick={togglePlay}
              className="flex items-center gap-2 group h-full"
              title={isPlaying ? t('music_stop') : t('music_play')}
            >
              <div className={`transition-all duration-300 ${isPlaying ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'}`}>
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </div>
              <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                {isPlaying ? t('music') : t('music_play')}
              </span>
              {isPlaying && (
                <div className={`flex items-end h-2.5 gap-[2px] opacity-80 ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
                  <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }} className="w-0.5 bg-cyan-400 rounded-none" />
                  <motion.div animate={{ height: ["100%", "30%", "100%"] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }} className="w-0.5 bg-cyan-400 rounded-none" />
                  <motion.div animate={{ height: ["60%", "100%", "60%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }} className="w-0.5 bg-cyan-400 rounded-none" />
                </div>
              )}
            </button>

            {/* Language Selector */}
            <div className="relative h-full flex items-center" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center justify-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all group scale-95"
                dir="ltr"
              >
                <Globe className="w-3 h-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-[10px] font-bold tracking-widest uppercase">{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 ${language === 'ar' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} bg-[#121316]/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[120px] z-[120]`}
                    dir="ltr"
                  >
                    <div className="flex flex-col py-1">
                      <button
                        onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'en' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => { setLanguage('ar'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'ar' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        العربية
                      </button>
                      <button
                        onClick={() => { setLanguage('ko'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'ko' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        한국어
                      </button>
                      <button
                        onClick={() => { setLanguage('tr'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'tr' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        Türkçe
                      </button>
                      <button
                        onClick={() => { setLanguage('zh'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'zh' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        简体中文
                      </button>
                      <button
                        onClick={() => { setLanguage('pt'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'pt' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        Português
                      </button>
                      <button
                        onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors ${language === 'es' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        Español
                      </button>
                      <button
                        onClick={() => { setLanguage('id'); setIsLangMenuOpen(false); }}
                        className={`flex items-center px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors whitespace-nowrap ${language === 'id' ? 'text-cyan-400 bg-white/5' : 'text-gray-300'}`}
                      >
                        Indonesia
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <audio 
          ref={audioRef} 
          src="https://files.catbox.moe/hwkxvf.mp3" 
          autoPlay
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = 1.5;
          }}
          onEnded={(e) => {
            e.currentTarget.currentTime = 1.5;
            e.currentTarget.play().catch(console.error);
          }}
          style={{ display: 'none' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center h-full w-full">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
            {/* Eyes and Shield Section */}
            <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-14 mb-8 w-full max-w-4xl mx-auto" dir="ltr">
              <div className="translate-y-4 sm:translate-y-8 md:translate-y-12">
                <WolfEye theme="ice" position="left" />
              </div>
              
              <div className="flex items-center justify-center h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 rounded-full bg-black/40 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10 mx-2 sm:mx-6 p-2">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-orange-500/20" />
                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-cyan-500/20" />
                <img src="https://i.ibb.co/DDLS4qdm/Picsart-26-05-08-07-08-21-213.png" alt="شعار التحالف" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>

              <div className="translate-y-4 sm:translate-y-8 md:translate-y-12">
                <WolfEye theme="fire" position="right" />
              </div>
            </div>
            
            {/* Title Section */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative inline-block" dir="ltr">
                <div 
                  className="absolute inset-0 text-7xl sm:text-8xl md:text-[10rem] font-black tracking-wider select-none text-transparent bg-clip-text blur-2xl opacity-70"
                  style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #ffffff, #f97316)' }}
                  aria-hidden="true"
                >
                  BiGDARK
                </div>
                <h1 
                  className="relative text-7xl sm:text-8xl md:text-[10rem] font-black tracking-wider drop-shadow-md select-none text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(to right, #22d3ee, #ffffff, #f97316)' }}
                >
                  BiGDARK
                </h1>
                <span className="hidden md:block absolute bottom-0 -right-24 text-4xl sm:text-5xl font-mono text-gray-400 opacity-80 italic translate-y-[-20%] drop-shadow-sm">
                  1837
                </span>
              </div>
              
              <div className="text-xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.6em] sm:tracking-[0.8em] mt-6 text-white/90 drop-shadow-md">
                ALLIANCE
              </div>

              <div className="md:hidden text-xl font-mono text-gray-400 opacity-80 italic mt-4">
                1837
              </div>

              {/* Authentication Gate */}
              {!isAuthenticated && (
                <LoginGate onLogin={() => setIsAuthenticated(true)} />
              )}

              <div className="w-full transition-all duration-1000">
                <div className="mt-8 sm:mt-12 relative flex flex-col items-center w-full">
                  <div className="relative inline-block mb-4">
                    <div className="text-2xl sm:text-3xl md:text-5xl whitespace-nowrap font-black text-white pb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      {t('king_castle_plan')}
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
                  </div>
                </div>
                
                {!isAuthenticated ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col items-center text-center mt-2 mb-20"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 blur-xl opacity-50 rounded-2xl" />
                    
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                    
                    <div className="w-20 h-20 bg-[#121316] rounded-2xl border border-white/10 flex items-center justify-center mb-6 shadow-xl relative z-10 rotate-3 hover:rotate-0 transition-all duration-300 group">
                       <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 drop-shadow-md relative z-10">
                      {t('plan_protected')}
                    </h2>
                    
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-medium relative z-10">
                      {t('need_login')}
                    </p>

                    <div className="bg-[#121316]/80 border border-white/5 py-4 px-6 rounded-xl w-full relative z-10 shadow-inner">
                      <p className="text-sm sm:text-base text-gray-400 font-medium tracking-wide leading-relaxed">
                        {t('ask_password')}
                        <span className="block mt-2 text-xl font-black text-orange-400 tracking-widest drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">MOUSA</span>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="relative flex flex-col items-center w-full">
                      <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-6 w-full max-w-2xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {/* Decorative background glow */}
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  {/* Decorative border gradients */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className={`text-xl sm:text-2xl font-black text-white mb-5 relative drop-shadow-md text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>{t('intro')}</h2>
                  
                  <div className="space-y-4 relative">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                        <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                          <Clock className="w-5 h-5" />
                        </div>
                        <p className="text-base sm:text-lg text-gray-200 font-medium leading-tight">
                          {t('battle_duration')} <span className="font-bold text-cyan-400 ml-1">{t('5_hours')}</span>
                        </p>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                        <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                          <Target className="w-5 h-5" />
                        </div>
                        <p className="text-base sm:text-lg text-gray-200 font-medium leading-tight">
                          <span className="font-bold text-orange-400">{t('required_time')}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 bg-amber-500/5 rounded-xl p-4 sm:p-5 border border-amber-500/10 hover:bg-amber-500/10 transition-colors duration-300 shadow-inner mb-4">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                           <ListChecks className="w-5 h-5" />
                         </div>
                         <h3 className="text-lg sm:text-xl font-bold text-amber-100">{t('important_instructions')}</h3>
                      </div>
                      <div className={`mt-1 pr-3 border-r-[3px] border-amber-500/30 ${language === 'en' ? 'pl-3 border-l-[3px] border-r-0 mr-0 ml-2' : 'mr-2'}`}>
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                                {t('instruction_1')}
                              </p>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                                {t('instruction_2')}
                              </p>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                                {t('instruction_3')}
                              </p>
                           </li>
                           <li className="flex flex-col gap-2">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                                  {t('instruction_4')}
                                </p>
                              </div>
                              <div className={`flex items-center gap-2 ${language === 'ar' ? 'mr-5' : 'ml-5'}`}>
                                <p className="text-xs sm:text-sm text-gray-400 font-medium">
                                  {t('instruction_5')}
                                </p>
                                <button 
                                  onClick={openYoutubeModal} 
                                  className="flex items-center justify-center shrink-0 w-8 h-8 bg-red-600/90 text-white hover:bg-red-500 hover:scale-105 rounded-full transition-all shadow-md"
                                  title="Youtube"
                                >
                                  <Youtube className={`w-4 h-4 ${language === 'ar' ? 'ml-0.5' : 'mr-0.5'}`} />
                                </button>
                              </div>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium">
                                <span className="font-bold text-amber-400">{t('heroes_replacement')}</span> {t('instruction_6')}
                              </p>
                           </li>
                        </ul>
                      </div>
                    </div>

                  <div className="flex flex-col gap-3 bg-red-500/5 rounded-xl p-4 sm:p-5 border border-red-500/10 hover:bg-red-500/10 transition-colors duration-300 shadow-inner">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 rounded-lg bg-red-500/20 text-red-500 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                           <Swords className="w-5 h-5" />
                         </div>
                         <h3 className="text-lg sm:text-xl font-bold text-red-100">{t('enemies')} <span className="text-gray-400 font-medium text-sm ml-2">{t('enemy_alliances')}</span></h3>
                      </div>
                      <div className="mt-4 space-y-6">
                        {/* DSN Alliance */}
                        <div>
                           <h4 className={`text-xl font-black text-red-400 mb-3 tracking-wider flex items-center ${language === 'ar' ? 'pr-3 border-r-[3px]' : 'pl-3 border-l-[3px]'} border-red-500/50`}>
                             {t('dsn_alliance')}
                           </h4>
                           <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 w-full mx-auto sm:mx-0">
                              <CharacterCard name="Ymfalex115" gradient="from-red-600 to-red-800" size="small" />
                              <CharacterCard name="hank" gradient="from-red-600 to-red-800" size="small" />
                           </div>
                           <p className="mt-3 text-sm sm:text-base text-gray-300 font-medium">
                             {language === 'ar' ? 'يمتلكون ' : 'They have '}<span className="text-red-400 font-bold">15</span> {t('t9_players')}
                           </p>
                        </div>

                        {/* KGM Alliance */}
                        <div>
                           <h4 className={`text-xl font-black text-red-400 mb-3 tracking-wider flex items-center ${language === 'ar' ? 'pr-3 border-r-[3px]' : 'pl-3 border-l-[3px]'} border-red-500/50`}>
                             {t('kgm_alliance')}
                           </h4>
                           <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 w-full mx-auto sm:mx-0">
                              <CharacterCard name="Idle" gradient="from-red-600 to-red-800" size="small" />
                              <CharacterCard name="King Strong" gradient="from-red-600 to-red-800" size="small" />
                              <CharacterCard name="Esrarengiz" gradient="from-red-600 to-red-800" size="small" />
                           </div>
                           <p className="mt-3 text-sm sm:text-base text-gray-300 font-medium">
                             {language === 'ar' ? 'يمتلكون ' : 'They have '}<span className="text-red-400 font-bold">21</span> {t('t9_players')}
                           </p>
                        </div>

                        <div className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-red-500/20">
                           <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                           <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                             {t('whales_warning')}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-orange-500/10 via-transparent to-cyan-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className={`text-xl sm:text-2xl font-black text-white mb-8 relative drop-shadow-md text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>{t('main_formation')}</h2>
                  
                  <div className="space-y-8 relative">
                    {/* section 1 */}
                    <div>
                      <div className={`flex items-center gap-2 mb-4 justify-center sm:justify-start`}>
                        <Crown className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-lg font-bold text-cyan-50">{t('kings_castle_leaders')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        {kingsLeaders.map(name => (
                          <CharacterCard key={name} name={name} gradient="from-cyan-500 to-cyan-700" />
                        ))}
                      </div>
                    </div>

                    {/* section 2 */}
                    <div>
                      <div className={`flex items-center gap-2 mb-4 justify-center sm:justify-start`}>
                        <Building2 className="w-5 h-5 text-orange-400" />
                        <h3 className="text-lg font-bold text-orange-50">{t('tower_leaders')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        {towerLeaders.map(name => (
                          <CharacterCard key={name} name={name} gradient="from-orange-500 to-orange-700" />
                        ))}
                      </div>
                    </div>

                    {/* section 3 */}
                    <div>
                      <div className={`flex items-center gap-2 mb-4 justify-center sm:justify-start`}>
                        <Users className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-bold text-gray-100">{t('kings_castle_support')}</h3>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 w-full mx-auto sm:mx-0">
                        {kingsSupporters.map(name => (
                          <CharacterCard key={name} name={name} gradient="from-gray-600 to-gray-800" size="small" />
                        ))}
                      </div>
                      <div className="mt-6 bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-4 text-center shadow-inner">
                        <p className="text-cyan-200 text-sm sm:text-base font-semibold leading-relaxed">
                          <span className="text-cyan-400 font-bold block mb-1">{t('important_note')}</span>
                          {t('kings_support_note')}
                        </p>
                      </div>
                    </div>

                    {/* section 4 */}
                    <div className="pt-4 border-t border-white/10">
                      <div className={`flex items-center gap-2 mb-4 justify-center sm:justify-start`}>
                        <Shield className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-bold text-gray-100">{t('tower_support')}</h3>
                      </div>
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 w-full mx-auto sm:mx-0">
                        {towerSupporters.map(name => (
                          <CharacterCard key={name} name={name} gradient="from-gray-600 to-gray-800" size="small" />
                        ))}
                      </div>
                    </div>

                    {/* section 5 */}
                    <div className="pt-6 border-t border-white/10 flex flex-col items-center">
                      <div className="mb-4">
                        <CharacterCard name="no time" gradient="from-cyan-500 to-cyan-700" />
                      </div>
                      <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-4 text-center shadow-inner w-full">
                        <p className="text-purple-200 text-sm sm:text-base font-semibold leading-relaxed">
                          <span className="text-purple-400 font-bold block mb-1">{t('mobile_role')}</span>
                          {t('no_time_role')}
                        </p>
                      </div>
                    </div>

                    {/* section 5.5 */}
                    <div className="pt-6 mt-4 border-t border-white/10 flex flex-col items-center">
                      <div className="mb-4">
                        <CharacterCard name="LanceHiro" gradient="from-purple-500 to-purple-700" />
                      </div>
                      <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-4 text-center shadow-inner w-full">
                        <p className="text-blue-200 text-sm sm:text-base font-semibold leading-relaxed">
                          <span className="text-blue-400 font-bold block mb-1">{t('mobile_role')}</span>
                          {t('lancehiro_role')}
                        </p>
                      </div>
                    </div>

                    {/* section 6 */}
                    <div className="pt-4 mt-2 border-t border-white/10 flex flex-col items-center">
                       <div className="bg-orange-950/30 border border-orange-500/20 rounded-xl p-4 text-center shadow-inner w-full">
                         <p className="text-orange-200 text-sm sm:text-base font-semibold leading-relaxed">
                           <span className="text-orange-400 font-bold block mb-1">{t('important_alert')}</span>
                           {t('spread_out_alert')}
                         </p>
                       </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-8 relative drop-shadow-md text-center">{t('player_placement')}</h2>
                  
                  <div className={`relative flex flex-col items-center transition-all duration-1000 ${!isAuthenticated ? 'blur-xl opacity-30' : ''}`}>
                    <div className="w-full">
                      <div className="flex flex-col items-center gap-3 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-100 text-sm font-bold shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                          <Swords className="w-4 h-4 text-cyan-400" />
                          <span>{t('front_seats')}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400">{t('mid_seats')}</p>
                      </div>
                      
                      <div className="grid grid-cols-6 gap-1 sm:gap-3 w-full max-w-2xl mx-auto">
                        {warLeaders.map((leader, i) => (
                          <CharacterCard key={i} name={leader.name} gradient={leader.gradient} size="small" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* رسم بياني لتمركز اللاعبين */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-8 relative drop-shadow-md text-center">{t('placement_chart')}</h2>
                  
                  <div className={`relative w-full h-[400px] sm:h-[480px] bg-[#121316]/80 rounded-2xl border border-white/5 mx-auto max-w-2xl shadow-inner overflow-hidden transition-all duration-1000 ${!isAuthenticated ? 'blur-xl opacity-30' : ''}`}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {/* Castle */}
                    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-950/80 border-2 border-emerald-500 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] flex flex-col items-center justify-center z-10 transition-transform hover:scale-105">
                      <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 mb-1 sm:mb-2 drop-shadow-lg" />
                      <span className="text-emerald-100 font-bold text-[10px] sm:text-sm">{t('king_castle')}</span>
                    </div>

                    {/* Towers */}
                    <div className={`absolute top-[10%] ${language === 'ar' ? 'right-[8%] sm:right-[15%]' : 'left-[8%] sm:left-[15%]'} w-14 h-14 sm:w-20 sm:h-20 bg-blue-950/80 border-2 border-blue-500/50 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg`}>
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 mb-1" />
                      <span className="text-blue-100 font-bold text-[8px] sm:text-xs text-center leading-tight whitespace-pre-line">{t('north_tower')}</span>
                    </div>
                    <div className={`absolute top-[10%] ${language === 'ar' ? 'left-[8%] sm:left-[15%]' : 'right-[8%] sm:right-[15%]'} w-14 h-14 sm:w-20 sm:h-20 bg-orange-950/80 border-2 border-orange-500/50 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg`}>
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-orange-400 mb-1" />
                      <span className="text-orange-100 font-bold text-[8px] sm:text-xs text-center leading-tight whitespace-pre-line">{t('west_tower')}</span>
                    </div>
                    <div className={`absolute top-[55%] ${language === 'ar' ? 'right-[8%] sm:right-[15%]' : 'left-[8%] sm:left-[15%]'} w-14 h-14 sm:w-20 sm:h-20 bg-red-950/80 border-2 border-red-500/50 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg`}>
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-red-400 mb-1" />
                      <span className="text-red-100 font-bold text-[8px] sm:text-xs text-center leading-tight whitespace-pre-line">{t('east_tower')}</span>
                    </div>
                    <div className={`absolute top-[55%] ${language === 'ar' ? 'left-[8%] sm:left-[15%]' : 'right-[8%] sm:right-[15%]'} w-14 h-14 sm:w-20 sm:h-20 bg-purple-950/80 border-2 border-purple-500/50 rounded-lg flex flex-col items-center justify-center z-10 shadow-lg`}>
                      <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400 mb-1" />
                      <span className="text-purple-100 font-bold text-[8px] sm:text-xs text-center leading-tight whitespace-pre-line">{t('south_tower')}</span>
                    </div>

                    {/* Players */}
                    <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center z-20">
                      <div className="grid grid-cols-6 gap-1 w-max max-w-[95%] px-1">
                        {warLeaders.map((leader, i) => (
                          <CharacterCard key={i} name={leader.name} gradient={leader.gradient} size="small" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('troop_positioning')}</h2>
                  
                  <div className="space-y-4 relative">
                    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="p-2 sm:p-3 rounded-lg bg-red-500/20 text-red-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                        <Swords className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-red-100 mb-1">{t('behind_war_leaders')}</h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {t('nineth_level_troops')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="p-2 sm:p-3 rounded-lg bg-orange-500/20 text-orange-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-lg sm:text-xl font-bold text-orange-100 mb-1">{t('second_line')}</h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {t('eighth_level_troops')}
                        </p>
                        <span className="text-xs text-gray-500 mt-1">{t('tower_support_desc')}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="p-2 sm:p-3 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-lg sm:text-xl font-bold text-cyan-100 mb-1">{t('third_line')}</h4>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                          {t('seventh_level_troops')}
                        </p>
                        <span className="text-xs text-red-500 font-bold mt-1">{t('no_king_castle')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('power_prep')}</h2>
                  
                  <div className="flex flex-col gap-6 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300 relative">
                    <div className="flex items-start gap-4">
                      <div className="p-2 sm:p-3 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="w-full">
                        <ul className="space-y-3 mt-1">
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('use_buffs')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('use_debuffs')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('mandatory_prep')}
                              </p>
                           </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-white/10">
                      {kingsLeaders.map(name => (
                        <CharacterCard key={name} name={name} gradient="from-cyan-500 to-cyan-700" />
                      ))}
                      {towerLeaders.map(name => (
                        <CharacterCard key={name} name={name} gradient="from-orange-500 to-orange-700" />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-red-950/30 border border-red-500/20 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-red-600/10 via-transparent to-orange-600/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('siege_alert')}</h2>
                  
                  <div className="flex items-start gap-4 bg-red-500/5 rounded-xl p-4 sm:p-5 border border-red-500/10 hover:bg-red-500/10 transition-colors duration-300 relative">
                    <div className="p-2 sm:p-3 rounded-lg bg-red-500/20 text-red-500 shrink-0 mt-1 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="w-full">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                            {t('dsn_trick')}
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                            {t('dsn_trick_desc')}
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                          <p className="text-sm sm:text-base text-red-300 leading-relaxed font-medium">
                            {t('dsn_trick_desc_2')}
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                          <p className="text-sm sm:text-base text-red-300 leading-relaxed font-medium">
                            {t('dsn_trick_desc_3')}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-20 sm:mt-28 relative flex flex-col items-center w-full">
                <div className="relative inline-block">
                  <div className="text-2xl sm:text-3xl md:text-4xl whitespace-nowrap font-black text-white pb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {t('battle_start')}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_2px_rgba(34,211,238,0.6)]" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="mt-12 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-8 relative drop-shadow-md text-center">{t('entry_race')}</h2>
                  
                  <div className="flex flex-col items-center relative gap-4 sm:gap-6 py-6 border border-white/5 bg-white/5 rounded-2xl">
                    <p className="text-sm sm:text-base text-gray-200 text-center px-4 max-w-2xl font-medium mb-4">
                      {t('entry_race_desc')}
                    </p>

                    <div className="flex justify-center gap-12 sm:gap-32 relative z-10 w-full mb-8">
                      <CharacterCard name="no time" gradient="from-cyan-500 to-cyan-700" size="normal" />
                      <CharacterCard name="Percival" gradient="from-cyan-500 to-cyan-700" size="normal" />
                    </div>
                    
                    {/* SVG Data Structure Connection Lines */}
                    <div className="absolute top-[130px] sm:top-[140px] left-0 w-full h-24 pointer-events-none flex justify-center opacity-70">
                      <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <path d="M 120 0 Q 120 50 200 100" fill="none" stroke="url(#cyan-glow)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
                        <path d="M 280 0 Q 280 50 200 100" fill="none" stroke="url(#cyan-glow)" strokeWidth="3" strokeDasharray="6 6" className="animate-pulse" />
                        <defs>
                          <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10 bg-black/60 p-3 sm:p-4 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                      <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                      <span className="font-bold text-cyan-100 text-sm sm:text-base">{t('king_castle')}</span>
                    </div>

                    <div className="mt-6 flex items-start gap-4 bg-orange-500/5 rounded-xl p-4 sm:p-5 border border-orange-500/20 max-w-2xl mx-4 sm:mx-8">
                       <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0 mt-0.5" />
                       <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                         {t('ymfalex_warning')}
                       </p>
                    </div>

                    {/* احتلال الابراج */}
                    <div className="mt-8 w-full max-w-4xl mx-auto px-4 sm:px-8">
                      <h3 className="text-lg sm:text-xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('tower_occupation')}</h3>
                      <div className={`space-y-4 relative w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                          <div className="shrink-0 flex items-center justify-center gap-2">
                            <CharacterCard name="보단이" gradient="from-orange-500 to-orange-700" />
                          </div>
                          <div className={`flex-1 mt-2 sm:mt-0 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
                            <div className={`flex items-center justify-center sm:justify-start gap-2 mb-3`}>
                               <Shield className="w-5 h-5 text-orange-400" />
                               <h4 className="text-base sm:text-lg font-bold text-orange-100 whitespace-pre-line">{t('south_tower')}</h4>
                            </div>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                              {t('boda_role')}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                          <div className="shrink-0 flex items-center justify-center gap-3">
                            <CharacterCard name="云公馆" gradient="from-orange-500 to-orange-700" />
                          </div>
                          <div className={`flex-1 mt-2 sm:mt-0 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
                            <div className={`flex items-center justify-center sm:justify-start gap-2 mb-3`}>
                               <Target className="w-5 h-5 text-yellow-400" />
                               <h4 className="text-base sm:text-lg font-bold text-yellow-100 whitespace-pre-line">{t('east_tower')}</h4>
                            </div>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                              {t('yun_role')}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                          <div className="shrink-0 flex items-center justify-center gap-3">
                            <CharacterCard name="LanceHiro" gradient="from-gray-600 to-gray-800" />
                          </div>
                          <div className={`flex-1 mt-2 sm:mt-0 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
                            <div className={`flex items-center justify-center sm:justify-start gap-2 mb-3`}>
                               <Zap className="w-5 h-5 text-purple-400" />
                               <h4 className="text-base sm:text-lg font-bold text-purple-100">LanceHiro</h4>
                            </div>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                               {t('lancehiro_strat')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('percival_command')}</h2>
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/5 rounded-xl p-5 sm:p-8 border border-white/5 relative">
                    
                    <div className="flex-1 space-y-6 w-full">
                      <p className={`text-sm sm:text-base text-gray-200 leading-relaxed ${language === 'ar' ? 'border-r-2 pr-4' : 'border-l-2 pl-4'} border-emerald-400`}>
                        {t('percival_strat')}
                      </p>
                      
                      <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                        <h4 className="text-sm font-bold text-gray-400 mb-4 text-center">{t('required_heroes')}</h4>
                        <div className="flex justify-center gap-4 flex-wrap">
                          <HeroCard name={t('howard')} />
                          <HeroCard name={t('jordan')} />
                        </div>
                      </div>

                      <div className="flex items-start gap-3 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-200 font-medium">
                          {t('percival_r5_control')}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-center bg-black/40 p-4 rounded-2xl border border-white/10 shadow-lg w-full md:w-auto">
                      <h4 className="text-sm font-bold text-white mb-3">{t('defense_formation')}</h4>
                      
                      <div className="h-32 w-32 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              dataKey="value"
                              stroke="none"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm drop-shadow-md">
                          100%
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 w-full justify-center text-xs sm:text-sm">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
                          <span className="text-gray-200">{t('infantry_60')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]"></div>
                          <span className="text-gray-200">{t('cavalry_20')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                          <span className="text-gray-200">{t('archers_20')}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.2 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-red-950/30 border border-red-500/20 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-red-600/10 via-transparent to-orange-600/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('plan_b_castle')}</h2>
                  
                  <div className="flex flex-col gap-6 items-center bg-red-500/5 rounded-xl p-5 sm:p-8 border border-red-500/10 hover:bg-red-500/10 transition-colors duration-300 relative">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium text-center max-w-2xl mt-2">
                      {t('plan_b_castle_desc')}
                    </p>
                    
                    <div className="flex justify-center gap-6 sm:gap-12 flex-wrap w-full">
                      <div className="flex flex-col items-center gap-3">
                        <CharacterCard name="no time" gradient="from-cyan-500 to-cyan-700" size="normal" />
                        <span className="text-xs text-red-300 bg-red-500/20 px-3 py-1 rounded-md border border-red-500/30 font-bold">{t('first_rally')}</span>
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <CharacterCard name="Percival" gradient="from-cyan-500 to-cyan-700" size="normal" />
                        <span className="text-xs text-red-300 bg-red-500/20 px-3 py-1 rounded-md border border-red-500/30 font-bold">{t('second_rally')}</span>
                      </div>
                    </div>

                    <div className="w-full max-w-xl mx-auto h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent my-2" />

                    <div className="flex flex-col items-center gap-4 w-full bg-purple-500/5 rounded-xl p-4 sm:p-6 border border-purple-500/10">
                      <p className="text-sm sm:text-base text-purple-200 leading-relaxed font-medium text-center">
                          {t('supported_by_9_10')}
                      </p>
                      <div className="flex flex-col items-center gap-3 mt-2">
                        <CharacterCard name="تشينكو" gradient="from-purple-500 to-purple-700" size="normal" />
                        <span className="text-xs text-purple-300 bg-purple-500/20 px-4 py-1.5 rounded-md border border-purple-500/30 font-bold">{t('main_hero_support')}</span>

                        <div className="mt-4 shrink-0 flex flex-col items-center bg-black/40 p-4 rounded-2xl border border-white/10 shadow-lg w-full max-w-sm">
                          <h4 className="text-sm font-bold text-white mb-3">{t('attack_formation')}</h4>
                          
                          <div className="h-32 w-32 relative">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={attackPieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={25}
                                  outerRadius={50}
                                  dataKey="value"
                                  stroke="none"
                                >
                                  {attackPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-sm drop-shadow-md">
                              100%
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-4 w-full justify-center text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
                              <span className="text-gray-200">{t('infantry_50')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_5px_#f97316]"></div>
                              <span className="text-gray-200">{t('cavalry_20')}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
                              <span className="text-gray-200">{t('archers_30')}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-center p-3 sm:p-4 bg-red-500/10 rounded-lg border border-red-500/20 w-full max-w-lg mb-2">
                      <p className="text-sm sm:text-base text-red-200 font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                        {t('plan_b_sure')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.6 }}
                  className="mt-8 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-red-500/10 via-transparent to-orange-500/10 blur-xl opacity-50 rounded-2xl" />
                  
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                  
                  <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('plan_b_towers')}</h2>
                  
                  <div className="space-y-4 relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="shrink-0 flex items-center justify-center gap-3">
                        <CharacterCard name="보단이" gradient="from-orange-500 to-orange-700" />
                        <CharacterCard name="云公馆" gradient="from-orange-500 to-orange-700" />
                        <CharacterCard name="LanceHiro" gradient="from-purple-500 to-purple-700" />
                      </div>
                      <div className={`flex-1 mt-2 sm:mt-0 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
                        <div className={`flex items-center justify-center sm:justify-start gap-2 mb-3`}>
                           <Swords className="w-5 h-5 text-red-400" />
                           <h4 className="text-base sm:text-lg font-bold text-red-100">{t('counter_attack')}</h4>
                        </div>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium mb-4">
                          {t('tower_rally_desc')}
                        </p>
                        <div className={`inline-block bg-white/5 rounded-lg p-3 sm:px-4 w-full border border-white/10 text-center ${language === 'ar' ? 'sm:text-right' : 'sm:text-left'}`}>
                          <p className={`text-xs sm:text-sm text-yellow-200/80 font-bold flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2`}>
                             <Shield className="w-4 h-4 text-yellow-400 shrink-0" />
                             {t('tower_buffs')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* NEW SECTION: تعليمات القيادة */}
              <div className="mt-20 sm:mt-28 relative flex flex-col items-center w-full">
                <div className="relative inline-block">
                  <div className="text-2xl sm:text-3xl md:text-4xl whitespace-nowrap font-black text-white pb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {t('leadership_instructions')}
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_2px_rgba(168,85,247,0.6)]" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.8 }}
                  className="mt-12 w-full max-w-4xl mx-auto backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden group shadow-2xl"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute -inset-x-10 -inset-y-10 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 blur-xl opacity-50 rounded-2xl" />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-6 relative drop-shadow-md text-center">{t('during_after_battle')}</h2>
                  
                  <div className="space-y-4 relative">
                    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="p-2 sm:p-3 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                        <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-blue-100 mb-2">{t('r4_instructions')}</h4>
                        <ul className="space-y-2 mt-2">
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('guide_members')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('kick_members')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('kick_t8_below')}
                              </p>
                           </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/5 rounded-xl p-4 sm:p-5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                      <div className="p-2 sm:p-3 rounded-lg bg-green-500/20 text-green-400 shrink-0 mt-1 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                        <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <div className="mb-3">
                          <h4 className="text-lg font-bold text-green-100">{t('after_castle_occupation')}</h4>
                          <span className="text-xs text-green-400/80 font-medium">{t('after_two_half_hours')}</span>
                        </div>
                        <ul className="space-y-2">
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('secure_win')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('friendly_fight')}
                              </p>
                           </li>
                           <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                                {t('all_can_enter')}
                              </p>
                           </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* YouTube Modal */}
      {isYoutubeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#121316] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <h3 className="text-white font-bold text-lg">{t('tutorial_video')}</h3>
              <button 
                onClick={closeYoutubeModal} 
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title={t('close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-[9/16] bg-black">
              <iframe
                src="https://www.youtube.com/embed/vvFvbhnJcvM?autoplay=1"
                title="YouTube short player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </BackgroundTheme>
  );
}
