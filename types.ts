export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
}

export interface Comment {
  id: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  userVote?: 'up' | 'down' | null;
}

export interface WikiHeader {
  id: string;
  text: string;
}

export interface WikiContent {
  title: string;
  lastUpdated: string;
  author: string;
  content: string; // HTML or Markdown string
  headers: WikiHeader[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  active?: boolean;
}