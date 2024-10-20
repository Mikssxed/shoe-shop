'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';

import { stylingConstants } from '@/lib/constants/themeConstants';
import { Option } from './Option';
import SearchInput from './SearchInput';

type CategoryProps = {
  name: string;
  children?: ReactNode;
  options?: {
    id: number;
    value: string | number;
  }[];
};

export const Category = ({ name, children, options }: CategoryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchBrand, setSearchBrand] = useState('');

  const updateFilter = (option: string | number, action: 'add' | 'remove') => {
    const params = new URLSearchParams(searchParams);
    if (action === 'add') params.append(name.toLowerCase(), String(option));
    if (action === 'remove') params.delete(name.toLowerCase(), String(option));
    router.push(`${pathname}?${params}`);
  };

  const handleAddFilter = (option: string | number) => {
    updateFilter(option, 'add');
  };

  const handleRemoveFilter = (option: string | number) => {
    updateFilter(option, 'remove');
  };

  const filteredOptions = useMemo(() => {
    if (!searchBrand && name !== 'Brand') return options;
    return options?.filter(({ value }) =>
      String(value).toLowerCase().includes(searchBrand.toLowerCase()),
    );
  }, [searchBrand, options, name]);

  return (
    <>
      <Divider />
      <Accordion
        defaultExpanded
        disableGutters
        sx={{
          p: {
            xs: '15px 10px 15px 40px',
            md: '15px 10px 15px 15px',
          },
          backgroundImage: 'none',
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: stylingConstants.palette.text.primary,
          },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ pl: 0 }}>
          <Typography variant="category">{name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pl: 0 }}>
          {name === 'Brand' && (
            <SearchInput value={searchBrand} onChange={setSearchBrand} />
          )}
          {children}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(name === 'Brand' ? filteredOptions : options)?.map(
              ({ id, value }) => (
                <Option
                  key={id}
                  value={value}
                  checked={searchParams.has(name.toLowerCase(), String(value))}
                  onAddFilter={() => handleAddFilter(value)}
                  onRemoveFilter={() => handleRemoveFilter(value)}
                />
              ),
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
