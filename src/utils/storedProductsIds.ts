import { ICartItem } from '@/lib/types';

export function getStoredProductIds(
  storeName: 'lastViewed' | 'wishlisted' | 'cart',
  userId?: string,
): string[] {
  if (globalThis.window === undefined) {
    return [];
  }

  const storageKey = userId ? `${storeName}_${userId}` : storeName;
  const storedData = localStorage.getItem(storageKey);
  let storedIds: string[] = [];

  if (storeName === 'cart') {
    const cartProducts: ICartItem[] = JSON.parse(
      localStorage.getItem(storageKey) || '[]',
    );
    storedIds = cartProducts.map(product => product.id.toString());
  } else {
    storedIds = storedData ? JSON.parse(storedData) : [];
  }

  return storedIds;
}

export function addLastViewedProductId(
  newProductId: string,
  userId?: string,
): void {
  const lastViewedIds = getStoredProductIds('lastViewed', userId);

  if (lastViewedIds.includes(newProductId)) {
    const indexOfLastViewedItem = lastViewedIds.indexOf(newProductId);
    lastViewedIds.splice(indexOfLastViewedItem, 1);
  }

  lastViewedIds.unshift(newProductId);

  const MAX_NUMBER_OF_LAST_VIEWED_PRODUCTS = 12;

  if (lastViewedIds.length > MAX_NUMBER_OF_LAST_VIEWED_PRODUCTS) {
    lastViewedIds.pop();
  }

  const storageKey = userId ? `lastViewed_${userId}` : 'lastViewed';

  localStorage.setItem(storageKey, JSON.stringify(lastViewedIds));
}

export function toggleWishlistedProductId(
  newProductId: string,
  userId?: string,
): void {
  const wishlistedIds = getStoredProductIds('wishlisted', userId);

  if (wishlistedIds.includes(newProductId)) {
    const indexOfWishlistedItem = wishlistedIds.indexOf(newProductId);
    wishlistedIds.splice(indexOfWishlistedItem, 1);
  } else {
    wishlistedIds.unshift(newProductId);
  }

  const storageKey = userId ? `wishlisted_${userId}` : '';

  localStorage.setItem(storageKey, JSON.stringify(wishlistedIds));
}

export function isProductWishlisted(productId: string, userId?: string) {
  const wishlistedIds = getStoredProductIds('wishlisted', userId);
  return wishlistedIds.includes(productId);
}
