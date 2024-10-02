'use client';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { carouselMock } from '@/lib/mocks';

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? carouselMock.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === carouselMock.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentTestimonial = carouselMock[currentIndex];

  return (
    <Box
      sx={{
        width: '80%',
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        p: '30px 30px',
        borderRadius: '32px',
        zIndex: 1,
        border: '2px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: '10px',
          top: '20%',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: '10px',
        }}
      >
        <IconButton onClick={handlePrev}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: 'left',
          maxWidth: '80%',
          fontSize: { lg: '1rem', xl: '1.25rem' },
        }}
      >
        {currentTestimonial.text}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
          {currentTestimonial.name}
        </Typography>
        <Box>
          {Array.from({ length: currentTestimonial.stars }).map((_, index) => (
            <span key={index} style={{ color: 'red', marginRight: '2px' }}>
              ★
            </span>
          ))}
          {Array.from({ length: 5 - currentTestimonial.stars }).map(
            (_, index) => (
              <span key={index} style={{ color: '#ccc', marginRight: '2px' }}>
                ★
              </span>
            ),
          )}
        </Box>
      </Box>
      <Typography sx={{ textAlign: 'left' }}>
        {currentTestimonial.company}
      </Typography>
    </Box>
  );
}

export default Testimonial;
