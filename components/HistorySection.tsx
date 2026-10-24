import React from 'react';
import { historyData } from '@/lib/siteData';

export function HistorySection() {
  return (
    <section id="history" className="py-16 lg:py-24 bg-[#0d0b17] border-b border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[#ecebf5] tracking-tight">
              {historyData.title}
            </h2>

            <p className="text-base text-[#7c5cff] font-medium leading-relaxed">
              {historyData.lead}
            </p>

            <div className="space-y-3.5 text-[#9893b8] text-sm leading-relaxed">
              {historyData.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Factual Information Strip */}
            <div className="pt-4 border-t border-[#2d2750] grid grid-cols-2 gap-4">
              <div className="card-flat p-4">
                <span className="text-xl font-bold text-[#ecebf5] font-mono block">
                  3 Dəfə
                </span>
                <span className="text-xs text-[#9893b8] mt-1 block">
                  Kişilərdən ibarət milli komanda: Avropa Çempionu (2009, 2013, 2017)
                </span>
              </div>

              <div className="card-flat p-4">
                <span className="text-xl font-bold text-[#ecebf5] font-mono block">
                  [Reytinq / Statistika]
                </span>
                <span className="text-xs text-[#9893b8] mt-1 block">
                  FIDE reytinqinə əsasən dünya üzrə aparıcı mövqelər
                </span>
              </div>
            </div>
          </div>

          {/* Right: Grandmasters List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9893b8] block mb-2">
              Tanınmış Azərbaycan Qrossmeysterləri
            </span>

            {historyData.grandmasters.map((gm, idx) => (
              <div
                key={idx}
                className="card-flat p-4 flex items-start gap-3.5"
              >
                <span className="w-7 h-7 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[#ecebf5]">{gm.name}</h3>
                  <p className="text-xs text-[#9893b8] mt-0.5 leading-relaxed">{gm.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
