import { useState } from 'react';
import { ArrowLeft, CreditCard, Crown, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PremiumPaymentProps {
  onBack: () => void;
}

const inputStyle = {
  background: '#252525',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  borderRadius: '0.75rem',
};

export function PremiumPayment({ onBack }: PremiumPaymentProps) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">Premium Subscription</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Order Summary */}
        <div className="rounded-2xl overflow-hidden mb-5" style={{ border: '1px solid rgba(200,245,60,0.3)', background: '#1E1E1E' }}>
          <div className="p-5 flex items-center gap-3" style={{ background: 'rgba(200,245,60,0.08)', borderBottom: '1px solid rgba(200,245,60,0.15)' }}>
            <Crown className="w-6 h-6" style={{ color: '#C8F53C' }} />
            <h3 className="font-bold text-white">Bashabari Premium — Annual Subscription</h3>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#8A8A8A' }}>Subscription Period:</span>
              <span className="font-semibold text-white">1 Year</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: '#8A8A8A' }}>Amount:</span>
              <span className="text-2xl font-bold" style={{ color: '#C8F53C' }}>4,999 BDT</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-semibold text-white">Select Payment Method</h3>
          </div>
          <div className="p-5">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              {[
                { value: 'bkash', label: 'bKash Payment', badge: 'bKash', badgeColor: '#EC4899' },
                { value: 'nagad', label: 'Nagad Payment', badge: 'Nagad', badgeColor: '#F97316' },
              ].map((method) => (
                <div key={method.value} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer" style={{ background: paymentMethod === method.value ? 'rgba(200,245,60,0.06)' : '#252525', border: paymentMethod === method.value ? '1px solid rgba(200,245,60,0.2)' : '1px solid transparent' }}>
                  <RadioGroupItem value={method.value} id={method.value} />
                  <Label htmlFor={method.value} className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="px-3 py-1 rounded-lg font-bold text-sm" style={{ background: `${method.badgeColor}22`, color: method.badgeColor }}>{method.badge}</div>
                    <span className="font-semibold text-white">{method.label}</span>
                  </Label>
                </div>
              ))}
              <div className="flex items-center gap-3 p-4 rounded-xl cursor-pointer" style={{ background: paymentMethod === 'bank' ? 'rgba(200,245,60,0.06)' : '#252525', border: paymentMethod === 'bank' ? '1px solid rgba(200,245,60,0.2)' : '1px solid transparent' }}>
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1 cursor-pointer flex items-center gap-3">
                  <CreditCard className="w-5 h-5" style={{ color: '#C8F53C' }} />
                  <span className="font-semibold text-white">Bank Account Transfer</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Payment Info */}
        <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-semibold text-white">Payment Information</h3>
          </div>
          <div className="p-5 space-y-4">
            {paymentMethod !== 'bank' ? (
              <>
                <div>
                  <Label className="text-white text-sm mb-2 block">Mobile Number</Label>
                  <Input placeholder="01700-000000" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Transaction ID</Label>
                  <Input placeholder="Enter transaction ID after payment" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label className="text-white text-sm mb-2 block">Account Number</Label>
                  <Input placeholder="Bank account number" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Account Holder Name</Label>
                  <Input placeholder="Full name as per bank records" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Bank Name</Label>
                  <Input placeholder="e.g., Dutch-Bangla Bank" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
              </>
            )}
          </div>
        </div>

        <button onClick={() => setShowSuccess(true)} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
          <Crown className="w-5 h-5" />
          Pay 4,999 BDT
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 w-full max-w-sm text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#C8F53C' }}>
              <Crown className="w-10 h-10" style={{ color: '#0A0A0A' }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
            <p className="text-lg font-semibold mb-2" style={{ color: '#C8F53C' }}>Welcome to Bashabari Premium!</p>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>Your premium subscription is now active. Enjoy all the exclusive benefits for the next 12 months.</p>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}
