import React from 'react';
import { Edit3, MessageSquare, Award, TrendingUp, CheckCircle, Gift } from 'lucide-react';

const ProfileContent: React.FC = () => {
    const stats = [
        { label: "Toplam Katkı", value: "142", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Kabul Edilen Edit", value: "89", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
        { label: "Sıradaki Ödül", value: "Müze Kart", icon: Gift, color: "text-purple-500", bg: "bg-purple-50" },
    ];

    const badges = [
        { name: "İlk Wiki Editi", icon: "📝", unlocked: true },
        { name: "Popüler Yorumcu", icon: "💬", unlocked: true },
        { name: "Tarih Uzmanı", icon: "🏛️", unlocked: true },
        { name: "Fotoğrafçı", icon: "📸", unlocked: false },
        { name: "Etkinlik Gurusu", icon: "🎫", unlocked: false },
        { name: "Topluluk Lideri", icon: "👑", unlocked: false },
    ];

    const history = [
        { id: 1, type: 'edit', title: 'Selçuk Hukuk Notları', time: '2 saat önce', gain: 10 },
        { id: 2, type: 'comment', title: 'Mevlana Müzesi Tartışması', time: '5 saat önce', gain: 5 },
        { id: 3, type: 'edit', title: 'Alaaddin Tepesi Tarihçesi', time: '1 gün önce', gain: 15 },
        { id: 4, type: 'badge', title: 'Rozet Kazanıldı: Tarih Uzmanı', time: '2 gün önce', gain: 50 },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-normal uppercase">{stat.label}</p>
                            <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Badges Grid */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="text-seljuk-gold" />
                    Rozetlerim
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {badges.map((badge, index) => (
                        <div key={index} className={`aspect-square flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${badge.unlocked ? 'bg-white border-seljuk-gold/30 hover:border-seljuk-gold shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'}`}>
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <span className="text-[10px] text-center font-semibold text-gray-600 leading-tight">{badge.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contribution History */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Son Aktiviteler</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {history.map((item, index) => (
                        <div key={item.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== history.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${item.type === 'edit' ? 'bg-blue-100 text-blue-600' : item.type === 'comment' ? 'bg-orange-100 text-orange-600' : 'bg-seljuk-gold/20 text-seljuk-gold'}`}>
                                    {item.type === 'edit' ? <Edit3 size={18} /> : item.type === 'comment' ? <MessageSquare size={18} /> : <Award size={18} />}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                                    <p className="text-xs text-gray-400">{item.time}</p>
                                </div>
                            </div>
                            <div className="font-semibold text-green-500 text-sm">
                                +{item.gain} GençCoin
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
