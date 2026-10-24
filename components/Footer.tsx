import React from 'react';
import Link from 'next/link';
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
      case 'telegram':
      case 'send':
        return <Send className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#090712] text-[#9893b8] pt-14 pb-12 border-t border-[#2d2750]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#2d2750]">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#211c3a] border border-[#2d2750] text-[#7c5cff] flex items-center justify-center font-bold text-sm">
                ♚
              </div>
              <span className="font-bold text-base text-[#ecebf5]">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-xs text-[#9893b8] max-w-sm leading-relaxed">
              Uşaqlar və yeni başlayanlar üçün hazırlanmış şahmat tədris portalı.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-[#ecebf5] block mb-2">
                Sosial şəbəkələr:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#171428] hover:bg-[#211c3a] text-[#9893b8] hover:text-[#ecebf5] rounded-[8px] transition-colors border border-[#2d2750]"
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
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Tədris Bölmələri
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#board" className="hover:text-[#ecebf5] transition-colors">
                  Şahmat Lövhəsi
                </Link>
              </li>
              <li>
                <Link href="/#pieces" className="hover:text-[#ecebf5] transition-colors">
                  Fiqurlar və Qaydalar
                </Link>
              </li>
              <li>
                <Link href="/#goals" className="hover:text-[#ecebf5] transition-colors">
                  Şah, Mat və Pat
                </Link>
              </li>
              <li>
                <Link href="/#rules" className="hover:text-[#ecebf5] transition-colors">
                  Xüsusi Gedişlər
                </Link>
              </li>
              <li>
                <Link href="/#tips" className="hover:text-[#ecebf5] transition-colors">
                  6 Qızıl Tövsiyə
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2: Akademiya */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Akademiya
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#teachers" className="hover:text-[#ecebf5] transition-colors">
                  Təlimçilərimiz
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#ecebf5] transition-colors">
                  Şahmat Kitabları
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-[#ecebf5] transition-colors">
                  Azərbaycan Şahmat Tarixi
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#ecebf5] transition-colors">
                  Suallar və Cavablar
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#ecebf5] transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 3: Alətlər */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#ecebf5] uppercase tracking-wider">
              Alətlər
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/#setup-board" className="hover:text-[#ecebf5] transition-colors">
                  Mövqe Qurucusu (Sandbox)
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#ecebf5] transition-colors">
                  Şahmat Kitabları
                </Link>
              </li>
              <li>
                <Link href="/auth" className="hover:text-[#ecebf5] transition-colors">
                  Qeydiyyat və Giriş
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and SVG License Attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9893b8]">
          <p>© {new Date().getFullYear()} Şahmat Məktəbi. Bütün hüquqlar qorunur.</p>
          <p className="text-[11px] text-[#9893b8]/80 text-center sm:text-right">
            Şahmat fiqurları: Cburnett dəsti (Colin M.L. Burnett, CC BY-SA 3.0 / Wikimedia Commons).
          </p>
        </div>
      </div>
    </footer>
  );
};
