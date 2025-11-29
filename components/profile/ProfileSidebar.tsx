import React, { useState } from 'react';
import { User, Shield, Coins, ArrowRight, X, CheckCircle, Info } from 'lucide-react';
import { CURRENT_USER } from '../../constants';
import RoleBadge from '../RoleBadge';
import { getRoleInfo } from '../../utils/roleHelpers';

const ProfileSidebar: React.FC = () => {
    // Kullanıcının coin bakiyesini state olarak yönetiyoruz
    const [userCoins, setUserCoins] = useState(CURRENT_USER.coins);
    const [transferAmount, setTransferAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    
    // Dönüşüm oranı: 1000 GençCoin = 10 Genç Kültür Kart Puanı (PDF'den)
    const CONVERSION_RATE = 0.01; // 1 GençCoin = 0.01 Kart Puanı
    const kulturKartPoints = Math.floor(transferAmount * CONVERSION_RATE);
    
    const handleTransfer = () => {
        if (transferAmount < 100) {
            alert('Minimum transfer miktarı 100 Coin\'dir.');
            return;
        }
        setShowModal(true);
    };
    
    const confirmTransfer = () => {
        // Coin bakiyesini güncelle (bakiyeden transfer miktarını düş)
        setUserCoins(prevCoins => prevCoins - transferAmount);
        
        // TODO: Backend API çağrısı
        alert(`${transferAmount} GençCoin başarıyla ${kulturKartPoints} Genç Kültür Kart Puanına dönüştürüldü!`);
        setShowModal(false);
        setTransferAmount(0);
    };

    return (
        <>
        <div className="space-y-6 w-full h-full">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-seljuk-ice relative">
                    <img
                        src={CURRENT_USER.avatarUrl}
                        alt={CURRENT_USER.username}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
                        {CURRENT_USER.level}
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3">@{CURRENT_USER.username}</h2>

                {/* Rol Badge */}
                <div className="mb-4">
                    <RoleBadge role={CURRENT_USER.role} size="medium" showMultiplier={true} />
                </div>

                <div className="w-full text-left">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-medium">XP Level {CURRENT_USER.level}</span>
                        <span className="font-bold text-seljuk-turquoise">{CURRENT_USER.xp} / {CURRENT_USER.maxXp} XP</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-seljuk-turquoise h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${(CURRENT_USER.xp / CURRENT_USER.maxXp) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">{CURRENT_USER.totalContributions} toplam katkı</p>
                </div>
            </div>

            {/* Wallet Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-seljuk-gold/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-seljuk-gold/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-seljuk-gold/10 transition-all"></div>

                <div className="relative z-10">
                    <h3 className="text-gray-500 font-medium text-sm mb-2 uppercase tracking-wider">Cüzdan Bakiyesi</h3>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-seljuk-gold/10 rounded-full text-seljuk-gold">
                            <Coins size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-4xl font-extrabold text-gray-800 tracking-tight">{userCoins.toLocaleString()}</span>
                            <p className="text-xs text-gray-500 mt-1">GençCoin</p>
                        </div>
                    </div>

                    {/* Dönüşüm Oranı Bilgisi */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start gap-2">
                        <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-800">
                            <strong>Dönüşüm Oranı:</strong> 1000 GençCoin = 10 Genç Kültür Kart Puanı
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 font-medium mb-1 block">Transfer Miktarı</label>
                            <input
                                type="range"
                                min="0"
                                max={userCoins}
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-seljuk-turquoise"
                            />
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-sm font-bold text-seljuk-turquoise">
                                    {transferAmount} Coin
                                </div>
                                <div className="text-xs text-gray-500">
                                    ≈ <span className="font-bold text-seljuk-coral">{kulturKartPoints}</span> Kart Puanı
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleTransfer}
                            disabled={transferAmount < 100}
                            className={`w-full font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform flex items-center justify-center gap-2 ${
                                transferAmount < 100 
                                    ? 'bg-red-600 cursor-not-allowed' 
                                    : 'bg-[#00BFA5] hover:bg-[#009688] hover:-translate-y-0.5 shadow-[#00BFA5]/30'
                            } text-white`}
                        >
                            KÜLTÜR KARTA AKTAR
                            <ArrowRight size={18} />
                        </button>
                        <p className="text-xs text-gray-400 text-center">Minimum: 100 Coin</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Transfer Onay Modalı */}
        {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                    <button 
                        onClick={() => setShowModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>

                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Transfer Onayı</h3>
                        <p className="text-sm text-gray-600">Coin'lerinizi Genç Kültür Kart puanına dönüştürmek üzeresiniz</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Transfer Miktarı:</span>
                            <span className="font-bold text-lg text-seljuk-turquoise">{transferAmount} GençCoin</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                            <span className="text-gray-600">Alacağınız Puan:</span>
                            <span className="font-bold text-lg text-seljuk-coral">{kulturKartPoints} Kart Puanı</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowModal(false)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition-colors"
                        >
                            İptal
                        </button>
                        <button 
                            onClick={confirmTransfer}
                            className="flex-1 bg-seljuk-coral hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                        >
                            Onayla
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default ProfileSidebar;
