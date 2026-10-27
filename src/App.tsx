import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FriendshipTimeline } from './components/FriendshipTimeline';
import { StorySection } from './components/StorySection';
import { TraitsSection } from './components/TraitsSection';
import { CanvaDuoSection } from './components/CanvaDuoSection';
import { GallerySection } from './components/GallerySection';
import { QuizSection } from './components/QuizSection';
import { BaccalaureateWall } from './components/BaccalaureateWall';
import { Footer } from './components/Footer';
import { GiftModal } from './components/GiftModal';

export const App: React.FC = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Top Navbar */}
      <Navbar onTriggerCelebration={() => setIsGiftModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with portrait, countdown, and main CTA */}
        <HeroSection onOpenGiftModal={() => setIsGiftModalOpen(true)} />

        {/* 2. Chronological Milestones Timeline */}
        <FriendshipTimeline />

        {/* 3. Authentic Story Letter from Kareem */}
        <StorySection />

        {/* 3. Abqarino's Traits, Coffee Station & Procrastination Meter */}
        <TraitsSection />

        {/* 4. Canva & Programming Showcase */}
        <CanvaDuoSection />

        {/* 5. Photos & Memories Gallery */}
        <GallerySection />

        {/* 6. Friendship Trivia Quiz */}
        <QuizSection />

        {/* 7. Baccalaureate Prayers Wall */}
        <BaccalaureateWall />
      </main>

      {/* Footer */}
      <Footer />

      {/* Special Dedication Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />
    </div>
  );
};

export default App;
