import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/siteData';
import { Instagram, Facebook, Youtube, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'tiktok':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.33 6.33 0 0 0 6.33-6.32V8.92a8.28 8.28 0 0 0 4.84 1.56V7.03a4.78 4.78 0 0 1-.92-.34z" />
          </svg>
        );
      case 'telegram':
      case 'send':
        return <Send className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#100c08] text-[#d9c7a6] pt-16 pb-12 border-t border-[rgba(243,236,225,0.10)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[rgba(243,236,225,0.10)]">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-[10px] overflow-hidden bg-[#24170a] border border-[#e9cfa0]/30 shadow-xs shrink-0 flex items-center justify-center">
                <Image
                  src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
                  alt="Şahmat Məktəbi Loqosu"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="text-xs text-[#d9c7a6] max-w-sm leading-relaxed">
              Uşaqlar və yeni başlayanlar üçün hazırlanmış şahmat tədris portalı.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-[#f3ece1] block mb-2">
                Sosial şəbəkələr:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#24170a] hover:bg-[#e9cfa0] text-[#e9cfa0] hover:text-[#1a130c] transition-all flex items-center justify-center border border-[#e9cfa0]/30 shadow-xs"
                    title={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links 1: Dərslər */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[#f3ece1] uppercase tracking-wider">
              Tədris Bölmələri
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#board" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Şahmat Lövhəsi
                </Link>
              </li>
              <li>
                <Link href="/#pieces" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Fiqurlar və Qaydalar
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Şah, Mat və Pat
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Xüsusi Gedişlər
                </Link>
              </li>
              <li>
                <Link href="/#tips" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  6 Qızıl Tövsiyə
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Akademiya */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[#f3ece1] uppercase tracking-wider">
              Akademiya
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#teachers" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Təlimçilərimiz
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Şahmat Kitabları
                </Link>
              </li>
              <li>
                <Link href="/#history" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Azərbaycan Şahmat Tarixi
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Suallar və Cavablar
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: Alətlər */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-normal text-[#f3ece1] uppercase tracking-wider">
              Alətlər
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#setup-board" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Mövqe Qurucusu (Sandbox)
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Şahmat Kitabları
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-[#d9c7a6] hover:text-[#e9cfa0] transition-colors">
                  Qeydiyyat və Giriş
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and SVG License Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#d9c7a6]/80">
          <p>© {new Date().getFullYear()} Şahmat Məktəbi. Bütün hüquqlar qorunur.</p>
          <p className="text-[11px] text-[#d9c7a6]/60 text-center sm:text-right">
            Şahmat fiqurları: Cburnett dəsti (Colin M.L. Burnett, CC BY-SA 3.0 / Wikimedia Commons).
          </p>
        </div>
      </div>
    </footer>
  );
};
