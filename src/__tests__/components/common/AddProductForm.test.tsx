import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AddProductForm } from '@/components/common';
import ProductForm from '@/components/forms/ProductForm';

jest.mock('@/components/forms/ProductForm', () => {
  return jest.fn(() => <div data-testid="product-info-form" />);
});

describe('AddProductForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddProductForm component', () => {
    render(<AddProductForm />);

    const productInfoForm = screen.getByTestId('product-info-form');
    expect(productInfoForm).toBeInTheDocument();
  });

  test('passes correct title and description to ProductForm', () => {
    render(<AddProductForm />);

    expect(ProductForm).toHaveBeenCalledWith(
      {
        title: 'Add a product',
        desc: `Fill out the fields below to add a new product to the catalog. Enter the product name, price, gender, brand, and a detailed description. You can also upload images of the product.`,
      },
      {},
    );
  });
});
