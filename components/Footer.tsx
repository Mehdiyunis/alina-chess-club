import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/siteData';
import { Instagram, Facebook, Youtube, Send, ShieldCheck, Heart, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'telegram':
      case 'send':
        return <Send className="w-4 h-4" />;
      default:
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.52a8.28 8.28 0 0 0 4.77 1.5V6.69z" />
          </svg>
        );
    }
  };

  return (
    <footer className="bg-[#090712] text-[#9893b8] pt-16 pb-12 border-t border-[#2d2750]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2d2750]">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c5cff] to-[#5136d8] text-white flex items-center justify-center font-black text-lg border border-[#9a82ff]/30 shadow-md">
                ♔
              </div>
              <div>
                <span className="font-bold text-lg text-[#ecebf5] block">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-[#9a82ff] block">
                  Müasir İnteraktiv Uşaq Şahmat Platforması
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9893b8] max-w-sm leading-relaxed">
              Uşaqlara şahmatı sevdirən, məntiqi düşüncəni və strateji baxışı inkişaf etdirən milli tədris və resurs mərkəzi.
            </p>

            {/* Social media links config */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-[#ecebf5] mb-2.5">
                Sosial Şəbəkələrdə Bizi İzləyin:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-[#171428] hover:bg-[#7c5cff] text-[#ecebf5] hover:text-white rounded-xl transition-all border border-[#2d2750] hover:border-[#7c5cff] shadow-sm"
                    title={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav links 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Tədris Bölmələri
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#board" className="hover:text-[#9a82ff] transition-colors">
                  Şahmat Lövhəsi
                </Link>
              </li>
              <li>
                <Link href="/#pieces" className="hover:text-[#9a82ff] transition-colors">
                  Fiqurlar və Hərəkətlər
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="hover:text-[#9a82ff] transition-colors">
                  Şah, Mat və Pat
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="hover:text-[#9a82ff] transition-colors">
                  Xüsusi Gedişlər
                </Link>
              </li>
              <li>
                <Link href="/#tips" className="hover:text-[#9a82ff] transition-colors">
                  6 Qızıl Məsləhət
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav links 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Akademiya
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#teachers" className="hover:text-[#9a82ff] transition-colors">
                  Müəllimlərimiz
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="hover:text-[#9a82ff] transition-colors flex items-center gap-1.5 text-[#9a82ff]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Şahmat Kitabxanası</span>
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-[#9a82ff] transition-colors">
                  Azərbaycan Şahmat Tarixi
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#9a82ff] transition-colors">
                  Tez-tez Verilən Suallar
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#9a82ff] transition-colors">
                  Əlaqə və Qeydiyyat
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Auth */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Alətlər və Giriş
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#setup-board" className="hover:text-[#9a82ff] transition-colors">
                  Mövqe Qurucusu (Sandbox)
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="hover:text-[#9a82ff] transition-colors"
                >
                  Qeydiyyat və Giriş
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-[#9a82ff] transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7c5cff]" />
                  <span>Admin Paneli</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9893b8]">
          <p>© {new Date().getFullYear()} Şahmat Məktəbi. Bütün hüquqlar qorunur.</p>
          <div className="flex items-center gap-1">
            <span>Uşaqlar və şahmat həvəskarları üçün sevgi ilə hazırlandı</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
