import { useState } from 'react';
import { ArrowLeft, Scale, Shield, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import type { UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LegalRightsProps {
  userType: UserType;
  onBack: () => void;
}

export function LegalRights({ userType, onBack }: LegalRightsProps) {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    const next = new Set(openItems);
    next.has(key) ? next.delete(key) : next.add(key);
    setOpenItems(next);
  };

  const tenantRights = [
    { category: 'Rent Regulations', rights: [{ title: 'Two-Year Freeze', description: 'Landlords are strictly prohibited from increasing rent more than once every two years.' }, { title: 'Fair Rent Cap', description: 'The total annual rent should not exceed 15% of the market value of the property.' }, { title: 'Advance Rent Limits', description: 'Landlords cannot demand more than one to three months of rent as an advance payment.' }] },
    { category: 'Payment & Documentation', rights: [{ title: 'Mandatory Receipts', description: 'Tenants have a legal right to a written, signed receipt for every rent payment made by the 10th of every month.' }] },
    { category: 'Property Access & Facilities', rights: [{ title: 'Utility Rights', description: 'Landlords must provide uninterrupted access to essential services, including gas, electricity, and water.' }, { title: 'Safety Access (Keys)', description: 'Due to fire and earthquake safety risks, landlords must provide tenants with keys to both the main gate and the rooftop.' }] },
    { category: 'Privacy & Security', rights: [{ title: 'Privacy Protections', description: 'Landlords are generally prohibited from entering the premises without prior notice, except in emergencies.' }, { title: 'Habitable Conditions', description: 'It is a fundamental right for a tenant to live in a property that is safe, clean, and maintained in a liveable condition.' }] },
    { category: 'Termination & Eviction', rights: [{ title: 'Proper Notice Period', description: 'Either party may terminate a residential rental agreement, but they must provide at least a two-month written notice.' }, { title: 'Protection from Unfair Eviction', description: 'A tenant cannot be evicted without a valid reason and must be given a reasonable opportunity to contest through a Controller.' }] },
    { category: 'Dispute Resolution', rights: [{ title: 'Local Mediation', description: 'Rental disputes should first be handled by ward-based associations representing both landlords and tenants.' }, { title: 'Official Appeals', description: 'Unresolved conflicts can be reported to the Regional Executive Officer of the City Corporation for formal resolution.' }] },
  ];

  const landlordRights = [
    { category: 'Payment & Collection', rights: [{ title: 'Payment Deadline', description: 'Landlords have the right to receive rent by the 10th day of every month, unless a different date is specified in the contract.' }, { title: 'Recovery of Arrears', description: 'If a tenant fails to pay, the landlord has the legal right to sue for recovery of rent arrears through the Rent Controller.' }] },
    { category: 'Property Maintenance', rights: [{ title: 'Right of Entry for Inspection', description: 'After giving reasonable prior notice, a landlord has the right to enter the premises to inspect or carry out necessary repairs.' }, { title: 'Unauthorized Alterations', description: 'Tenants are prohibited from making structural changes without the written consent of the landlord.' }] },
    { category: 'Tenant Verification & Control', rights: [{ title: 'Verified Identification', description: "Landlords have the right to demand a copy of the tenant's NID and completed Police Verification Form before handing over keys." }, { title: 'Sub-letting Control', description: "Tenants are strictly prohibited from sub-letting any part of the premises without the landlord's express written permission." }] },
    { category: 'Eviction Rights', rights: [{ title: 'Default in Payment', description: 'The tenant has failed to pay rent for two consecutive months.' }, { title: 'Breach of Contract', description: 'The tenant violates specific terms laid out in the written agreement.' }, { title: 'Personal Requirement', description: 'The landlord requires the premises for their own bona fide use or for the use of their family members.' }] },
    { category: 'Rent & Service Charges', rights: [{ title: 'Rent Revision', description: 'Landlords have the right to adjust rent after two years to reflect market value, provided it stays within the 15% property value cap.' }, { title: 'Service Charge Autonomy', description: 'Landlords have the right to set and collect service charges for shared amenities that reflect the actual cost of maintenance.' }] },
  ];

  const rights = userType === 'tenant' ? tenantRights : landlordRights;

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Scale className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Legal Rights</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero */}
        <div className="p-8 rounded-2xl mb-5 text-center" style={{ background: '#C8F53C' }}>
          <Shield className="w-14 h-14 mx-auto mb-4" style={{ color: '#0A0A0A' }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#0A0A0A' }}>
            {userType === 'tenant' ? 'Your Rights as a Tenant' : 'Your Rights as a Landlord'}
          </h2>
          <p className="text-sm" style={{ color: 'rgba(0,0,0,0.65)' }}>
            Know your legal rights and protections under Bangladesh rental laws
          </p>
        </div>

        {/* Info Notice */}
        <div className="p-4 rounded-2xl mb-5 flex items-start gap-3" style={{ background: 'rgba(200,245,60,0.08)', border: '1px solid rgba(200,245,60,0.2)' }}>
          <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#C8F53C' }} />
          <div>
            <h3 className="font-semibold text-white mb-1">Important Information</h3>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>These rights are based on the Premises Rent Control Act and related housing regulations in Bangladesh. Always document agreements in writing.</p>
          </div>
        </div>

        {/* Rights Categories */}
        <div className="space-y-4">
          {rights.map((category, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="p-5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Scale className="w-4 h-4" style={{ color: '#C8F53C' }} />
                <h3 className="text-base font-semibold text-white">{category.category}</h3>
              </div>
              <div className="p-3">
                {category.rights.map((right, rIdx) => {
                  const key = `${idx}-${rIdx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={rIdx} style={rIdx < category.rights.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.04)' } : {}}>
                      <button
                        className="w-full p-3 flex items-center justify-between text-left transition-colors rounded-xl"
                        onClick={() => toggle(key)}
                        style={{ color: '#FFFFFF' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#252525')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                      >
                        <span className="font-semibold text-sm">{right.title}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: '#C8F53C' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#8A8A8A' }} />}
                      </button>
                      {isOpen && (
                        <div className="px-3 pb-3">
                          <p className="text-sm leading-relaxed" style={{ color: '#CCCCCC' }}>{right.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-6 p-6 rounded-2xl text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-semibold text-white mb-2">Need Legal Assistance?</h3>
          <p className="text-sm mb-4" style={{ color: '#8A8A8A' }}>If you're facing a legal issue, consult with a lawyer or contact the Rent Controller office in your area.</p>
          <button className="px-6 py-2.5 rounded-xl text-sm font-semibold" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', background: 'transparent' }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
