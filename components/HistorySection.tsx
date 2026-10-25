import React from 'react';
import { historyData } from '@/lib/siteData';
import { ScrollReveal } from './ScrollReveal';

export function HistorySection() {
  return (
    <section id="history" className="py-16 lg:py-24 bg-[#2b1d0e] border-b border-[rgba(243,236,225,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Narrative */}
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-[clamp(2rem,3.5vw,2.5rem)] font-normal text-[#f3ece1] tracking-tight leading-[1.1]">
              {historyData.title}
            </h2>

            <p className="font-serif text-base sm:text-lg text-[#e9cfa0] font-normal leading-relaxed">
              {historyData.lead}
            </p>

            <div className="space-y-3.5 text-[#d9c7a6] text-sm leading-relaxed">
              {historyData.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Factual Information Strip */}
            <div className="pt-4 border-t border-[rgba(243,236,225,0.10)] grid grid-cols-2 gap-4">
              <div className="bg-[#362513] rounded-[18px] border border-[rgba(243,236,225,0.10)] p-4 sm:p-5 shadow-sm">
                <span className="font-serif text-2xl font-normal text-[#f3ece1] block">
                  3 Dəfə
                </span>
                <span className="text-xs text-[#d9c7a6] mt-1 block leading-relaxed">
                  Kişilərdən ibarət milli komanda: Avropa Çempionu (2009, 2013, 2017)
                </span>
              </div>

              <div className="bg-[#362513] rounded-[18px] border border-[rgba(243,236,225,0.10)] p-4 sm:p-5 shadow-sm">
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#f3ece1] block">
                  Top Reytinq
                </span>
                <span className="text-xs text-[#d9c7a6] mt-1 block leading-relaxed">
                  FIDE reytinqinə əsasən dünya üzrə aparıcı mövqelər
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Grandmasters List */}
          <ScrollReveal direction="right" className="lg:col-span-5 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#e9cfa0] block mb-2">
              Tanınmış Azərbaycan Qrossmeysterləri
            </span>

            {historyData.grandmasters.map((gm, idx) => (
              <div
                key={idx}
                className="bg-[#362513] rounded-[18px] border border-[rgba(243,236,225,0.10)] p-4.5 flex items-start gap-4 shadow-sm"
              >
                <span className="w-8 h-8 rounded-full bg-[#24170a] border border-[#e9cfa0]/30 text-[#e9cfa0] font-bold text-xs flex items-center justify-center shrink-0 font-mono">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-base font-normal text-[#f3ece1]">{gm.name}</h3>
                  <p className="text-xs text-[#d9c7a6] mt-0.5 leading-relaxed">{gm.title}</p>
                </div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
