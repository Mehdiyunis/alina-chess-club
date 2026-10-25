'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Teacher } from '@/lib/siteData';
import { ScrollReveal } from './ScrollReveal';

interface TeachersSliderProps {
  teachers: Teacher[];
}

export const TeachersSlider: React.FC<TeachersSliderProps> = ({ teachers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // If table is empty or null, hide the entire section
  if (!teachers || teachers.length === 0) {
    return null;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? teachers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === teachers.length - 1 ? 0 : prev + 1));
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

  const hasMultiple = teachers.length > 1;

  return (
    <section id="teachers" className="py-16 lg:py-24 bg-[#efe9e0] border-b border-[rgba(26,19,12,0.10)] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <ScrollReveal direction="left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#1a130c] tracking-tight leading-[1.1]">
                Təlimçilərimiz
              </h2>
              <p className="text-sm sm:text-base text-[#7a736b] mt-2 max-w-xl">
                Uşaqlara şahmatın qaydalarını və taktiki düşüncəni addım-addım aşılayan məşqçilər.
              </p>
            </div>

            {/* Carousel Arrows (only if more than 1 teacher) */}
            {hasMultiple && (
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Əvvəlki müəllim"
                  className="w-10 h-10 rounded-full border border-[rgba(26,19,12,0.12)] bg-[#ffffff] hover:bg-[#e9cfa0] text-[#1a130c] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Növbəti müəllim"
                  className="w-10 h-10 rounded-full border border-[rgba(26,19,12,0.12)] bg-[#ffffff] hover:bg-[#e9cfa0] text-[#1a130c] flex items-center justify-center transition-all cursor-pointer shadow-xs"
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
                      className={`max-w-2xl mx-auto bg-[#ffffff] rounded-[18px] p-6 sm:p-8 border transition-all shadow-md shadow-black/5 ${
                        isActive ? 'border-[#8c6747]' : 'border-[rgba(26,19,12,0.10)]'
                      } flex flex-col sm:flex-row items-center gap-6 sm:gap-8`}
                    >
                      {/* Photo or Initials Placeholder */}
                      <div className="relative shrink-0">
                        {teacher.photo_url ? (
                          <img
                            src={teacher.photo_url}
                            alt={`${teacher.first_name} ${teacher.last_name}`}
                            className={`w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-[16px] border ${
                              isActive ? 'border-[#8c6747]' : 'border-[rgba(26,19,12,0.10)]'
                            } shadow-xs`}
                          />
                        ) : (
                          <div
                            className={`w-36 h-36 sm:w-40 sm:h-40 rounded-[16px] bg-[#24170a] border ${
                              isActive ? 'border-[#e9cfa0]' : 'border-[rgba(26,19,12,0.10)]'
                            } text-[#e9cfa0] flex items-center justify-center font-bold text-3xl select-none shadow-xs`}
                          >
                            {initials || 'ŞM'}
                          </div>
                        )}
                      </div>

                      <div className="text-center sm:text-left space-y-2 flex-1">
                        {teacher.role_title && (
                          <p
                            lang="az"
                            className="text-xs font-semibold text-[#8c6747] uppercase tracking-wider"
                          >
                            {teacher.role_title}
                          </p>
                        )}

                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1a130c]">
                          {teacher.first_name} {teacher.last_name}
                        </h3>

                        {teacher.description && (
                          <p className="text-sm text-[#7a736b] leading-relaxed">
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
                  aria-label={`Müəllim ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-[#8c6747]'
                      : 'w-2 bg-[rgba(26,19,12,0.20)] hover:bg-[#7a736b]'
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
