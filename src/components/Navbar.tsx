import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { Sparkles, Heart, Menu, X, Award } from 'lucide-react';

interface NavbarProps {
  onTriggerCelebration: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerCelebration }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleConfetti = () => {
    sound.playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981']
    });
    onTriggerCelebration();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <img src="/1.png" alt="عبقرينو" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -left-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-slate-900"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                عبقرينو
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                مصطفى محمد
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">إهداء من أخوه وصاحبه كريم (Kemo)</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <a href="#timeline" className="hover:text-amber-400 transition-colors">محطات الصداقة</a>
          <a href="#story" className="hover:text-amber-400 transition-colors">قصتنا</a>
          <a href="#traits" className="hover:text-amber-400 transition-colors">شخصية عبقرينو</a>
          <a href="#canva" className="hover:text-amber-400 transition-colors">ثنائي كانفا</a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors">ألبوم الصور</a>
          <a href="#quiz" className="hover:text-amber-400 transition-colors">التحدي</a>
          <a href="#baccalaureate" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold">
            <Award className="w-4 h-4" />
            دعوات البكالوريا
          </a>
        </nav>

        {/* Celebration Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleConfetti}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin text-slate-900" style={{ animationDuration: '4s' }} />
            <span>احتفل بعبقرينو 🎉</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#timeline"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            محطات الصداقة والمغامرات 🚀
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            قصة الصحوبية
          </a>
          <a
            href="#traits"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            شخصية عبقرينو
          </a>
          <a
            href="#canva"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            ثنائي كانفا والتصميم
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            ألبوم الذكريات والصور
          </a>
          <a
            href="#quiz"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-amber-400"
          >
            تحدي: قد إيه تعرف عبقرينو؟
          </a>
          <a
            href="#baccalaureate"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-emerald-400 font-bold hover:bg-slate-800"
          >
            دعوات النجاح في البكالوريا 🎓
          </a>
        </div>
      )}
    </header>
  );
};
