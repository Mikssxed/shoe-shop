'use client';
import { stylingConstants } from '@/lib/constants';
import { Box, InputBase, useTheme } from '@mui/material';
import { SearchNormal1 } from 'iconsax-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        border: `1px solid ${stylingConstants.palette.grey[700]}`,
        my: '10px',
        borderRadius: '42px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          left: '10px',
        }}
      >
        <SearchNormal1 size="60%" color={stylingConstants.palette.grey[700]} />
      </Box>
      <InputBase
        placeholder="Search"
        value={value}
        onChange={e => onChange(e.target.value)}
        sx={{
          flexGrow: 1,
          color: stylingConstants.palette.text.secondary,
          px: '40px',
          '& .MuiInputBase-input': {
            [theme.breakpoints.down('md')]: {
              fontSize: '10px',
            },
          },
        }}
      />
    </Box>
  );
}
