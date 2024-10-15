import { ICartItem } from '@/lib/types';

export function getCartProductsIds(userId?: string): string[] {
  const storageKey = userId ? `cart_${userId}` : 'cart';
  const cartProducts: ICartItem[] = JSON.parse(
    localStorage.getItem(storageKey) || '[]',
  );
  return cartProducts.map(product => product.id.toString());
}
