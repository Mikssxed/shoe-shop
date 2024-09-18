'use client';

import {Avatar, SxProps, Theme} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

import {userAvatar} from '@/styles/profile/updateProfileStyles';

interface IProfilePictureProps {
  avatarStyle?: SxProps<Theme>;
}

const ProfilePicture = ({avatarStyle}: IProfilePictureProps) => {
  const {data} = useSession();
  const avatar: string | undefined = data?.user?.image;
  const firstName: string | undefined = data?.user?.firstName;
  const username: string = data?.user.username;
  return (
    <>
      {avatar ? (
        <Image
          src={avatar}
          // TODO: change alt text when avatar stored correctly
          alt={(firstName || username || ' ')[0].toUpperCase()}
          fill
          sizes="100%"
          style={{objectFit: 'cover'}}
        />
      ) : (
        <Avatar
          src="/"
          alt={(firstName || username || ' ')[0].toUpperCase()}
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
