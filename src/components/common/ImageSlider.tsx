'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, IconButton, Stack, SxProps } from '@mui/material';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

import { useIsMobile } from '@/hooks';

type ImageSliderProps = {
  images: string[];
};

const styles: Record<string, SxProps> = {
  arrowButton: {
    backgroundColor: 'white',
    borderRadius: '50%',
  },
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  const isMobile = useIsMobile();
  const [currentImage, setCurrentImage] = useState<number>(0);

  const nextImage = () => {
    setCurrentImage(prevImage => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(prevImage =>
      prevImage === 0 ? images.length - 1 : prevImage - 1,
    );
  };

  return (
    <Stack
      direction={isMobile ? 'column-reverse' : 'row'}
      spacing={2}
      sx={{
        width: { xs: '100%', sm: 550, md: 500, lg: 600 },
        height: { xs: '100%', sm: 650, md: 480, xl: 500 },
      }}
    >
      <Stack
        direction={isMobile ? 'row' : 'column'}
        spacing={2}
        sx={{
          overflow: 'hidden',
          overflowX: {
            xs: 'auto',
            lg: 'visible',
          },
          overflowY: {
            xs: 'visible',
            lg: 'auto',
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          minWidth: 80,
          minHeight: 90,
        }}
      >
        {images.map((image, index) => (
          <Box
            sx={{
              position: 'relative',
              minHeight: 80,
              minWidth: 80,
              maxHeight: 80,
              maxWidth: 80,
            }}
            key={index}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={80}
              height={80}
              style={{
                cursor: 'pointer',
                transition: '0.4  s',
                opacity: index === currentImage ? '0.35' : '1',
                objectFit: 'cover',
              }}
              onClick={() => setCurrentImage(index)}
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
            />
          </Box>
        ))}
      </Stack>
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '9/10',
          width: 1,
          height: 1,
        }}
      >
        <Image
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          style={{ objectFit: 'cover' }}
          fill
          sizes="100%"
          quality={100}
        />
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
      </Box>
    </Stack>
  );
};

export default ImageSlider;
