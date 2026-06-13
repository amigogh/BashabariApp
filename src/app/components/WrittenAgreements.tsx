import { ArrowLeft, FileText, Download, Eye, Calendar, MapPin, User } from 'lucide-react';
import type { UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface WrittenAgreementsProps {
  userType: UserType;
  onBack: () => void;
}

export function WrittenAgreements({ userType, onBack }: WrittenAgreementsProps) {
  const { t } = useLanguage();
  const agreements = [
    { id: 1, propertyTitle: 'Family Apartment in Gulshan 2', location: 'House 45, Road 12, Gulshan 2, Dhaka', landlord: 'Mr. Rahman Ahmed', tenant: 'John Doe', startDate: '2026-01-01', endDate: '2026-12-31', monthlyRent: 35000, advancePayment: 70000, securityDeposit: 35000, status: 'Active', signedDate: '2025-12-20' },
    { id: 2, propertyTitle: 'Bachelor House in Mohammadpur', location: 'House 12, Road 5, Mohammadpur, Dhaka', landlord: 'Mrs. Sultana Begum', tenant: 'John Doe', startDate: '2025-06-01', endDate: '2025-12-31', monthlyRent: 8000, advancePayment: 16000, securityDeposit: 8000, status: 'Expired', signedDate: '2025-05-15' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Written Agreements</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Info Banner */}
        <div className="p-4 rounded-2xl mb-5 flex items-start gap-3" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
          <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#C8F53C' }} />
          <div>
            <h3 className="font-semibold text-white mb-1">Digital Agreements</h3>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>All your rental agreements are stored securely. You can view, download, or share them anytime.</p>
          </div>
        </div>

        <div className="space-y-5">
          {agreements.map((ag) => (
            <div key={ag.id} className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-5 flex items-start justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{ag.propertyTitle}</h3>
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#8A8A8A' }}>
                    <MapPin className="w-4 h-4" />
                    <span>{ag.location}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold ml-3 flex-shrink-0"
                  style={ag.status === 'Active'
                    ? { background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#8A8A8A' }
                  }
                >
                  {ag.status}
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Parties */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[{ label: 'Landlord', val: ag.landlord }, { label: 'Tenant', val: ag.tenant }].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{label}</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" style={{ color: '#555' }} />
                        <p className="font-semibold text-white text-sm">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                {/* Dates */}
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: 'Start Date', val: ag.startDate }, { label: 'End Date', val: ag.endDate }, { label: 'Signed On', val: ag.signedDate }].map(({ label, val }) => (
                    <div key={label}>
                      <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{label}</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" style={{ color: '#555' }} />
                        <p className="font-semibold text-white text-xs">{new Date(val).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financials */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl" style={{ background: '#252525' }}>
                  {[
                    { label: 'Monthly Rent', val: ag.monthlyRent, color: '#C8F53C' },
                    { label: 'Advance Payment', val: ag.advancePayment, color: '#10B981' },
                    { label: 'Security Deposit', val: ag.securityDeposit, color: '#8B5CF6' },
                  ].map(({ label, val, color }) => (
                    <div key={label}>
                      <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{label}</p>
                      <p className="text-base font-bold" style={{ color }}>{val.toLocaleString()} BDT</p>
                    </div>
                  ))}
                </div>

                {/* Key Terms */}
                <div className="p-4 rounded-xl" style={{ borderLeft: '3px solid #C8F53C', background: 'rgba(200,245,60,0.04)' }}>
                  <h4 className="font-semibold text-white mb-2 text-sm">Key Terms & Conditions</h4>
                  <ul className="space-y-1 text-sm" style={{ color: '#8A8A8A' }}>
                    {['Rent payment due by 10th of each month', 'Utilities paid separately by tenant', 'Two months notice required for early termination', 'No subletting without landlord\'s written consent', 'Property for residential purposes only'].map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {[{ Icon: Eye, label: 'View Full Agreement' }, { Icon: Download, label: 'Download PDF' }].map(({ Icon, label }) => (
                    <button key={label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', background: 'transparent' }}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
