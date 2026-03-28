import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ChatListScreen from './screens/ChatListScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden font-sans">
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/chats" element={<ChatListScreen />} />
            <Route path="/chat/:id" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}
