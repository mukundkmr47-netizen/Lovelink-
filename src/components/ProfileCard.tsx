import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, MessageCircle, Instagram, Twitter, Info, Share2 } from 'lucide-react';
import { Profile } from '../types';
import { cn } from '../lib/utils';

interface ProfileCardProps {
  profile: Profile;
  onLike: () => void;
  onDislike: () => void;
  onChat: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onLike, onDislike, onChat }: ProfileCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Check out ${profile.name} on Spark!`,
        text: profile.bio,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white group">
      {/* Profile Image */}
      <img
        src={profile.images[0]}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Info Content */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-6 transition-all duration-300",
        showInfo ? "translate-y-0" : "translate-y-0"
      )}>
        <div className="flex items-end justify-between mb-2">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-white/80 text-sm font-medium">
              {profile.distance} km away
            </p>
          </div>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
          >
            <Info size={20} />
          </button>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-white/90 text-base mb-4 leading-relaxed">
                {profile.bio}
              </p>
              
              <div className="flex gap-3 mb-4">
                <a
                  href={`https://instagram.com/${profile.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs hover:bg-white/20 transition-colors"
                >
                  <Instagram size={14} className="text-pink-500" />
                  <span>Instagram</span>
                </a>
                <a
                  href={`https://twitter.com/${profile.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs hover:bg-white/20 transition-colors"
                >
                  <Twitter size={14} className="text-blue-400" />
                  <span>Twitter</span>
                </a>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs hover:bg-white/20 transition-colors"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-around items-center mt-4">
          <button
            onClick={onDislike}
            className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <X size={28} strokeWidth={3} />
          </button>
          
          <button
            onClick={onLike}
            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart size={32} fill="currentColor" />
          </button>
          
          <button
            onClick={() => onChat(profile)}
            className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
          >
            <MessageCircle size={28} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}
