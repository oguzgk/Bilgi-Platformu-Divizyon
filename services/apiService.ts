// Mock API Service - Backend için hazırlık
// Gerçek backend geldiğinde bu dosya güncellenecek

import { User, Comment, WikiContent, Notification, NotificationType } from '../types';
import { CURRENT_USER, MOCK_COMMENTS, WIKI_DATA, COIN_REWARDS, MOCK_NOTIFICATIONS } from '../constants';
import { calculateRoleFromCoins, calculateCoinReward } from '../utils/roleHelpers';

// Simüle edilmiş gecikme (gerçek API gibi)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// USER API
// ============================================

export const userApi = {
  // Kullanıcı girişi
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(800);
    
    // TODO: Gerçek backend'e istek
    // const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    
    return {
      user: CURRENT_USER,
      token: 'mock_jwt_token_12345'
    };
  },

  // Kullanıcı kaydı (Genç Kültür Kart ID ile)
  register: async (gencKulturKartId: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(1000);
    
    // TODO: KBB Genç Kültür Kart API'sine doğrulama
    // const isValid = await verifyGencKulturKart(gencKulturKartId);
    
    return {
      user: { ...CURRENT_USER, id: 'new_user_123' },
      token: 'mock_jwt_token_new'
    };
  },

  // Profil güncelleme
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(500);
    
    // TODO: Backend API
    return { ...CURRENT_USER, ...updates };
  },

  // Coin bakiyesi güncelleme
  updateCoins: async (userId: string, amount: number, reason: string): Promise<{ newBalance: number; newRole: string }> => {
    await delay(300);
    
    const newBalance = CURRENT_USER.coins + amount;
    const newRole = calculateRoleFromCoins(newBalance);
    
    // TODO: Backend'e kaydet
    // await fetch(`/api/users/${userId}/coins`, { method: 'PATCH', body: JSON.stringify({ amount, reason }) });
    
    return {
      newBalance,
      newRole
    };
  }
};

// ============================================
// COIN & KÜLTÜR KART API
// ============================================

export const coinApi = {
  // Coin kazanma
  earnCoins: async (userId: string, action: keyof typeof COIN_REWARDS, multiplier: number = 1): Promise<{ amount: number; newBalance: number }> => {
    await delay(200);
    
    const baseAmount = COIN_REWARDS[action];
    const amount = calculateCoinReward(baseAmount, multiplier);
    const newBalance = CURRENT_USER.coins + amount;
    
    // TODO: Backend'e kaydet
    
    return { amount, newBalance };
  },

  // Coin'leri Genç Kültür Kart'a transfer
  transferToKulturKart: async (userId: string, coinAmount: number): Promise<{ success: boolean; kulturKartPoints: number }> => {
    await delay(1500);
    
    const CONVERSION_RATE = 0.01; // 1000 Coin = 10 Puan
    const kulturKartPoints = Math.floor(coinAmount * CONVERSION_RATE);
    
    // TODO: KBB Genç Kültür Kart API'sine istek
    // const response = await fetch('https://kbb-api/kultur-kart/transfer', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   body: JSON.stringify({ userId, coinAmount, kulturKartPoints })
    // });
    
    return {
      success: true,
      kulturKartPoints
    };
  },

  // Coin geçmişi
  getCoinHistory: async (userId: string, limit: number = 50): Promise<Array<{ action: string; amount: number; timestamp: string }>> => {
    await delay(400);
    
    // Mock veri
    return [
      { action: 'Yorum yazma', amount: 2, timestamp: '2 saat önce' },
      { action: 'Wiki düzenleme', amount: 10, timestamp: '5 saat önce' },
      { action: 'Beğeni alma', amount: 1, timestamp: '1 gün önce' },
    ];
  }
};

// ============================================
// WIKI (BİLGİ ALANI) API
// ============================================

export const wikiApi = {
  // Wiki içeriği getir
  getWikiContent: async (topicId: string): Promise<WikiContent> => {
    await delay(300);
    
    // TODO: Backend'den getir
    return WIKI_DATA;
  },

  // Wiki düzenle
  editWiki: async (topicId: string, content: string, userId: string): Promise<{ success: boolean; coinEarned: number }> => {
    await delay(600);
    
    const multiplier = CURRENT_USER.multiplier;
    const coinEarned = calculateCoinReward(COIN_REWARDS.editWiki, multiplier);
    
    // TODO: Backend'e kaydet + sürüm kontrolü
    
    return {
      success: true,
      coinEarned
    };
  },

  // Wiki geçmişi (version history)
  getWikiHistory: async (topicId: string): Promise<Array<{ version: number; editedBy: string; timestamp: string; changes: string }>> => {
    await delay(400);
    
    return [
      { version: 3, editedBy: 'ayse_hukuk', timestamp: '2 gün önce', changes: 'Roma Hukuku bölümü güncellendi' },
      { version: 2, editedBy: 'mehmet_42', timestamp: '1 hafta önce', changes: 'Medeni Hukuk eklendi' },
    ];
  },

  // Wiki'ye oy ver (yararlı/yararsız)
  voteWiki: async (topicId: string, userId: string, voteType: 'up' | 'down'): Promise<{ success: boolean; coinChange: number }> => {
    await delay(300);
    
    const coinChange = voteType === 'up' ? COIN_REWARDS.getUpvoteOnWiki : COIN_REWARDS.getDownvoteOnWiki;
    
    return {
      success: true,
      coinChange
    };
  }
};

// ============================================
// YORUM (SÖZLÜK) API
// ============================================

export const commentApi = {
  // Yorumları getir
  getComments: async (topicId: string, sortBy: 'recent' | 'popular' = 'recent'): Promise<Comment[]> => {
    await delay(400);
    
    return MOCK_COMMENTS;
  },

  // Yorum yaz
  createComment: async (topicId: string, userId: string, content: string): Promise<{ comment: Comment; coinEarned: number }> => {
    await delay(500);
    
    const multiplier = CURRENT_USER.multiplier;
    const coinEarned = calculateCoinReward(COIN_REWARDS.writeComment, multiplier);
    
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      userId,
      user: CURRENT_USER,
      content,
      timestamp: 'Az önce',
      likes: 0,
      dislikes: 0,
      userVote: null
    };
    
    return {
      comment: newComment,
      coinEarned
    };
  },

  // Yoruma oy ver
  voteComment: async (commentId: string, userId: string, voteType: 'up' | 'down'): Promise<{ success: boolean }> => {
    await delay(200);
    
    // Yorum sahibine coin kazandır
    if (voteType === 'up') {
      // Comment owner gets +1 coin
    }
    
    return { success: true };
  }
};

// ============================================
// TOPIC (BAŞLIK) API
// ============================================

export const topicApi = {
  // Tüm başlıkları getir (ana sayfa için)
  getTopics: async (category?: string, sortBy: 'trending' | 'recent' | 'popular' = 'trending'): Promise<any[]> => {
    await delay(500);
    
    // TODO: Backend'den getir
    return [];
  },

  // Yeni başlık oluştur
  createTopic: async (userId: string, title: string, category: string, initialContent: string): Promise<{ topic: any; coinEarned: number }> => {
    await delay(800);
    
    const multiplier = CURRENT_USER.multiplier;
    const coinEarned = calculateCoinReward(COIN_REWARDS.createTopic, multiplier);
    
    // TODO: Backend'e kaydet
    
    return {
      topic: { id: 'new_topic_123', title, category },
      coinEarned
    };
  },

  // Başlık ara
  searchTopics: async (query: string): Promise<any[]> => {
    await delay(300);
    
    // TODO: Elasticsearch/Algolia
    return [];
  }
};

// ============================================
// MODERASYON API (Rol 4 ve 5 için)
// ============================================

export const moderationApi = {
  // Bayraklanan içerikleri getir
  getFlaggedContent: async (): Promise<any[]> => {
    await delay(400);
    
    return [];
  },

  // İçeriği onayla/reddet
  moderateContent: async (contentId: string, action: 'approve' | 'reject', reason?: string): Promise<{ success: boolean }> => {
    await delay(500);
    
    return { success: true };
  },

  // Spam yorumu sil
  deleteSpam: async (commentId: string): Promise<{ success: boolean }> => {
    await delay(300);
    
    return { success: true };
  }
};

// ============================================
// NOTIFICATION API
// ============================================

export const notificationApi = {
  // Tüm bildirimleri getir
  getAll: async (): Promise<Notification[]> => {
    await delay(300);
    
    // TODO: Gerçek backend'e istek
    // const response = await fetch('/api/notifications');
    
    return [...MOCK_NOTIFICATIONS];
  },

  // Okunmamış bildirimleri getir
  getUnread: async (): Promise<Notification[]> => {
    await delay(300);
    const all = await notificationApi.getAll();
    return all.filter(n => !n.read);
  },

  // Bildirim oluştur
  create: async (
    type: NotificationType,
    title: string,
    message: string,
    metadata?: Notification['metadata'],
    link?: string
  ): Promise<Notification> => {
    await delay(200);
    
    const newNotification: Notification = {
      id: `n${Date.now()}`,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      link,
      metadata
    };
    
    // TODO: Gerçek backend'e istek
    // const response = await fetch('/api/notifications', { method: 'POST', body: JSON.stringify(newNotification) });
    
    return newNotification;
  },

  // Bildirimi okundu işaretle
  markAsRead: async (notificationId: string): Promise<void> => {
    await delay(200);
    
    // TODO: Gerçek backend'e istek
    // await fetch(`/api/notifications/${notificationId}/read`, { method: 'PATCH' });
  },

  // Tüm bildirimleri okundu işaretle
  markAllAsRead: async (): Promise<void> => {
    await delay(300);
    
    // TODO: Gerçek backend'e istek
    // await fetch('/api/notifications/mark-all-read', { method: 'PATCH' });
  },

  // Bildirimi sil
  delete: async (notificationId: string): Promise<void> => {
    await delay(200);
    
    // TODO: Gerçek backend'e istek
    // await fetch(`/api/notifications/${notificationId}`, { method: 'DELETE' });
  },
};

// ============================================
// EXPORT ALL
// ============================================

export const api = {
  user: userApi,
  coin: coinApi,
  wiki: wikiApi,
  comment: commentApi,
  topic: topicApi,
  moderation: moderationApi,
  notification: notificationApi
};

export default api;

