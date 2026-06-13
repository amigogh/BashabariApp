import { useState } from 'react';
import { ArrowLeft, Eye, CheckCircle, Clock, XCircle, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MyPostsProps {
  onBack: () => void;
}

export function MyPosts({ onBack }: MyPostsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'verified' | 'pending' | 'unverified'>('verified');

  const verifiedPosts = [
    { id: 1, title: 'Modern Family Apartment in Gulshan', location: 'Gulshan 2, Dhaka', rent: 35000, views: 245, inquiries: 12, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop', postedDate: '2026-04-15', verified: true },
    { id: 2, title: 'Spacious Duplex Penthouse', location: 'Banani, Dhaka', rent: 85000, views: 189, inquiries: 8, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop', postedDate: '2026-03-20', verified: true },
  ];
  const pendingPosts = [
    { id: 3, title: 'Cozy Studio Apartment', location: 'Dhanmondi, Dhaka', rent: 15000, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', postedDate: '2026-05-12', status: 'Under Review' },
  ];
  const unverifiedPosts = [
    { id: 4, title: 'Bachelor House in Mohammadpur', location: 'Mohammadpur, Dhaka', rent: 8000, views: 34, inquiries: 2, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', postedDate: '2026-05-10', verified: false },
  ];

  const tabs = [
    { key: 'verified' as const, label: `Verified (${verifiedPosts.length})` },
    { key: 'pending' as const, label: `Pending (${pendingPosts.length})` },
    { key: 'unverified' as const, label: `Unverified (${unverifiedPosts.length})` },
  ];

  const PostCard = ({ post, isPending = false }: { post: any; isPending?: boolean }) => (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex flex-col md:flex-row">
        <img src={post.image} alt={post.title} className="w-full md:w-56 h-44 object-cover" />
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">{post.title}</h3>
              <p className="text-sm mb-2" style={{ color: '#8A8A8A' }}>{post.location}</p>
              <p className="text-xl font-bold" style={{ color: '#C8F53C' }}>
                {post.rent.toLocaleString()} BDT
                <span className="text-xs font-normal" style={{ color: '#8A8A8A' }}>/month</span>
              </p>
            </div>
            <div className="ml-3 flex-shrink-0">
              {post.verified && (
                <span className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(200,245,60,0.12)', color: '#C8F53C' }}>
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
              {isPending && (
                <span className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(249,115,22,0.12)', color: '#F97316' }}>
                  <Clock className="w-3 h-3" /> {post.status}
                </span>
              )}
              {!post.verified && !isPending && (
                <span className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(255,255,255,0.06)', color: '#8A8A8A' }}>
                  <XCircle className="w-3 h-3" /> Unverified
                </span>
              )}
            </div>
          </div>

          {!isPending && (post.views !== undefined) && (
            <div className="grid grid-cols-2 gap-3 mb-3 p-3 rounded-xl" style={{ background: '#252525' }}>
              <div>
                <p className="text-xs mb-0.5" style={{ color: '#8A8A8A' }}>Views</p>
                <p className="text-lg font-semibold text-white">{post.views}</p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: '#8A8A8A' }}>Inquiries</p>
                <p className="text-lg font-semibold text-white">{post.inquiries}</p>
              </div>
            </div>
          )}

          <p className="text-xs mb-3" style={{ color: '#555' }}>Posted on {new Date(post.postedDate).toLocaleDateString('en-GB')}</p>

          <div className="flex gap-2">
            {[{ Icon: Edit, label: 'Edit' }, { Icon: Eye, label: 'View' }].map(({ Icon, label }) => (
              <button key={label} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', background: 'transparent' }}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
    <div className="p-12 rounded-2xl text-center" style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)' }}>
      <Icon className="w-14 h-14 mx-auto mb-4" style={{ color: '#333' }} />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm" style={{ color: '#8A8A8A' }}>{desc}</p>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#141414' }}>
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-white flex-1">My Posts</span>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tab Bar */}
        <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: '#252525' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={activeTab === tab.key
                ? { background: '#C8F53C', color: '#0A0A0A' }
                : { background: 'transparent', color: '#8A8A8A' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {activeTab === 'verified' && (
            verifiedPosts.length > 0
              ? verifiedPosts.map((p) => <PostCard key={p.id} post={p} />)
              : <EmptyState icon={CheckCircle} title="No Verified Posts" desc="Your verified posts will appear here" />
          )}
          {activeTab === 'pending' && (
            pendingPosts.length > 0
              ? pendingPosts.map((p) => <PostCard key={p.id} post={p} isPending={true} />)
              : <EmptyState icon={Clock} title="No Pending Posts" desc="Posts awaiting verification will appear here" />
          )}
          {activeTab === 'unverified' && (
            unverifiedPosts.length > 0
              ? unverifiedPosts.map((p) => <PostCard key={p.id} post={p} />)
              : <EmptyState icon={XCircle} title="No Unverified Posts" desc="Your free posts will appear here" />
          )}
        </div>
      </div>
    </div>
  );
}
