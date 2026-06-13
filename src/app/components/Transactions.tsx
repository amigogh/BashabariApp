import { useState } from 'react';
import { ArrowLeft, Receipt, Download, Calendar, Home, Zap, Droplet, Wind, CheckCircle, Clock } from 'lucide-react';
import type { UserType } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface TransactionsProps {
  userType: UserType;
  onNavigate?: (page: string, data?: any) => void;
  onBack: () => void;
}

export function Transactions({ userType, onNavigate, onBack }: TransactionsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'monthly'>('all');

  const transactions = [
    { id: 1, date: '2026-05-10', property: 'Gulshan 2 Apartment', type: 'Rent', amount: 35000, status: 'Paid', paymentMethod: 'bKash', transactionId: 'BK2605ABC123' },
    { id: 2, date: '2026-05-10', property: 'Gulshan 2 Apartment', type: 'Water Bill', amount: 500, status: 'Paid', paymentMethod: 'bKash', transactionId: 'BK2605ABC124' },
    { id: 3, date: '2026-05-12', property: 'Gulshan 2 Apartment', type: 'Electricity Bill', amount: 2800, status: 'Paid', paymentMethod: 'Nagad', transactionId: 'NG2605XYZ456' },
    { id: 4, date: '2026-04-10', property: 'Gulshan 2 Apartment', type: 'Rent', amount: 35000, status: 'Paid', paymentMethod: 'bKash', transactionId: 'BK2604DEF789' },
    { id: 5, date: '2026-04-10', property: 'Gulshan 2 Apartment', type: 'Water Bill', amount: 450, status: 'Paid', paymentMethod: 'bKash', transactionId: 'BK2604DEF790' },
    { id: 6, date: '2026-04-15', property: 'Gulshan 2 Apartment', type: 'Gas Bill', amount: 1200, status: 'Paid', paymentMethod: 'Bank Transfer', transactionId: 'BT2604GHI123' },
    { id: 7, date: '2026-06-10', property: 'Gulshan 2 Apartment', type: 'Rent', amount: 35000, status: 'Pending', paymentMethod: '-', transactionId: '-' },
  ];

  const monthlyBreakdown = [
    { month: '2026-05', label: 'May 2026', rent: 35000, water: 500, electricity: 2800, gas: 0, total: 38300 },
    { month: '2026-04', label: 'April 2026', rent: 35000, water: 450, electricity: 2600, gas: 1200, total: 39250 },
    { month: '2026-03', label: 'March 2026', rent: 35000, water: 520, electricity: 2400, gas: 1100, total: 39020 },
  ];

  const typeIcons: Record<string, { icon: React.ElementType; color: string }> = {
    'Rent': { icon: Home, color: '#C8F53C' },
    'Water Bill': { icon: Droplet, color: '#0EA5E9' },
    'Electricity Bill': { icon: Zap, color: '#F59E0B' },
    'Gas Bill': { icon: Wind, color: '#F97316' },
  };

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Receipt className="w-5 h-5" style={{ color: '#C8F53C' }} />
            <span className="text-lg font-bold text-white">Transaction History</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Paid (2026)', value: '1,16,570 BDT', sub: '5 transactions completed', color: '#C8F53C' },
            { label: 'Pending Payments', value: '35,000 BDT', sub: 'Due by June 10', color: '#F97316' },
            { label: 'Avg Monthly Expense', value: '38,857 BDT', sub: 'Last 3 months', color: '#8B5CF6' },
          ].map((card) => (
            <div key={card.label} className="p-5 rounded-2xl" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>{card.label}</p>
              <p className="text-xl font-bold mb-1" style={{ color: card.color }}>{card.value}</p>
              <p className="text-xs" style={{ color: '#555' }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6 w-full max-w-sm" style={{ background: '#252525' }}>
          {(['all', 'monthly'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={activeTab === tab
                ? { background: '#C8F53C', color: '#0A0A0A' }
                : { background: 'transparent', color: '#8A8A8A' }
              }
            >
              {tab === 'all' ? 'All Transactions' : 'Monthly Breakdown'}
            </button>
          ))}
        </div>

        {activeTab === 'all' && (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const typeInfo = typeIcons[tx.type] || { icon: Receipt, color: '#8A8A8A' };
              const Icon = typeInfo.icon;
              return (
                <div key={tx.id} className="p-5 rounded-2xl" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#252525' }}>
                      <Icon className="w-5 h-5" style={{ color: typeInfo.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{tx.type}</h3>
                          <p className="text-xs" style={{ color: '#8A8A8A' }}>{tx.property}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xl font-bold" style={{ color: '#C8F53C' }}>{tx.amount.toLocaleString()}</p>
                          <p className="text-xs" style={{ color: '#8A8A8A' }}>BDT</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                        <div>
                          <p style={{ color: '#555' }}>Date</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" style={{ color: '#555' }} />
                            <p className="font-medium text-white">{new Date(tx.date).toLocaleDateString('en-GB')}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ color: '#555' }}>Method</p>
                          <p className="font-medium mt-0.5 text-white">{tx.paymentMethod}</p>
                        </div>
                        <div>
                          <p style={{ color: '#555' }}>TX ID</p>
                          <p className="font-medium mt-0.5 text-white">{tx.transactionId}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                          style={tx.status === 'Paid'
                            ? { background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }
                            : { background: 'rgba(249,115,22,0.12)', color: '#F97316' }
                          }
                        >
                          {tx.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {tx.status}
                        </span>
                        <div className="flex gap-2">
                          {tx.status === 'Paid' && (
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: '#252525', color: '#FFFFFF' }}>
                              <Download className="w-3 h-3" /> Receipt
                            </button>
                          )}
                          {tx.status === 'Pending' && userType === 'tenant' && onNavigate && (
                            <button onClick={() => onNavigate('payment', tx)} className="px-4 py-1.5 rounded-lg text-xs font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'monthly' && (
          <div className="space-y-4">
            {monthlyBreakdown.map((m) => (
              <div key={m.month} className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-semibold text-white">{m.label}</span>
                  <span className="font-bold" style={{ color: '#C8F53C' }}>{m.total.toLocaleString()} BDT</span>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: Home, label: 'Rent', val: m.rent, color: '#C8F53C' },
                    { icon: Droplet, label: 'Water Bill', val: m.water, color: '#0EA5E9' },
                    { icon: Zap, label: 'Electricity Bill', val: m.electricity, color: '#F59E0B' },
                    { icon: Wind, label: 'Gas Bill', val: m.gas, color: '#F97316' },
                  ].filter(item => item.val > 0).map(({ icon: Icon, label, val, color }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#252525' }}>
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" style={{ color }} />
                        <span className="text-sm font-medium text-white">{label}</span>
                      </div>
                      <span className="font-bold text-sm" style={{ color }}>{val.toLocaleString()} BDT</span>
                    </div>
                  ))}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold" style={{ color: '#C8F53C' }}>{m.total.toLocaleString()} BDT</span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', background: 'transparent' }}>
                    <Download className="w-4 h-4" /> Download Statement
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
