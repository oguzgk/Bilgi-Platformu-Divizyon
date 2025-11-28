import React from 'react';
import { UserRole } from '../types';
import { getRoleInfo } from '../utils/roleHelpers';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
  showMultiplier?: boolean;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  size = 'medium', 
  showName = true,
  showMultiplier = false 
}) => {
  const roleInfo = getRoleInfo(role);
  
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-2',
  };

  const iconSizes = {
    small: 'text-xs',
    medium: 'text-base',
    large: 'text-xl',
  };

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold shadow-sm border-2 border-white/20 ${sizeClasses[size]}`}
      style={{ 
        backgroundColor: roleInfo.color,
        color: 'white'
      }}
      title={roleInfo.description}
    >
      <span className={iconSizes[size]}>{roleInfo.badgeIcon}</span>
      {showName && <span>{roleInfo.name}</span>}
      {showMultiplier && (
        <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
          {roleInfo.multiplier}x
        </span>
      )}
    </div>
  );
}

export default RoleBadge;

