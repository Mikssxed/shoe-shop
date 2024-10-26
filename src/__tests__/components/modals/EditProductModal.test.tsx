import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PropsWithChildren } from 'react';
import { SxProps } from '@mui/material';

import { EditProductModal } from '@/components/modals';
import ProductForm from '@/components/forms/ProductForm';
import { mockProduct } from '@/lib/mocks/productInfoFormMock';

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  keepMounted?: boolean;
  containerStyle?: SxProps;
  paperStyle?: SxProps;
};

//TODO: check tests after changes in EditProductModal

jest.mock('@/components/forms/ProductForm', () => {
  return jest.fn(() => <div data-testid="product-info-form" />);
});

jest.mock('@/components/ui/Modal', () => {
  const Modal = ({ open, onClose, children }: ModalProps) => (
    <div data-testid="modal" style={{ display: open ? 'block' : 'none' }}>
      <button onClick={onClose}>Close Modal</button>
      {children}
    </div>
  );
  Modal.displayName = 'Modal';
  return Modal;
});

describe('EditProductModal Component', () => {
  test('renders EditProductModal when open is true', () => {
    render(
      <EditProductModal
        open={true}
        onClose={jest.fn()}
        product={mockProduct}
      />,
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();

    const productInfoForm = screen.getByTestId('product-info-form');
    expect(productInfoForm).toBeInTheDocument();
  });

  test('does not display Modal when open is false', () => {
    render(
      <EditProductModal
        open={false}
        onClose={jest.fn()}
        product={mockProduct}
      />,
    );

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).not.toBeVisible();
  });

  test('passes correct props to ProductInfoForm', () => {
    render(
      <EditProductModal
        open={true}
        onClose={jest.fn()}
        product={mockProduct}
      />,
    );

    expect(ProductForm).toHaveBeenCalledWith(
      {
        title: 'Edit product',
        desc: `Use the form below to edit the details of the product. Update the product name, price, gender, brand, and description as needed. You can also upload or remove product images.`,
        product: mockProduct,
        onClose: expect.any(Function),
        openEditModal: true,
        mode: 'edit',
      },
      {},
    );
  });

  test('calls onClose when modal close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <EditProductModal
        open={true}
        onClose={mockOnClose}
        product={mockProduct}
      />,
    );

    fireEvent.click(screen.getByText(/Close Modal/i));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
