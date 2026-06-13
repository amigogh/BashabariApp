import { useState } from 'react';
import { Home, Menu, FileText, Receipt, Star, Scale, FileCheck, LogOut, PlusCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { User } from '../App';

interface LandlordDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function LandlordDashboard({ user, onNavigate, onLogout }: LandlordDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { icon: FileText, label: t('writtenAgreements'), description: t('viewAllAgreements'), onClick: () => { onNavigate('agreements'); setMenuOpen(false); } },
    { icon: Receipt, label: t('transactions'), description: t('rentCollectionHistory'), onClick: () => { onNavigate('transactions'); setMenuOpen(false); } },
    { icon: Star, label: t('ratings'), description: t('checkReviews'), onClick: () => { onNavigate('ratings'); setMenuOpen(false); } },
    { icon: Scale, label: t('legalRights'), description: t('knowLandlordRights'), onClick: () => { onNavigate('legal-rights'); setMenuOpen(false); } },
    { icon: FileCheck, label: t('myPosts'), description: t('manageListings'), onClick: () => { onNavigate('my-posts'); setMenuOpen(false); } },
  ];

  const ads = [
    { company: 'BD Interior', title: 'Professional Interior Design', description: 'Make your property stand out', accent: '#4F46E5' },
    { company: 'OTOBI', title: 'Bulk Furniture Orders', description: 'Special rates for property owners', accent: '#FF6B35' },
    { company: 'Walton', title: 'Property Appliances Package', description: 'Complete solution for your rental property', accent: '#10B981' },
    { company: 'Link3 Technologies', title: 'Smart Home Solutions', description: 'Install modern security and automation', accent: '#0EA5E9' },
    { company: 'Butterfly Group', title: 'Home Maintenance Services', description: 'Keep your property in perfect condition', accent: '#EC4899' },
  ];
  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  const stats = [
    { value: '3', label: t('activeListings'), color: '#C8F53C' },
    { value: '2', label: t('verifiedPosts'), color: '#10B981' },
    { value: '5', label: t('totalTenants'), color: '#8B5CF6' },
    { value: '4.5', label: t('avgRating'), color: '#F59E0B' },
  ];

  const recentActivity = [
    { dot: '#C8F53C', title: t('newInquiry'), desc: t('newInquiryDesc'), time: `2 ${t('hoursAgo')}`, onClick: () => onNavigate('chat', { owner: 'Potential Tenant', title: 'Gulshan Apartment' }) },
    { dot: '#3B82F6', title: t('rentReceived'), desc: t('rentReceivedDesc'), time: `1 ${t('dayAgo')}`, onClick: () => onNavigate('transactions') },
    { dot: '#8B5CF6', title: t('propertyVerified'), desc: t('propertyVerifiedDesc'), time: `3 ${t('daysAgo')}`, onClick: () => onNavigate('my-posts') },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landlord-dashboard')}>
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
                <p className="text-xs" style={{ color: '#8A8A8A' }}>{t('landlordRole')}</p>
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
                <button key={idx} onClick={item.onClick} className="w-full p-4 text-left rounded-xl" style={{ background: '#252525' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(200,245,60,0.12)' }}>
                      <item.icon className="w-4 h-4" style={{ color: '#C8F53C' }} />
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-white block mb-0.5">{item.label}</span>
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
          <p className="text-sm" style={{ color: '#8A8A8A' }}>{t('manageProperties')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs" style={{ color: '#8A8A8A' }}>{stat.label}</p>
            </div>
          ))}
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
          <div className="px-4 pb-3 text-xs text-center" style={{ color: '#555' }}>{t('exclusiveDeals')}</div>
        </div>

        <div className="mb-6 p-8 rounded-2xl text-center" style={{ background: '#C8F53C' }}>
          <PlusCircle className="w-10 h-10 mx-auto mb-3" style={{ color: '#0A0A0A' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#0A0A0A' }}>{t('readyToRent')}</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(0,0,0,0.6)' }}>{t('postAndFind')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate('property-post')} className="px-8 py-3 rounded-full font-bold text-sm" style={{ background: '#0A0A0A', color: '#C8F53C' }}>{t('postNewProperty')}</button>
            <button onClick={() => onNavigate('my-posts')} className="px-8 py-3 rounded-full font-semibold text-sm" style={{ border: '2px solid rgba(0,0,0,0.25)', color: '#0A0A0A', background: 'transparent' }}>{t('viewMyPosts')}</button>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-white">{t('quickActions')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {menuItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl text-center cursor-pointer transition-all" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }} onClick={item.onClick}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,245,60,0.3)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)')}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: 'rgba(200,245,60,0.12)' }}>
                  <item.icon className="w-5 h-5" style={{ color: '#C8F53C' }} />
                </div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">{t('recentActivity')}</h3>
          <div className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
            {recentActivity.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 cursor-pointer transition-colors" style={idx < recentActivity.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}} onClick={item.onClick}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#252525')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: item.dot }} />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-white">{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8A8A8A' }}>{item.desc}</p>
                  <p className="text-xs mt-1" style={{ color: '#555' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
