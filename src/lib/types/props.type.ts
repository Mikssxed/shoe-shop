import { SxProps, Theme } from '@mui/material';
import { BaseWithValue, Data, FiltersData } from './data.type';
import { ICartItem, ProductAttributes } from './Product.type';
import { FieldError } from 'react-hook-form';

export interface IActionButtonsProps {
  sizes: Data<BaseWithValue>[];
  product: ProductAttributes;
  id: string;
}

export interface IProductIdProps {
  params: { productId: string };
}

export interface BagItemProps {
  item: ICartItem;
}

export interface IQuantityButtonsProps {
  item: ICartItem;
}

export interface IBagPricingListProps {
  name: string;
  value: number;
  bold?: boolean;
}

export interface IProfilePictureProps {
  avatarStyle?: SxProps<Theme>;
}

export interface IDeleteAvatarModalProps {
  isOpened: boolean;
  onCloseModal: () => void;
}

export interface IProductInfoFormProps {
  title: string;
  desc: string;
  productId?: number;
  isEdit: boolean;
  product?: ProductAttributes;
  onClose?: () => void;
  openEditModal?: boolean;
}

export interface IListProductImagesProps {
  productImages: any[] | undefined;
  onChange: (arg0: any) => void;
  getRootProps: any;
  isDragActive: boolean;
  getInputProps: any;
  error?: FieldError;
  editProductImagesCount?: number;
}

export interface ICategoriesSelectProps {
  control: any;
  name: string;
  filtersData?: FiltersData;
}

export interface ISizesSelectsProps {
  name: string;
  control: any;
  filtersData?: FiltersData;
}

export interface IFileWithPreview extends File {
  preview?: string;
}

export interface IImageWithSkeletonProps {
  preview: string;
}

export interface EmptyProductListProps {
  text?: string;
  subtext?: string;
  link?: string;
  buttonText?: string;
}
