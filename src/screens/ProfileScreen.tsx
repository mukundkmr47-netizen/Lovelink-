import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Shield, Bell, CreditCard, HelpCircle, LogOut, Camera } from 'lucide-react';

export default function ProfileScreen() {
  const user = {
    name: 'Mukund',
    age: 24,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    completion: 85
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      {/* Header Profile Section */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[3rem] shadow-sm border-b border-slate-100">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-orange-400">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full rounded-full object-cover border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-pink-500 border border-slate-100">
              <Camera size={20} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}, {user.age}</h2>
          <p className="text-slate-500 text-sm font-medium">Product Designer</p>
          
          <div className="mt-6 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profile Completion</span>
              <span className="text-xs font-bold text-pink-500">{user.completion}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${user.completion}%` }}
                className="h-full bg-gradient-to-r from-pink-500 to-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 mt-8 space-y-6">
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Account Settings</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem icon={<User size={20} />} label="Personal Information" />
            <MenuItem icon={<Bell size={20} />} label="Notifications" />
            <MenuItem icon={<CreditCard size={20} />} label="Subscription" badge="Premium" />
            <MenuItem icon={<Shield size={20} />} label="Privacy & Security" />
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">Support</h3>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <MenuItem icon={<HelpCircle size={20} />} label="Help Center" />
            <MenuItem icon={<Settings size={20} />} label="App Settings" />
          </div>
        </section>

        <button className="w-full py-4 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: string }) {
  return (
    <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none">
      <div className="flex items-center gap-4">
        <div className="text-slate-400">{icon}</div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-[10px] font-bold rounded-full uppercase">
            {badge}
          </span>
        )}
        <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-slate-300 rotate-45" />
      </div>
    </button>
  );
}
