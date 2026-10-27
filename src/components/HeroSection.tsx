import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { ABQARINO_INFO } from '../data/abqarinoData';
import { Heart, Sparkles, Gift, Calendar, Trophy, Coffee, Flame, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenGiftModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenGiftModal }) => {
  const [daysToBirthday, setDaysToBirthday] = useState<number>(0);
  const [confettiActive, setConfettiActive] = useState<boolean>(false);

  useEffect(() => {
    // Calculate days until next Nov 21
    const today = new Date();
    const currentYear = today.getFullYear();
    let bday = new Date(currentYear, 10, 21); // Month 10 is November (0-indexed)
    if (today > bday) {
      bday = new Date(currentYear + 1, 10, 21);
    }
    const diffTime = bday.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysToBirthday(diffDays);
  }, []);

  const handleGiftClick = () => {
    sound.playCelebration();
    setConfettiActive(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.4 },
      colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
    });
    setTimeout(() => setConfettiActive(false), 2000);
    onOpenGiftModal();
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:py-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (Text in RTL) */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Gift className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>إهداء خاص لأعز صديق وأخ | من كريم إلى عبقرينو</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25]">
              الأسطورة{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 underline decoration-amber-500/40 decoration-wavy">
                عبقرينو
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-200 font-bold block mt-3">
                مصطفى محمد.. صاحب صاحبه وسند الأيام ❤️
              </span>
            </h1>

            {/* Core Dedication Quote */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              &quot;عبقرينو ده بالنسبالي مش مجرد صاحب ده حياتي كلها.. بحكيله تفاصيل حياتي كلها صغيرها بكبيرها وهو بيسمعني وينصحني.. هو يقولي ذاكر وأنا أقوله ذاكر.. بنفرح لبعض ونزعل لبعض ونحس ببعض.. مفيش بينا فرق أنا وهو واحد فعلياً!&quot;
            </p>

            {/* Highlights Grid Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <Calendar className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">تاريخ الميلاد</div>
                <div className="text-sm font-bold text-slate-100">21 / 11 / 2009</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <ShieldCheck className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">البلد والجدعنة</div>
                <div className="text-sm font-bold text-slate-100">الفشن 🦁</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <Coffee className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                <div className="text-xs text-slate-400">الرحلة</div>
                <div className="text-sm font-bold text-slate-100">إذاعة وكانفا 🎙️🎨</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-center">
                <Trophy className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">الهدف والرجاء</div>
                <div className="text-sm font-bold text-slate-100">أول بكالوريا 🎓</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleGiftClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-lg shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Gift className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>افتح الإهداء يا عبقرينو 🎁</span>
                <Sparkles className="w-5 h-5 text-slate-900 animate-spin" style={{ animationDuration: '6s' }} />
              </button>

              <a
                href="#story"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-base transition-colors"
              >
                <span>اقرأ قصة الصحوبية</span>
                <span>←</span>
              </a>
            </div>

            {/* Birthday Countdown alert */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-400">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>فاضل</span>
              <span className="font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">
                {daysToBirthday} يوم
              </span>
              <span>على عيد ميلاد عبقرينو القادم (21 نوفمبر) 🎂</span>
            </div>

          </div>

          {/* Left Column (Main Portrait Photo in RTL) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              
              {/* Outer Decorative Rings */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition duration-700 animate-pulse"></div>
              
              {/* Image Container Card */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 bg-slate-900/90 shadow-2xl max-w-sm sm:max-w-md">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="/1.png"
                    alt="مصطفى محمد - عبقرينو"
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Floating Tag inside image */}
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>الأسطورة عبقرينو 👑</span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-right">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-rose-400 font-bold">
                        <Heart className="w-3.5 h-3.5 fill-rose-500" />
                        <span>I Love You</span>
                      </div>
                      <div className="text-amber-400 text-xs font-semibold">
                        مصمم وفنان ومبرمج
                      </div>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">
                      مصطفى محمد (عبقرينو)
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Canva Duo */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900/95 border border-cyan-500/40 shadow-xl rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-lg">
                  C
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">ثنائي الإبداع</div>
                  <div className="text-xs font-bold text-white">كريم & مصطفى على كانفا 🎨</div>
                </div>
              </div>

              {/* Floating Badge 2 - Baccalaureate */}
              <div className="absolute -top-6 -left-6 bg-slate-900/95 border border-emerald-500/40 shadow-xl rounded-2xl p-3 flex items-center gap-3 backdrop-blur-md hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  🎓
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">الدعاء الدائم</div>
                  <div className="text-xs font-bold text-emerald-300">الأول على البكالوريا!</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
