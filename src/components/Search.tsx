'use client';
import {useDebounce, useIsMobile} from '@/hooks';

import {useProductsNames} from '@/tools';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';

import {stylingConstants} from '@/lib/constants/themeConstants';
import SearchBar from './SearchBar';
import Modal from './ui/Modal';
import Cross from '/public/icons/cross.svg';

type SearchProps = {
  open: boolean;
  onClose: () => void;
};

export default function Search({open, onClose}: SearchProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') ?? '',
  );
  const debouncedSearch = useDebounce(searchQuery.trim(), 500);
  const {data: productsNames} = useProductsNames(debouncedSearch);

  //TODO: Maybe improve searching (right now it only searches based on products that contain search string)
  const updateSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (!query) {
      params.delete('search');
      router.push(`/products?${params}`);
      return;
    }
    params.set('search', query.trim());
    router.push(`/products?${params}`);
  };

  const handleChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClose = () => {
    onClose();
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') handleSubmit(searchQuery);
  };

  const handleSubmit = (searchString: string) => {
    updateSearch(searchString);
    handleChange(searchString);
    onClose();
  };

  const handleClear = () => {
    if (searchParams.get('search')) updateSearch('');
    handleChange('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted={true}
      containerStyle={{
        display: 'block',
        '& > *': {
          alignItems: 'flex-start',
        },
      }}
      paperStyle={{
        justifyContent: 'start',
        width: '100%',
        maxWidth: '100%',
        m: 0,
        p: 0,
      }}
    >
      <Box
        sx={{
          alignSelf: 'start',
          p: {xs: '20px 25px', sm: '30px 35px', md: '40px 45px'},
          width: '100%',
          height: {xs: '200px', sm: '300px', md: '420px'},
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: stylingConstants.palette.background.default,
        }}
      >
        {!isMobile && (
          <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {open && (
            <>
              <SearchBar
                width="clamp(250px, 70dvw, 1070px)"
                height="80px"
                value={searchQuery}
                onChange={value => {
                  handleChange(value);
                }}
                onKeyPress={handleKeyPress}
                onSearch={() => handleSubmit(searchQuery)}
                onClear={handleClear}
                focused={true}
              />

              {debouncedSearch && productsNames && (
                <>
                  <Typography
                    sx={{
                      mt: {xs: '12px', sm: '22px', md: '32px'},
                      marginInline: {
                        xs: '0px 10px',
                        sm: '20px',
                        md: '40px',
                      },
                      pl: '8px',
                      color: stylingConstants.palette.text.secondary,
                      fontSize: {xs: '14px', sm: '17px', md: '20px'},
                    }}
                  >
                    {productsNames.length > 0
                      ? 'Popular Search Terms'
                      : '0 search results'}
                  </Typography>
                  <List
                    sx={{
                      p: 0,
                      marginInline: {xs: '0px 10px', sm: '20px', md: '40px'},
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'auto',
                    }}
                  >
                    {productsNames
                      .sort(
                        (a, b) =>
                          a.attributes.name
                            .toLowerCase()
                            .indexOf(debouncedSearch.toLowerCase()) -
                          b.attributes.name
                            .toLowerCase()
                            .indexOf(debouncedSearch.toLowerCase()),
                      )
                      .map(product => (
                        <ListItemButton
                          key={product.id}
                          onClick={() => handleSubmit(product.attributes.name)}
                          sx={{
                            px: '8px',
                            py: {xs: '4px', sm: '6px', md: '8px'},
                          }}
                        >
                          <ListItemText
                            primary={product.attributes.name}
                            primaryTypographyProps={{
                              color: stylingConstants.palette.text.primary,
                              fontSize: {xs: '14px', sm: '17px', md: '20px'},
                            }}
                            sx={{
                              py: '4px',
                              my: {xs: 0, sm: '2px', md: '4px'},
                            }}
                          />
                        </ListItemButton>
                      ))}
                  </List>
                </>
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            '& > img': {
              width: {xs: '10px', sm: '20px', md: '27px'},
              mt: {xs: '4px', sm: '7px', md: '10px'},
              height: {xs: '10px', sm: '20px', md: '27px'},
            },
          }}
        >
          <Image
            src={Cross}
            alt="close"
            width={27}
            height={27}
            onClick={handleClose}
            style={{
              alignSelf: 'start',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
}
