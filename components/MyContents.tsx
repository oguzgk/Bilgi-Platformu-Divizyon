import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, MessageSquare, FileText, Trash2, Eye, ThumbsUp, ThumbsDown, Clock, TrendingUp, Check } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { useCoinNotification } from './CoinNotification';
import { useNotifications } from '../contexts/NotificationContext';

type ContentType = 'all' | 'wikis' | 'comments' | 'topics';

interface WikiEdit {
  id: string;
  title: string;
  category: string;
  editDate: string;
  status: 'approved' | 'pending' | 'rejected';
  upvotes: number;
  downvotes: number;
  coinsEarned: number;
  userVote?: 'up' | 'down' | null;
}

interface MyComment {
  id: string;
  topicTitle: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
}

interface MyTopic {
  id: string;
  title: string;
  category: string;
  date: string;
  views: number;
  comments: number;
}

function MyContents() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ContentType>('all');
  const { showNotification } = useCoinNotification();
  const { addNotification } = useNotifications();

  // State'ler - Gerçek uygulamada API'den gelecek
  const [myWikiEdits, setMyWikiEdits] = useState<WikiEdit[]>([
    {
      id: 'w1',
      title: 'Selçuk Hukuk Fakültesi',
      category: 'Hukuk Fakültesi',
      editDate: '2 saat önce',
      status: 'approved',
      upvotes: 12,
      downvotes: 1,
      coinsEarned: 10,
      userVote: null,
    },
    {
      id: 'w2',
      title: 'Alaaddin Tepesi Tarihi',
      category: 'Kampüs Yaşamı',
      editDate: '1 gün önce',
      status: 'approved',
      upvotes: 25,
      downvotes: 0,
      coinsEarned: 15,
      userVote: null,
    },
    {
      id: 'w3',
      title: 'Yemekhane Menüsü Güncelleme',
      category: 'Kampüs Yaşamı',
      editDate: '3 gün önce',
      status: 'pending',
      upvotes: 5,
      downvotes: 2,
      coinsEarned: 0,
      userVote: null,
    },
  ]);

  const [myComments, setMyComments] = useState<MyComment[]>([
    {
      id: 'c1',
      topicTitle: 'en iyi ders çalışma yerleri',
      content: 'Kütüphane 3. kat sessiz çalışma bölümü gerçekten harika. Sabah 8\'de gidip yer kapmak lazım ama...',
      date: '5 saat önce',
      likes: 8,
      replies: 3,
    },
    {
      id: 'c2',
      topicTitle: 'hukuk fakültesi vize hazırlık',
      content: 'Roma Hukuku için Prof. Yılmaz\'ın ders notlarını mutlaka çalışın. Son 5 yılın sorularını çözün yeter.',
      date: '1 gün önce',
      likes: 23,
      replies: 7,
    },
    {
      id: 'c3',
      topicTitle: 'kampüste yemek tavsiyeleri',
      content: 'Dönerci Şükrü\'nün tavuk döneri efsane ama her zaman kalabalık oluyor. Öğle 12\'den sonra gitmeyin.',
      date: '2 gün önce',
      likes: 15,
      replies: 5,
    },
  ]);

  const [myTopics, setMyTopics] = useState<MyTopic[]>([
    {
      id: 't1',
      title: 'selçuk üniversitesi yurt tavsiyeleri',
      category: 'Kampüs Yaşamı',
      date: '3 gün önce',
      views: 234,
      comments: 18,
    },
    {
      id: 't2',
      title: 'hukuk fakültesi staj başvurusu',
      category: 'Hukuk Fakültesi',
      date: '1 hafta önce',
      views: 567,
      comments: 42,
    },
  ]);

  // Edit States
  const [editingWikiId, setEditingWikiId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState<string>('');

  const handleEditWiki = (wikiId: string) => {
    // Gerçek uygulamada bu sayfayı edit moduna alır veya modal açar
    setEditingWikiId(wikiId);
    addNotification(
      'wiki_update',
      'Wiki Düzenleme Modu',
      'Wiki düzenleme modu aktif. (Yakında eklenecek)',
      { wikiId }
    );
    // Şimdilik sadece bildirimi göster
    setTimeout(() => setEditingWikiId(null), 2000);
  };

  const handleDeleteWiki = (wikiId: string, title: string) => {
    if (window.confirm(`"${title}" wiki düzenlemenizi silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz!`)) {
      // State'den sil
      setMyWikiEdits(prev => prev.filter(wiki => wiki.id !== wikiId));
      
      addNotification(
        'coin_earned',
        'Wiki Düzenlemesi Silindi',
        `"${title}" wiki düzenlemeniz başarıyla silindi.`,
        { wikiId }
      );
    }
  };

  const handleEditComment = (commentId: string) => {
    const comment = myComments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditCommentText(comment.content);
    }
  };

  const handleSaveComment = (commentId: string) => {
    // State'i güncelle
    setMyComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editCommentText }
          : comment
      )
    );

    addNotification(
      'comment_reply',
      'Yorum Güncellendi',
      'Yorumunuz başarıyla güncellendi!',
      { commentId }
    );

    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleDeleteComment = (commentId: string, topicTitle: string) => {
    if (window.confirm(`"${topicTitle}" başlığındaki yorumunuzu silmek istediğinizden emin misiniz?\n\nBu işlem geri alınamaz!`)) {
      // State'den sil
      setMyComments(prev => prev.filter(comment => comment.id !== commentId));
      
      addNotification(
        'coin_earned',
        'Yorum Silindi',
        'Yorumunuz başarıyla silindi.',
        { commentId }
      );
    }
  };

  const handleViewTopic = (topicId: string, topicTitle: string) => {
    // Başlık detay sayfasına git
    addNotification(
      'wiki_update',
      'Başlık Görüntüleniyor',
      `"${topicTitle}" başlığına yönlendiriliyorsunuz...`,
      { topicId }
    );
    
    // Başlık detay sayfasına yönlendir
    navigate(`/topic/${topicId}`);
  };

  const handleVoteWiki = (wikiId: string, voteType: 'up' | 'down') => {
    setMyWikiEdits(prev => prev.map(wiki => {
      if (wiki.id !== wikiId) return wiki;
      
      let newUpvotes = wiki.upvotes;
      let newDownvotes = wiki.downvotes;
      
      if (wiki.userVote === voteType) {
        // Oy geri çekildi
        if (voteType === 'up') {
          newUpvotes = Math.max(0, newUpvotes - 1);
        } else {
          newDownvotes = Math.max(0, newDownvotes - 1);
        }
        
        addNotification(
          'like',
          'Oy Geri Çekildi',
          `"${wiki.title}" için ${voteType === 'up' ? 'beğeni' : 'beğenmeme'} oyunuz geri çekildi.`,
          { contentTitle: wiki.title }
        );
        
        return {
          ...wiki,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: null,
        };
      } else {
        // Yeni oy veya değiştirme
        if (wiki.userVote === 'up') {
          newUpvotes = Math.max(0, newUpvotes - 1);
        }
        if (wiki.userVote === 'down') {
          newDownvotes = Math.max(0, newDownvotes - 1);
        }
        
        if (voteType === 'up') {
          newUpvotes++;
        } else {
          newDownvotes++;
        }
        
        // Bildirim gönder
        if (voteType === 'up') {
          addNotification(
            'like',
            'Beğeni Eklendi',
            `"${wiki.title}" içeriğine beğeni eklediniz. (${newUpvotes} beğeni)`,
            { contentTitle: wiki.title }
          );
        } else {
          addNotification(
            'like',
            'Beğenmeme Eklendi',
            `"${wiki.title}" içeriğine beğenmeme eklediniz. (${newDownvotes} beğenmeme)`,
            { contentTitle: wiki.title }
          );
        }
        
        return {
          ...wiki,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: voteType,
        };
      }
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">✓ Onaylandı</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg">⏳ Beklemede</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-lg">✗ Reddedildi</span>;
      default:
        return null;
    }
  };

  const stats = {
    totalWikis: myWikiEdits.length,
    totalComments: myComments.length,
    totalTopics: myTopics.length,
    totalCoins: myWikiEdits.reduce((sum, wiki) => sum + wiki.coinsEarned, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalWikis}</p>
              <p className="text-xs text-gray-500">Wiki Düzenleme</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
              <p className="text-xs text-gray-500">Yorum</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTopics}</p>
              <p className="text-xs text-gray-500">Başlık</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🪙</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCoins}</p>
              <p className="text-xs text-gray-500">Kazanılan Coin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        {[
          { id: 'all', label: 'Tümü', icon: FileText },
          { id: 'wikis', label: 'Wiki Düzenlemelerim', icon: Edit3 },
          { id: 'comments', label: 'Yorumlarım', icon: MessageSquare },
          { id: 'topics', label: 'Başlıklarım', icon: TrendingUp },
        ].map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as ContentType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-[#00BFA5] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Wiki Edits */}
      {(activeFilter === 'all' || activeFilter === 'wikis') && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Edit3 size={20} className="text-[#00BFA5]" />
            Wiki Düzenlemelerim
          </h2>
          <div className="space-y-3">
            {myWikiEdits.map((wiki) => (
              <div key={wiki.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{wiki.title}</h3>
                      {getStatusBadge(wiki.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="text-[#00BFA5] font-medium">{wiki.category}</span> • {wiki.editDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditWiki(wiki.id)}
                      className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                      title="Düzenle"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteWiki(wiki.id, wiki.title)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <button
                    onClick={() => handleVoteWiki(wiki.id, 'up')}
                    className={`flex items-center gap-1 transition-all ${
                      wiki.userVote === 'up'
                        ? 'text-green-600 font-bold'
                        : 'text-green-600 hover:text-green-700 hover:scale-105'
                    }`}
                    title="Beğen"
                  >
                    <ThumbsUp 
                      size={16} 
                      fill={wiki.userVote === 'up' ? 'currentColor' : 'none'}
                      className="transition-transform hover:scale-110"
                    />
                    <span className="font-semibold">{wiki.upvotes}</span>
                  </button>
                  <button
                    onClick={() => handleVoteWiki(wiki.id, 'down')}
                    className={`flex items-center gap-1 transition-all ${
                      wiki.userVote === 'down'
                        ? 'text-red-600 font-bold'
                        : 'text-red-600 hover:text-red-700 hover:scale-105'
                    }`}
                    title="Beğenme"
                  >
                    <ThumbsDown 
                      size={16} 
                      fill={wiki.userVote === 'down' ? 'currentColor' : 'none'}
                      className="transition-transform hover:scale-110"
                    />
                    <span className="font-semibold">{wiki.downvotes}</span>
                  </button>
                  {wiki.coinsEarned > 0 && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <span className="text-lg">🪙</span>
                      <span className="font-semibold">+{wiki.coinsEarned} Coin</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Comments */}
      {(activeFilter === 'all' || activeFilter === 'comments') && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-[#00BFA5]" />
            Yorumlarım
          </h2>
          <div className="space-y-3">
            {myComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{comment.topicTitle}</h3>
                    
                    {editingCommentId === comment.id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all resize-none"
                          placeholder="Yorumunuzu düzenleyin..."
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveComment(comment.id)}
                            className="px-4 py-2 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check size={16} />
                            Kaydet
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <>
                        <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {comment.date}
                        </p>
                      </>
                    )}
                  </div>
                  
                  {editingCommentId !== comment.id && (
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id, comment.topicTitle)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {editingCommentId !== comment.id && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span className="font-semibold">{comment.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span className="font-semibold">{comment.replies} Cevap</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Topics */}
      {(activeFilter === 'all' || activeFilter === 'topics') && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#00BFA5]" />
            Açtığım Başlıklar
          </h2>
          <div className="space-y-3">
            {myTopics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="text-[#00BFA5] font-medium">{topic.category}</span> • {topic.date}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span className="font-semibold">{topic.views} Görüntülenme</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={16} />
                        <span className="font-semibold">{topic.comments} Yorum</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewTopic(topic.id, topic.title)}
                    className="px-4 py-2 bg-[#00BFA5] hover:bg-[#009688] text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Eye size={18} />
                    Görüntüle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {activeFilter === 'wikis' && myWikiEdits.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Edit3 size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Henüz Wiki Düzenlemeniz Yok</h3>
          <p className="text-gray-500 mb-6">Wiki sayfalarını düzenleyerek coin kazanın ve rolünüzü yükseltin!</p>
          <button className="px-6 py-3 bg-[#00BFA5] hover:bg-[#009688] text-white font-bold rounded-xl transition-colors">
            Wiki Düzenlemeye Başla
          </button>
        </div>
      )}
    </div>
  );
}

export default MyContents;

