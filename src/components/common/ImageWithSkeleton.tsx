import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

import { IImageWithSkeletonProps } from '@/lib/types';

const ImageWithSkeleton = ({ preview }: IImageWithSkeletonProps) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
      <Image
        src={preview}
        alt={'Product Image'}
        fill
        style={{ objectFit: 'cover' }}
        priority={true}
        sizes="100%"
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default ImageWithSkeleton;
