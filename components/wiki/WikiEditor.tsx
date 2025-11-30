import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { X, Eye, Save, AlertCircle, History, FileText } from 'lucide-react';
import { useCoinNotification } from '../CoinNotification';
import { useNotifications } from '../../contexts/NotificationContext';
import { COIN_REWARDS, CURRENT_USER } from '../../constants';
import { api } from '../../services/apiService';

interface WikiEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
  topicId: string;
  topicTitle: string;
}

function WikiEditor({ isOpen, onClose, initialContent, topicId, topicTitle }: WikiEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [changeDescription, setChangeDescription] = useState('');
  
  const { showNotification } = useCoinNotification();
  const { addNotification } = useNotifications();

  const hasChanges = content !== initialContent;
  const wordCount = content.trim().split(/\s+/).length;
  const charCount = content.length;

  const handleSave = async () => {
    if (!hasChanges) {
      addNotification('wiki_edit', 'Değişiklik Yok', 'İçerikte herhangi bir değişiklik yapmadınız.');
      return;
    }

    if (!changeDescription.trim()) {
      addNotification('wiki_edit', 'Açıklama Gerekli', 'Lütfen yaptığınız değişikliği kısaca açıklayın.');
      return;
    }

    if (content.trim().length < 50) {
      addNotification('wiki_edit', 'İçerik Çok Kısa', 'Wiki içeriği en az 50 karakter olmalıdır.');
      return;
    }

    setIsSaving(true);
    
    try {
      // API'ye kaydet
      const result = await api.wiki.editWiki(topicId, content, CURRENT_USER.id);
      
      // Coin kazandır
      showNotification(
        result.coinEarned,
        'Wiki düzenleme için coin kazandın!',
        CURRENT_USER.multiplier
      );

      // Bildirim göster
      addNotification(
        'wiki_edit',
        'Wiki Güncellendi! 🎉',
        `"${topicTitle}" başlığının wiki içeriğini başarıyla güncelledin. ${result.coinEarned} coin kazandın!`,
        { topicId, coinEarned: result.coinEarned }
      );

      // Modal'ı kapat
      setTimeout(() => {
        onClose();
        window.location.reload(); // Sayfayı yenile
      }, 1500);

    } catch (error) {
      addNotification('wiki_edit', 'Hata!', 'Wiki kaydedilirken bir hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col animate-slideDown">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="text-[#00BFA5]" size={28} />
              Wiki Düzenle
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {topicTitle} • {COIN_REWARDS.editWiki} coin × {CURRENT_USER.multiplier}x = {COIN_REWARDS.editWiki * CURRENT_USER.multiplier} coin
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSaving}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-normal">{wordCount} kelime</span>
            <span className="text-gray-400">•</span>
            <span className="font-normal">{charCount} karakter</span>
            {hasChanges && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <AlertCircle size={14} />
                  Kaydedilmemiş değişiklikler
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-normal"
          >
            <Eye size={18} />
            {showPreview ? 'Düzenleme' : 'Önizleme'}
          </button>
        </div>

        {/* Editor / Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {showPreview ? (
            <div className="prose max-w-none">
              <MDEditor.Markdown source={content} />
            </div>
          ) : (
            <MDEditor
              value={content}
              onChange={(val) => setContent(val || '')}
              height={400}
              preview="edit"
              hideToolbar={false}
            />
          )}
        </div>

        {/* Change Description */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Değişiklik Açıklaması <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={changeDescription}
            onChange={(e) => setChangeDescription(e.target.value)}
            placeholder="Örn: Yeni bilgiler eklendi, hatalar düzeltildi..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA5] focus:border-[#00BFA5] transition-all"
            disabled={isSaving}
          />
          <p className="text-xs text-gray-500 mt-1">
            Bu açıklama wiki geçmişinde görünecektir.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-normal hover:bg-gray-50 transition-colors"
              disabled={isSaving}
            >
              İptal
            </button>
            <button
              className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-600 font-normal hover:bg-gray-200 transition-colors flex items-center gap-2"
              disabled={isSaving}
            >
              <History size={18} />
              Geçmişi Gör
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving || !changeDescription.trim()}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              !hasChanges || isSaving || !changeDescription.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#00BFA5] text-white hover:bg-[#009688] shadow-lg hover:shadow-xl'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save size={18} />
                Kaydet ve {COIN_REWARDS.editWiki * CURRENT_USER.multiplier} Coin Kazan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WikiEditor;

