import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';

import { useIsMobile } from '@/hooks';
import Bag from '@/app/(home)/bag/page';
import { mockCartItems as mockItems } from '@/lib/mocks';
import {
  useQueryCartItems,
  increaseCartItemAmount,
  decreaseCartItemAmount,
  deleteFromCartQuery,
  changeSelectedSize,
} from '@/tools';

jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('@/tools');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/tools', () => ({
  useQueryCartItems: jest.fn(),
  increaseCartItemAmount: jest.fn(),
  decreaseCartItemAmount: jest.fn(),
  deleteFromCartQuery: jest.fn(),
  changeSelectedSize: jest.fn(),
}));
jest.mock('notistack', () => ({ enqueueSnackbar: jest.fn() }));

describe('Bag Components', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
    (useIsMobile as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('renders bag page contents correctly', () => {
    it('should render empty cart page', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
      });
      const { rerender } = render(<Bag />);

      expect(
        screen.getByTestId('bag__title-desktop-empty'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('empty-product-list')).toBeInTheDocument();
      expect(
        screen.getByTestId('empty-product-list__picture'),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You don't have any products yet"),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Add something to your cart'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('empty-product-list__add-button'),
      ).toBeInTheDocument();

      (useIsMobile as jest.Mock).mockReturnValue(true);
      rerender(<Bag />);

      expect(screen.getByTestId('bag__title-mobile')).toBeInTheDocument();
    });

    it('should render skeletons on page', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [],
        isLoading: true,
      });
      render(<Bag />);

      expect(screen.getByTestId('bag__item__skeleton')).toBeInTheDocument();
      expect(screen.getByTestId('bag__summary__skeleton')).toBeInTheDocument();
    });

    it('should render bag item', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: mockItems,
        isLoading: false,
      });
      const { rerender } = render(<Bag />);

      expect(screen.getByTestId('bag__title-desktop')).toBeInTheDocument();
      expect(screen.getAllByText('Mock Shoes').length).toEqual(2);
      expect(screen.getAllByText("Men's Shoes").length).toEqual(2);
      expect(screen.getAllByTestId('bag-item__picture').length).toEqual(2);
      expect(screen.getAllByTestId('bag-item__in-stock').length).toEqual(2);
      expect(screen.getAllByTestId('bag-item__size').length).toEqual(2);
      expect(screen.getAllByText('$549').length).toEqual(2);
      expect(screen.getAllByTestId('quantity-desktop').length).toEqual(2);
      expect(screen.getAllByTestId('bag-item__delete-button').length).toEqual(
        2,
      );
      expect(
        screen.getByRole('button', {
          name: /Continue shopping/i,
        }),
      ).toBeInTheDocument;
      expect(
        screen.getAllByTestId('quantity-desktop__decrease')[0],
      ).toBeDisabled();
      expect(
        screen.getAllByTestId('quantity-desktop__increase')[1],
      ).toBeDisabled();

      (useIsMobile as jest.Mock).mockReturnValue(true);
      rerender(<Bag />);

      expect(
        screen.queryByTestId('quantity-mobile__decrease'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('quantity-mobile__increase'),
      ).not.toBeInTheDocument();

      const quantityAccordion = screen.getAllByTestId('quantity-accordion')[0];
      fireEvent.click(quantityAccordion);

      expect(
        screen.getByTestId('quantity-mobile__decrease'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('quantity-mobile__increase'),
      ).toBeInTheDocument();
    });

    it('should render order summary', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: mockItems,
        isLoading: false,
      });
      const { rerender } = render(<Bag />);

      expect(screen.getByTestId('summary__title-desktop')).toBeInTheDocument();
      expect(screen.getByText('Subtotal')).toBeInTheDocument();
      expect(screen.getByText('$1647')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
      expect(screen.getByText('$20')).toBeInTheDocument();
      expect(screen.getByText('Tax')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('$1667')).toBeInTheDocument();
      expect(
        screen.getByTestId('order__checkout-button-desktop'),
      ).toBeInTheDocument();

      const promoButton = screen.getByRole('button', {
        name: /Do you have a promocode?/i,
      });

      expect(promoButton).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText('SOLVD2024'),
      ).not.toBeInTheDocument();

      fireEvent.click(promoButton);
      expect(screen.queryByPlaceholderText('SOLVD2024')).toBeInTheDocument();

      (useIsMobile as jest.Mock).mockReturnValue(true);
      rerender(<Bag />);
      expect(screen.getByTestId('summary__title-mobile')).toBeInTheDocument();
      expect(
        screen.getByTestId('order__checkout-button-mobile'),
      ).toBeInTheDocument();
    });
  });

  describe('bag page works correctly', () => {
    beforeEach(() => {
      (enqueueSnackbar as jest.Mock).mockClear();
      (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 1 } } });
      (useIsMobile as jest.Mock).mockReturnValue(false);
    });

    it('should increase item amount', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [mockItems[0]],
        isLoading: false,
      });
      render(<Bag />);

      const increaseButton = screen.getByTestId('quantity-desktop__increase');

      fireEvent.click(increaseButton);
      expect(increaseCartItemAmount).toHaveBeenCalledWith(1, 1, 39);
    });

    it('should decrease item amount', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [mockItems[1]],
        isLoading: false,
      });
      render(<Bag />);

      const decreaseButton = screen.getByTestId('quantity-desktop__decrease');

      fireEvent.click(decreaseButton);
      expect(decreaseCartItemAmount).toHaveBeenCalledWith(1, 1, 'unselected');
    });

    it('should delete item', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [mockItems[0]],
        isLoading: false,
      });
      render(<Bag />);

      fireEvent.click(screen.getByTestId('bag-item__delete-button'));
      expect(deleteFromCartQuery).toHaveBeenCalledWith(1, 39, 1);
      expect(enqueueSnackbar).toHaveBeenCalledWith(
        'Successfully deleted from cart',
        {
          variant: 'success',
          autoHideDuration: 2000,
        },
      );
    });

    it('should change selected size of item', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [mockItems[1]],
        isLoading: false,
      });
      render(<Bag />);

      fireEvent.change(screen.getByTestId('bag-item__size'), {
        target: {
          value: 40,
        },
      });
      expect(changeSelectedSize).toHaveBeenCalledWith(mockItems[1], 40, 1);
    });

    it('should redirect to products page after clicking Add product', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: [],
        isLoading: false,
      });
      render(<Bag />);

      const addProductButton = screen.getByRole('button', {
        name: /Add product/i,
      });

      expect(addProductButton.closest('a')).toHaveAttribute(
        'href',
        '/products',
      );
    });

    it('should redirect to products page after clicking Continue shopping', () => {
      (useQueryCartItems as jest.Mock).mockReturnValue({
        data: mockItems,
        isLoading: false,
      });
      render(<Bag />);

      const continueShoppingButton = screen.getByRole('link', {
        name: /Continue shopping/i,
      });

      expect(continueShoppingButton.closest('a')).toHaveAttribute(
        'href',
        '/products',
      );
    });
  });
});
