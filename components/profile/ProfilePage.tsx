import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-seljuk-ice p-4 md:p-8">
            {/* Navigation Back */}
            <div className="max-w-7xl mx-auto mb-6">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-seljuk-turquoise transition-colors font-medium">
                    <Home size={20} />
                    <span>Ana Sayfaya Dön</span>
                </Link>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar (Identity & Wallet Control) - ~30% */}
                <div className="lg:col-span-4 xl:col-span-4 h-full">
                    <ProfileSidebar />
                </div>

                {/* Right Main Area (Activity Log & Stats) - ~70% */}
                <div className="lg:col-span-8 xl:col-span-8">
                    <ProfileContent />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
