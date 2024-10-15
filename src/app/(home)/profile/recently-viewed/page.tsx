'use client';

import { useSession } from 'next-auth/react';

import StoredProducts from '@/components/common/StoredProducts';
import { useStored } from '@/tools';
import { getStoredProductIds } from '@/utils';

export default function RecentlyViewed() {
  const { data: session } = useSession();
  const productIds = getStoredProductIds('lastViewed', session?.user?.id);
  const { data: products, isLoading } = useStored('lastViewed', productIds);
  return (
    <StoredProducts
      products={products}
      isLoading={isLoading}
      title="Recently viewed"
      emptyStateText={`You haven't viewed any products yet`}
    />
  );
}
