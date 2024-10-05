import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import { ProfilePicture } from '@/components/common';

jest.mock('next-auth/react');

const sessionWithAvatar = {
  user: {
    avatar: { url: '/images/avatar.png' },
    firstName: 'Ryan',
    lastName: 'Gosling',
  },
};

const sessionWithoutAvatar = {
  user: { ...sessionWithAvatar.user, avatar: null },
};

const querySkeleton = () => screen.queryByTestId('profilePricture__skeleton');
const queryAvatarWithImage = () =>
  screen.queryByTestId('profilePicture__image');
const queryAvatarWithoutImage = () =>
  screen.queryByTestId('profilePicture__avatarWithoutImage');

describe('ProfilePicture Component', () => {
  it('Loading state for default ProfilePicture', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'loading' });
    render(<ProfilePicture />);

    expect(querySkeleton()).toBeInTheDocument();
    expect(queryAvatarWithImage()).not.toBeInTheDocument();
    expect(queryAvatarWithoutImage()).not.toBeInTheDocument();
  });

  it('Unauthenticated state for default ProfilePicture', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    render(<ProfilePicture />);

    expect(querySkeleton()).not.toBeInTheDocument();
    expect(queryAvatarWithImage()).not.toBeInTheDocument();
    expect(queryAvatarWithoutImage()).not.toBeInTheDocument();
  });

  it('Authenticated with avatar picture for default ProfilePicture', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: sessionWithAvatar,
    });
    render(<ProfilePicture />);

    expect(querySkeleton()).not.toBeInTheDocument();

    expect(queryAvatarWithImage()).toBeInTheDocument();
    expect(queryAvatarWithImage()?.getAttribute('src')).toContain(
      sessionWithAvatar.user.avatar.url.split('/').reverse()[0],
    );

    expect(queryAvatarWithoutImage()).not.toBeInTheDocument();
  });

  it('Authenticated without avatar picture for default ProfilePicture', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: sessionWithoutAvatar,
    });
    render(<ProfilePicture />);

    expect(querySkeleton()).not.toBeInTheDocument();

    expect(queryAvatarWithImage()).not.toBeInTheDocument();

    expect(queryAvatarWithoutImage()).toBeInTheDocument();
    expect(
      queryAvatarWithoutImage()?.querySelector('img')?.getAttribute('alt'),
    ).toBe(sessionWithoutAvatar.user.firstName[0].toUpperCase());
  });
});
