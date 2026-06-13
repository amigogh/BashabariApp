import { ArrowLeft, Bookmark, Star, MapPin, MessageCircle, CheckCircle, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface BookedFlatsProps {
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function BookedFlats({ onNavigate, onBack }: BookedFlatsProps) {
  const { t } = useLanguage();
  const bookedProperties = [
    { id: 1, title: 'Luxury Apartment in Gulshan 2', location: 'Gulshan 2, Dhaka', rent: 45000, rating: 4.9, reviews: 28, image: '🏢', verified: true, owner: 'Mr. Rahman', ownerPhone: '+880 1711-123456', bedrooms: 3, bathrooms: 2, bookedDate: '2026-05-10' },
    { id: 2, title: 'Cozy Studio Apartment in Banani', location: 'Banani, Dhaka', rent: 18000, rating: 4.6, reviews: 19, image: '🏛️', verified: false, owner: 'Ms. Akter', ownerPhone: '+880 1714-456789', bedrooms: 1, bathrooms: 1, bookedDate: '2026-05-08' },
    { id: 3, title: 'Family Apartment in Dhanmondi', location: 'Dhanmondi, Dhaka', rent: 38000, rating: 4.8, reviews: 22, image: '🏘️', verified: true, owner: 'Dr. Khan', ownerPhone: '+880 1713-345678', bedrooms: 3, bathrooms: 2, bookedDate: '2026-05-05' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Bookmark className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Booked Properties</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="p-4 rounded-2xl mb-5 flex items-start gap-3" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
          <Bookmark className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#C8F53C' }} />
          <div>
            <h3 className="font-semibold text-white mb-1">Your Saved Properties</h3>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>Properties you've shown interest in. Contact the owners directly through the app.</p>
          </div>
        </div>

        <div className="space-y-4">
          {bookedProperties.map((property) => (
            <div key={property.id} className="rounded-2xl overflow-hidden transition-all" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex flex-col md:flex-row">
                <div
                  className="md:w-1/3 flex items-center justify-center cursor-pointer"
                  style={{ background: '#252525', minHeight: '160px' }}
                  onClick={() => onNavigate('property-details', property)}
                >
                  <span className="text-7xl">{property.image}</span>
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                      <div className="flex items-center gap-1 text-sm mb-2" style={{ color: '#8A8A8A' }}>
                        <MapPin className="w-4 h-4" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    {property.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ml-2" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                        <CheckCircle className="w-3 h-3" /> Verified
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-white">{property.rating}</span>
                    <span className="text-sm" style={{ color: '#8A8A8A' }}>({property.reviews} reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.bedrooms > 0 && <span className="px-3 py-1 rounded-lg text-xs font-medium text-white" style={{ background: '#252525' }}>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>}
                    {property.bathrooms > 0 && <span className="px-3 py-1 rounded-lg text-xs font-medium text-white" style={{ background: '#252525' }}>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>}
                  </div>

                  <div className="p-3 rounded-xl mb-3" style={{ background: '#252525' }}>
                    <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>Owner Contact</p>
                    <p className="font-semibold text-sm text-white">{property.owner}</p>
                    <div className="flex items-center gap-2 text-xs mt-1" style={{ color: '#8A8A8A' }}>
                      <Phone className="w-3 h-3" />
                      <span>{property.ownerPhone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <p className="text-lg font-bold" style={{ color: '#C8F53C' }}>
                        {property.rent.toLocaleString()} BDT
                        <span className="text-xs font-normal" style={{ color: '#8A8A8A' }}>/mo</span>
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#555' }}>Saved {new Date(property.bookedDate).toLocaleDateString('en-GB')}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => onNavigate('chat', property)} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: '#252525', color: '#FFFFFF' }}>
                        <MessageCircle className="w-3 h-3" /> Contact
                      </button>
                      <button onClick={() => onNavigate('property-details', property)} className="px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
