import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Tv, Sofa, Wifi, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MoveInProps {
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function MoveIn({ onNavigate, onBack }: MoveInProps) {
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [services, setServices] = useState({ electronics: false, furniture: false, wifi: false });
  const [showConfirm, setShowConfirm] = useState(false);

  const viewedProperties = [
    { id: 1, title: 'Modern Family Apartment in Gulshan', location: 'Gulshan 2, Dhaka', rent: 35000, rating: 4.8, reviews: 12, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', owner: 'Mr. Rahman', ownerPhone: '+880 1711-123456', verified: true },
    { id: 2, title: 'Cozy Bachelor House', location: 'Mohammadpur, Dhaka', rent: 8000, rating: 4.5, reviews: 8, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop', owner: 'Mrs. Begum', ownerPhone: '+880 1712-234567', verified: true },
    { id: 3, title: 'Spacious Duplex Penthouse', location: 'Banani, Dhaka', rent: 85000, rating: 4.9, reviews: 15, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', owner: 'Dr. Khan', ownerPhone: '+880 1713-345678', verified: true },
  ];

  const settlementServices = [
    { id: 'electronics', name: 'Electronics Set-up', icon: Tv, description: 'Professional installation of TV, AC, and appliances', price: 2000 },
    { id: 'furniture', name: 'Furniture Transit', icon: Sofa, description: 'Safe moving and arrangement of furniture', price: 3500 },
    { id: 'wifi', name: 'WiFi Installation', icon: Wifi, description: 'High-speed internet setup and configuration', price: 1500 },
  ];

  const totalCost = settlementServices.filter((s) => services[s.id as keyof typeof services]).reduce((sum, s) => sum + s.price, 0);

  if (selectedProperty) {
    return (
      <div className="min-h-screen" style={{ background: '#141414' }}>
        <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => setSelectedProperty(null)} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-bold text-white flex-1">Move In Details</span>
          <LanguageSwitcher />
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="rounded-2xl overflow-hidden mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedProperty.title}</h2>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#8A8A8A' }}>
                    <MapPin className="w-4 h-4" /> <span>{selectedProperty.location}</span>
                  </div>
                </div>
                {selectedProperty.verified && <div className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}><CheckCircle className="w-3 h-3" /> Verified</div>}
              </div>
              <div className="flex items-center gap-1 my-3">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProperty.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />)}
                <span className="text-sm" style={{ color: '#8A8A8A' }}>({selectedProperty.reviews})</span>
              </div>
              <div className="p-3 rounded-xl mb-3" style={{ background: '#252525' }}>
                <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>Owner</p>
                <p className="font-semibold text-white">{selectedProperty.owner}</p>
                <p className="text-xs mt-0.5" style={{ color: '#8A8A8A' }}>{selectedProperty.ownerPhone}</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#C8F53C' }}>{selectedProperty.rent.toLocaleString()} BDT<span className="text-sm font-normal" style={{ color: '#8A8A8A' }}>/month</span></p>
            </div>
          </div>

          <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="text-lg font-bold text-white">Help Me Settle In</h3>
              <p className="text-sm mt-1" style={{ color: '#8A8A8A' }}>Select the services you need for a smooth move-in</p>
            </div>
            <div className="p-5 space-y-3">
              {settlementServices.map((service) => {
                const active = services[service.id as keyof typeof services];
                return (
                  <div key={service.id} className="p-4 rounded-xl transition-all" style={active ? { background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.3)' } : { background: '#252525', border: '1px solid transparent' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: active ? '#C8F53C' : '#1E1E1E' }}>
                          <service.icon className="w-5 h-5" style={{ color: active ? '#0A0A0A' : '#8A8A8A' }} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{service.name}</h4>
                          <p className="text-xs" style={{ color: '#8A8A8A' }}>{service.description}</p>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: '#C8F53C' }}>{service.price} BDT</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setServices({ ...services, [service.id]: !active })}
                        className="px-4 py-2 rounded-xl text-xs font-semibold ml-3 flex-shrink-0"
                        style={active ? { background: '#C8F53C', color: '#0A0A0A' } : { border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}
                      >
                        {active ? '✓ Added' : 'Add-in'}
                      </button>
                    </div>
                  </div>
                );
              })}

              {totalCost > 0 && (
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-semibold text-white">Total Cost:</span>
                  <span className="text-xl font-bold" style={{ color: '#C8F53C' }}>{totalCost.toLocaleString()} BDT</span>
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setShowConfirm(true)} className="w-full py-4 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
            Confirm Move In
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="rounded-2xl p-6 w-full max-w-sm" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#C8F53C' }}>
                  <CheckCircle className="w-8 h-8" style={{ color: '#0A0A0A' }} />
                </div>
                <h3 className="text-xl font-bold text-white">Move In Request Sent!</h3>
              </div>
              <p className="text-sm text-center mb-5" style={{ color: '#8A8A8A' }}>
                Your confirmation message has been sent to {selectedProperty.owner}. Please check the chatbox for their response.
              </p>
              <button onClick={() => { setShowConfirm(false); onBack(); }} className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                Go to Chatbox
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">Move In Service</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white mb-1">Properties You Viewed</h2>
          <p className="text-sm" style={{ color: '#8A8A8A' }}>Select a property to begin your move-in process</p>
        </div>

        <div className="space-y-4">
          {viewedProperties.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all"
              style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}
              onClick={() => setSelectedProperty(property)}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(200,245,60,0.3)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)')}
            >
              <div className="flex flex-col md:flex-row">
                <img src={property.image} alt={property.title} className="w-full md:w-56 h-44 object-cover" />
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{property.title}</h3>
                      <div className="flex items-center gap-1 text-sm" style={{ color: '#8A8A8A' }}>
                        <MapPin className="w-4 h-4" /> <span>{property.location}</span>
                      </div>
                    </div>
                    {property.verified && <div className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 flex-shrink-0 ml-2" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}><CheckCircle className="w-3 h-3" /> Verified</div>}
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-white font-semibold">{property.rating}</span>
                    <span className="text-sm" style={{ color: '#8A8A8A' }}>({property.reviews} reviews)</span>
                  </div>
                  <p className="text-xl font-bold" style={{ color: '#C8F53C' }}>{property.rent.toLocaleString()} BDT<span className="text-sm font-normal" style={{ color: '#8A8A8A' }}>/month</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
