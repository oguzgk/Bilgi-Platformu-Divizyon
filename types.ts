// Rol tipleri - PDF'deki 5 rol sistemi
export type UserRole = 'yeni_gelen' | 'seyyah' | 'gezgin' | 'kasif_meraklisi' | 'konya_bilgesi';

// Rol bilgileri
export interface RoleInfo {
  id: UserRole;
  name: string;
  minCoins: number;
  maxCoins: number;
  multiplier: number;
  color: string;
  badgeIcon: string;
  description: string;
  permissions: {
    canComment: boolean;
    canEditWiki: boolean;
    canCreateTopic: boolean;
    canModerate: boolean;
    canAccessAdminPanel: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  role: UserRole;
  multiplier: number;
  badges: string[]; // Kazanılan özel rozetler
  totalContributions: number; // Toplam katkı sayısı
  joinedDate: string;
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

// Bildirim Tipleri
export type NotificationType = 
  | 'coin_earned'      // Coin kazandın
  | 'reply'            // Yorumuna yanıt geldi
  | 'like'             // İçeriğin beğenildi
  | 'level_up'         // Seviye atladın
  | 'role_change'      // Rol değişti
  | 'wiki_edit'        // Wiki düzenlendi
  | 'announcement'     // KBB duyurusu
  | 'mention';         // Etiketlendin

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  metadata?: {
    amount?: number;       // Coin miktarı
    username?: string;     // İlgili kullanıcı
    contentTitle?: string; // İlgili içerik
    oldRole?: UserRole;    // Eski rol
    newRole?: UserRole;    // Yeni rol
  };
}