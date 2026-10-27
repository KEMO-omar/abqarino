import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/abqarinoData';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [answeredCurrent, setAnsweredCurrent] = useState<boolean>(false);

  const q = QUIZ_QUESTIONS[currentQuestion];

  const handleSelectOption = (index: number) => {
    if (answeredCurrent) return;

    setAnsweredCurrent(true);
    const newAnswers = [...selectedAnswers, index];
    setSelectedAnswers(newAnswers);

    if (index === q.correctIndex) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(prev => prev + 1);
      setAnsweredCurrent(false);
    } else {
      setShowResult(true);
      const score = calculateScore();
      if (score >= 4) {
        sound.playCelebration();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setAnsweredCurrent(false);
    setShowResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === QUIZ_QUESTIONS[idx].correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();

  return (
    <section id="quiz" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>تحدي أصدقاء عبقرينو</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            قد إيه تعرف الأسطورة عبقرينو؟ 🧠
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            5 أسئلة سريعة لا يجاوبها إلا اللي حافظ مصطفى محمد وعارف كل تفاصيله!
          </p>
        </div>

        {/* Quiz Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl">
          
          {!showResult ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>السؤال {currentQuestion + 1} من {QUIZ_QUESTIONS.length}</span>
                <span className="text-amber-400 font-bold">{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 text-right leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {q.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion] === idx;
                  const isCorrect = idx === q.correctIndex;

                  let btnStyle = "bg-slate-900/80 border-slate-700 hover:border-amber-500/60 text-slate-200";
                  if (answeredCurrent) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10";
                    } else if (isSelected) {
                      btnStyle = "bg-red-950/60 border-red-500 text-red-200";
                    } else {
                      btnStyle = "bg-slate-900/40 border-slate-800 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={answeredCurrent}
                      className={`w-full p-4 rounded-2xl border text-right font-medium text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span className="flex-1">{option}</span>
                      {answeredCurrent && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mr-2" />
                      )}
                      {answeredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mr-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when answered */}
              {answeredCurrent && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-right mb-6 animate-fadeIn">
                  <span className="font-bold">التفسير: </span>
                  <span>{q.explanation}</span>
                </div>
              )}

              {/* Next Button */}
              {answeredCurrent && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer flex items-center gap-2"
                  >
                    <span>{currentQuestion + 1 < QUIZ_QUESTIONS.length ? "السؤال التالي" : "عرض النتيجة النهائية"}</span>
                    <span>←</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  نتيجتك في اختبار عبقرينو: {score} من {QUIZ_QUESTIONS.length} 🎯
                </h3>
                <p className="text-base text-slate-300">
                  {score === 5 && "ما شاء الله! أنت حافظ عبقرينو صم كأنك صاحبه كريم بالظبط! 🏆👑"}
                  {score === 4 && "عاش جداً! علاقتك بعبقرينو قوية وفاهم شخصيته كويس! 🤝"}
                  {score >= 2 && score <= 3 && "نتيجة حلوة! محتاج تعزم عبقرينو على كوباية نسكافيه عشان تعرفه أكتر ☕"}
                  {score < 2 && "شكلك محتاج تقرأ رسالة كريم تاني وتعرف عبقرينو عن قرب! ✨"}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة الاختبار من جديد</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
