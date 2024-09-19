'use client';

import {Avatar, SxProps, Theme} from '@mui/material';
import {useSession} from 'next-auth/react';
import Image from 'next/image';

import {userAvatar} from '@/styles/profile/updateProfileStyles';

interface IProfilePictureProps {
  avatarStyle?: SxProps<Theme>;
}

const ProfilePicture = ({avatarStyle}: IProfilePictureProps) => {
  const {data} = useSession();
  const {image: avatar, firstName, username} = data?.user || {};
  const alt = (firstName || username || ' ')[0].toUpperCase();
  return (
    <>
      {avatar ? (
        <Image
          src={avatar}
          // TODO: change alt text when avatar stored correctly
          alt={alt}
          fill
          sizes="100%"
          style={{objectFit: 'cover'}}
        />
      ) : (
        <Avatar
          src="/"
          alt={alt}
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
