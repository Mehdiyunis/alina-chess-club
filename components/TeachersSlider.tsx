'use client';

import React, { useState, useRef, TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Teacher } from '@/lib/siteData';

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
    <section id="teachers" className="py-16 lg:py-24 bg-[#121024] border-b border-[#2d2750] relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
              Təlimçilərimiz
            </h2>
            <p className="text-sm sm:text-base text-[#9893b8] mt-2 max-w-xl">
              Uşaqlara şahmatın qaydalarını və taktiki düşüncəni addım-addım aşılayan məşqçilər.
            </p>
          </div>

          {/* Carousel Arrows (only if more than 1 teacher) */}
          {hasMultiple && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Əvvəlki müəllim"
                className="w-10 h-10 rounded-[10px] border border-[#2d2750] bg-[#171428] hover:bg-[#211c3a] hover:border-[#7c5cff]/50 text-[#ecebf5] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Növbəti müəllim"
                className="w-10 h-10 rounded-[10px] border border-[#2d2750] bg-[#171428] hover:bg-[#211c3a] hover:border-[#7c5cff]/50 text-[#ecebf5] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Container */}
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
                    className={`max-w-2xl mx-auto bg-[#171428] rounded-[12px] p-6 sm:p-8 border transition-colors ${
                      isActive ? 'border-[#7c5cff]' : 'border-[#2d2750]'
                    } flex flex-col sm:flex-row items-center gap-6 sm:gap-8`}
                  >
                    {/* Photo or Initials Placeholder */}
                    <div className="relative shrink-0">
                      {teacher.photo_url ? (
                        <img
                          src={teacher.photo_url}
                          alt={`${teacher.first_name} ${teacher.last_name}`}
                          className={`w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-[10px] border ${
                            isActive ? 'border-[#7c5cff]' : 'border-[#2d2750]'
                          }`}
                        />
                      ) : (
                        <div
                          className={`w-36 h-36 sm:w-40 sm:h-40 rounded-[10px] bg-[#211c3a] border ${
                            isActive ? 'border-[#7c5cff]' : 'border-[#2d2750]'
                          } text-[#7c5cff] flex items-center justify-center font-bold text-3xl select-none`}
                        >
                          {initials || 'ŞM'}
                        </div>
                      )}
                    </div>

                    <div className="text-center sm:text-left space-y-2 flex-1">
                      {teacher.role_title && (
                        <p
                          lang="az"
                          className="text-xs font-semibold text-[#7c5cff] uppercase tracking-wider"
                        >
                          {teacher.role_title}
                        </p>
                      )}

                      <h3 className="text-xl sm:text-2xl font-bold text-[#ecebf5]">
                        {teacher.first_name} {teacher.last_name}
                      </h3>

                      {teacher.description && (
                        <p className="text-sm text-[#9893b8] leading-relaxed">
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
                    ? 'w-6 bg-[#7c5cff]'
                    : 'w-2 bg-[#2d2750] hover:bg-[#9893b8]'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
