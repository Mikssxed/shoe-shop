import { Icon } from 'iconsax-react';
import { Dispatch, SetStateAction } from 'react';

export interface ProfileSidebar {
  id: string;
  name: string;
  icon: Icon;
  path: string;
  onClick?: (setState: Dispatch<SetStateAction<boolean>>) => void;
}
