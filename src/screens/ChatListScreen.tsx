import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Search, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

const MOCK_CHATS = [
  {
    id: '1',
    profile: {
      id: 1,
      name: 'Sarah Johnson',
      images: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200'],
    },
    lastMessage: 'Hey! Are we still on for coffee?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    unread: true
  },
  {
    id: '2',
    profile: {
      id: 2,
      name: 'Mike Chen',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'],
    },
    lastMessage: 'That sounds like a plan!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unread: false
  },
  {
    id: '3',
    profile: {
      id: 3,
      name: 'Emma Davis',
      images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'],
    },
    lastMessage: 'I love that painting!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unread: false
  }
];

export default function ChatListScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
        <button className="p-2 bg-slate-100 rounded-full text-slate-600">
          <Search size={20} />
        </button>
      </header>

      {/* Matches Horizontal List */}
      <section className="px-6 mb-8">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">New Matches</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-orange-400">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/match${i}/100/100`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-600">Match {i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Chat List */}
      <section className="flex-1 overflow-y-auto px-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Chats</h2>
        <div className="space-y-1">
          {MOCK_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.profile.id}`, { state: { profile: chat.profile } })}
              className="w-full flex items-center gap-4 py-4 hover:bg-slate-50 transition-colors rounded-2xl px-2 -mx-2"
            >
              <div className="relative">
                <img
                  src={chat.profile.images[0]}
                  alt={chat.profile.name}
                  className="w-14 h-14 rounded-full object-cover border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                {chat.unread && (
                  <div className="absolute top-0 right-0 w-4 h-4 bg-pink-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-800">{chat.profile.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {format(chat.timestamp, 'h:mm a')}
                  </span>
                </div>
                <p className={`text-sm line-clamp-1 ${chat.unread ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
