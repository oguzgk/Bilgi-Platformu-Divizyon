import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Users, Smile, X, Upload } from 'lucide-react';
import { CURRENT_USER } from '../constants';

const ShareBox: React.FC = () => {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<{ emoji: string; label: string } | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const feelings = [
    { emoji: '😊', label: 'Mutlu' },
    { emoji: '😎', label: 'Havalı' },
    { emoji: '🤔', label: 'Düşünceli' },
    { emoji: '🎉', label: 'Kutluyor' },
    { emoji: '❤️', label: 'Aşık' },
    { emoji: '😴', label: 'Yorgun' },
    { emoji: '🤩', label: 'Heyecanlı' },
    { emoji: '🙏', label: 'Minnettar' },
  ];

  const mockFriends = [
    { id: '1', username: 'ahmetyilmaz', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '2', username: 'aysedemir', avatar: 'https://i.pravatar.cc/150?img=45' },
    { id: '3', username: 'mehmetkara', avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: '4', username: 'fatmaarslan', avatar: 'https://i.pravatar.cc/150?img=23' },
  ];

  return (
    <>
      <div className="mb-6 md:mb-8 rounded-2xl bg-white shadow-sm border border-slate-200/70">
        {/* Üst kısım: avatar + başlık butonu */}
        <div className="px-4 md:px-5 pt-4 pb-3 flex items-center gap-3">
          <img 
            src={CURRENT_USER.avatarUrl} 
            alt="Avatar" 
            className="h-10 w-10 rounded-full border-2 border-gray-200"
          />
          <button
            onClick={() => {
              navigate('/create', { 
                state: { 
                  feeling: selectedFeeling,
                  taggedFriends: selectedFriends 
                } 
              });
            }}
            className="flex-1 text-left text-sm md:text-base font-semibold text-slate-700 hover:text-sky-600 transition-colors"
          >
            {selectedFeeling ? (
              <span className="flex items-center gap-2">
                <span>{selectedFeeling.emoji}</span>
                <span>Kendini {selectedFeeling.label} hissediyor...</span>
              </span>
            ) : (
              'Bugün Aklında Ne Var!'
            )}
          </button>
        </div>

        {/* Alt kısım: aksiyon butonları */}
        <div className="px-4 md:px-5 pt-2 pb-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm">
          <button 
            onClick={() => setShowImageModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ImageIcon size={16} className="text-emerald-500" />
            <span className="hidden sm:inline">Fotoğraf / Video</span>
            <span className="sm:hidden">Medya</span>
          </button>
          <button 
            onClick={() => setShowTagModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-sky-50 text-slate-600 hover:text-sky-700 transition-colors"
          >
            <Users size={16} className="text-sky-500" />
            <span className="hidden sm:inline">Arkadaşını Etiketle</span>
            <span className="sm:hidden">Etiketle</span>
          </button>
          <button 
            onClick={() => setShowFeelingModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors"
          >
            <Smile size={16} className="text-amber-500" />
            <span className="hidden sm:inline">Duygu / Aktivite</span>
            <span className="sm:hidden">Duygu</span>
          </button>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowImageModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Fotoğraf / Video Ekle</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
              <Upload size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600 mb-2">Dosya seçmek için tıklayın</p>
              <p className="text-sm text-gray-400">veya sürükleyip bırakın</p>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Bu özellik yakında aktif olacak! 🚀
            </p>
          </div>
        </div>
      )}

      {/* Tag Friends Modal */}
      {showTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTagModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowTagModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Arkadaşlarını Etiketle</h3>
            <input
              type="text"
              placeholder="Arkadaş ara..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {mockFriends.map(friend => {
                const isSelected = selectedFriends.includes(friend.id);
                return (
                  <button
                    key={friend.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedFriends(prev => prev.filter(id => id !== friend.id));
                      } else {
                        setSelectedFriends(prev => [...prev, friend.id]);
                      }
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isSelected ? 'bg-sky-100 border-2 border-sky-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full" />
                    <span className={`font-medium ${isSelected ? 'text-sky-700' : 'text-gray-800'}`}>
                      @{friend.username}
                    </span>
                    {isSelected && <span className="ml-auto text-sky-600">✓</span>}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowTagModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowTagModal(false);
                  navigate('/create', { 
                    state: { 
                      feeling: selectedFeeling,
                      taggedFriends: selectedFriends 
                    } 
                  });
                }}
                disabled={selectedFriends.length === 0}
                className="flex-1 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Etiketle ({selectedFriends.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feeling Modal */}
      {showFeelingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFeelingModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideDown">
            <button
              onClick={() => setShowFeelingModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">Nasıl Hissediyorsun?</h3>
            <div className="grid grid-cols-2 gap-3">
              {feelings.map((feeling) => (
                <button
                  key={feeling.label}
                  onClick={() => {
                    setSelectedFeeling(feeling);
                    setShowFeelingModal(false);
                    navigate('/create', { 
                      state: { 
                        feeling: feeling,
                        taggedFriends: selectedFriends 
                      } 
                    });
                  }}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all"
                >
                  <span className="text-3xl">{feeling.emoji}</span>
                  <span className="font-medium text-gray-800">{feeling.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareBox;


