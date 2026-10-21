'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { teachersData } from '@/lib/siteData';

export const TeachersSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? teachersData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === teachersData.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="teachers" className="py-16 sm:py-24 bg-[#121024] border-b border-[#2d2750] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="text-xs font-bold text-[#9a82ff] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>Peşəkar Təlimçilərimiz</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
              Uşaqların Sevimli Şahmat Müəllimləri
            </h2>
            <p className="text-sm sm:text-base text-[#9893b8] mt-2 max-w-xl">
              Hər biri illərlə təcrübəyə, pedaqoji səbrə və şahmat sevgisinə malik peşəkar ustadlarımız.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Əvvəlki müəllim"
              className="w-11 h-11 rounded-xl border border-[#2d2750] bg-[#171428] hover:bg-[#211c3a] hover:border-[#7c5cff]/50 text-[#ecebf5] flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Növbəti müəllim"
              className="w-11 h-11 rounded-xl border border-[#2d2750] bg-[#171428] hover:bg-[#211c3a] hover:border-[#7c5cff]/50 text-[#ecebf5] flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {teachersData.map((teacher, idx) => {
              const isActive = currentIndex === idx;
              return (
                <div key={teacher.id} className="w-full shrink-0 px-2 sm:px-4">
                  <div
                    className={`max-w-2xl mx-auto bg-[#171428] rounded-3xl p-6 sm:p-8 border transition-all ${
                      isActive
                        ? 'border-[#7c5cff] shadow-xl shadow-[#7c5cff]/10 ring-1 ring-[#7c5cff]/50'
                        : 'border-[#2d2750] shadow-sm'
                    } flex flex-col sm:flex-row items-center gap-6 sm:gap-8`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={teacher.photoUrl}
                        alt={`${teacher.firstName} ${teacher.lastName}`}
                        className={`w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-2xl border-2 transition-all ${
                          isActive
                            ? 'border-[#7c5cff] shadow-lg shadow-[#7c5cff]/20'
                            : 'border-[#2d2750]'
                        }`}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-[#7c5cff] to-[#5136d8] text-white p-2 rounded-xl shadow-md border border-[#9a82ff]/40">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-center sm:text-left space-y-2.5">
                      <span className="text-xs font-semibold text-[#9a82ff] bg-[#211c3a] px-3 py-1 rounded-lg border border-[#7c5cff]/30 inline-block">
                        {teacher.role}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#ecebf5]">
                        {teacher.firstName} {teacher.lastName}
                      </h3>
                      <p className="text-sm text-[#9893b8] leading-relaxed">
                        {teacher.bio}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#9893b8]">
                        <span className="flex items-center gap-1 text-emerald-400">✓ Fərdi yanaşma</span>
                        <span className="flex items-center gap-1 text-emerald-400">✓ Qrup dərsləri</span>
                        <span className="flex items-center gap-1 text-emerald-400">✓ İnteraktiv metodika</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {teachersData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Müəllim ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#7c5cff]'
                  : 'w-2.5 bg-[#2d2750] hover:bg-[#9893b8]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
