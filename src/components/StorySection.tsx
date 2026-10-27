import React from 'react';
import { ABQARINO_INFO } from '../data/abqarinoData';
import { Heart, Users, Quote, Sparkles, CheckCircle2, MapPin, Radio, Code } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>رسالة وفاء وأخوة حقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            &quot;عبقرينو ده مش مجرد صاحب.. ده حياتي كلها&quot; ❤️
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            القصة الكاملة لصداقة كريم ومصطفى محمد من الإذاعة المدرسية حتى شوارع الفشن
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Photos & Milestone badges (Right in RTL) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition"></div>
              <div className="relative rounded-3xl overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl">
                <img
                  src="/عيد.png"
                  alt="كريم ومصطفى في العيد"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      صورة العيد 🌙
                    </span>
                    <span className="text-xs text-slate-400 font-medium">كريم & مصطفى</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    كتف في كتف.. إخوة جمعتهم الجدعنة والقلوب البيضاء
                  </p>
                </div>
              </div>
            </div>

            {/* Quick highlight cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-right">
                <Radio className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs text-slate-400">نقطة الانطلاق</div>
                <div className="text-sm font-bold text-white mt-0.5">الإذاعة المدرسية</div>
                <div className="text-[11px] text-amber-400/90 mt-1">نابغة بتواضع أسطوري!</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-right">
                <MapPin className="w-5 h-5 text-rose-400 mb-2" />
                <div className="text-xs text-slate-400">كسر المسافات</div>
                <div className="text-sm font-bold text-white mt-0.5">سفر إلى الفشن</div>
                <div className="text-[11px] text-rose-400/90 mt-1">مخصوص عشان أشوفك</div>
              </div>
            </div>
          </div>

          {/* Letter / Story details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Quotation Box */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-slate-900/90 border border-amber-500/30 shadow-xl">
              <Quote className="w-10 h-10 text-amber-500/40 absolute top-4 left-4 rotate-180" />
              
              <h3 className="text-xl sm:text-2xl font-black text-amber-400 mb-4 flex items-center gap-2">
                <span>شهادة حب وأخوة بقلم كريم</span>
              </h3>

              <div className="space-y-4 text-slate-200 leading-relaxed text-sm sm:text-base">
                <p>
                  &quot;أول معرفتنا ببعض كانت من <strong className="text-amber-300">الإذاعة المدرسية</strong> لما كنت بطلع أنا وهو.. كانت المدرسة كلها عمالة تتكلم عن عبقرينو وقد إيه هو شخصية نابغة والكل عارفه من أول يوم ليه! وأنا ساعتها كنت واقف معاه وأعرفه كـ &quot;مصطفى&quot;، وشوف كمية التواضع اللي فيه.
                </p>
                <p>
                  وبعدين روحنا ندوة لتعلم البرمجة، وكان عامل موقع وورهولي، انبهرت بيه جداً وخدت رقمه، وفضل يحكيلي قد إيه تعب عشان يعمله وكل المميزات اللي فيه لحد ما حببني في البرمجة وخلاني أخد خطوة التعلم وبدأت أبني لوحدي.
                </p>
                <p>
                  وكان أول مشروع مشترك هو <strong className="text-yellow-400">موقع سحورنا</strong>، حطينا فيه كل جهودنا، ولما المدرسين شافوه انبهروا وطلبوا نعملهم منصات تعليمية يشرحوا عليها دروسهم، وكنا بنقعد سهرانين للصبح نعملها سوا!
                </p>
                <p className="p-4 rounded-2xl bg-amber-500/10 border-r-4 border-amber-400 text-amber-200 font-semibold italic text-sm sm:text-base">
                  &quot;عبقرينو ده بالنسبالي مش مجرد صاحب، ده حياتي كلها.. بحكيله تفاصيل حياتي كلها صغيرها بكبيرها وهو بيسمعني وينصحني، هو يقولي ذاكر وأنا أقوله ذاكر.. وبفرح له من قلبي لما ينجح وهو بيفرحلي من قلبه لما أنجح! مفيش بينا فرق، أنا وهو واحد فعلياً، بنزعل لبعض ونفرح لبعض ونحس ببعض ومبنغلطش على بعض.&quot;
                </p>
                <p>
                  ورغم إن علاقتنا بدأت على النت وكل واحد من بلد.. إلا إني في تانية بكالوريا بقيت باخد دروس في <strong className="text-rose-400">الفشن بلده</strong> عشان أشوفه وقابلته مخصوص، وشفت عبقرينو الجدع اللي لما بيتخانق مع حد مبيسكتش ومبيسبش حقه!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-bold text-xs">
                    K
                  </div>
                  <span className="text-sm font-bold text-slate-300">أخوك وصاحبك: كريم (طريم / Kemo)</span>
                </div>
                <span className="text-xs text-amber-400 font-bold">21 / 11 / 2009 🎂</span>
              </div>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">تواضع العباقرة</div>
                  <div className="text-xs text-slate-400">الكل عارف عبقرينو النابغة وهو متواضع وبسيط</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">جدع وشرس وقت اللزوم</div>
                  <div className="text-xs text-slate-400">في الفشن وفي كل مكان.. مبيسبش حقه لحد 🦁</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">شغف البرمجة وكانفا</div>
                  <div className="text-xs text-slate-400">سحورنا، الفايربيز، ملخص المنهج وتحدي الـ 500ج</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">روح واحدة وقلب واحد</div>
                  <div className="text-xs text-slate-400">بنزعل لبعض ونفرح لبعض ونحس ببعض دائماً</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
