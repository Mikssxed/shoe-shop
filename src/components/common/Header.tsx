'use client';

import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from '@mui/material';
import { Bag, HambergerMenu, SearchNormal1 } from 'iconsax-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useIsMobile } from '@/hooks';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { useQueryCartItems } from '@/tools';
import {
  ProfileSidebar,
  ProfilePicture,
  Search,
  SearchBar,
} from '@/components/common';
import styles from '@/styles/components/common/header.style';

const Header = () => {
  const { status, data: session } = useSession();
  const isMobile = useIsMobile();
  const { data: cartItems = [] } = useQueryCartItems(session?.user?.id);

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const onOpenSearch = () => setOpenSearch(true);
  const onCloseSearch = () => setOpenSearch(false);
  const onCloseProfileSidebar = () => setShowSidebar(false);
  const onClickHamburger = () => setShowSidebar(true);

  const cartItemAmount = cartItems.reduce((prev, curr) => {
    return prev + curr.amount;
  }, 0);

  return (
    <>
      <Search open={openSearch} onClose={onCloseSearch} />
      <AppBar color="inherit" sx={styles.appBar}>
        <Toolbar sx={styles.toolBar}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link href="/products">
              <Image
                data-testid="header__logo"
                alt="logo"
                width="40"
                height="30"
                src="/icons/logo.png"
              />
            </Link>
            {!isMobile && (
              <Link
                data-testid="header__linkToProductsPage"
                style={{ textDecoration: 'none' }}
                href="/products"
              >
                <Typography sx={styles.logoSubtext} variant="body1">
                  Products
                </Typography>
              </Link>
            )}
          </Box>
          {status === 'unauthenticated' && (
            <Link href="/auth/sign-in" style={{ textDecoration: 'none' }}>
              <Button
                data-testid="header__signInButton"
                sx={styles.signInButton}
                variant="outlined"
                color="primary"
              >
                Sign in
              </Button>
            </Link>
          )}
          {!isMobile && (
            <SearchBar
              width="min(320px, 25vw)"
              height="48px"
              onInputClick={onOpenSearch}
            />
          )}
          <Link
            href="/bag"
            style={{
              width: '24px',
              height: '24px',
              position: 'relative',
              marginRight: cartItems.length > 0 ? '10px' : undefined,
            }}
          >
            <Bag
              data-testid="header__bagIcon"
              size="24"
              color={
                cartItems.length > 0
                  ? stylingConstants.palette.primary.main
                  : stylingConstants.palette.grey[700]
              }
            />
            {cartItems.length > 0 && (
              <Box
                data-testid="header__bagSpan"
                component="span"
                sx={styles.cartItemAmount}
              >
                {cartItemAmount}
              </Box>
            )}
          </Link>
          {isMobile && (
            <Box
              data-testid="header__searchIcon"
              sx={{ width: 17, height: 17 }}
              onClick={onOpenSearch}
            >
              <SearchNormal1
                size="17"
                color={stylingConstants.palette.grey[700]}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          )}
          {status !== 'unauthenticated' && !isMobile && (
            <Box sx={{ ml: { md: '16px', position: 'relative' } }}>
              <Link
                data-testid="header__avatarLink"
                href="/profile/my-products"
                style={styles.profilePictureLink}
              >
                <ProfilePicture />
              </Link>
            </Box>
          )}
          {status === 'authenticated' && isMobile && (
            <Box sx={{ width: 24, height: 24 }}>
              <HambergerMenu
                data-testid="header__hamburger"
                size="24"
                color={stylingConstants.palette.grey[700]}
                onClick={onClickHamburger}
              />
            </Box>
          )}
        </Toolbar>
        <Divider />
      </AppBar>
      {status === 'authenticated' && isMobile && (
        <ProfileSidebar open={showSidebar} onClose={onCloseProfileSidebar} />
      )}
    </>
  );
};

export default Header;
