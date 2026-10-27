import React from 'react';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { X, Award, Heart, Sparkles, Gift, Printer, Coffee } from 'lucide-react';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExtraConfetti = () => {
    sound.playCelebration();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/20 text-center my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Certificate / Plaque Header */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
          <Award className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>وسام الأخوة والجدعنة الأبدي</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
          إهداء خاص لأغلى صاحب وأخ 👑
        </h3>
        
        <div className="text-amber-400 font-bold text-lg mb-6">
          إلى الأسطورة: مصطفى محمد (عبقرينو)
        </div>

        {/* Certificate Body Card */}
        <div className="p-6 rounded-2xl bg-slate-800/80 border border-amber-500/30 text-right space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed mb-6 relative">
          <div className="absolute top-2 left-2 text-3xl opacity-20">📜</div>
          
          <p>
            يا عبقرينو.. من أول يوم في <strong className="text-amber-300">الإذاعة المدرسية</strong> لما المدرسة كلها كانت بتتكلم عنك وعن نبوغك، وتواضعك اللي بهرني، لحد ما حببتني في البرمجة وبنينا <strong className="text-yellow-400">سحورنا</strong> والفايربيز وكسرنا الدنيا في كانفا وملخص المنهج وتحدي الـ 500 جنيه!
          </p>
          <p>
            ورغم إننا من بلدين مختلفتين، سافرتلك الفشن مخصوص عشان أشوفك، لأنك بالنسبة لي مش مجرد صاحب.. <strong className="text-rose-400">أنت حياتي كلها</strong>! بنفرح لبعض ونزعل لبعض ونحس ببعض.. مفيش فرق بينا إحنا واحد فعلياً.
          </p>
          <p className="font-bold text-amber-300">
            الموقع ده هدية بسيطة من أخوك وصاحبك كريم عشان يفضل شاهد على قصة أخوة نادرة ومحفورة في القلب طول العمر ❤️
          </p>

          <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="block font-bold text-white text-sm">كريم (طريم)</span>
              <span>أخوك وصاحبك الوفي</span>
            </div>
            <div className="text-left">
              <span className="block font-bold text-amber-400">21 / 11 / 2009</span>
              <span>تاريخ ميلاد الأسطورة</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleExtraConfetti}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 active:scale-95 transition cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>فجّر احتفالات تانية! 🎉</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center gap-2 border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الشهادة 🖨️</span>
          </button>
        </div>

      </div>
    </div>
  );
};
