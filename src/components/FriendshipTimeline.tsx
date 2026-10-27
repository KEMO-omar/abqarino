import React, { useState } from 'react';
import { TIMELINE_EVENTS, TimelineEvent } from '../data/abqarinoData';
import { sound } from '../utils/soundEffects';
import { 
  Radio, 
  Code, 
  Database, 
  Moon, 
  Palette, 
  FileCheck, 
  Coins, 
  Users, 
  MapPin, 
  Heart, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Flame,
  Award
} from 'lucide-react';

export const FriendshipTimeline: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>(TIMELINE_EVENTS[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(TIMELINE_EVENTS[0].id);

  const activeEvent = TIMELINE_EVENTS.find(e => e.id === selectedEventId) || TIMELINE_EVENTS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5 text-amber-400" />;
      case 'Code': return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Database': return <Database className="w-5 h-5 text-orange-400" />;
      case 'Moon': return <Moon className="w-5 h-5 text-yellow-300" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-emerald-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-amber-500" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-400" />;
      case 'MapPin': return <MapPin className="w-5 h-5 text-rose-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleSelect = (event: TimelineEvent) => {
    sound.playClick();
    setSelectedEventId(event.id);
    setExpandedId(prev => (prev === event.id ? null : event.id));
  };

  return (
    <section id="timeline" className="py-20 bg-slate-900/70 border-b border-slate-800/80 relative overflow-hidden">
      {/* Decorative blurred lights */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>سجل الذكريات والمغامرات المشتركة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            محطات الملحمة: من الإذاعة المدرسية لإمبراطورية الفشن 🚀
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            كل خطوة، كل سهرة، وكل مغامرة صنعت من صداقتنا أسطورة لا تتكرر
          </p>
        </div>

        {/* Desktop / Tablet Timeline Stepper Navigation */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="flex items-center gap-3 min-w-max px-2">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isSelected = event.id === selectedEventId;
              return (
                <button
                  key={event.id}
                  onClick={() => handleSelect(event)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all text-xs sm:text-sm font-bold cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black ${
                    isSelected ? 'bg-slate-950 text-amber-400' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{event.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Story Box for Active Event */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Highlight Box (Left Column in RTL) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-amber-500/30 shadow-2xl space-y-5 text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Top metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  {activeEvent.phase}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {getIcon(activeEvent.icon)}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{activeEvent.tag}</span>
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {activeEvent.title}
                </h3>
                <p className="text-sm sm:text-base text-amber-300/90 font-medium leading-relaxed">
                  {activeEvent.summary}
                </p>
              </div>

              {/* Full Detailed Story Narrative */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-slate-200 leading-relaxed text-sm sm:text-base">
                {activeEvent.fullStory}
              </div>

              {/* Golden Quote */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border-r-4 border-amber-500 text-amber-200 italic font-bold text-sm sm:text-base">
                &quot;{activeEvent.highlightQuote}&quot;
              </div>

              {/* Interactive Footer between stages */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    const currentIndex = TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId);
                    const prevIndex = (currentIndex - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length;
                    handleSelect(TIMELINE_EVENTS[prevIndex]);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                >
                  ← المحطة السابقة
                </button>
                <span className="text-xs text-slate-400">
                  {TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId) + 1} من {TIMELINE_EVENTS.length}
                </span>
                <button
                  onClick={() => {
                    const currentIndex = TIMELINE_EVENTS.findIndex(e => e.id === selectedEventId);
                    const nextIndex = (currentIndex + 1) % TIMELINE_EVENTS.length;
                    handleSelect(TIMELINE_EVENTS[nextIndex]);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer"
                >
                  المحطة التالية →
                </button>
              </div>

            </div>
          </div>

          {/* Quick List of All 10 Milestones (Right Column in RTL) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-400 text-right px-2 mb-1">
              فهرس محطات الصداقة (اضغط للتفاصيل):
            </div>
            {TIMELINE_EVENTS.map((event, idx) => {
              const isCurrent = event.id === selectedEventId;
              return (
                <div
                  key={event.id}
                  onClick={() => handleSelect(event)}
                  className={`p-3.5 rounded-2xl border transition-all text-right cursor-pointer flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-slate-800 border-amber-500/60 shadow-lg'
                      : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-900/90 border border-slate-700 flex items-center justify-center shrink-0">
                      {getIcon(event.icon)}
                    </div>
                    <div>
                      <div className={`text-xs font-bold truncate max-w-[190px] sm:max-w-[220px] ${
                        isCurrent ? 'text-amber-300' : 'text-slate-200'
                      }`}>
                        {event.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {event.phase}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    #{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
