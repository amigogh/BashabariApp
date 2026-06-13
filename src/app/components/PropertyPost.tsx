import { useState } from 'react';
import { ArrowLeft, Upload, Home, CheckCircle, X } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface PropertyPostProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const inputStyle = {
  background: '#252525',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  borderRadius: '0.75rem',
};

export function PropertyPost({ onNavigate, onBack }: PropertyPostProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [postType, setPostType] = useState<'free' | 'verified' | null>(null);
  const [propertyType, setPropertyType] = useState('');
  const [formData, setFormData] = useState({ name: '', location: '', phone: '', religion: '', preferredTenant: '', description: '', rent: '', waterBill: '', electricityBill: '', gasBill: '' });
  const [propertyPhotos, setPropertyPhotos] = useState<File[]>([]);
  const [legalDocuments, setLegalDocuments] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPropertyPhotos([...propertyPhotos, ...files].slice(0, 6));
  };
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLegalDocuments([...legalDocuments, ...files]);
  };

  const propertyTypes = ['Family Apartment', 'Duplex/Penthouse', 'Single Household', 'Villa', 'Bachelor Male House', 'Bachelor Female House', 'Mess (Male/Female)', 'Hostel (Commercial)', 'Sublet', 'Studio Apartment', 'Shop / Retail Space', 'Office Space', 'Restaurant/Cafe Space', 'Showroom'];
  const locations = ['Gulshan', 'Banani', 'Dhanmondi', 'Mohammadpur', 'Mirpur', 'Uttara', 'Bashundhara', 'Baridhara', 'Lalmatia', 'Malibagh'];

  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Home className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Post Your Property</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Property Information</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>Fill in the details about your property</p>

            <SectionCard title="Property Photos">
              <p className="text-xs mb-4" style={{ color: '#8A8A8A' }}>Upload clear pictures of all rooms (up to 6 photos)</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {propertyPhotos.map((photo, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden group" style={{ height: '120px' }}>
                    <img src={URL.createObjectURL(photo)} alt={`Property ${index + 1}`} className="w-full h-full object-cover" />
                    <button onClick={() => setPropertyPhotos(propertyPhotos.filter((_, i) => i !== index))} className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#EF4444', color: '#FFFFFF' }}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {propertyPhotos.length < 6 && (
                  <label className="cursor-pointer flex flex-col items-center justify-center rounded-xl transition-colors" style={{ border: '2px dashed rgba(200,245,60,0.3)', background: 'rgba(200,245,60,0.04)', height: '120px' }}>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
                    <Upload className="w-6 h-6 mb-1" style={{ color: '#C8F53C' }} />
                    <p className="text-xs" style={{ color: '#8A8A8A' }}>Add Photo</p>
                  </label>
                )}
              </div>
            </SectionCard>

            <SectionCard title="Legal Documents">
              <p className="text-xs mb-4" style={{ color: '#8A8A8A' }}>Upload proof of ownership</p>
              {legalDocuments.length > 0 && (
                <div className="space-y-2 mb-4">
                  {legalDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#252525' }}>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" style={{ color: '#C8F53C' }} />
                        <span className="text-sm text-white">{doc.name}</span>
                      </div>
                      <button onClick={() => setLegalDocuments(legalDocuments.filter((_, i) => i !== index))} style={{ color: '#EF4444' }}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="block cursor-pointer p-4 rounded-xl text-center" style={{ border: '2px dashed rgba(200,245,60,0.3)', background: 'rgba(200,245,60,0.04)' }}>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple className="hidden" onChange={handleDocumentUpload} />
                <Upload className="w-7 h-7 mx-auto mb-2" style={{ color: '#C8F53C' }} />
                <p className="text-sm text-white">{legalDocuments.length > 0 ? 'Add More Documents' : 'Upload Ownership Documents'}</p>
                <p className="text-xs mt-1" style={{ color: '#8A8A8A' }}>PDF, JPG, or PNG</p>
              </label>
            </SectionCard>

            <SectionCard title="Basic Details">
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">Property Type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger style={inputStyle}><SelectValue placeholder="Select property type" /></SelectTrigger>
                    <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                      {propertyTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">Your Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} className="placeholder:text-gray-500" />
                  </div>
                  <div>
                    <Label className="text-white text-sm mb-2 block">Phone Number</Label>
                    <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} className="placeholder:text-gray-500" />
                  </div>
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Location</Label>
                  <Select value={formData.location} onValueChange={(v) => setFormData({...formData, location: v})}>
                    <SelectTrigger style={inputStyle}><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                      {locations.map((loc) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-sm mb-2 block">Religion Preference (Optional)</Label>
                    <Select value={formData.religion} onValueChange={(v) => setFormData({...formData, religion: v})}>
                      <SelectTrigger style={inputStyle}><SelectValue placeholder="Any" /></SelectTrigger>
                      <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white text-sm mb-2 block">Preferred Tenant</Label>
                    <Select value={formData.preferredTenant} onValueChange={(v) => setFormData({...formData, preferredTenant: v})}>
                      <SelectTrigger style={inputStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="bachelor">Bachelor</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="businessman">Businessman</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-white text-sm mb-2 block">Property Description (Max 1500 words)</Label>
                  <Textarea rows={5} placeholder="Describe your property in detail..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} maxLength={7500} style={{ ...inputStyle, resize: 'none' }} className="placeholder:text-gray-500" />
                  <p className="text-xs mt-1" style={{ color: '#555' }}>{formData.description.length} / 7500 characters</p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Pricing Details">
              <div className="space-y-4">
                <div>
                  <Label className="text-white text-sm mb-2 block">Monthly Rent (BDT)</Label>
                  <Input type="number" placeholder="25000" value={formData.rent} onChange={(e) => setFormData({...formData, rent: e.target.value})} style={inputStyle} className="placeholder:text-gray-500" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {[{ k: 'waterBill', label: 'Water Bill (BDT)', ph: '500' }, { k: 'electricityBill', label: 'Electricity Bill', ph: 'As per usage' }, { k: 'gasBill', label: 'Gas Bill', ph: 'Included' }].map(({ k, label, ph }) => (
                    <div key={k}>
                      <Label className="text-white text-sm mb-2 block">{label}</Label>
                      <Input placeholder={ph} value={(formData as any)[k]} onChange={(e) => setFormData({...formData, [k]: e.target.value})} style={inputStyle} className="placeholder:text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <button onClick={() => setStep(2)} className="w-full py-4 rounded-xl font-semibold transition-opacity hover:opacity-90" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
              Continue to Post Options
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="flex items-center gap-2 mb-5 text-sm font-medium" style={{ color: '#C8F53C' }}>
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Choose Post Type</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>Select how you want to list your property</p>

            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {[
                { type: 'free' as const, title: 'Free Post', price: '0 BDT', desc: 'Basic listing without verification', pros: ['Listed immediately', 'Standard reach', 'No verification badge'], cons: ['Lower priority in search'], accent: 'rgba(255,255,255,0.08)' },
                { type: 'verified' as const, title: 'Verified Post ⭐', price: '200 BDT', desc: 'Premium listing with verification', pros: ['Verified badge displayed', 'Priority in search results', 'Guaranteed within 1 week', 'Official document verification'], cons: [], accent: 'rgba(200,245,60,0.08)' },
              ].map((option) => (
                <div
                  key={option.type}
                  className="p-5 rounded-2xl cursor-pointer transition-all"
                  style={postType === option.type
                    ? { background: option.accent, border: `2px solid ${option.type === 'verified' ? '#C8F53C' : 'rgba(255,255,255,0.4)'}` }
                    : { background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                  onClick={() => setPostType(option.type)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">{option.title}</h3>
                    <span className="text-sm font-semibold" style={{ color: option.type === 'verified' ? '#C8F53C' : '#8A8A8A' }}>{option.price}</span>
                  </div>
                  <p className="text-xs mb-4" style={{ color: '#8A8A8A' }}>{option.desc}</p>
                  <ul className="space-y-2">
                    {option.pros.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-white">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#C8F53C' }} />
                        {p}
                      </li>
                    ))}
                    {option.cons.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm" style={{ color: '#8A8A8A' }}>
                        <X className="w-4 h-4 flex-shrink-0 text-gray-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              disabled={!postType}
              onClick={() => postType === 'verified' ? setStep(3) : setStep(4)}
              className="w-full py-4 rounded-xl font-semibold transition-opacity"
              style={{ background: postType ? '#C8F53C' : '#252525', color: postType ? '#0A0A0A' : '#555', cursor: postType ? 'pointer' : 'not-allowed' }}
            >
              {postType === 'verified' ? 'Proceed to Payment' : 'Post Property'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>Pay 200 BDT for verified posting</p>

            <div className="rounded-2xl mb-5" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-base font-semibold text-white">Payment Method</h3>
              </div>
              <div className="p-5 space-y-3">
                <RadioGroup defaultValue="bkash">
                  {['bkash', 'nagad', 'bank'].map((method) => (
                    <div key={method} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#252525' }}>
                      <RadioGroupItem value={method} id={method} />
                      <Label htmlFor={method} className="text-white font-medium cursor-pointer capitalize">{method === 'bank' ? 'Bank Transfer' : method === 'bkash' ? 'bKash' : 'Nagad'}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="pt-2">
                  <Label className="text-white text-sm mb-2 block">Transaction ID</Label>
                  <Input placeholder="Enter your transaction ID" style={inputStyle} className="placeholder:text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl font-semibold" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}>Back</button>
              <button onClick={() => setStep(4)} className="flex-1 py-4 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Confirm Payment</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#C8F53C' }}>
              <CheckCircle className="w-10 h-10" style={{ color: '#0A0A0A' }} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {postType === 'verified' ? 'Payment Received!' : 'Property Posted!'}
            </h2>
            <p className="mb-8 max-w-md mx-auto text-sm" style={{ color: '#8A8A8A' }}>
              {postType === 'verified'
                ? 'Your payment has been received and the verification process will begin. Please check your email for further updates.'
                : 'Your property has been posted successfully and is now live on Bashabari!'}
            </p>
            <button onClick={onBack} className="px-8 py-4 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
