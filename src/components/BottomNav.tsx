import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Heart, MessageCircle, MapPin, User, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BottomNav() {
  const location = useLocation();
  
  // Hide bottom nav on chat detail screen
  if (location.pathname.startsWith('/chat/')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 px-6 py-3 pb-8 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavButton to="/" icon={<Sparkles size={24} />} label="Discover" />
        <NavButton to="/map" icon={<MapPin size={24} />} label="Nearby" />
        <NavButton to="/chats" icon={<MessageCircle size={24} />} label="Chats" />
        <NavButton to="/profile" icon={<User size={24} />} label="Profile" />
      </div>
    </nav>
  );
}

function NavButton({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-pink-500 scale-110" : "text-slate-400 hover:text-slate-600"
      )}
    >
      <div className="relative">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </NavLink>
  );
}
