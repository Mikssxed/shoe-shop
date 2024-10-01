export function getLastViewedProductIds(userId?: string): string[] {
  if (globalThis.window === undefined) {
    return [];
  }

  const storageKey = userId ? `lastViewed_${userId}` : 'lastViewed';

  const storedIds = localStorage.getItem(storageKey);
  return storedIds ? JSON.parse(storedIds) : [];
}

export function addLastViewedProductId(
  newProductId: string,
  userId?: string,
): void {
  const lastViewedIds = getLastViewedProductIds(userId);

  if (lastViewedIds.includes(newProductId)) {
    return;
  }

  lastViewedIds.unshift(newProductId);

  if (lastViewedIds.length > 4) {
    lastViewedIds.pop();
  }

  const storageKey = userId ? `lastViewed_${userId}` : 'lastViewed';

  localStorage.setItem(storageKey, JSON.stringify(lastViewedIds));
}
