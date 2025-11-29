import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, MessageSquare, ThumbsUp, Clock, User } from 'lucide-react';
import WikiSection from './WikiSection';
import CommentSection from './CommentSection';
import ShareBox from './ShareBox';

function TopicDetailPage() {
  const { topicId } = useParams<{ topicId: string }>();

  // Mock data - Gerçek uygulamada API'den gelecek
  const topicData: Record<string, {
    title: string;
    category: string;
    author: string;
    date: string;
    views: number;
    comments: number;
    likes: number;
  }> = {
    't1': {
      title: 'selçuk üniversitesi yurt tavsiyeleri',
      category: 'Kampüs Yaşamı',
      author: 'mehmet_42',
      date: '3 gün önce',
      views: 234,
      comments: 18,
      likes: 45
    },
    't2': {
      title: 'hukuk fakültesi staj başvurusu',
      category: 'Hukuk Fakültesi',
      author: 'mehmet_42',
      date: '1 hafta önce',
      views: 567,
      comments: 42,
      likes: 89
    }
  };

  const topic = topicData[topicId || 't1'] || topicData['t1'];

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#00BFA5] transition-colors font-medium mb-3"
          >
            <ArrowLeft size={20} />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#00BFA5] text-white text-xs font-bold rounded-lg">
                  {topic.category}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={14} />
                  {topic.date}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span className="font-medium text-[#00BFA5]">{topic.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{topic.views} görüntülenme</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span>{topic.comments} yorum</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  <span>{topic.likes} beğeni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* ShareBox sadece başlık sahibine göster */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Bu Başlık Hakkında</h3>
            <p className="text-gray-700 mb-4">
              Bu başlığı sen açtın. Aşağıda wiki (objektif bilgi) ve yorumlar (subjektif görüşler) bölümlerini görebilirsin.
            </p>
            <div className="bg-[#F0F4F8] p-4 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong className="text-[#00BFA5]">💡 İpucu:</strong> Wiki bölümünde objektif bilgileri düzenleyebilir, 
                yorumlar bölümünde ise kişisel deneyimlerini paylaşabilirsin.
              </p>
            </div>
          </div>

          {/* Wiki Section */}
          <WikiSection />

          {/* Comment Section */}
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default TopicDetailPage;

