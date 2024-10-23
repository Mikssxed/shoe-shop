import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';

import SingleProductPage from '@/app/(home)/products/[productId]/page';
import {
  mockProduct,
  mockProductNoBrand,
  mockProductNoCategories,
  mockProductNoColor,
  mockProductNoDescription,
  mockProductNoGender,
  mockProductNoImage,
  mockProductNoName,
  mockProductNoPrice,
  mockProductNoSize,
} from '@/lib/mocks/';
import {
  mockSessionAuthed,
  mockSessionLoading,
  mockSessionUnauthed,
} from '@/lib/mocks/sessionMocks';
import { addToCartQuery, getProduct } from '@/tools';
import { addLastViewedProductId } from '@/utils';
import { useRouter } from 'next/navigation';

jest.mock('notistack', () => ({
  enqueueSnackbar: jest.fn(),
}));

jest.mock('@/tools', () => ({
  addToCartQuery: jest.fn(),
  getProduct: jest.fn(),
}));

jest.mock('@/utils', () => ({
  addLastViewedProductId: jest.fn(),
  isProductWishlisted: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const defaultProps = {
  params: {
    productId: '1788',
  },
};

const query = (id: string) => screen.queryByTestId(id);

const queryRoot = () => query('singleProductPage__root');
const queryImageSliderContainer = () =>
  query('singleProductPage__imageSliderContainer');
const queryImageSlider = () => query('imageSlider');
const queryWithoutSliderImage = () =>
  query('singleProductPage__withoutSliderImage');
const queryInfoContainer = () => query('singleProductPage__infoContainer');
const queryProductName = () => query('singleProductPage__name');
const queryProductPrice = () => query('singleProductPage__price');
const queryProductGender = () => query('singleProductPage__gender');
const queryProductColor = () => query('singleProductPage__color');
const querySizeSelector = () => query('singleProductPage__sizeSelector');
const querySizeButton = (size: number) =>
  query(`singleProductPage__sizeButton__${size}`);
const queryAddToBagButton = () => query('singleProductPage__addToBagButton');
const queryProductDescription = () => query('singleProductPage__description');

const mockRouter = {
  back: jest.fn(),
};

describe('Single Product page', () => {
  beforeEach(() => {
    // (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated' });
    (useSession as jest.Mock).mockReturnValue(mockSessionAuthed);

    (getProduct as jest.Mock).mockReturnValue(mockProduct);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders the Single Product page', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    expect(queryRoot()).toBeInTheDocument();
  });

  it('renders all components that the SingleProductPage includes', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('returns null when SingleProductPage does not have valid params', async () => {
    const page = await SingleProductPage({ params: { productId: '' } });
    expect(page).toBeNull();
  });

  it('Empty product data by id provided with params', async () => {
    (getProduct as jest.Mock).mockReturnValue({});
    const page = await SingleProductPage(defaultProps);
    expect(page).toBeNull();
  });

  it('Page for product with no image', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoImage);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).not.toBeInTheDocument();
    expect(queryWithoutSliderImage()).toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no size', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoSize);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).not.toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no name', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoName);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no gender', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoGender);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).not.toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no description', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoDescription);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no price', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoPrice);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no brand', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoBrand);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no categories', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoCategories);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Page for product with no color', async () => {
    (getProduct as jest.Mock).mockReturnValue(mockProductNoColor);
    const page = await SingleProductPage(defaultProps);
    expect(page).not.toBeNull();
    render(page);

    expect(queryRoot()).toBeInTheDocument();
    expect(queryImageSliderContainer()).toBeInTheDocument();
    expect(queryImageSlider()).toBeInTheDocument();
    expect(queryWithoutSliderImage()).not.toBeInTheDocument();
    expect(queryInfoContainer()).toBeInTheDocument();
    expect(queryProductName()).toBeInTheDocument();
    expect(queryProductPrice()).toBeInTheDocument();
    expect(queryProductGender()).toBeInTheDocument();
    expect(queryProductColor()).not.toBeInTheDocument();
    expect(querySizeSelector()).toBeInTheDocument();
    expect(queryAddToBagButton()).toBeInTheDocument();
    expect(queryProductDescription()).toBeInTheDocument();
  });

  it('Add-to-bag button works', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    const addBtn = queryAddToBagButton()!;
    fireEvent.click(addBtn);

    await waitFor(() => expect(addToCartQuery).toHaveBeenCalled());
    expect(enqueueSnackbar).toHaveBeenCalledWith('Successfully added to cart', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  });

  it('Sizes are sorted correct', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    mockProduct.data.attributes.sizes.data.forEach(size => {
      expect(querySizeButton(size.attributes.value)).toBeInTheDocument();
    });

    const sizeButtons = querySizeSelector()?.children;
    if (Array.isArray(sizeButtons) && sizeButtons?.length > 1) {
      for (let i = 1; i < sizeButtons.length; i++) {
        expect(sizeButtons[i].value > sizeButtons[i - 1].value).toBeTruthy();
      }
    }
  });

  it('Selected size button is contained and all of others are not', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    const sizes = mockProduct.data.attributes.sizes.data;
    const randomSize =
      sizes[Math.floor(Math.random() * sizes.length)].attributes.value;
    const sizeButton = querySizeButton(randomSize);

    fireEvent.click(sizeButton!);
    expect(isContained(sizeButton!)).toBeTruthy();

    mockProduct.data.attributes.sizes.data.forEach(size => {
      if (size.attributes.value !== randomSize) {
        expect(
          isContained(querySizeButton(size.attributes.value)!),
        ).toBeFalsy();
      }
    });

    function isContained(button: HTMLElement) {
      return button?.className.split('MuiButton-contained').length !== 1;
    }
  });

  it('Adding the product to last viewed after rendering', async () => {
    const page = await SingleProductPage(defaultProps);
    render(page);

    await waitFor(() =>
      expect(addLastViewedProductId).toHaveBeenCalledWith(
        mockProduct.data.id.toString(),
        mockSessionAuthed.data.user.id,
      ),
    );
  });

  it('Preventing adding to cart while the session is loading', async () => {
    (useSession as jest.Mock).mockReturnValue(mockSessionLoading);
    const page = await SingleProductPage(defaultProps);
    const { rerender } = render(page);

    expect(queryAddToBagButton()).toHaveAttribute('disabled');

    (useSession as jest.Mock).mockReturnValue(mockSessionAuthed);
    rerender(page);
    expect(queryAddToBagButton()?.getAttribute('disabled')).toBeFalsy();

    (useSession as jest.Mock).mockReturnValue(mockSessionUnauthed);
    rerender(page);
    expect(queryAddToBagButton()?.getAttribute('disabled')).toBeFalsy();
  });
});
