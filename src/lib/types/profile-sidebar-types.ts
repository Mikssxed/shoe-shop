import {Icon} from 'iconsax-react';

export interface ProfileSidebar {
  id: string;
  name: string;
  icon: Icon;
  path: string;
  onClick?: () => void;
}
