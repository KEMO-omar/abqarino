import React, { useState } from 'react';
import { TRAITS } from '../data/abqarinoData';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { HeartHandshake, Flame, Coffee, Clock, Palette, GraduationCap, Plus, Sparkles, AlertTriangle } from 'lucide-react';

export const TraitsSection: React.FC = () => {
  const [coffeeCount, setCoffeeCount] = useState<number>(3);
  const [procrastinationLevel, setProcrastinationLevel] = useState<number>(85);
  const [ferocityLevel, setFerocityLevel] = useState<boolean>(false);

  const handleBrewCoffee = () => {
    sound.playSuccess();
    setCoffeeCount(prev => prev + 1);
  };

  const getCoffeeRemark = (count: number) => {
    if (count <= 3) return "دا في بداية اليوم بس.. النسكافيه لسه ما سخنش! ☕";
    if (count <= 7) return "التركيز عالي جداً.. وقت فتح كانفا وتوليع التصاميم! 🎨";
    if (count <= 12) return "مود عبقرينو الخارق اتفعل.. مفيش نوم لحد ما يلم المنهج! ⚡";
    return "أسطورة الكافيين.. كده يقرقش أي حد بأسنانه بدون تردد! 🦁";
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldHeart': return <HeartHandshake className="w-6 h-6 text-amber-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-rose-500" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-amber-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-purple-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="traits" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>الصفات والقدرات الخاصة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            كتالوج شخصية الأسطورة عبقرينو ⚡
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            خليط فريد من الطيبة والإيثار، والذكاء والمراكمة، وإدمان النسكافيه والشراسة وقت اللزوم!
          </p>
        </div>

        {/* Traits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TRAITS.map((trait, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/40 transition-all hover:-translate-y-1 group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/80 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderIcon(trait.icon)}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900/80 text-amber-300 border border-slate-700 font-bold">
                  {trait.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{trait.title}</h3>
              <p className="text-xs text-amber-400/90 font-medium mb-3">{trait.subtitle}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{trait.description}</p>

              {/* Stat Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">مستوى القوة</span>
                  <span className="text-amber-400">{trait.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${trait.color}`}
                    style={{ width: `${trait.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Fun Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Widget 1: Coffee Brewer */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-600/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                محطة النسكافيه ☕
              </span>
              <span className="text-2xl">⚡</span>
            </div>
            
            <h4 className="text-lg font-bold text-white mb-1">اصنع نسكافيه لعبقرينو</h4>
            <p className="text-xs text-slate-400 mb-4">اضغط لتجهيز كوباية نسكافيه لرفع طاقة الإبداع والتركيز!</p>

            <div className="text-center py-3 bg-slate-950/60 rounded-2xl border border-amber-500/20 mb-4">
              <div className="text-3xl font-black text-amber-400">{coffeeCount} كوباية</div>
              <div className="text-xs text-slate-300 mt-1">{getCoffeeRemark(coffeeCount)}</div>
            </div>

            <button
              onClick={handleBrewCoffee}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>جهّز كوباية جديدة ☕</span>
            </button>
          </div>

          {/* Widget 2: Procrastination Meter */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-600/30 shadow-xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                مؤشر المراكمة ⏳
              </span>
              <span className="text-2xl">📚</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">فن تأجيل الدروس</h4>
            <p className="text-xs text-slate-400 mb-4">تحكّم في نسبة المراكمة وشوف النتيجة في الامتحان!</p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-xs text-slate-300 font-bold">
                <span>نسبة المراكمة:</span>
                <span className="text-purple-400 font-black">{procrastinationLevel}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={procrastinationLevel}
                onChange={(e) => setProcrastinationLevel(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-950/60 rounded-2xl border border-purple-500/20 text-xs text-purple-200">
              {procrastinationLevel > 80
                ? "مراكم كل المنهج.. بس هيسهر ليلة الامتحان ويطلع الأول كالعادة! 🎯"
                : "مستوى مراكمة هادئ، كده هيقفل الامتحانات بفرق شاسع! 🏆"}
            </div>
          </div>

          {/* Widget 3: Ferocity Alert (اللي ييجي عليه يقرقشو بأسنانه) */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-600/30 shadow-xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                جهاز الإنذار 🦁
              </span>
              <span className="text-2xl">⚠️</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">تحذير لمن يقترب!</h4>
            <p className="text-xs text-slate-400 mb-4">جرب تضغط الزر وشوف إيه اللي بيحصل للي ييجي عليه:</p>

            <button
              onClick={() => {
                sound.playClick();
                setFerocityLevel(!ferocityLevel);
              }}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer mb-4 ${
                ferocityLevel
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>{ferocityLevel ? "الحالة: تم القرقشة بأسنانه 🦷" : "اختبر غضب عبقرينو!"}</span>
            </button>

            <div className="p-3 bg-slate-950/60 rounded-2xl border border-red-500/20 text-xs text-slate-300">
              {ferocityLevel
                ? "🚨 تحذير: تم تفعيل الشراسة الكاملة! عبقرينو مبيسيبش حقه ولا بيتهاون مع أي حد ييجي عليه!"
                : "💡 عبقرينو جدع وأطيب قلب مع الكل، لكن خطوطه الحمراء ممنوع الاقتراب منها!"}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
