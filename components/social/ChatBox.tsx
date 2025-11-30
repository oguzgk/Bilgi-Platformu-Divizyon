import React, { useState, useRef, useEffect } from 'react';
import { X, Minimize2, Maximize2, Send, Smile, Paperclip, MoreHorizontal } from 'lucide-react';

interface Message {
  id: string;
  sender: 'me' | 'other';
  content: string;
  timestamp: string;
}

interface ChatBoxProps {
  friend: {
    username: string;
    displayName: string;
    avatarUrl: string;
    isOnline: boolean;
  };
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ friend, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'other',
      content: 'Merhaba! Nasılsın?',
      timestamp: '14:23'
    },
    {
      id: '2',
      sender: 'me',
      content: 'İyiyim sen nasılsın? Roma hukuku sınavına hazırlanıyor musun?',
      timestamp: '14:25'
    },
    {
      id: '3',
      sender: 'other',
      content: 'Evet, çalışıyorum. Pratik Çalışmalar kitabı çok iyi notlarını aldım mı?',
      timestamp: '14:27'
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mesajlar eklendiğinde en alta scroll et
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'me',
        content: message,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      className={`fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[32rem]'
      }`}
      style={{ maxWidth: 'calc(100vw - 2rem)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00BFA5] to-teal-600 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img 
              src={friend.avatarUrl} 
              alt={friend.displayName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            {friend.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{friend.displayName}</h3>
            <p className="text-xs text-white/80">
              {friend.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title={isMinimized ? 'Genişlet' : 'Küçült'}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Kapat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Chat Content - Only show when not minimized */}
      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'me'
                      ? 'bg-[#00BFA5] text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white rounded-b-2xl">
            <div className="flex items-end gap-2">
              <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-3 py-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesaj yaz..."
                  rows={1}
                  className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-800 placeholder-gray-400 max-h-24"
                  style={{ minHeight: '24px' }}
                />
                <div className="flex items-center gap-1 ml-2">
                  <button
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Emoji"
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Dosya Ekle"
                  >
                    <Paperclip size={18} />
                  </button>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`p-3 rounded-xl transition-all ${
                  message.trim()
                    ? 'bg-[#00BFA5] text-white hover:bg-[#009688] shadow-md hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title="Gönder"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;

