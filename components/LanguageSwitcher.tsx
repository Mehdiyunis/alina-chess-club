'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { Locale, LOCALES, LOCALE_LABELS } from '@/lib/i18n-config';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  align?: 'left' | 'right';
  fullWidth?: boolean;
}

export function LanguageSwitcher({
  className = '',
  align = 'right',
  fullWidth = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = async (loc: Locale) => {
    setIsOpen(false);
    if (loc !== locale) {
      await setLocale(loc);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('navbar.selectLanguage')}
        className={`flex items-center justify-between gap-1.5 py-1.5 px-2.5 sm:px-3 text-xs font-semibold rounded-full border border-[#E3DCCB] text-[#1E2A22] bg-[#FFFFFF] hover:bg-[#E4EBD9] transition-colors cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2F5D46] ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        <span className="tracking-wider uppercase">{locale}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#5E6B62] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#2F5D46]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t('navbar.selectLanguage')}
          className={`absolute mt-1.5 py-1.5 rounded-[14px] bg-[#FFFFFF] border border-[#E3DCCB] shadow-[0_4px_20px_rgba(30,42,34,0.08)] z-50 animate-in fade-in duration-100 min-w-[130px] ${
            fullWidth ? 'w-full left-0' : align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {LOCALES.map((loc) => {
            const isSelected = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(loc)}
                className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'font-bold text-[#2F5D46] bg-[#E4EBD9]'
                    : 'font-medium text-[#1E2A22] hover:bg-[#F7F3EA]'
                }`}
              >
                <span>{LOCALE_LABELS[loc]}</span>
                <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">
                  {loc}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
