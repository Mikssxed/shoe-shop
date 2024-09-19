'use client';

import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

import {useIsMobile} from '@/hooks';
import {profileSidebarData} from '@/lib/config/profileSidebarConfig';
import {textOverflowEllipsis} from '@/styles/commonStyles';
import {capitalizeFirstLetter} from '@/utils/helperFunctions';
import ProfilePicture from '../ProfilePicture';
import {BaseSidebar} from '../ui';
import {stylingConstants} from '@/lib/constants/themeConstants';
import theme from '@/theme';

type Props = {
  open: boolean;
  onClose?: () => void;
  blockOnMobile?: boolean;
};

export const ProfileSidebar = ({open, onClose, blockOnMobile}: Props) => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  );
  const currentPath = usePathname();
  const isMobile = useIsMobile();
  const {data} = useSession();
  const {firstName, lastName, username} = data?.user || {};
  const gotFullNames = firstName && lastName;

  useEffect(() => {
    const path = profileSidebarData.find(
      sidebarItem => sidebarItem.path === currentPath,
    );
    if (path) {
      setSelectedIndex(profileSidebarData.indexOf(path));
    } else {
      setSelectedIndex(undefined);
    }
  }, [currentPath]);

  const handleListItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    path: string,
  ) => {
    e.preventDefault();
    router.push(path);
  };

  if (blockOnMobile && isMobile) {
    return null;
  }
  const user = (
    <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <Box
        sx={{
          width: '64px',
          height: '64px',
          border: '1px solid #fff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ProfilePicture />
      </Box>
      <Toolbar
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: '36px',
        }}
        disableGutters
        variant="dense"
      >
        <Typography
          paragraph
          sx={{
            fontSize: '0.75rem',
            fontWeight: stylingConstants.typography.fontWeightBold,
            m: 0,
            lineHeight: '18px',
            color: stylingConstants.palette.grey[200],
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{
            ...textOverflowEllipsis,
            maxWidth: {xs: '140px', md: '200px'},
            color: stylingConstants.palette.text.primary,
          }}
          title={
            gotFullNames
              ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
                  lastName,
                )}`
              : username
          }
        >
          {gotFullNames
            ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(
                lastName,
              )}`
            : username}
        </Typography>
      </Toolbar>
    </Box>
  );

  const Content = () => {
    return (
      <Box>
        {isMobile && (
          <Box
            sx={{
              width: '100%',
              justifyContent: 'flex-end',
              display: 'flex',
              position: 'absolute',
              top: '16px',
              right: '28px',
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                display: {md: 'none'},
                ml: 'auto',
                mr: '0px',
              }}
            >
              <Image
                src={'/icons/cross.svg'}
                alt="close"
                width={20}
                height={20}
              />
            </IconButton>
          </Box>
        )}
        {data ? (
          <>
            <>
              <Box
                sx={{
                  pl: '40px',
                  pt: '37.6px',
                  pb: '32px',
                }}
              >
                {user}
              </Box>
              <Divider />
            </>
            <List
              disablePadding
              sx={{
                pl: '40px',
                pt: '32px',
                pr: '40px',
              }}
            >
              {profileSidebarData.map((sidebarItem, index) => (
                <ListItem
                  key={sidebarItem.id}
                  disablePadding
                  sx={{mb: '36px'}}
                  onClick={sidebarItem.onClick}
                >
                  <ListItemButton
                    disableGutters
                    sx={{
                      gap: '15px',
                      color: '#000',
                      transition: 'all 0.3s',
                      '&.Mui-selected': {
                        color: '#FE645E',
                      },
                      '&:hover': {
                        pl: '10px',
                      },
                    }}
                    selected={index === selectedIndex}
                    onClick={e => handleListItemClick(e, sidebarItem.path)}
                  >
                    <ListItemIcon sx={{minWidth: 20}}>
                      <sidebarItem.icon
                        size={20}
                        color={index === selectedIndex ? '#FE645E' : '#6e7378'}
                      />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={sidebarItem.name}
                      sx={{
                        fontSize: '1rem',
                        fontWeight:
                          stylingConstants.typography.fontWeightRegular,
                        fontFamily: theme.typography.fontFamily,
                        lineHeight: '18.77px',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Box sx={{mt: '100px', px: '20px'}}>
            <Link
              href="/auth/sign-in"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                sx={{
                  width: '100%',
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
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <BaseSidebar
        isMobile={isMobile}
        open={open}
        containerStyle={{p: '24px 0px'}}
        onClose={onClose}
      >
        <Content />
      </BaseSidebar>
    </>
  );
};
