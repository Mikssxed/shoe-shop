'use client';

import { Avatar, Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import { userAvatar } from '@/styles/profile/updateProfileStyles';
import { IProfilePictureProps } from '@/lib/types';

const ProfilePicture = ({ avatarStyle }: IProfilePictureProps) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <Skeleton
        data-testid="profilePricture__skeleton"
        variant="circular"
        height="100%"
        width="100%"
      />
    );
  }
  if (status === 'unauthenticated') {
    return null;
  }

  const { avatar, firstName, username } = session?.user || {
    avatar: undefined,
    firstName: undefined,
    username: undefined,
  };
  const fullName = (firstName || username || ' ')[0].toUpperCase();

  return (
    <>
      {avatar ? (
        <Image
          data-testid="profilePicture__image"
          src={avatar.url}
          alt={fullName}
          fill
          sizes="100%"
          style={{ objectFit: 'cover', borderRadius: '100%' }}
        />
      ) : (
        <Avatar
          data-testid="profilePicture__avatarWithoutImage"
          sx={{
            ...userAvatar,
            ...avatarStyle,
          }}
        >
          {fullName}
        </Avatar>
      )}
    </>
  );
};

export default ProfilePicture;
