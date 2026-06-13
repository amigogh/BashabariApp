import { useState } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import type { User } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ChatInterfaceProps {
  chatWith: any;
  user: User | null;
  onBack: () => void;
}

export function ChatInterface({ chatWith, user, onBack }: ChatInterfaceProps) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hello! Thank you for your interest in my property.', time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hi! I saw your listing for the apartment in Gulshan. Is it still available?', time: '10:32 AM' },
    { id: 3, sender: 'them', text: "Yes, it's still available! Would you like to schedule a visit?", time: '10:33 AM' },
    { id: 4, sender: 'me', text: 'That would be great! What times work for you this week?', time: '10:35 AM' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'me', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: prev.length + 1, sender: 'them', text: "Thanks for your message! I'll get back to you shortly.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      }, 1000);
    }
  };

  if (!chatWith || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#141414' }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: '#8A8A8A' }}>{!user ? 'Please log in to chat' : 'No chat selected'}</p>
          <button onClick={onBack} className="px-6 py-3 rounded-xl font-semibold" style={{ background: '#C8F53C', color: '#0A0A0A' }}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: '#141414' }}>
      {/* Header */}
      <header style={{ background: '#1E1E1E', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-xl" style={{ background: '#252525', color: '#FFFFFF' }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Avatar className="w-9 h-9">
              <AvatarFallback style={{ background: '#C8F53C', color: '#0A0A0A', fontSize: '13px' }}>
                {chatWith.owner?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-white text-sm">{chatWith.owner || 'Property Owner'}</h2>
              <p className="text-xs" style={{ color: '#C8F53C' }}>● Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            {[Phone, Video, MoreVertical].map((Icon, i) => (
              <button key={i} className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors" style={{ color: '#FFFFFF' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#252525')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Property Info Banner */}
      {chatWith.title && (
        <div style={{ background: '#1A1A1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container mx-auto px-4 py-3 max-w-4xl">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#252525' }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#333' }}>
                {chatWith.image && typeof chatWith.image === 'string' && !chatWith.image.startsWith('http') ? chatWith.image : '🏠'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm">{chatWith.title}</h3>
                <p className="text-xs" style={{ color: '#8A8A8A' }}>{chatWith.location}</p>
                <p className="text-sm font-semibold" style={{ color: '#C8F53C' }}>
                  {chatWith.rent?.toLocaleString()} BDT/month
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[70%] md:max-w-[60%] px-4 py-3 rounded-2xl"
                  style={msg.sender === 'me'
                    ? { background: '#C8F53C', color: '#0A0A0A', borderBottomRightRadius: '4px' }
                    : { background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', color: '#FFFFFF', borderBottomLeftRadius: '4px' }
                  }
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1" style={{ color: msg.sender === 'me' ? 'rgba(0,0,0,0.5)' : '#555' }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div style={{ background: '#1E1E1E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: '#252525', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF' }}
            />
            <button
              onClick={handleSend}
              className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0 transition-opacity hover:opacity-90"
              style={{ background: '#C8F53C', color: '#0A0A0A' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
