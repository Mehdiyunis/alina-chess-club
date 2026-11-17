'use client';

import React, { useState, useRef } from 'react';
import { Teacher } from '@/lib/siteData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from './LanguageProvider';

interface TeachersSliderProps {
  teachers: Teacher[];
}

export const TeachersSlider: React.FC<TeachersSliderProps> = ({ teachers }) => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // If there are no teachers in Supabase, hide the whole section gracefully
  if (!teachers || teachers.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teachers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const hasMultiple = teachers.length > 1;

  return (
    <section id="teachers" className="py-16 lg:py-24 bg-[#1F3D2F] text-[#F7F3EA] border-b border-[#E3DCCB] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#F7F3EA] tracking-tight leading-[1.1]">
                {t('teachers.title')}
              </h2>
              <p className="text-sm sm:text-base text-[#C9D3C4] mt-2 max-w-xl">
                {t('teachers.subtitle')}
              </p>
            </div>

            {/* Carousel Arrows (only if more than 1 teacher) */}
            {hasMultiple && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label={t('teachers.prev')}
                  className="w-10 h-10 rounded-full border border-[#C9D3C4]/30 bg-[#1F3D2F] hover:bg-[#F6E7B4] text-[#F7F3EA] hover:text-[#1E2A22] flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F6E7B4]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label={t('teachers.next')}
                  className="w-10 h-10 rounded-full border border-[#C9D3C4]/30 bg-[#1F3D2F] hover:bg-[#F6E7B4] text-[#F7F3EA] hover:text-[#1E2A22] flex items-center justify-center transition-all cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F6E7B4]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        <ScrollReveal direction="right">
          <div
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {teachers.map((teacher, idx) => {
                const isActive = currentIndex === idx;
                const initials = (
                  (teacher.first_name?.[0] || '') + (teacher.last_name?.[0] || '')
                ).toUpperCase();

                return (
                  <div key={teacher.id || idx} className="w-full shrink-0 px-1 sm:px-2">
                    <div
                      className={`max-w-2xl mx-auto bg-[#FFFFFF] text-[#1E2A22] rounded-[18px] p-6 sm:p-8 border transition-all shadow-[0_1px_2px_rgba(30,42,34,0.06)] ${
                        isActive ? 'border-[#2F5D46]' : 'border-[#E3DCCB]'
                      } flex flex-col sm:flex-row items-center gap-6 sm:gap-8`}
                    >
                      {/* Photo or Initials Placeholder */}
                      <div className="relative shrink-0">
                        {teacher.photo_url ? (
                          <img
                            src={teacher.photo_url}
                            alt={`${teacher.first_name} ${teacher.last_name}`}
                            className={`w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-[16px] border ${
                              isActive ? 'border-[#2F5D46]' : 'border-[#E3DCCB]'
                            } shadow-xs`}
                          />
                        ) : (
                          <div
                            className={`w-36 h-36 sm:w-40 sm:h-40 rounded-[16px] bg-[#E4EBD9] border ${
                              isActive ? 'border-[#2F5D46]' : 'border-[#E3DCCB]'
                            } text-[#2F5D46] flex items-center justify-center font-bold text-3xl select-none shadow-xs`}
                          >
                            {initials || 'ŞM'}
                          </div>
                        )}
                      </div>

                      <div className="text-center sm:text-left space-y-2 flex-1">
                        {teacher.role_title && (
                          <p className="text-xs font-semibold text-[#B4532A] uppercase tracking-wider">
                            {teacher.role_title}
                          </p>
                        )}

                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1E2A22]">
                          {teacher.first_name} {teacher.last_name}
                        </h3>

                        {teacher.description && (
                          <p className="text-sm text-[#5E6B62] leading-relaxed">
                            {teacher.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Dots */}
          {hasMultiple && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {teachers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`${t('teachers.teacherLabel')} ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-[#F6E7B4]'
                      : 'w-2 bg-[#C9D3C4]/40 hover:bg-[#F6E7B4]'
                  }`}
                />
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};
