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
  value: number;
  bold?: boolean;
}

export interface IProductInfoFormProps {
  title: string;
  desc: string;
  productId?: number;
  isEdit: boolean;
}

export interface IListProductImagesProps {
  productImages: any[] | undefined;
  onChange: (arg0: any) => void;
  getRootProps: any;
  isDragActive: boolean;
  getInputProps: any;
  error?: FieldError;
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
