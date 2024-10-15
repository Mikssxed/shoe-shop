'use client';

import { useSession } from 'next-auth/react';

import StoredProducts from '@/components/common/StoredProducts';
import { useStored } from '@/tools';
import { getStoredProductIds } from '@/utils';

export default function MyWishlist() {
  const { data: session } = useSession();
  const productIds = getStoredProductIds('wishlisted', session?.user?.id);
  const { data: products, isLoading } = useStored('wishlisted', productIds);

  return (
    <StoredProducts
      products={products}
      isLoading={isLoading}
      title="My Wishlist"
      emptyStateText={`You haven't added any products to your wishlist yet`}
    />
  );
}
