import { useState } from 'react';
import { ArrowLeft, Home, Star, CheckCircle, MapPin, MessageCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { UserType } from '../App';

interface PropertySearchProps {
  userType: UserType;
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

const inputStyle = {
  background: '#252525',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  borderRadius: '0.75rem',
};

export function PropertySearch({ userType, onNavigate, onBack }: PropertySearchProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [searchType, setSearchType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');

  const mockProperties = [
    { id: 1, title: 'Modern Family Apartment in Gulshan', type: 'Family Apartment', rent: 35000, location: 'Gulshan 2, Dhaka', bedrooms: 3, bathrooms: 2, rating: 4.8, reviews: 12, verified: true, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', owner: 'Mr. Rahman', ownerPhone: '+880 1711-123456', ownerAvatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 2, title: 'Student-Friendly Bachelor House', type: 'Bachelor Male House', rent: 8000, location: 'Mohammadpur, Dhaka', bedrooms: 1, bathrooms: 1, rating: 4.5, reviews: 8, verified: true, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', owner: 'Mrs. Begum', ownerPhone: '+880 1712-234567', ownerAvatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, title: 'Spacious Duplex Penthouse', type: 'Duplex/Penthouse', rent: 85000, location: 'Banani, Dhaka', bedrooms: 4, bathrooms: 3, rating: 4.9, reviews: 15, verified: true, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop', owner: 'Dr. Khan', ownerPhone: '+880 1713-345678', ownerAvatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 4, title: 'Cozy Studio Apartment', type: 'Studio Apartment', rent: 15000, location: 'Dhanmondi, Dhaka', bedrooms: 1, bathrooms: 1, rating: 4.6, reviews: 6, verified: false, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', owner: 'Ms. Akter', ownerPhone: '+880 1714-456789', ownerAvatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, title: 'Commercial Shop Space', type: 'Shop / Retail Space', rent: 45000, location: 'Mirpur 10, Dhaka', bedrooms: 0, bathrooms: 1, rating: 4.7, reviews: 10, verified: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', owner: 'Mr. Hossain', ownerPhone: '+880 1715-567890', ownerAvatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 6, title: 'Female Bachelor Mess', type: 'Mess (Female)', rent: 6500, location: 'Uttara, Dhaka', bedrooms: 1, bathrooms: 1, rating: 4.4, reviews: 5, verified: true, image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600&h=400&fit=crop', owner: 'Mrs. Sultana', ownerPhone: '+880 1716-678901', ownerAvatar: 'https://i.pravatar.cc/150?img=47' },
  ];

  const tenantCategories = [
    { value: 'family', label: t('family'), emoji: '👨‍👩‍👧‍👦', desc: t('familyDesc') },
    { value: 'student', label: t('students'), emoji: '👨‍🎓', desc: t('studentsDesc') },
    { value: 'bachelor', label: t('bachelors'), emoji: '🧑‍💼', desc: t('bachelorsDesc') },
    { value: 'commercial', label: t('commercial'), emoji: '🏢', desc: t('commercialDesc') },
  ];

  const propertyTypes: Record<string, { value: string; label: string }[]> = {
    family: [{ value: 'apartment', label: 'Family Apartment' }, { value: 'duplex', label: 'Duplex/Penthouse' }, { value: 'household', label: 'Single Household' }, { value: 'villa', label: 'Villa' }],
    student: [{ value: 'bachelor-male', label: 'Bachelor Male House' }, { value: 'bachelor-female', label: 'Bachelor Female House' }, { value: 'mess', label: 'Mess (Male/Female)' }, { value: 'hostel', label: 'Hostel' }, { value: 'sublet', label: 'Sublet' }],
    bachelor: [{ value: 'bachelor-male', label: 'Bachelor Male House' }, { value: 'bachelor-female', label: 'Bachelor Female House' }, { value: 'mess', label: 'Mess' }, { value: 'studio', label: 'Studio Apartment' }],
    commercial: [{ value: 'shop', label: 'Shop / Retail Space' }, { value: 'office', label: 'Office Space' }, { value: 'restaurant', label: 'Restaurant/Cafe Space' }, { value: 'bank', label: 'Bank/ATM Booth Space' }, { value: 'showroom', label: 'Showroom' }, { value: 'coworking', label: 'Co-working Space' }],
  };

  const budgetRanges = [
    { value: '0-10000', label: '0 - 10,000 BDT' }, { value: '10000-20000', label: '10,000 - 20,000 BDT' },
    { value: '20000-40000', label: '20,000 - 40,000 BDT' }, { value: '40000-60000', label: '40,000 - 60,000 BDT' },
    { value: '60000-100000', label: '60,000 - 1,00,000 BDT' }, { value: '100000+', label: '1,00,000+ BDT' },
  ];

  const locations = ['Gulshan', 'Banani', 'Dhanmondi', 'Mohammadpur', 'Mirpur', 'Uttara', 'Bashundhara', 'Baridhara', 'Lalmatia', 'Malibagh'];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      {/* Header */}
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Home className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">{t('propertySearch')}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('whatAreYouLooking')}</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>{t('selectTypeDesc')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {tenantCategories.map((cat) => (
                <div
                  key={cat.value}
                  className="p-6 rounded-2xl cursor-pointer transition-all"
                  style={searchType === cat.value
                    ? { background: 'rgba(200,245,60,0.1)', border: '2px solid #C8F53C' }
                    : { background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                  onClick={() => { setSearchType(cat.value); setPropertyType(''); setStep(2); }}
                >
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{cat.label}</h3>
                  <p className="text-sm" style={{ color: '#8A8A8A' }}>{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Filters */}
        {step === 2 && searchType && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 mb-5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#C8F53C' }}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">{t('refineSearch')}</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>{t('refineDesc')}</p>

            <div className="p-6 rounded-2xl mb-6 space-y-4" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('propertyType')}</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger style={inputStyle}><SelectValue placeholder="Select property type" /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    {propertyTypes[searchType]?.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('budgetRange')}</label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger style={inputStyle}><SelectValue placeholder="Select your budget" /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('preferredLocation')}</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger style={inputStyle}><SelectValue placeholder="Select location" /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4 rounded-xl font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              {t('searchProperties')}
            </button>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('availableProperties')}</h2>
                <p className="text-sm" style={{ color: '#8A8A8A' }}>{mockProperties.length} {t('propertiesFound')}</p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}
              >
                Refine Search
              </button>
            </div>

            <div className="space-y-4">
              {mockProperties.map((property) => (
                <div
                  key={property.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all"
                  style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}
                  onClick={() => onNavigate('property-details', property)}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,245,60,0.3)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)')}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto flex-shrink-0">
                      <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                          <div className="flex items-center gap-1 text-sm mb-2" style={{ color: '#8A8A8A' }}>
                            <MapPin className="w-4 h-4" />
                            <span>{property.location}</span>
                          </div>
                        </div>
                        {property.verified && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                            <CheckCircle className="w-3 h-3" /> Verified
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm text-white">{property.rating}</span>
                        <span className="text-sm" style={{ color: '#8A8A8A' }}>({property.reviews} reviews)</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.bedrooms > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-white" style={{ background: '#252525' }}>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                        )}
                        {property.bathrooms > 0 && (
                          <span className="px-3 py-1 rounded-lg text-xs font-medium text-white" style={{ background: '#252525' }}>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                        )}
                        <span className="px-3 py-1 rounded-lg text-xs font-medium" style={{ background: '#252525', color: '#8A8A8A' }}>{property.type}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-xl font-bold" style={{ color: '#C8F53C' }}>
                          {property.rent.toLocaleString()} BDT
                          <span className="text-sm font-normal" style={{ color: '#8A8A8A' }}>/month</span>
                        </p>
                        <button
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                          style={{ background: '#252525', color: '#FFFFFF' }}
                          onClick={(e) => { e.stopPropagation(); onNavigate('chat', property); }}
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
