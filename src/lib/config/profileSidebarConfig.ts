import {
  BagTick,
  HeartSearch,
  I3DCubeScan,
  Logout,
  SearchStatus1,
  Setting2,
} from 'iconsax-react';
import { ProfileSidebar } from '../types/profile-sidebar-types';

export const profileSidebarData: ProfileSidebar[] = [
  {
    id: 'ps-1',
    name: 'My Products',
    icon: BagTick,
    path: '/profile/my-products',
  },
  {
    id: 'ps-2',
    name: 'Order history',
    icon: I3DCubeScan,
    // TODO: change this link if necessary after order history page created
    path: '/profile/order-history',
  },
  {
    id: 'ps-3',
    name: 'My Wishlist',
    icon: HeartSearch,
    path: '/profile/my-wishlist',
  },
  {
    id: 'ps-4',
    name: 'Recently Viewed',
    icon: SearchStatus1,
    path: '/profile/recently-viewed',
  },
  {
    id: 'ps-5',
    name: 'Settings',
    icon: Setting2,
    path: '/profile/settings',
  },
  {
    id: 'ps-6',
    name: 'Log out',
    icon: Logout,
    path: '',
    onClick: setState => setState(true),
  },
];
