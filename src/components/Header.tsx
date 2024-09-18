'use client';

import {AppBar, Box, Button, Divider, Toolbar, Typography} from '@mui/material';
import {Bag, HambergerMenu, SearchNormal1} from 'iconsax-react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';

import {useIsMobile} from '@/hooks';
import ProfilePicture from './ProfilePicture';
import Search from './Search';
import SearchBar from './SearchBar';
import {ProfileSidebar} from './common';
import {stylingConstants} from '@/lib/constants/themeConstants';

const Header = () => {
  const {status} = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <Search open={openSearch} onClose={() => setOpenSearch(false)} />
      <AppBar
        color="inherit"
        sx={{
          width: '100%',
          position: 'sticky',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            paddingInline: {xs: '20px', md: '30px', lg: '40px 60px'},
            backgroundcolor: stylingConstants.palette.background.default,
            justifyItems: 'end',
            gap: {xs: '20px', md: 0},
          }}
        >
          <Box sx={{display: 'flex', flexGrow: 1}}>
            <Image alt="logo" width="40" height="30" src="/icons/logo.png" />
            {!isMobile && (
              <Link style={{textDecoration: 'none'}} href="/products">
                <Typography
                  align="center"
                  sx={{marginInline: '44px', lineHeight: '30px'}}
                  variant="body1"
                  color={stylingConstants.palette.text.primary}
                >
                  Products
                </Typography>
              </Link>
            )}
          </Box>
          {status === 'unauthenticated' && !isMobile && (
            <Link
              href="/auth/sign-in"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                sx={{
                  width: 'min(145px, 14vw)',
                  height: '48px',
                  typography: {
                    textTransform: 'none',
                    fontWeight: '700',
                  },
                }}
                variant="outlined"
                color="primary"
              >
                Sign in
              </Button>
            </Link>
          )}
          {!isMobile && (
            <Box onClick={() => setOpenSearch(true)}>
              <SearchBar width="min(320px, 25vw)" height="48px" />
            </Box>
          )}
          <Link href="/bag" style={{width: '24px', height: '24px'}}>
            <Bag size="24" color={stylingConstants.palette.grey[700]} />
          </Link>
          {isMobile && (
            <Box
              sx={{width: 17, height: 17}}
              onClick={() => setOpenSearch(true)}
            >
              <SearchNormal1
                size="17"
                color={stylingConstants.palette.grey[700]}
                style={{
                  cursor: 'pointer',
                }}
              />
            </Box>
          )}
          {status === 'authenticated' && !isMobile && (
            <Box
              sx={{
                ml: {md: '16px'},
              }}
            >
              <Link
                href="/profile/my-products"
                style={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textDecoration: 'none',
                  borderRadius: '50%',
                  position: 'relative',
                }}
              >
                <ProfilePicture />
              </Link>
            </Box>
          )}
          {isMobile && (
            <Box sx={{width: 24, height: 24}}>
              {/*TODO: Add onclick to show sidebar */}
              <HambergerMenu
                size="24"
                color={stylingConstants.palette.grey[700]}
                onClick={() => setSidebarOpen(true)}
              />
            </Box>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
      {isMobile && (
        <ProfileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
