import React, { useState } from 'react';
import { PHOTOS, PhotoItem } from '../data/abqarinoData';
import { sound } from '../utils/soundEffects';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, Heart, Sparkles, Filter } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'highlight' | 'together' | 'design' | 'memories'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = filter === 'all' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === filter);

  const openLightbox = (photo: PhotoItem) => {
    sound.playClick();
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    sound.playClick();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    sound.playClick();
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>معرض الصور والذكريات</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            ألبوم الأيام الحلوة واللقطات الخالدة 📸
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            كل صورة بتحكي قصة وكل لقطة شاهدة على الجدعنة والأخوة الصافية
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => {
              sound.playClick();
              setFilter('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            كل الصور ({PHOTOS.length})
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('highlight');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'highlight'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            أبرز اللقطات
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('together');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'together'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            أيامنا سوا (كريم ومصطفى) 🤝
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('design');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'design'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            التصاميم والبوسترات 🎨
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setFilter('memories');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              filter === 'memories'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            خروجات وذكريات 🍃
          </button>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div className="aspect-[4/5] overflow-hidden bg-slate-900">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  {photo.tag && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 border border-amber-500/30">
                      {photo.tag}
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="text-sm font-bold text-white mb-0.5">{photo.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{photo.caption}</p>
                </div>
              </div>

              {/* Bottom bar when not hovering on mobile */}
              <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-right sm:hidden">
                <div className="text-xs font-bold text-white truncate">{photo.title}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 left-0 sm:left-2 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer z-10"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition cursor-pointer z-10"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition cursor-pointer z-10"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 max-h-[70vh] flex items-center justify-center shadow-2xl">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            {/* Caption & details */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-right w-full">
              <div className="flex items-center justify-between mb-1">
                {selectedPhoto.tag && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedPhoto.tag}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedPhoto.title}
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedPhoto.caption}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
