import React from 'react';
import { Heart, ArrowUp, Coffee, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          
          {/* Brand & Dedication */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                عبقرينو (مصطفى محمد)
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                21/11/2009 🎂
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              هدية تذكارية صُممت بكل حب من كريم لصاحبه وأخوه الغالي عبقرينو.. ربنا يديم الصحوبية والجدعنة والتفوق دائماً وأبداً.
            </p>
          </div>

          {/* Center Quote & Coffee note */}
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span>مدعوم بكوبايات نسكافيه وسهرات كانفا ☕🎨</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition cursor-pointer"
          >
            <span>الرجوع للأعلى</span>
            <ArrowUp className="w-4 h-4 text-amber-400" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <span>صُنع مع</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>للأخ والسند مصطفى محمد (عبقرينو)</span>
          </div>
          <div>
            <span>جميع الحقوق محفوظة لصداقة كريم وعبقرينو © 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
