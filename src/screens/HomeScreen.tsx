import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { Profile } from '../types';
import { Sparkles } from 'lucide-react';

const MOCK_PROFILES: Profile[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 25,
    distance: 2.3,
    images: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800'],
    bio: 'Love hiking and coffee ☕. Looking for someone to explore the city with!',
    social: {
      instagram: 'sarah_j',
      twitter: 'sarahj25'
    },
    location: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 2,
    name: 'Mike Chen',
    age: 28,
    distance: 1.8,
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
    bio: 'Foodie and gamer 🎮. Always down for a late-night ramen run.',
    social: {
      instagram: 'mikechen28',
      twitter: 'mike_c'
    },
    location: { lat: 37.7849, lng: -122.4094 }
  },
  {
    id: 3,
    name: 'Emma Davis',
    age: 24,
    distance: 3.1,
    images: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800'],
    bio: 'Artist and yoga lover 🧘‍♀️. Creating beauty in every moment.',
    social: {
      instagram: 'emma_art',
      twitter: 'emmadavis'
    },
    location: { lat: 37.7649, lng: -122.4294 }
  },
  {
    id: 4,
    name: 'Alex Rivera',
    age: 27,
    distance: 0.5,
    images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'],
    bio: 'Adventure seeker 🏔️. Life is short, let\'s make it epic.',
    social: {
      instagram: 'alex_adv',
      twitter: 'alexr'
    },
    location: { lat: 37.7700, lng: -122.4100 }
  }
];

export default function HomeScreen() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleLike = () => {
    setDirection('right');
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      } else {
        setProfiles([]); // No more profiles
      }
    }, 200);
  };

  const handleDislike = () => {
    setDirection('left');
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      } else {
        setProfiles([]); // No more profiles
      }
    }, 200);
  };

  const handleChat = (profile: Profile) => {
    navigate(`/chat/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            Spark
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative">
        <AnimatePresence mode="wait">
          {profiles.length > 0 && currentIndex < profiles.length ? (
            <motion.div
              key={profiles[currentIndex].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: direction === 'left' ? -500 : direction === 'right' ? 500 : 0,
                rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : 0
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="w-full max-w-md"
            >
              <ProfileCard
                profile={profiles[currentIndex]}
                onLike={handleLike}
                onDislike={handleDislike}
                onChat={handleChat}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Sparkles size={40} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">No more profiles nearby</h2>
              <p className="text-slate-500">Check back later or expand your search radius!</p>
              <button 
                onClick={() => {
                  setProfiles(MOCK_PROFILES);
                  setCurrentIndex(0);
                }}
                className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors"
              >
                Refresh
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
