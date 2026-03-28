import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Smile } from 'lucide-react';
import { Profile, Message } from '../types';
import { format } from 'date-fns';

export default function ChatScreen() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state?.profile as Profile;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) {
      navigate('/chats');
      return;
    }

    // Initial mock messages
    setMessages([
      {
        id: '1',
        text: `Hey ${profile.name}! 👋`,
        createdAt: new Date(Date.now() - 3600000),
        senderId: profile.id,
        receiverId: 0, // Me
      },
      {
        id: '2',
        text: 'Hi! How are you doing today?',
        createdAt: new Date(Date.now() - 3000000),
        senderId: 0, // Me
        receiverId: profile.id,
      },
      {
        id: '3',
        text: 'I\'m great! Just saw your profile and loved your bio. Hiking is my favorite too!',
        createdAt: new Date(Date.now() - 2000000),
        senderId: profile.id,
        receiverId: 0,
      }
    ]);
  }, [profile, navigate]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      createdAt: new Date(),
      senderId: 0,
      receiverId: profile.id,
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds awesome! We should definitely plan a hike sometime. 🏔️",
        createdAt: new Date(),
        senderId: profile.id,
        receiverId: 0,
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  if (!profile) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={profile.images[0]}
                alt={profile.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800 leading-tight">{profile.name}</h2>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === 0;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] group`}>
                <div className={`
                  px-4 py-2 rounded-2xl text-sm shadow-sm
                  ${isMe 
                    ? 'bg-pink-500 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'}
                `}>
                  {msg.text}
                </div>
                <p className={`text-[10px] mt-1 text-slate-400 ${isMe ? 'text-right' : 'text-left'}`}>
                  {format(msg.createdAt, 'h:mm a')}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={scrollRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-slate-200">
        <form 
          onSubmit={handleSend}
          className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2"
        >
          <button type="button" className="text-slate-400 hover:text-slate-600">
            <Smile size={24} />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 placeholder:text-slate-400"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className={`
              p-2 rounded-full transition-all
              ${inputText.trim() 
                ? 'bg-pink-500 text-white shadow-md scale-100' 
                : 'text-slate-300 scale-90'}
            `}
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}
