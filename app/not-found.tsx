import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#100c08] to-[#2b1e10] text-[#f3ece1] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative w-18 h-18 rounded-[18px] overflow-hidden bg-[#24170a] border border-[#f3ece1]/10 mb-6 shadow-xl shadow-black/40 flex items-center justify-center">
        <Image
          src="/assets/aistudio/Golden_Knight_Chess_Club_Emblem_a4cf73aa.png"
          alt="Loqo"
          width={72}
          height={72}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mb-3 text-[#f3ece1]">
        404 - Səhifə Tapılmadı
      </h1>
      <p className="text-sm text-[#d9c7a6] max-w-md mb-8 leading-relaxed">
        Axtardığınız səhifə mövcud deyil və ya ünvan dəyişdirilmişdir.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#e9cfa0] hover:bg-[#f1dcb4] text-[#1a130c] text-sm font-semibold transition-all shadow-lg active:scale-95"
      >
        Ana Səhifəyə Qayıt
      </Link>
    </div>
  );
}
