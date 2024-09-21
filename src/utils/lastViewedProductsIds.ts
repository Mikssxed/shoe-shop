export function getLastViewedProductIds(): string[] {
  if (globalThis.window === undefined) {
    return [];
  }
  const storedIds = localStorage.getItem("lastViewed");
  return storedIds ? JSON.parse(storedIds) : [];
}

export function addLastViewedProductId(newProductId: string): void {
  const lastViewedIds = getLastViewedProductIds();

  if (lastViewedIds.includes(newProductId)) {
    return;
  }

  lastViewedIds.unshift(newProductId);

  if (lastViewedIds.length > 4) {
    lastViewedIds.pop();
  }

  localStorage.setItem("lastViewed", JSON.stringify(lastViewedIds));
}
