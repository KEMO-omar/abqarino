import React, { useState } from 'react';
import { Palette, Code, Cpu, Sparkles, FileCheck, Coins, Brush, Layers, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const CanvaDuoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cyber' | 'military'>('cyber');

  return (
    <section id="canva" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>ثنائي الإبداع والتصميم والتطوير</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            شراكة كانفا ومغامرات البرمجة 🎨💻
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            من بيكسارت لكانفا.. لورقة ملخص المنهج بختم الوزارة وتحدي عملة الـ 500 جنيه وإمبراطورية ND Network
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Interactive Artwork Viewer (Left in RTL) */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl space-y-4">
              
              {/* Tabs */}
              <div className="flex gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('cyber');
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'cyber'
                      ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>عبقرينو الذكاء الاصطناعي (Claude & n8n)</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveTab('military');
                  }}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'military'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>بوستر عبقرينو المقاتل 🦁</span>
                </button>
              </div>

              {/* Artwork Display */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
                {activeTab === 'cyber' ? (
                  <img
                    src="/Gemini-Generated-Image-uidlzruidlzruidl.png"
                    alt="عبقرينو ملك الذكاء الاصطناعي"
                    className="w-full h-full object-cover sm:object-contain animate-fadeIn"
                  />
                ) : (
                  <img
                    src="/SmartSelect_٢٠٢٦١٠٢٧_٠٠١٤١٦_WhatsApp.jpg"
                    alt="بوستر عبقرينو المقاتل"
                    className="w-full h-full object-contain animate-fadeIn"
                  />
                )}
              </div>

              {/* Caption */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-right">
                {activeTab === 'cyber' ? (
                  <div>
                    <div className="text-sm font-bold text-white mb-1">
                      العبقرية في الأتمتة والذكاء الاصطناعي
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      تصميم يجسد مهارات عبقرينو المتعددة بين البرمجة، أنظمة الأتمتة (n8n)، وأدوات الذكاء الاصطناعي الحديثة مثل Claude Code و OpenClaw. عقلية استثنائية وبدايات مشروع سحورنا والفايربيز!
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm font-bold text-white mb-1">
                      الشهامة والقوة والشراسة (الفشن)
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      بوستر بالزي العسكري وشعار عبقرينو بالبرق الأحمر، يجسد المعنى الأصيل: &quot;جدع مع كل الناس بس اللي ييجي عليه يقرقشو بأسنانه وما بيسكتش لحد!&quot;
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Details & Partnership Story (Right in RTL) */}
          <div className="lg:col-span-5 space-y-5 text-right">
            
            <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Brush className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">التحول من بيكسارت إلى كانفا</h3>
                  <span className="text-xs text-cyan-400">تدريب وإقناع حتى الإتقان</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                كريم كان متعود على PicsArt ومكنش بيحب كانفا، لحد ما عبقرينو بصبره وذوقه فضل وراه وعلمه كل أدواته لحد ما كريم حبه وبقوا ثنائي كانفا الأول!
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ملخص المنهج وختم الوزارة 🕵️‍♂️</h3>
                  <span className="text-xs text-emerald-400">المغامرة الكبرى داخل اللجان</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ورقة كانفا واحدة طبعوها بختم الوزارة غششت المدرسة كلها قبل الامتحان! اتقفشوا لكن ربنا سلم وبقت أشهر حكاية مضحكة في تاريخهم المدرسي.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">تحدي الـ 500 جنيه وإمبراطورية الواتس</h3>
                  <span className="text-xs text-amber-400">منصة اتق الله & ND Network</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                تنافسوا في تصميم العملة الجديدة، وأطلقوا إمبراطورية تعليمية متكاملة على الواتساب بمذكرات وأسئلة وأدمنز تحت إدارتهم لخدمة الطلاب!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
