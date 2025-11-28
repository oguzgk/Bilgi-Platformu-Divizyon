import { UserRole, RoleInfo } from '../types';
import { ROLES } from '../constants';

// Coin miktarına göre rolü hesapla
export function calculateRoleFromCoins(coins: number): UserRole {
  if (coins >= 50001) return 'konya_bilgesi';
  if (coins >= 10001) return 'kasif_meraklisi';
  if (coins >= 2501) return 'gezgin';
  if (coins >= 501) return 'seyyah';
  return 'yeni_gelen';
}

// Rol bilgilerini getir
export function getRoleInfo(role: UserRole): RoleInfo {
  return ROLES[role];
}

// Bir sonraki role kaç coin kaldı
export function getCoinsToNextRole(currentCoins: number): { nextRole: UserRole | null; coinsNeeded: number } {
  if (currentCoins < 501) {
    return { nextRole: 'seyyah', coinsNeeded: 501 - currentCoins };
  }
  if (currentCoins < 2501) {
    return { nextRole: 'gezgin', coinsNeeded: 2501 - currentCoins };
  }
  if (currentCoins < 10001) {
    return { nextRole: 'kasif_meraklisi', coinsNeeded: 10001 - currentCoins };
  }
  if (currentCoins < 50001) {
    return { nextRole: 'konya_bilgesi', coinsNeeded: 50001 - currentCoins };
  }
  return { nextRole: null, coinsNeeded: 0 }; // Maksimum seviyede
}

// Coin kazancını çarpanla hesapla
export function calculateCoinReward(baseAmount: number, multiplier: number): number {
  return Math.floor(baseAmount * multiplier);
}

// Rol badge komponenti için stil
export function getRoleBadgeStyle(role: UserRole): string {
  const roleInfo = getRoleInfo(role);
  return `bg-gradient-to-r from-${roleInfo.color}-400 to-${roleInfo.color}-600`;
}
