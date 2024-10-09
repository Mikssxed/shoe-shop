'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
  SxProps,
} from '@mui/material';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

import { useIsMobile } from '@/hooks';
import { stylingConstants } from '@/lib/constants/themeConstants';

type ImageSliderProps = {
  images: string[];
  name: string;
};

const styles: Record<string, SxProps> = {
  arrowButton: {
    backgroundColor: 'white',
    borderRadius: '50%',
  },
};

const ImageSlider = ({ images, name }: ImageSliderProps) => {
  const isMobile = useIsMobile();
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState<number>(5);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const [isThumbnailLoading, setIsThumbnailLoading] = useState<boolean>(true);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleThumbnails = () => {
      const containerWidth = thumbnailContainerRef.current?.offsetWidth || 0;
      const thumbnailSize = 80 + 16;
      const thumbnailsVisible = Math.floor(containerWidth / thumbnailSize);
      if (isMobile) {
        setVisibleThumbnails(thumbnailsVisible);
      } else {
        setVisibleThumbnails(5);
      }
    };

    calculateVisibleThumbnails();
    window.addEventListener('resize', calculateVisibleThumbnails);

    return () => {
      window.removeEventListener('resize', calculateVisibleThumbnails);
    };
  }, [isMobile]);

  const maxThumbnailIndex = Math.max(0, images.length - visibleThumbnails);

  const nextImage = () => {
    setCurrentImage(prevImage => (prevImage + 1) % images.length);
    setIsImgLoading(true);
  };

  const prevImage = () => {
    setCurrentImage(prevImage =>
      prevImage === 0 ? images.length - 1 : prevImage - 1,
    );
    setIsImgLoading(true);
  };

  const currentThumbnailIndex = Math.min(currentImage, maxThumbnailIndex);

  return (
    <Stack
      data-testid="imageSlider"
      direction={isMobile ? 'column-reverse' : 'row'}
      spacing={2}
      sx={{
        width: { xs: '100%', sm: 550, md: 500, lg: 600 },
        height: { xs: '100%', sm: 650, md: 480, xl: 500 },
      }}
    >
      <Stack
        ref={thumbnailContainerRef}
        direction={isMobile ? 'row' : 'column'}
        sx={{
          position: 'relative',
          minWidth: 80,
          minHeight: 90,
          overflow: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: '1rem',
            transition: 'transform 0.5s ease-in-out',
            transform: isMobile
              ? `translateX(-${currentThumbnailIndex * 96}px)`
              : `translateY(-${currentThumbnailIndex * 96}px)`,
          }}
        >
          {images.map((image, index) => (
            <Box
              sx={{
                position: 'relative',
                minWidth: 80,
                minHeight: 80,
                maxWidth: 80,
                maxHeight: 80,
                cursor: 'pointer',
                opacity: index === currentImage ? 0.35 : 1,
                transition: 'opacity 0.3s ease',
              }}
              key={index}
              onClick={() => {
                setCurrentImage(index);
                setIsImgLoading(true);
              }}
            >
              {isThumbnailLoading && (
                <Skeleton variant="rectangular" width={80} height={80} />
              )}
              <Image
                src={image}
                alt={`${name} Thumbnail ${index + 1}`}
                width={80}
                height={80}
                style={{
                  objectFit: 'cover',
                  opacity: `${isThumbnailLoading ? 0 : 1}`,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={e => {
                  if (e.target instanceof HTMLElement) {
                    e.target.style.filter = 'grayscale(100%)';
                  }
                }}
                onMouseLeave={e => {
                  if (e.target instanceof HTMLElement) {
                    e.target.style.filter = 'grayscale(0%)';
                  }
                }}
                onLoad={() => setIsThumbnailLoading(false)}
              />
            </Box>
          ))}
        </Box>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          aspectRatio: '9/10',
          width: 1,
          height: 1,
        }}
      >
        {isImgLoading && (
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress
              sx={{ color: stylingConstants.palette.grey[200] }}
              size={80}
            />
          </Stack>
        )}
        <Image
          src={images[currentImage]}
          alt={`${name} Image ${currentImage + 1}`}
          style={{
            objectFit: 'cover',
            opacity: `${isImgLoading ? 0 : 1}`,
            transition: 'opacity 0.5s',
          }}
          fill
          sizes="100%"
          quality={100}
          onLoad={() => setIsImgLoading(false)}
        />
        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              gap: '5px',
              display: 'flex',
            }}
          >
            <IconButton sx={styles.arrowButton} onClick={prevImage}>
              <ArrowLeft2 width={24} height={24} />
            </IconButton>
            <IconButton sx={styles.arrowButton} onClick={nextImage}>
              <ArrowRight2 width={24} height={24} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ImageSlider;
