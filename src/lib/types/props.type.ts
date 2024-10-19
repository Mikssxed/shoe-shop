import { SxProps, Theme } from '@mui/material';
import { FieldError } from 'react-hook-form';
import { BaseWithValue, Data, FiltersData } from './data.type';
import { ICartItem, ProductAttributes } from './Product.type';

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
  value: number | string;
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
  mode?: 'create' | 'edit';
  product?: ProductAttributes;
  onClose?: () => void;
  openEditModal?: boolean;
}

export interface IListProductImagesProps {
  queryKey: string[];
  error?: FieldError;
}

export interface ICategoriesSelectProps {
  control: any;
  name: string;
  filtersData?: FiltersData;
  label?: string;
  required?: boolean;
}

export interface ISizesSelectsProps {
  name: string;
  control: any;
  filtersData?: FiltersData;
  label?: string;
  required?: boolean;
}

export interface IFileWithPreview extends File {
  preview?: string;
}

export interface IImageWithSkeletonProps {
  src: string;
  alt?: string;
  style?: any; //TODO replace any
}

export interface EmptyProductListProps {
  text?: string;
  subtext?: string;
  link?: string;
  buttonText?: string;
}

export interface ISingleProductPageProps {
  params: { productId: string };
}

export interface ThankYouPageProps {
  params: {
    orderId: string;
  };
}

export interface IStoredProductsProp {
  products: never[] | Data<ProductAttributes>[] | undefined;
  isLoading: boolean;
  title: string;
  emptyStateText: string;
}
