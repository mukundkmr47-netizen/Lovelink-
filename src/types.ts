export interface Profile {
  id: number;
  name: string;
  age: number;
  distance: number;
  images: string[];
  bio: string;
  social: {
    instagram: string;
    twitter: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  senderId: number;
  receiverId: number;
}

export interface Chat {
  id: string;
  profile: Profile;
  lastMessage?: string;
  timestamp?: Date;
}
