'use client';

import { Avatar, Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import { userAvatar } from '@/styles/profile/updateProfileStyles';
import { IProfilePictureProps } from '@/lib/types';

const ProfilePicture = ({ avatarStyle, avatarUrl }: IProfilePictureProps) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <Skeleton variant="circular" height="100%" width="100%" />;
  }

  const { avatar, firstName, username } = session?.user || {
    avatar: undefined,
    firstName: undefined,
    username: undefined,
  };
  const fullName = (firstName || username || ' ')[0].toUpperCase();

  return (
    <>
      {avatarUrl || avatar ? (
        <Image
          src={avatarUrl || avatar.url}
          alt={fullName}
          fill
          sizes="100%"
          style={{ objectFit: 'cover', borderRadius: '100%' }}
        />
      ) : (
        <Avatar
          src="/"
          alt={fullName}
          sx={{
            ...userAvatar,
            ...avatarStyle,
          }}
        />
      )}
    </>
  );
};

export default ProfilePicture;
