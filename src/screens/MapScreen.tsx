import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, User } from 'lucide-react';
import { motion } from 'motion/react';

const MOCK_NEARBY = [
  { id: 1, name: 'Sarah', lat: 37.7749, lng: -122.4194, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
  { id: 2, name: 'Mike', lat: 37.7849, lng: -122.4094, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: 3, name: 'Emma', lat: 37.7649, lng: -122.4294, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { id: 4, name: 'Alex', lat: 37.7700, lng: -122.4100, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
];

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to SF
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-100 relative overflow-hidden">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex items-center px-4 py-3">
          <Search size={20} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search for matches nearby..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
          />
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
            <MapPin size={16} />
          </div>
        </div>
      </div>

      {/* Mock Map Background */}
      <div className="flex-1 bg-slate-200 relative overflow-hidden">
        {/* Simple Grid Pattern to simulate map */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} />
        
        {/* User Marker */}
        {userLocation && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              <div className="w-6 h-6 bg-blue-500 border-4 border-white rounded-full shadow-lg relative z-10" />
            </div>
          </motion.div>
        )}

        {/* Nearby User Markers */}
        {MOCK_NEARBY.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="absolute"
            style={{ 
              left: `${40 + (idx * 15)}%`, 
              top: `${30 + (idx * 10)}%` 
            }}
          >
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="relative">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full border-4 border-white shadow-xl object-cover group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Heart size={8} fill="white" className="text-white" />
                </div>
              </div>
              <div className="mt-2 px-2 py-1 bg-white rounded-lg shadow-md text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {user.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-slate-600 hover:text-pink-500 transition-colors">
        <Navigation size={24} />
      </button>

      {/* Stats Overlay */}
      <div className="absolute bottom-6 left-6 right-24">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {MOCK_NEARBY.slice(0, 3).map(u => (
                <img key={u.id} src={u.image} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">12 people nearby</p>
              <p className="text-[10px] text-slate-500">Within 5km of your location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heart({ size, fill, className }: { size: number, fill: string, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
