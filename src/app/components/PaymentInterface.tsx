import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PaymentInterfaceProps {
  transaction: any;
  onBack: () => void;
}

const inputStyle = {
  background: '#252525',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  borderRadius: '0.75rem',
};

export function PaymentInterface({ transaction, onBack }: PaymentInterfaceProps) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [showSuccess, setShowSuccess] = useState(false);

  const amount = transaction?.amount?.toLocaleString() || '35,000';

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">Make Payment</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Summary */}
        <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-semibold text-white">Payment Details</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Property', value: transaction?.property || 'Gulshan 2 Apartment' },
              { label: 'Payment Type', value: transaction?.type || 'Rent' },
              { label: 'Due Date', value: transaction?.date || 'June 10, 2026' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span style={{ color: '#8A8A8A' }}>{label}:</span>
                <span className="font-semibold text-white">{value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="font-semibold text-white">Amount:</span>
              <span className="text-3xl font-bold" style={{ color: '#C8F53C' }}>{amount} BDT</span>
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
                { value: 'bkash', label: 'bKash Payment', badge: 'bKash', color: '#EC4899' },
                { value: 'nagad', label: 'Nagad Payment', badge: 'Nagad', color: '#F97316' },
                { value: 'bank', label: 'Bank Transfer', badge: null, color: null },
              ].map((m) => (
                <div key={m.value} className="flex items-center gap-3 p-4 rounded-xl cursor-pointer" style={{ background: paymentMethod === m.value ? 'rgba(200,245,60,0.06)' : '#252525', border: paymentMethod === m.value ? '1px solid rgba(200,245,60,0.2)' : '1px solid transparent' }}>
                  <RadioGroupItem value={m.value} id={`pay-${m.value}`} />
                  <Label htmlFor={`pay-${m.value}`} className="flex-1 cursor-pointer flex items-center gap-3">
                    {m.badge && <div className="px-3 py-1 rounded-lg font-bold text-sm" style={{ background: `${m.color}22`, color: m.color! }}>{m.badge}</div>}
                    <span className="font-semibold text-white">{m.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Payment Form */}
        <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-semibold text-white">Payment Information</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <Label className="text-white text-sm mb-2 block">Account Number</Label>
              <Input placeholder={`Enter your ${paymentMethod} number`} style={inputStyle} className="placeholder:text-gray-500" />
            </div>
            <div>
              <Label className="text-white text-sm mb-2 block">PIN / Password</Label>
              <Input type="password" placeholder="Enter your PIN" style={inputStyle} className="placeholder:text-gray-500" />
            </div>
          </div>
        </div>

        <button onClick={() => setShowSuccess(true)} className="w-full py-4 rounded-xl font-semibold transition-opacity hover:opacity-90" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
          Pay {amount} BDT
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="rounded-2xl p-8 w-full max-w-sm text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#C8F53C' }}>
              <CheckCircle className="w-10 h-10" style={{ color: '#0A0A0A' }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Payment Successful!</h3>
            <div className="p-5 rounded-xl mb-4" style={{ background: '#252525' }}>
              <p className="text-3xl font-bold mb-1" style={{ color: '#C8F53C' }}>{amount} BDT</p>
              <p className="text-sm" style={{ color: '#8A8A8A' }}>has been successfully paid</p>
            </div>
            <p className="text-xs mb-5" style={{ color: '#555' }}>
              TX ID: {paymentMethod.toUpperCase()}{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <button onClick={() => { setShowSuccess(false); onBack(); }} className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
