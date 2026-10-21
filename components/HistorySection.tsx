import React from 'react';
import { historyData } from '@/lib/siteData';
import { Award, Trophy, Scroll, Star } from 'lucide-react';

export function HistorySection() {
  return (
    <section id="history" className="py-20 relative bg-[#0d0b17] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#3b5bdb]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider">
              <Scroll className="w-3.5 h-3.5" />
              Tarix və İrs
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
              {historyData.title}
            </h2>

            <p className="text-lg font-medium text-[#7c5cff] leading-relaxed">
              {historyData.lead}
            </p>

            <div className="space-y-4 text-[#9893b8] text-base leading-relaxed">
              {historyData.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Quick stats badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#171428] border border-[#2d2750]">
                <div className="text-2xl font-black text-[#ecebf5] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  3 Qat
                </div>
                <div className="text-xs text-[#9893b8] mt-1">Avropa Çempionu</div>
              </div>

              <div className="p-4 rounded-xl bg-[#171428] border border-[#2d2750]">
                <div className="text-2xl font-black text-[#ecebf5] flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#7c5cff]" />
                  Top 5
                </div>
                <div className="text-xs text-[#9893b8] mt-1">Dünya Reytinqi</div>
              </div>

              <div className="p-4 rounded-xl bg-[#171428] border border-[#2d2750] col-span-2 sm:col-span-1">
                <div className="text-2xl font-black text-[#ecebf5] flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  1000+
                </div>
                <div className="text-xs text-[#9893b8] mt-1">İllik Şahmat Ənənəsi</div>
              </div>
            </div>
          </div>

          {/* Right: Famous Azerbaijani Grandmasters */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-[#9a82ff] mb-2 px-1">
              Fəxrimiz olan Qrossmeysterlər
            </h3>

            {historyData.grandmasters.map((gm, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#171428] border border-[#2d2750] hover:border-[#7c5cff]/50 transition-all duration-300 hover:translate-x-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#211c3a] border border-[#2d2750] flex items-center justify-center text-amber-400 shrink-0 font-black text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#ecebf5]">{gm.name}</h4>
                    <p className="text-xs text-[#9893b8] mt-1 leading-relaxed">{gm.title}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7c5cff]/10 via-[#171428] to-[#121024] border border-[#7c5cff]/30 text-center">
              <p className="text-sm text-[#ecebf5] font-semibold mb-2">
                Sizin də övladınız gələcəyin qrossmeysteri ola bilər!
              </p>
              <p className="text-xs text-[#9893b8]">
                Dərslərimizə qoşularaq ilk addımı bu gün atın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
