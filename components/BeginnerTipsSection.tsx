import React from 'react';
import { beginnerTipsData } from '@/lib/siteData';
import { Compass, Lightbulb } from 'lucide-react';

export function BeginnerTipsSection() {
  return (
    <section id="tips" className="py-20 relative bg-[#0d0b17] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7c5cff]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c5cff]/10 border border-[#7c5cff]/20 text-[#9a82ff] text-xs font-semibold uppercase tracking-wider mb-4">
            <Lightbulb className="w-3.5 h-3.5" />
            Yeni Başlayanlara Tövsiyələr
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ecebf5] tracking-tight">
            Şahmatda Uğurun 6 Qızıl Qaydası
          </h2>
          <p className="mt-3 text-[#9893b8] text-base sm:text-lg">
            Hər bir böyük qrossmeyster bir vaxtlar bu sadə addımlarla oyuna başlayıb!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerTipsData.map((tip) => (
            <div
              key={tip.number}
              className="group relative bg-[#171428] border border-[#2d2750] rounded-2xl p-6 sm:p-7 hover:border-[#7c5cff]/50 hover:bg-[#1a172e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7c5cff]/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-[#7c5cff]/30 group-hover:text-[#7c5cff] transition-colors font-mono">
                    {tip.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#211c3a] border border-[#2d2750] flex items-center justify-center text-[#9a82ff] group-hover:scale-110 transition-transform">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#ecebf5] mb-2.5 group-hover:text-white transition-colors">
                  {tip.title}
                </h3>
                <p className="text-[#9893b8] text-sm leading-relaxed">
                  {tip.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d2750]/60 flex items-center gap-2 text-xs text-[#9a82ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cff]" />
                <span>Qızıl qayda</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
