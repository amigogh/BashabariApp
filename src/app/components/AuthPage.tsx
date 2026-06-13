import { useState } from 'react';
import { ArrowLeft, Home, Upload } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { User } from '../App';

interface AuthPageProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'tenant' | 'landlord'>('tenant');
  const [step, setStep] = useState(1);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupData, setSignupData] = useState({
    name: '', email: '', password: '', phone: '', address: '',
    occupation: '', maritalStatus: '', gender: '', additionalPhone: '',
    salary: '', bkashNumber: '', nagadNumber: '', bankAccount: '', tenantScore: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState({ nid: null as File | null, birthCertificate: null as File | null, tradeLicense: null as File | null });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmails = ['tenant@demo.com', 'landlord@demo.com'];
    if (!validEmails.includes(loginEmail) || loginPassword !== 'demo123') {
      alert('Invalid credentials! Use:\nEmail: tenant@demo.com or landlord@demo.com\nPassword: demo123');
      return;
    }
    const detectedType = loginEmail.includes('tenant') ? 'tenant' : 'landlord';
    onLogin({ type: detectedType, name: detectedType === 'tenant' ? 'John Doe' : 'Jane Smith', email: loginEmail, phone: '+880 1700-000000', profilePic: '', tenantScore: detectedType === 'tenant' ? 'Professional' : undefined, physicalVerified: true });
  };

  const inputStyle = { background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: '0.75rem' };

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Home className="w-6 h-6" style={{ color: '#C8F53C' }} />
            <span className="text-xl font-bold text-white">{t('appName')}</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="rounded-2xl p-8" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {mode === 'login' ? t('welcomeBack') : t('createAccountTitle')}
          </h2>
          <p className="text-center text-sm mb-6" style={{ color: '#8A8A8A' }}>
            {mode === 'login' ? t('loginDesc') : t('signupDesc')}
          </p>

          <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: '#252525' }}>
            {(['login', 'signup'] as const).map((tab) => (
              <button key={tab} onClick={() => { setMode(tab); setStep(1); }} className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={mode === tab ? { background: '#C8F53C', color: '#0A0A0A' } : { background: 'transparent', color: '#8A8A8A' }}>
                {tab === 'login' ? t('login') : t('signup')}
              </button>
            ))}
          </div>

          {mode === 'login' && (
            <div>
              <div className="mb-5 p-4 rounded-xl text-sm" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
                <p className="font-semibold mb-1" style={{ color: '#C8F53C' }}>{t('demoCredentials')}:</p>
                <p style={{ color: '#CCCCCC' }}>Email: tenant@demo.com or landlord@demo.com</p>
                <p style={{ color: '#CCCCCC' }}>Password: demo123</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label className="text-white text-sm">{t('iAmA')}</Label>
                  <RadioGroup value={userType} onValueChange={(v) => setUserType(v as any)}>
                    <div className="flex gap-4 mt-2">
                      {[{ v: 'tenant', l: t('tenantRole') }, { v: 'landlord', l: t('landlordRole') }].map(({ v, l }) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value={v} id={`${v}-login`} />
                          <span className="text-sm text-white">{l}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-white text-sm">{t('emailAddress')}</Label>
                  <Input type="email" placeholder="your@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required style={inputStyle} className="placeholder:text-gray-500 mt-1" />
                </div>
                <div>
                  <Label className="text-white text-sm">{t('password')}</Label>
                  <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required style={inputStyle} className="mt-1" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>{t('login')}</button>
              </form>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-4">
              <div>
                <Label className="text-white text-sm">{t('iAmA')}</Label>
                <RadioGroup value={userType} onValueChange={(v) => { setUserType(v as any); setStep(1); }}>
                  <div className="flex flex-col gap-2 mt-2">
                    {[{ v: 'tenant', l: t('tenantLooking') }, { v: 'landlord', l: t('landlordRenting') }].map(({ v, l }) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value={v} id={`${v}-signup`} />
                        <span className="text-sm text-white">{l}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className="text-white text-sm">{t('fullName')}</Label><Input value={signupData.name} onChange={(e) => setSignupData({...signupData, name: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" required /></div>
                    <div><Label className="text-white text-sm">{t('emailAddress')}</Label><Input type="email" value={signupData.email} onChange={(e) => setSignupData({...signupData, email: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" required /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label className="text-white text-sm">{t('phoneNumber')}</Label><Input type="tel" placeholder="+880 1700-000000" value={signupData.phone} onChange={(e) => setSignupData({...signupData, phone: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" /></div>
                    <div><Label className="text-white text-sm">{t('additionalPhone')}</Label><Input type="tel" value={signupData.additionalPhone} onChange={(e) => setSignupData({...signupData, additionalPhone: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" /></div>
                  </div>
                  <div><Label className="text-white text-sm">{t('currentAddress')}</Label><Input value={signupData.address} onChange={(e) => setSignupData({...signupData, address: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userType === 'tenant' && (
                      <div>
                        <Label className="text-white text-sm">{t('occupation')}</Label>
                        <Select value={signupData.occupation} onValueChange={(v) => setSignupData({...signupData, occupation: v})}>
                          <SelectTrigger style={inputStyle} className="mt-1"><SelectValue placeholder={t('occupation')} /></SelectTrigger>
                          <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                            <SelectItem value="student">{t('student')}</SelectItem>
                            <SelectItem value="bachelor">{t('bachelor')}</SelectItem>
                            <SelectItem value="professional">{t('professional')}</SelectItem>
                            <SelectItem value="businessman">{t('businessman')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div>
                      <Label className="text-white text-sm">{t('gender')}</Label>
                      <Select value={signupData.gender} onValueChange={(v) => setSignupData({...signupData, gender: v})}>
                        <SelectTrigger style={inputStyle} className="mt-1"><SelectValue placeholder={t('gender')} /></SelectTrigger>
                        <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                          <SelectItem value="male">{t('male')}</SelectItem>
                          <SelectItem value="female">{t('female')}</SelectItem>
                          <SelectItem value="other">{t('other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white text-sm">{t('maritalStatus')}</Label>
                      <Select value={signupData.maritalStatus} onValueChange={(v) => setSignupData({...signupData, maritalStatus: v})}>
                        <SelectTrigger style={inputStyle} className="mt-1"><SelectValue placeholder={t('maritalStatus')} /></SelectTrigger>
                        <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                          <SelectItem value="single">{t('single')}</SelectItem>
                          <SelectItem value="married">{t('married')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label className="text-white text-sm">{t('salary')}</Label><Input type="number" placeholder="30000" value={signupData.salary} onChange={(e) => setSignupData({...signupData, salary: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" /></div>
                  </div>
                  {userType === 'tenant' && (
                    <div>
                      <Label className="text-white text-sm">{t('tenantScore')}</Label>
                      <Select value={signupData.tenantScore} onValueChange={(v) => setSignupData({...signupData, tenantScore: v})}>
                        <SelectTrigger style={inputStyle} className="mt-1"><SelectValue placeholder={t('tenantScore')} /></SelectTrigger>
                        <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                          <SelectItem value="Student">{t('student')}</SelectItem>
                          <SelectItem value="Bachelor">{t('bachelor')}</SelectItem>
                          <SelectItem value="Professional">{t('professional')}</SelectItem>
                          <SelectItem value="Businessman">{t('businessman')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div><Label className="text-white text-sm">{t('password')}</Label><Input type="password" value={signupData.password} onChange={(e) => setSignupData({...signupData, password: e.target.value})} style={inputStyle} className="mt-1" required /></div>
                  <button onClick={() => setStep(2)} className="w-full py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>{t('nextPayment')}</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-lg text-white">{t('step2Title')}</h3>
                    <p className="text-sm" style={{ color: '#8A8A8A' }}>{t('step2Desc')}</p>
                  </div>
                  <div><Label className="text-white text-sm">{t('bkash')}</Label><Input type="tel" placeholder="01700-000000" value={signupData.bkashNumber} onChange={(e) => setSignupData({...signupData, bkashNumber: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" required /></div>
                  <div><Label className="text-white text-sm">{t('nagad')}</Label><Input type="tel" placeholder="01700-000000" value={signupData.nagadNumber} onChange={(e) => setSignupData({...signupData, nagadNumber: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" required /></div>
                  <div><Label className="text-white text-sm">{t('bankAccount')}</Label><Input placeholder="Account number" value={signupData.bankAccount} onChange={(e) => setSignupData({...signupData, bankAccount: e.target.value})} style={inputStyle} className="mt-1 placeholder:text-gray-500" /></div>
                  <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <h4 className="font-semibold text-white mb-1">{t('physicalVerification')}</h4>
                    <p className="text-sm mb-4" style={{ color: '#8A8A8A' }}>{t('uploadDocs')}</p>
                    {[{ key: 'nid' as const, label: t('uploadNid') }, { key: 'birthCertificate' as const, label: t('uploadBirth') }].map(({ key, label }) => (
                      <div key={key} className="mb-3">
                        <Label className="text-white text-sm">{label}</Label>
                        <label className="block p-4 rounded-xl text-center cursor-pointer mt-1" style={{ border: '2px dashed rgba(200,245,60,0.3)', background: 'rgba(200,245,60,0.04)' }}>
                          <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) setUploadedFiles({...uploadedFiles, [key]: file}); }} />
                          <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#8A8A8A' }} />
                          <p className="text-sm" style={{ color: '#8A8A8A' }}>{uploadedFiles[key] ? (uploadedFiles[key] as File).name : label}</p>
                          {uploadedFiles[key] && <p className="text-xs mt-1" style={{ color: '#C8F53C' }}>✓ File uploaded</p>}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}>{t('back')}</button>
                    <button onClick={() => onLogin({ type: userType, name: signupData.name || 'New User', email: signupData.email, phone: signupData.phone, profilePic: '', tenantScore: userType === 'tenant' ? signupData.tenantScore : undefined, physicalVerified: true })} className="flex-1 py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>{t('completeSignup')}</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
