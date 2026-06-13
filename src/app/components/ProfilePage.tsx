import { ArrowLeft, User, Phone, Mail, MapPin, Briefcase, Heart, DollarSign, CheckCircle, Edit } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User as UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ProfilePageProps {
  user: UserType;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function ProfilePage({ user, onNavigate, onBack }: ProfilePageProps) {
  const { t } = useLanguage();
  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="p-5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Icon className="w-5 h-5" style={{ color: '#C8F53C' }} />
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  const Field = ({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ElementType }) => (
    <div>
      <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{label}</p>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" style={{ color: '#555' }} />}
        <p className="font-semibold text-white text-sm">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">My Profile</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Profile Header */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarFallback style={{ background: '#C8F53C', color: '#0A0A0A', fontSize: '28px' }}>
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {user.physicalVerified && (
                <div className="absolute -bottom-1 -right-1 rounded-full p-1" style={{ background: '#C8F53C' }}>
                  <CheckCircle className="w-4 h-4" style={{ color: '#0A0A0A' }} />
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}>
                  {user.type === 'tenant' ? 'Tenant' : 'Landlord'}
                </span>
                {user.tenantScore && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                    {user.tenantScore}
                  </span>
                )}
                {user.physicalVerified && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <button
                onClick={() => onNavigate('edit-profile')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: '#252525', color: '#FFFFFF' }}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <Section title="Personal Information" icon={User}>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Full Name" value={user.name} />
            <Field label="Email" value={user.email} icon={Mail} />
            <Field label="Phone Number" value={user.phone} icon={Phone} />
            <Field label="Additional Phone" value="+880 1800-000000" icon={Phone} />
            <Field label="Current Address" value="House 12, Road 5, Dhanmondi, Dhaka" icon={MapPin} />
            <Field label="Occupation" value="Professional" icon={Briefcase} />
            <Field label="Gender" value="Male" />
            <Field label="Marital Status" value="Single" icon={Heart} />
            <Field label="Current Salary" value="50,000 BDT" icon={DollarSign} />
            <Field label="Monthly Saving" value="20% (10,000 BDT)" />
          </div>
        </Section>

        <Section title="Payment Methods" icon={DollarSign}>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[{ label: 'bKash', val: '01700-123456' }, { label: 'Nagad', val: '01700-123456' }].map(({ label, val }) => (
              <div key={label} className="p-4 rounded-xl" style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{label}</p>
                <p className="font-semibold text-white">{val}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl" style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>Bank Account (Optional)</p>
            <p className="font-semibold text-white">Dutch-Bangla Bank - 1234567890</p>
          </div>
        </Section>

        <Section title="Verification Documents" icon={CheckCircle}>
          <div className="space-y-3">
            {['National ID (NID)', 'Birth Certificate'].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(200,245,60,0.06)', border: '1px solid rgba(200,245,60,0.15)' }}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: '#C8F53C' }} />
                  <div>
                    <p className="font-semibold text-white text-sm">{doc}</p>
                    <p className="text-xs" style={{ color: '#8A8A8A' }}>Verified</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 rounded-lg" style={{ background: '#252525', color: '#FFFFFF' }}>View</button>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
