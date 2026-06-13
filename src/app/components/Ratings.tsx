import { useState } from 'react';
import { ArrowLeft, Star, MessageSquare, CheckCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import type { UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface RatingsProps {
  userType: UserType;
  onBack: () => void;
}

export function Ratings({ userType, onBack }: RatingsProps) {
  const { t } = useLanguage();
  const [ratings, setRatings] = useState<{[key: number]: number}>({ 1: 0, 2: 5 });
  const [reviews, setReviews] = useState<{[key: number]: string}>({ 1: '', 2: '' });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');

  const tenantProperties = [
    { id: 1, title: 'Family Apartment in Gulshan 2', location: 'Gulshan 2, Dhaka', stayPeriod: 'Jan 2026 - Present', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' },
    { id: 2, title: 'Bachelor House in Mohammadpur', location: 'Mohammadpur, Dhaka', stayPeriod: 'Jun 2025 - Dec 2025', myReview: 'Great location and very cooperative landlord. Would definitely recommend!', reviewDate: '2025-12-28', earnedReward: true, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop' },
  ];

  const landlordProperties = [
    { id: 1, title: 'Gulshan 2 Apartment', location: 'Gulshan 2, Dhaka', tenant: 'John Doe', rating: 5, review: 'Excellent property with great maintenance. The landlord is very responsive and helpful.', reviewDate: '2026-05-01', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' },
    { id: 2, title: 'Banani Penthouse', location: 'Banani, Dhaka', tenant: 'Sarah Khan', rating: 4, review: 'Nice property, good location. Only minor issue was parking space.', reviewDate: '2026-04-15', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop' },
  ];

  const properties = userType === 'tenant' ? tenantProperties : landlordProperties;

  const handleSubmit = (propertyId: number) => {
    setPaymentMethod(Math.random() > 0.5 ? 'bkash' : 'nagad');
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Star className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Rate Your Properties</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Reward Banner */}
        <div className="p-5 rounded-2xl mb-5 flex items-center gap-4" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl" style={{ background: 'rgba(200,245,60,0.12)' }}>💰</div>
          <div>
            <h3 className="font-bold text-white mb-1">Earn 100 BDT for Each Review!</h3>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>Share your experience and get 100 BDT credited to your bKash/Nagad account after review approval.</p>
          </div>
        </div>

        <div className="space-y-5">
          {properties.map((property: any) => (
            <div key={property.id} className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-4 p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <img src={property.image} alt={property.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{property.title}</h3>
                  <p className="text-sm" style={{ color: '#8A8A8A' }}>{property.location}</p>
                  {userType === 'tenant' && property.stayPeriod && (
                    <p className="text-xs mt-1" style={{ color: '#555' }}>Stayed: {property.stayPeriod}</p>
                  )}
                  {userType === 'landlord' && property.tenant && (
                    <p className="text-xs mt-1 font-medium" style={{ color: '#8A8A8A' }}>Tenant: {property.tenant}</p>
                  )}
                </div>
                {property.earnedReward && (
                  <span className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 flex-shrink-0" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                    <CheckCircle className="w-3 h-3" /> Reviewed
                  </span>
                )}
              </div>

              <div className="p-5">
                {userType === 'tenant' && !property.myReview ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-white text-sm mb-3">Rate this property:</p>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((r) => (
                          <button key={r} onClick={() => setRatings({...ratings, [property.id]: r})} className="transition-transform hover:scale-110">
                            <Star className={`w-8 h-8 ${r <= (ratings[property.id] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm mb-2">Write your review:</p>
                      <Textarea
                        placeholder="Share your experience about this property, landlord, facilities, and neighborhood..."
                        rows={4}
                        value={reviews[property.id] || ''}
                        onChange={(e) => setReviews({...reviews, [property.id]: e.target.value})}
                        style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: '0.75rem', resize: 'none' }}
                        className="mb-3 placeholder:text-gray-500"
                      />
                    </div>

                    <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.15)' }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8F53C' }} />
                      <p className="text-sm" style={{ color: '#CCCCCC' }}>Submit your honest review and get <strong style={{ color: '#C8F53C' }}>100 BDT</strong> credited to your mobile wallet within 24 hours.</p>
                    </div>

                    <button
                      onClick={() => handleSubmit(property.id)}
                      disabled={!ratings[property.id] || !reviews[property.id]}
                      className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                      style={{ background: ratings[property.id] && reviews[property.id] ? '#C8F53C' : '#252525', color: ratings[property.id] && reviews[property.id] ? '#0A0A0A' : '#555', cursor: ratings[property.id] && reviews[property.id] ? 'pointer' : 'not-allowed' }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Submit Review & Earn 100 BDT
                    </button>
                  </div>
                ) : userType === 'tenant' && property.myReview ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-white text-sm mb-2">Your Rating:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((r) => <Star key={r} className={`w-5 h-5 ${r <= (ratings[property.id] || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />)}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-2">Your Review:</p>
                      <div className="p-4 rounded-xl" style={{ background: '#252525' }}>
                        <p className="text-sm" style={{ color: '#CCCCCC' }}>{property.myReview}</p>
                        <p className="text-xs mt-2" style={{ color: '#555' }}>Reviewed on {new Date(property.reviewDate).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                    {property.earnedReward && (
                      <div className="p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.15)' }}>
                        <CheckCircle className="w-4 h-4" style={{ color: '#C8F53C' }} />
                        <div>
                          <p className="font-semibold text-white text-sm">Reward Credited!</p>
                          <p className="text-xs" style={{ color: '#8A8A8A' }}>100 BDT has been credited to your mobile wallet.</p>
                        </div>
                      </div>
                    )}
                    <button className="w-full py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', background: 'transparent' }}>Edit Review</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-white text-sm mb-2">Tenant Rating:</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((r) => <Star key={r} className={`w-5 h-5 ${r <= property.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />)}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-2">Review:</p>
                      <div className="p-4 rounded-xl" style={{ background: '#252525' }}>
                        <p className="text-sm" style={{ color: '#CCCCCC' }}>{property.review}</p>
                        <p className="text-xs mt-2" style={{ color: '#555' }}>Reviewed on {new Date(property.reviewDate).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 w-full max-w-sm text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold" style={{ background: paymentMethod === 'bkash' ? '#EC4899' : '#F97316', color: '#FFFFFF', fontSize: '16px' }}>
              {paymentMethod === 'bkash' ? 'bK' : 'N'}
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#C8F53C' }}>
              <CheckCircle className="w-7 h-7" style={{ color: '#0A0A0A' }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">You received 100 BDT</h3>
            <p className="text-sm mb-4" style={{ color: '#8A8A8A' }}>from Bashabari</p>
            <div className="p-4 rounded-xl mb-4" style={{ background: '#252525' }}>
              <p className="text-3xl font-bold mb-1" style={{ color: '#C8F53C' }}>+100 BDT</p>
              <p className="text-sm" style={{ color: '#8A8A8A' }}>Sent to your {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} account</p>
            </div>
            <p className="text-xs mb-5" style={{ color: '#555' }}>TX ID: {paymentMethod.toUpperCase()}{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <button onClick={() => { setShowPayment(false); onBack(); }} className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
