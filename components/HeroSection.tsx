import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Users, Trophy } from 'lucide-react';
import { ChessPieceSvg } from './ChessPieceSvg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-[#0d0b17] border-b border-[#2d2750]">
      {/* Background Soft Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-[#7c5cff]/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[300px] bg-[#3b5bdb]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 w-[420px] h-[280px] bg-[#7c5cff]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle Chessboard Checker Pattern Overlay */}
      <div className="absolute inset-0 bg-chess-pattern opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Large Faint Chess Piece Silhouettes */}
      <div className="absolute top-8 left-6 text-[#7c5cff]/[0.04] pointer-events-none select-none hidden lg:block -rotate-12">
        <ChessPieceSvg type="k" color="w" className="w-52 h-52" />
      </div>
      <div className="absolute bottom-8 right-10 text-[#7c5cff]/[0.04] pointer-events-none select-none hidden lg:block rotate-12">
        <ChessPieceSvg type="n" color="w" className="w-56 h-56" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171428] text-[#9a82ff] text-xs font-semibold tracking-wide border border-[#2d2750] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#7c5cff]" />
              <span>Uşaqlar və Valideynlər Üçün İnteraktiv Şahmat Portalı</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#ecebf5] tracking-tight leading-[1.15] text-balance">
              Şahmat dünyasına sehrli ilk addımını bizimlə at!
            </h1>

            <p className="text-base sm:text-lg text-[#9893b8] max-w-2xl leading-relaxed">
              Şahmat darıxdırıcı deyil — bu, ağıllı şahlar, çevik atlar və cəsur piyadaların maraqlı macərasıdır. 
              Sıfırdan başlayaraq addım-addım fiqurları tanı, qaydaları öyrən və zehnini inkişaf etdir.
            </p>

            {/* "Bizə qoşul" button right under text */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/auth"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white btn-violet-glow rounded-2xl cursor-pointer"
              >
                <span>Bizə qoşul</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#pieces"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-[#ecebf5] bg-[#171428] hover:bg-[#211c3a] border border-[#2d2750] hover:border-[#7c5cff]/40 rounded-2xl transition-all"
              >
                Fiqurları kəşf et
              </a>
            </div>

            {/* Quick feature proof points */}
            <div className="pt-6 border-t border-[#2d2750] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-[#9a82ff] font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-[#7c5cff]" />
                  <span>Sadə Dil</span>
                </div>
                <p className="text-xs text-[#9893b8] mt-0.5">Uşaqlar üçün xüsusi izahlar</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#9a82ff] font-bold text-sm">
                  <Users className="w-4 h-4 text-[#7c5cff]" />
                  <span>Usta Müəllimlər</span>
                </div>
                <p className="text-xs text-[#9893b8] mt-0.5">Beynəlxalq təcrübəli mentorlar</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[#9a82ff] font-bold text-sm">
                  <Trophy className="w-4 h-4 text-[#7c5cff]" />
                  <span>Lövhə Qurucusu</span>
                </div>
                <p className="text-xs text-[#9893b8] mt-0.5">İnteraktiv şahmat qum qutusu</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-[#171428] p-6 sm:p-7 rounded-3xl border border-[#2d2750] shadow-2xl card-hover-glow space-y-5">
              <div className="flex items-center justify-between border-b border-[#2d2750] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#7c5cff]/15 text-[#9a82ff] flex items-center justify-center font-bold text-sm border border-[#7c5cff]/30">
                    ♔
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#ecebf5]">Şahmat Krallığı</h2>
                    <p className="text-[11px] text-[#9893b8]">6 fərqli fiqur, 64 sehrli xana</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-lg">
                  Öyrənmək Asandır
                </span>
              </div>

              {/* Mini visual chess showcase */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: 'Şah', role: 'Başçı', type: 'k', color: 'w', bg: 'bg-[#211c3a]' },
                  { name: 'Vəzir', role: 'Ən güclü', type: 'q', color: 'w', bg: 'bg-[#211c3a]' },
                  { name: 'At', role: 'Sıçrayan', type: 'n', color: 'w', bg: 'bg-[#211c3a]' },
                  { name: 'Top', role: 'Düz xətt', type: 'r', color: 'b', bg: 'bg-[#121024]' },
                  { name: 'Fil', role: 'Çəp gəzən', type: 'b', color: 'b', bg: 'bg-[#121024]' },
                  { name: 'Piyada', role: 'Cəsur', type: 'p', color: 'b', bg: 'bg-[#121024]' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`${item.bg} p-3 rounded-2xl border border-[#2d2750] flex flex-col items-center text-center transition-all hover:scale-105 hover:border-[#7c5cff]/50`}
                  >
                    <div className="w-10 h-10 mb-1 flex items-center justify-center">
                      <ChessPieceSvg type={item.type as any} color={item.color as any} />
                    </div>
                    <span className="text-xs font-bold text-[#ecebf5]">{item.name}</span>
                    <span className="text-[10px] text-[#9893b8]">{item.role}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#211c3a] rounded-2xl p-3.5 border border-[#2d2750] flex items-center gap-3">
                <span className="text-2xl select-none">🏆</span>
                <p className="text-xs text-[#ecebf5] font-medium leading-relaxed">
                  "Hər bir böyük qrossmeyster vaxtilə yeni başlayan bir uşaq idi."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
