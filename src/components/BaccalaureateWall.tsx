import React, { useState, useEffect } from 'react';
import { DUAA_LIST } from '../data/abqarinoData';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { GraduationCap, Heart, Send, Sparkles, Check, BookmarkCheck } from 'lucide-react';

interface DuaaCard {
  id: string;
  text: string;
  sender: string;
  amenCount: number;
}

export const BaccalaureateWall: React.FC = () => {
  const [prayers, setPrayers] = useState<DuaaCard[]>([]);
  const [newPrayer, setNewPrayer] = useState('');
  const [senderName, setSenderName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Load from localStorage or initialize from DUAA_LIST
    const saved = localStorage.getItem('abqarino_prayers');
    if (saved) {
      try {
        setPrayers(JSON.parse(saved));
        return;
      } catch {
        // Fallback
      }
    }

    const initialPrayers: DuaaCard[] = DUAA_LIST.map((text, idx) => ({
      id: `init-${idx}`,
      text,
      sender: idx === 0 ? 'صاحبك وأخوك كريم (Kemo)' : 'محب لعبقرينو',
      amenCount: 15 + idx * 7,
    }));
    setPrayers(initialPrayers);
  }, []);

  const savePrayers = (updated: DuaaCard[]) => {
    setPrayers(updated);
    try {
      localStorage.setItem('abqarino_prayers', JSON.stringify(updated));
    } catch {
      // Local storage disabled or full
    }
  };

  const handleAddPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayer.trim()) return;

    sound.playCelebration();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });

    const newCard: DuaaCard = {
      id: Date.now().toString(),
      text: newPrayer.trim(),
      sender: senderName.trim() || 'صديق مخلص',
      amenCount: 1,
    };

    const updated = [newCard, ...prayers];
    savePrayers(updated);
    setNewPrayer('');
    setSenderName('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleAmen = (id: string) => {
    sound.playSuccess();
    const updated = prayers.map(p => {
      if (p.id === id) {
        return { ...p, amenCount: p.amenCount + 1 };
      }
      return p;
    });
    savePrayers(updated);
  };

  return (
    <section id="baccalaureate" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>حلم التفوق والأوائل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            حائط الدعوات للتفوق في البكالوريا 🎓
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            &quot;ذكي جداً وشاطر وبيجيب درجات عالية.. وربنا يوفقه ويطلع الأول في البكالوريا!&quot;
          </p>
        </div>

        {/* Form & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add Prayer Form (Left) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-emerald-500/30 shadow-2xl space-y-5 sticky top-28">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>شارك بدعوة أو كلمة طيبة لمصطفى</span>
              </div>

              <form onSubmit={handleAddPrayer} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">
                    اسمك (صاحبه أو حبيب عبقرينو)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="مثال: كريم، صاحبك في كانفا، أخوك..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">
                    الدعوة أو الأمنية للتفوق في البكالوريا
                  </label>
                  <textarea
                    rows={4}
                    value={newPrayer}
                    onChange={(e) => setNewPrayer(e.target.value)}
                    placeholder="اكتب دعوة من قلبك لعبقرينو بالتوفيق والنجاح وأعلى المراتب..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 text-right resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition cursor-pointer"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>انشر الدعوة على الحائط 🤲</span>
                </button>

                {submitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2 animate-fadeIn">
                    <Check className="w-4 h-4" />
                    <span>تمت إضافة دعوتك بنجاح! جزاك الله خيراً ✨</span>
                  </div>
                )}
              </form>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-right leading-relaxed">
                💡 كل دعوة تخرج بصدق هي نور يرافق عبقرينو في مشوار دراسته وامتحاناته حتى نراه في الصدارة بإذن الله!
              </div>
            </div>
          </div>

          {/* Prayers List (Right) */}
          <div className="lg:col-span-7 space-y-4">
            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/40 transition-all text-right space-y-3"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleAmen(prayer.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>قل آمين ({prayer.amenCount})</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400">{prayer.sender}</span>
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                      🎓
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                  {prayer.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
