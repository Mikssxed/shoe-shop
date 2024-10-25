'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

import { IImageWithSkeletonProps } from '@/lib/types';

const ImageWithSkeleton = ({
  src,
  alt = 'Product Image',
}: IImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          data-testid="skeleton"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', display: isLoading ? 'none' : 'block' }}
        priority={true}
        sizes="100%"
        onLoad={() => setIsLoading(false)}
        data-testid="product-image"
      />
    </>
  );
};

export default ImageWithSkeleton;
