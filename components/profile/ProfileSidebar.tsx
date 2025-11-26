import React, { useState } from 'react';
import { User, Shield, Coins, ArrowRight } from 'lucide-react';

const ProfileSidebar: React.FC = () => {
    const [transferAmount, setTransferAmount] = useState(0);

    return (
        <div className="space-y-6 w-full h-full">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden border-4 border-seljuk-ice">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet"
                        alt="Ahmet Yılmaz"
                        className="w-full h-full object-cover"
                    />
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-1">Ahmet Yılmaz</h2>

                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-seljuk-turquoise/10 text-seljuk-turquoise px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Shield size={14} />
                        Role: Gezgin
                    </span>
                </div>

                <div className="w-full text-left">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-medium">XP Level</span>
                        <span className="font-bold text-seljuk-turquoise">2,400 / 2,500 XP</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-seljuk-turquoise h-2.5 rounded-full transition-all duration-500"
                            style={{ width: '96%' }}
                        ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Level atlamaya çok az kaldı!</p>
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
                        <span className="text-4xl font-extrabold text-gray-800 tracking-tight">1,250</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 font-medium mb-1 block">Transfer Miktarı</label>
                            <input
                                type="range"
                                min="0"
                                max="1250"
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-seljuk-turquoise"
                            />
                            <div className="text-right text-sm font-bold text-seljuk-turquoise mt-1">
                                {transferAmount} Coin
                            </div>
                        </div>

                        <button className="w-full bg-seljuk-coral hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-seljuk-coral/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            KÜLTÜR KARTA AKTAR
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
