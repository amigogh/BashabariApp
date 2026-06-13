import { ArrowLeft, Crown, Truck, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ServicesProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function Services({ onNavigate, onBack }: ServicesProps) {
  const { t } = useLanguage();
  const collaborators = [
    'OTOBI', 'HATIL', 'Penthouse Livings', 'Walton', 'Singer Bangladesh',
    'Butterfly Group', 'Pack n Move', 'Lalamove', 'Link3 Technologies',
    'Grameenphone Broadband', 'BD Interior'
  ];

  const premiumFeatures = [
    { icon: '🏠', title: '1 Year Free Backup Service', desc: 'Emergency support and maintenance assistance 24/7', color: '#C8F53C' },
    { icon: '🔒', title: '1 Year Rent Price Lock Guarantee', desc: 'Your rent stays the same for the entire year', color: '#C8F53C' },
    { icon: '⚖️', title: '1 Year Free Legal Backup', desc: 'Professional legal support for any rental disputes', color: '#C8F53C' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">Services</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Move In Service */}
        <div
          className="p-6 rounded-2xl mb-5 cursor-pointer transition-all"
          style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}
          onClick={() => onNavigate('move-in')}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,245,60,0.3)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)')}
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#C8F53C' }}>
              <Truck className="w-8 h-8" style={{ color: '#0A0A0A' }} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">Move In</h2>
              <p className="text-sm mb-4" style={{ color: '#8A8A8A' }}>
                Complete settlement assistance for your new home with furniture transit, electronics setup, and WiFi installation.
              </p>
              <button className="px-5 py-2 rounded-xl text-sm font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Bashabari Premium */}
        <div className="rounded-2xl mb-5 overflow-hidden" style={{ border: '1px solid rgba(200,245,60,0.3)', background: '#1E1E1E' }}>
          <div className="p-5 flex items-center gap-3" style={{ background: 'rgba(200,245,60,0.08)', borderBottom: '1px solid rgba(200,245,60,0.15)' }}>
            <Crown className="w-6 h-6" style={{ color: '#C8F53C' }} />
            <h2 className="text-xl font-bold text-white">Bashabari Premium</h2>
          </div>
          <div className="p-6">
            <p className="text-sm mb-5" style={{ color: '#8A8A8A' }}>
              Unlock exclusive benefits and protection for your rental journey
            </p>

            <div className="space-y-3 mb-6">
              {premiumFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: '#252525' }}>
                  <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-xs" style={{ color: '#8A8A8A' }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl mb-5 text-center" style={{ background: '#C8F53C' }}>
              <p className="text-3xl font-bold" style={{ color: '#0A0A0A' }}>4,999 BDT</p>
              <p className="text-sm" style={{ color: 'rgba(0,0,0,0.6)' }}>One-time annual payment</p>
            </div>

            <button
              onClick={() => onNavigate('premium-payment')}
              className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              <Crown className="w-5 h-5" />
              Purchase Premium
            </button>
          </div>
        </div>

        {/* Collaborators */}
        <div className="rounded-2xl" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-semibold text-white">Our Trusted Partners</h3>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {collaborators.map((partner) => (
                <div key={partner} className="p-3 rounded-xl text-center" style={{ background: '#252525' }}>
                  <p className="text-sm font-medium text-white">{partner}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
