'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

import { IImageWithSkeletonProps } from '@/lib/types';

const ImageWithSkeleton = ({
  src,
  alt = 'Product Image',
}: IImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoaded = () => setIsLoading(false);

  return (
    <>
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'cover', display: isLoading ? 'none' : 'block' }}
        priority={true}
        sizes="100%"
        onLoad={onLoaded}
      />
    </>
  );
};

export default ImageWithSkeleton;
