import React from 'react';
import { Send, ArrowBigUp, ArrowBigDown, MessageCircle, MoreHorizontal } from 'lucide-react';
import { MOCK_COMMENTS, COLORS, CURRENT_USER } from '../constants';

const CommentSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Divider */}
      <div className="flex items-center gap-4 py-6 mb-2">
         <div className="h-px bg-gray-200 flex-1"></div>
         <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest px-2">Öğrenci Yorumları</h2>
         <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 flex gap-4 items-start focus-within:ring-2 focus-within:ring-[#00BFA5] focus-within:ring-offset-2 transition-all">
         <img 
           src={CURRENT_USER.avatarUrl} 
           alt="My Avatar" 
           className="w-10 h-10 rounded-full object-cover border border-gray-100" 
         />
         <div className="flex-1">
            <textarea 
               placeholder="Deneyimini veya notunu paylaş..." 
               className="w-full text-gray-700 placeholder-gray-400 bg-transparent border-none focus:ring-0 resize-none min-h-[60px] p-0 text-base"
            ></textarea>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
               <span className="text-xs text-gray-400">Markown desteklenir</span>
               <button 
                 className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                 style={{ backgroundColor: COLORS.turquoise }}
               >
                 <Send size={16} />
                 Paylaş
               </button>
            </div>
         </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="bg-white rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors group">
             <div className="flex gap-4">
               {/* Vote Column */}
               <div className="flex flex-col items-center gap-1 min-w-[30px]">
                  <button className={`p-1 rounded hover:bg-gray-100 transition-colors ${comment.userVote === 'up' ? 'text-orange-500' : 'text-gray-400'}`}>
                     <ArrowBigUp size={28} fill={comment.userVote === 'up' ? 'currentColor' : 'none'} />
                  </button>
                  <span className={`font-bold text-sm ${comment.userVote ? 'text-gray-800' : 'text-gray-500'}`}>
                    {comment.likes - comment.dislikes}
                  </span>
                  <button className={`p-1 rounded hover:bg-gray-100 transition-colors ${comment.userVote === 'down' ? 'text-blue-500' : 'text-gray-400'}`}>
                     <ArrowBigDown size={28} fill={comment.userVote === 'down' ? 'currentColor' : 'none'} />
                  </button>
               </div>

               {/* Content Column */}
               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <img src={comment.user.avatarUrl} alt={comment.user.username} className="w-6 h-6 rounded-full" />
                        <span className="text-sm font-bold text-gray-900 hover:text-[#00BFA5] cursor-pointer transition-colors">@{comment.user.username}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                     </div>
                     <button className="text-gray-300 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={18} />
                     </button>
                  </div>
                  
                  <div className="text-gray-800 text-base leading-relaxed mb-3">
                    {comment.content}
                  </div>

                  <div className="flex items-center gap-4">
                     <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                        <MessageCircle size={16} />
                        Yanıtla
                     </button>
                  </div>
               </div>
             </div>
          </div>
        ))}
      </div>
      
      {/* Load More */}
      <div className="mt-8 text-center">
         <button className="text-sm font-semibold text-gray-400 hover:text-[#00BFA5] transition-colors pb-1 border-b border-transparent hover:border-[#00BFA5]">
            Daha fazla yorum yükle
         </button>
      </div>
    </div>
  );
};

export default CommentSection;
