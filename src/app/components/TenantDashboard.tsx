import { useState } from 'react';
import { Home, Menu, FileText, Receipt, Star, Scale, Bookmark, LogOut, CheckCircle, Search, Wrench, X } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { User } from '../App';

interface TenantDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function TenantDashboard({ user, onNavigate, onLogout }: TenantDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { icon: Wrench, label: t('services'), description: t('moveInHelp'), badge: 'New', onClick: () => { onNavigate('services'); setMenuOpen(false); } },
    { icon: FileText, label: t('writtenAgreements'), description: t('viewAgreements'), onClick: () => { onNavigate('agreements'); setMenuOpen(false); } },
    { icon: Receipt, label: t('transactions'), description: t('billHistory'), onClick: () => { onNavigate('transactions'); setMenuOpen(false); } },
    { icon: Star, label: t('ratings'), description: t('reviewHomes'), badge: t('earn100'), onClick: () => { onNavigate('ratings'); setMenuOpen(false); } },
    { icon: Scale, label: t('legalRights'), description: t('knowTenantRights'), onClick: () => { onNavigate('legal-rights'); setMenuOpen(false); } },
    { icon: Bookmark, label: t('bookedFlats'), description: t('savedProperties'), onClick: () => { onNavigate('booked-flats'); setMenuOpen(false); } },
  ];

  const ads = [
    { company: 'OTOBI', title: 'Premium Furniture Collection', description: 'Transform your new home with elegant furniture', accent: '#FF6B35' },
    { company: 'HATIL', title: 'Modern Living Solutions', description: 'Quality furniture for every room', accent: '#3B82F6' },
    { company: 'Walton', title: 'Home Appliances Sale', description: 'AC, Refrigerator, and more at best prices', accent: '#10B981' },
    { company: 'Singer Bangladesh', title: 'Electronics & Appliances', description: 'Trusted brand for 100+ years', accent: '#8B5CF6' },
    { company: 'Grameenphone Broadband', title: 'High-Speed Internet', description: 'Get fiber optic connection for your home', accent: '#0EA5E9' },
    { company: 'Pack n Move', title: 'Hassle-Free Moving Service', description: 'Professional packing and transportation', accent: '#F59E0B' },
  ];
  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  const properties = [
    { id: 1, title: 'Luxury Apartment in Gulshan 2', location: 'Gulshan 2, Dhaka', rent: 45000, rating: 4.9, reviews: 28, verified: true },
    { id: 2, title: 'Cozy Bachelor Flat in Mohammadpur', location: 'Mohammadpur, Dhaka', rent: 9500, rating: 4.7, reviews: 24, verified: true },
    { id: 3, title: 'Family Apartment in Dhanmondi', location: 'Dhanmondi, Dhaka', rent: 38000, rating: 4.8, reviews: 22, verified: true },
    { id: 4, title: 'Studio Apartment in Banani', location: 'Banani, Dhaka', rent: 18000, rating: 4.6, reviews: 19, verified: false },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('tenant-dashboard')}>
            <Home className="w-6 h-6" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">{t('appName')}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium" style={{ background: '#252525', color: '#FFFFFF' }}>
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">{t('viewMore')}</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer p-2 rounded-xl" onClick={() => onNavigate('profile')} style={{ background: '#252525' }}>
              <Avatar className="w-8 h-8">
                <AvatarFallback style={{ background: '#C8F53C', color: '#0A0A0A', fontSize: '14px' }}>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,245,60,0.15)', color: '#C8F53C' }}>{user.tenantScore}</span>
                  {user.physicalVerified && <CheckCircle className="w-3 h-3" style={{ color: '#C8F53C' }} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setMenuOpen(false)} />
          <div className="relative ml-auto w-80 h-full flex flex-col" style={{ background: '#1E1E1E', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <h2 className="text-lg font-semibold text-white">{t('menu')}</h2>
                <p className="text-sm" style={{ color: '#8A8A8A' }}>{t('accessFeatures')}</p>
              </div>
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: '#252525', color: '#FFFFFF' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 space-y-2 overflow-auto">
              {menuItems.map((item, idx) => (
                <button key={idx} onClick={item.onClick} className="w-full p-4 text-left rounded-xl transition-colors" style={{ background: '#252525' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,245,60,0.12)' }}>
                      <item.icon className="w-4 h-4" style={{ color: '#C8F53C' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-sm text-white">{item.label}</span>
                        {item.badge && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,245,60,0.15)', color: '#C8F53C' }}>{item.badge}</span>}
                      </div>
                      <p className="text-xs" style={{ color: '#8A8A8A' }}>{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={onLogout} className="w-full flex items-center gap-2 p-3 rounded-xl text-sm font-medium" style={{ color: '#EF4444', background: 'rgba(239,68,68,0.08)' }}>
                <LogOut className="w-4 h-4" /> {t('logout')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">{t('welcomeBack2')}, {user.name.split(' ')[0]}!</h2>
          <p className="text-sm" style={{ color: '#8A8A8A' }}>{t('findHomeToday')}</p>
        </div>

        <div className="p-5 rounded-2xl mb-6 flex items-center justify-between" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
          <div>
            <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{t('tenantScoreLabel')}</p>
            <p className="text-2xl font-bold" style={{ color: '#C8F53C' }}>{user.tenantScore}</p>
          </div>
          {user.physicalVerified && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(200,245,60,0.15)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#C8F53C' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{t('verified')}</p>
                <p className="text-xs" style={{ color: '#8A8A8A' }}>{t('identityConfirmed')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#1E1E1E' }}>
          <div className="px-4 pt-3 pb-1 text-xs text-center" style={{ color: '#555' }}>{t('sponsored')}</div>
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: randomAd.accent, color: '#FFFFFF' }}>{randomAd.company.charAt(0)}</div>
              <div>
                <p className="font-bold text-white">{randomAd.company}</p>
                <p className="text-sm font-medium mb-1" style={{ color: '#CCCCCC' }}>{randomAd.title}</p>
                <p className="text-xs" style={{ color: '#8A8A8A' }}>{randomAd.description}</p>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 text-xs text-center" style={{ color: '#555' }}>{t('specialDiscounts')}</div>
        </div>

        <div className="mb-6 p-8 rounded-2xl text-center" style={{ background: '#C8F53C' }}>
          <Search className="w-10 h-10 mx-auto mb-3" style={{ color: '#0A0A0A' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#0A0A0A' }}>{t('whatLooking')}</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(0,0,0,0.6)' }}>{t('findFromVerified')}</p>
          <button onClick={() => onNavigate('property-search')} className="px-8 py-3 rounded-full font-bold text-sm" style={{ background: '#0A0A0A', color: '#C8F53C' }}>
            {t('searchForHomes')}
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">{t('mostReviewed')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {properties.map((property) => (
              <div key={property.id} className="rounded-2xl overflow-hidden cursor-pointer transition-all" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}
                onClick={() => onNavigate('property-details', property)}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,245,60,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)')}
              >
                <div className="flex gap-3 p-4">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: '#252525' }}>🏢</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-sm text-white">{property.title}</p>
                      {property.verified && <CheckCircle className="w-4 h-4 flex-shrink-0 ml-2" style={{ color: '#C8F53C' }} />}
                    </div>
                    <p className="text-xs mb-2" style={{ color: '#8A8A8A' }}>{property.location}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-white">{property.rating}</span>
                      <span className="text-xs" style={{ color: '#8A8A8A' }}>({property.reviews})</span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: '#C8F53C' }}>{property.rent.toLocaleString()} BDT<span className="text-xs font-normal" style={{ color: '#8A8A8A' }}>/mo</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
