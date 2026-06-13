import { useState } from 'react';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import type { User as UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface EditProfileProps {
  user: UserType;
  onSave: (updatedUser: UserType) => void;
  onBack: () => void;
}

const inputStyle = {
  background: '#252525',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#FFFFFF',
  borderRadius: '0.75rem',
};

export function EditProfile({ user, onSave, onBack }: EditProfileProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: user.name, email: user.email, phone: user.phone,
    address: 'House 12, Road 5, Dhanmondi, Dhaka', occupation: 'Professional',
    gender: 'Male', maritalStatus: 'Single', salary: '50000',
    bkash: '01700-123456', nagad: '01700-123456', bankAccount: 'Dutch-Bangla Bank - 1234567890'
  });
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleSave = () => {
    onSave({ ...user, name: formData.name, email: formData.email, phone: formData.phone, profilePic: profilePic || user.profilePic });
    onBack();
  };

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
          <span className="text-lg font-bold text-white flex-1">Edit Profile</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <SectionCard title="Profile Picture">
          <div className="flex items-center gap-5">
            <Avatar className="w-20 h-20">
              {profilePic ? <AvatarImage src={profilePic} /> : <AvatarFallback style={{ background: '#C8F53C', color: '#0A0A0A', fontSize: '28px' }}>{user.name.charAt(0)}</AvatarFallback>}
            </Avatar>
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) { const reader = new FileReader(); reader.onloadend = () => setProfilePic(reader.result as string); reader.readAsDataURL(file); }
              }} />
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', background: '#252525' }}>
                <Upload className="w-4 h-4" />
                Upload Photo
              </div>
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Personal Information">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm mb-2 block">Full Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <Label className="text-white text-sm mb-2 block">Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm mb-2 block">Phone Number</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <Label className="text-white text-sm mb-2 block">Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                  <SelectTrigger style={inputStyle}><SelectValue /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-white text-sm mb-2 block">Address</Label>
              <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} style={inputStyle} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm mb-2 block">Occupation</Label>
                <Select value={formData.occupation} onValueChange={(v) => setFormData({...formData, occupation: v})}>
                  <SelectTrigger style={inputStyle}><SelectValue /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Bachelor">Bachelor</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Businessman">Businessman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white text-sm mb-2 block">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(v) => setFormData({...formData, maritalStatus: v})}>
                  <SelectTrigger style={inputStyle}><SelectValue /></SelectTrigger>
                  <SelectContent style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-white text-sm mb-2 block">Current Salary (BDT)</Label>
              <Input type="number" value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} style={inputStyle} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Payment Information">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm mb-2 block">bKash Number</Label>
                <Input value={formData.bkash} onChange={(e) => setFormData({...formData, bkash: e.target.value})} style={inputStyle} />
              </div>
              <div>
                <Label className="text-white text-sm mb-2 block">Nagad Number</Label>
                <Input value={formData.nagad} onChange={(e) => setFormData({...formData, nagad: e.target.value})} style={inputStyle} />
              </div>
            </div>
            <div>
              <Label className="text-white text-sm mb-2 block">Bank Account (Optional)</Label>
              <Input value={formData.bankAccount} onChange={(e) => setFormData({...formData, bankAccount: e.target.value})} style={inputStyle} />
            </div>
          </div>
        </SectionCard>

        <div className="flex gap-3">
          <button onClick={onBack} className="flex-1 py-4 rounded-xl font-semibold" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}>
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
