import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const options = [
    { value: 'en' as const, label: 'English', native: 'English' },
    { value: 'bn' as const, label: 'Bangla', native: 'বাংলা' },
  ];

  const current = options.find((o) => o.value === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors select-none"
        style={{
          background: open ? 'rgba(200,245,60,0.12)' : '#252525',
          border: `1px solid ${open ? 'rgba(200,245,60,0.35)' : 'rgba(255,255,255,0.08)'}`,
          color: '#FFFFFF',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" style={{ color: '#C8F53C' }} />
        <span style={{ fontFamily: lang === 'bn' ? "'Hind Siliguri', sans-serif" : undefined }}>
          {current.native}
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform"
          style={{ color: '#8A8A8A', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 rounded-2xl overflow-hidden z-50"
          style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
          role="listbox"
        >
          {options.map((opt) => {
            const active = lang === opt.value;
            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={active}
                onClick={() => { setLang(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm transition-colors"
                style={{
                  background: active ? 'rgba(200,245,60,0.08)' : 'transparent',
                  color: active ? '#C8F53C' : '#FFFFFF',
                  fontFamily: opt.value === 'bn' ? "'Hind Siliguri', sans-serif" : undefined,
                }}
                onMouseEnter={e => !active && ((e.currentTarget as HTMLElement).style.background = '#252525')}
                onMouseLeave={e => !active && ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <span className="font-medium">{opt.native}</span>
                {active && <Check className="w-3.5 h-3.5" style={{ color: '#C8F53C' }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
