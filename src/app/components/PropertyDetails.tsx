import { ArrowLeft, Star, MapPin, MessageCircle, Bookmark, CheckCircle, Phone, Mail } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import type { UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PropertyDetailsProps {
  property: any;
  userType: UserType;
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

export function PropertyDetails({ property, userType, onNavigate, onBack }: PropertyDetailsProps) {
  const { t } = useLanguage();
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#141414' }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: '#8A8A8A' }}>Property not found</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Go Back</button>
        </div>
      </div>
    );
  }

  const bills = [
    { label: 'Monthly Rent', value: `${property.rent?.toLocaleString()} BDT` },
    { label: 'Water Bill', value: '500 BDT (approx.)' },
    { label: 'Electricity Bill', value: 'As per usage' },
    { label: 'Gas Bill', value: 'Included' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      {/* Header */}
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">Property Details</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Property Image */}
        {property.image && typeof property.image === 'string' && property.image.startsWith('http') ? (
          <div className="rounded-2xl overflow-hidden h-64 md:h-80 mb-6">
            <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="rounded-2xl p-16 mb-6 text-center flex items-center justify-center" style={{ background: '#1E1E1E', height: '220px' }}>
            <span className="text-8xl">{property.image || '🏠'}</span>
          </div>
        )}

        {/* Title and Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-sm mb-2" style={{ color: '#8A8A8A' }}>
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
              </div>
            </div>
            {property.verified && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold ml-2 flex-shrink-0" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                <CheckCircle className="w-3 h-3" /> Verified
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(property.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
            ))}
            <span className="font-semibold text-white">{property.rating}</span>
            <span className="text-sm" style={{ color: '#8A8A8A' }}>({property.reviews} reviews)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {property.bedrooms > 0 && (
              <span className="px-3 py-1.5 rounded-lg text-sm font-medium text-white" style={{ background: '#252525' }}>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
            )}
            {property.bathrooms > 0 && (
              <span className="px-3 py-1.5 rounded-lg text-sm font-medium text-white" style={{ background: '#252525' }}>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
            )}
            <span className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: '#252525', color: '#8A8A8A' }}>{property.type}</span>
          </div>

          <div className="text-3xl font-bold mb-1" style={{ color: '#C8F53C' }}>
            {property.rent?.toLocaleString()} BDT
            <span className="text-base font-normal" style={{ color: '#8A8A8A' }}>/month</span>
          </div>
        </div>

        {/* Property Details Card */}
        <div className="rounded-2xl mb-6" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-lg font-semibold text-white">Property Details</h3>
          </div>
          <div className="p-5 space-y-3">
            {bills.map((bill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm" style={{ color: '#8A8A8A' }}>{bill.label}</span>
                  <span className="font-semibold text-white text-sm">{bill.value}</span>
                </div>
                {idx < bills.length - 1 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Owner Info */}
        <div className="rounded-2xl mb-6" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-lg font-semibold text-white">Owner Information</h3>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-14 h-14">
                <AvatarFallback style={{ background: '#C8F53C', color: '#0A0A0A', fontSize: '18px' }}>
                  {property.owner?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{property.owner}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm" style={{ color: '#8A8A8A' }}>4.5 owner rating</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#8A8A8A' }}>
                    <Phone className="w-4 h-4" />
                    <span>{property.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#8A8A8A' }}>
                    <Mail className="w-4 h-4" />
                    <span>Verified NID & Documents</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('chat', property)}
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              <MessageCircle className="w-4 h-4" />
              Contact Owner
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl mb-6" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-lg font-semibold text-white">About This Property</h3>
          </div>
          <div className="p-5">
            <p className="text-sm leading-relaxed" style={{ color: '#CCCCCC' }}>
              This beautiful {property.type?.toLowerCase()} is located in the prime area of {property.location}.
              The property features {property.bedrooms} spacious bedroom{property.bedrooms > 1 ? 's' : ''} and {property.bathrooms} modern bathroom{property.bathrooms > 1 ? 's' : ''}.
              It's perfect for those looking for a comfortable living space in a convenient location.
              The property is well-maintained and comes with all necessary amenities.
              Nearby facilities include shopping centers, hospitals, schools, and public transportation.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="rounded-2xl mb-6" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-lg font-semibold text-white">Reviews ({property.reviews})</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { name: 'Ahmed Hassan', text: 'Great property with excellent location. The owner is very cooperative and responsive.', rating: 5, time: '2 months ago' },
              { name: 'Sarah Khan', text: 'Nice place, well-maintained. Only issue was parking space is limited.', rating: 4, time: '1 month ago' },
            ].map((review, idx) => (
              <div key={idx} className="pb-4" style={idx === 0 ? { borderBottom: '1px solid rgba(255,255,255,0.06)' } : {}}>
                <div className="flex items-start gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarFallback style={{ background: '#252525', color: '#FFFFFF', fontSize: '13px' }}>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-white">{review.name}</h4>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                        {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-gray-600" />)}
                      </div>
                    </div>
                    <p className="text-sm mb-1" style={{ color: '#CCCCCC' }}>{review.text}</p>
                    <p className="text-xs" style={{ color: '#555' }}>{review.time}</p>
                  </div>
                </div>
              </div>
            ))}

            {userType === 'tenant' && (
              <div className="pt-2">
                <h4 className="font-semibold text-sm text-white mb-1">Leave a Review</h4>
                <p className="text-xs mb-3" style={{ color: '#C8F53C' }}>💰 Earn 100 BDT for your review!</p>
                <Textarea
                  placeholder="Share your experience..."
                  className="mb-3"
                  style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: '0.75rem' }}
                />
                <button className="px-5 py-2 rounded-xl text-sm font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {userType === 'tenant' && (
          <div className="grid md:grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}
            >
              <Bookmark className="w-5 h-5" />
              Save Property
            </button>
            <button
              onClick={() => alert('Booking confirmation - Feature coming soon!')}
              className="py-4 rounded-xl font-semibold transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              Book to Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
