import { Home, Star, ArrowRight, Shield, CheckCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { t } = useLanguage();

  const reviews = [
    { name: 'Ahmed Hasan', role: t('reviewTenant'), rating: 5, text: 'Found my perfect apartment within a week! The verified listings gave me confidence.', avatar: 'AH' },
    { name: 'Fatima Rahman', role: t('reviewLandlord'), rating: 5, text: 'Great platform for finding reliable tenants. The verification process is excellent.', avatar: 'FR' },
    { name: 'Kabir Ahmed', role: t('reviewStudent'), rating: 5, text: 'As a student, finding affordable housing was always difficult. Bashabari made it easy!', avatar: 'KA' },
  ];

  const partners = ['OTOBI', 'HATIL', 'Walton', 'Singer', 'Grameenphone', 'Link3'];

  const features = [
    { icon: Shield, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: CheckCircle, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: MessageCircle, title: t('feature3Title'), desc: t('feature3Desc') },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      {/* Header */}
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-7 h-7" style={{ color: '#C8F53C' }} />
            <span className="text-xl font-bold text-white">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => onNavigate('auth')}
              className="px-5 py-2 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              {t('loginSignup')}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
            <CheckCircle className="w-4 h-4" />
            {t('heroTagline')}
          </div>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: '#C8F53C' }}>
            <Home className="w-10 h-10" style={{ color: '#0A0A0A' }} />
          </div>
          <h2 className="text-5xl font-bold mb-5 text-white leading-tight">
            {t('heroTitle')} <span style={{ color: '#C8F53C' }}>{t('appName')}</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#8A8A8A' }}>
            {t('heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('auth')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              {t('getStarted')} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('property-search')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#252525')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {t('browseProperties')}
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4">
        <div className="container mx-auto">
          <p className="text-center text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#C8F53C' }}>{t('whyChooseUs')}</p>
          <h3 className="text-3xl font-bold text-center mb-10 text-white">{t('whyChooseTitle')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(200,245,60,0.12)' }}>
                  <f.icon className="w-6 h-6" style={{ color: '#C8F53C' }} />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">{f.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container mx-auto">
          <p className="text-center text-sm mb-6" style={{ color: '#8A8A8A' }}>{t('trustedPartners')}</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {partners.map((partner) => (
              <div key={partner} className="px-6 py-3 rounded-xl text-sm font-semibold" style={{ background: '#1E1E1E', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.08)' }}>
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-10 text-white">{t('clientsSay')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-6 rounded-2xl" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs" style={{ color: '#8A8A8A' }}>{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#CCCCCC' }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 mx-4 mb-8 rounded-3xl" style={{ background: '#C8F53C' }}>
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ color: '#0A0A0A' }}>{t('ctaTitle')}</h3>
          <p className="text-base mb-8" style={{ color: 'rgba(0,0,0,0.65)' }}>{t('ctaDesc')}</p>
          <button
            onClick={() => onNavigate('auth')}
            className="px-10 py-4 rounded-full font-bold text-base transition-opacity hover:opacity-90"
            style={{ background: '#0A0A0A', color: '#C8F53C' }}
          >
            {t('createAccount')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Home className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">{t('appName')}</span>
          </div>
          <p className="text-sm" style={{ color: '#8A8A8A' }}>{t('footerTagline')}</p>
          <p className="text-xs mt-2" style={{ color: '#555555' }}>{t('footerCopy')}</p>
        </div>
      </footer>
    </div>
  );
}
