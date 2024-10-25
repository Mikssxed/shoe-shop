import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useQuery } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { useChat } from 'ai/react';

import ProductForm from '@/components/forms/ProductForm';
import { mockProduct, mockFiltersData } from '@/lib/mocks/productInfoFormMock';
import { useFilters, useProducts } from '@/tools';
import { useCreateProduct, useEditProduct, useUploadImages } from '@/hooks';

jest.mock('@/tools');
jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('next/navigation');
jest.mock('ai/react', () => ({
  useChat: jest.fn(),
}));
jest.mock('notistack', () => ({ enqueueSnackbar: jest.fn() }));
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}));

const mockProductImages = [
  {
    id: 1,
    preview: 'https://example.com/image1.jpg',
  },
  {
    id: 2,
    preview: 'https://example.com/image2.jpg',
  },
];

const fillUpForm = async (formData: {
  name: string;
  price: string;
  description: string;
  file: { name: string; type: string };
  size: string;
  category: string;
  color: string;
  gender: string;
  brand: string;
}) => {
  await userEvent.type(screen.getByTestId('name-input'), formData.name);
  await userEvent.type(screen.getByTestId('price-input'), formData.price);
  await userEvent.type(
    screen.getByTestId('description-input'),
    formData.description,
  );

  window.URL.createObjectURL = jest
    .fn()
    .mockImplementation(file => `blob:${file.name}`);
  const inputEl = screen.getByTestId('file-input');
  const file = new File(['file'], formData.file.name, {
    type: formData.file.type,
  });
  Object.defineProperty(inputEl, 'files', { value: [file] });
  fireEvent.drop(inputEl);
  await waitFor(() => {
    expect(screen.getAllByAltText('Product Image')[0]).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText(formData.size));

  const selectDropdownOption = async (testId: string, optionName: string) => {
    const dropdown = within(await screen.findByTestId(testId)).getByRole(
      'combobox',
    );
    await userEvent.click(dropdown);
    await userEvent.click(
      await screen.findByRole('option', { name: optionName }),
    );
  };

  await selectDropdownOption('categories-input', formData.category);
  await selectDropdownOption('color-input', formData.color);
  await selectDropdownOption('gender-input', formData.gender);
  await selectDropdownOption('brand-input', formData.brand);
};

const queryClientTests = new QueryClient();
const TestComponent = () => {
  return (
    <QueryClientProvider client={queryClientTests}>
      <ProductForm title={'Add product'} desc={'You can add product here'} />
    </QueryClientProvider>
  );
};

const TestEditComponent = () => {
  return (
    <QueryClientProvider client={queryClientTests}>
      <ProductForm
        title={'Edit Product'}
        desc={'You can edit product here'}
        product={mockProduct}
        onClose={() => {}}
        openEditModal={true}
        mode="edit"
      />
    </QueryClientProvider>
  );
};

describe('ProductForm Component', () => {
  const mockRouter = {
    push: jest.fn(),
    pathname: '/',
  };

  const setupMocks = () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: 'test', id: '1' },
    });
    (usePathname as jest.Mock).mockReturnValue('/profile/add-product');
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useProducts as jest.Mock).mockReturnValue({
      refetch: jest.fn(),
    });
    (useFilters as jest.Mock).mockReturnValue(mockFiltersData);
    (useCreateProduct as jest.Mock).mockReturnValue({
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      data: null,
      isPending: false,
    });
    (useEditProduct as jest.Mock).mockReturnValue({
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      data: null,
      isPending: false,
    });
    (useChat as jest.Mock).mockReturnValue({
      messages: [],
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: false,
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProductImages,
      mutateAsync: jest.fn().mockResolvedValue({
        mockProductImages,
      }),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });
    (useUploadImages as jest.Mock).mockReturnValue({
      data: mockProductImages,
      mutateAsync: jest.fn().mockResolvedValue({
        mockProductImages,
      }),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (enqueueSnackbar as jest.Mock).mockClear();
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        ok: true,
        blob: () =>
          Promise.resolve(new Blob(['image content'], { type: 'image/jpeg' })),
      });
    }) as jest.Mock;
    setupMocks();
  });

  it('should fetch filters', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });
  });

  it('should display title, description and inputs', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    expect(screen.getByText('Add product')).toBeInTheDocument();
    expect(screen.getByText('You can add product here')).toBeInTheDocument();

    expect(await screen.findByTestId('name-input')).toBeInTheDocument();
    expect(await screen.findByTestId('description-input')).toBeInTheDocument();
    expect(await screen.findByTestId('color-input')).toBeInTheDocument();
    expect(await screen.findByTestId('price-input')).toBeInTheDocument();
    expect(await screen.findByTestId('file-input')).toBeInTheDocument();
    expect(await screen.findByTestId('brand-input')).toBeInTheDocument();
    expect(await screen.findByTestId('gender-input')).toBeInTheDocument();
    expect(await screen.findByText('EU-36')).toBeInTheDocument();
  });

  it('should display options and selected value of Color', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const dropdown = within(await screen.findByTestId('color-input')).getByRole(
      'combobox',
    );

    await userEvent.click(dropdown);
    expect(
      await screen.findByRole('option', { name: 'Blue' }),
    ).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('option', { name: 'Red' }));
    expect(screen.getByText('Red')).toBeInTheDocument();
  });

  it('should display options and selected value of Brand', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const dropdown = within(await screen.findByTestId('brand-input')).getByRole(
      'combobox',
    );

    await userEvent.click(dropdown);
    expect(
      await screen.findByRole('option', { name: 'Adidas' }),
    ).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('option', { name: 'Nike' }));
    expect(screen.getByText('Nike')).toBeInTheDocument();
  });

  it('should display options and selected value of Gender', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const dropdown = within(
      await screen.findByTestId('gender-input'),
    ).getByRole('combobox');

    await userEvent.click(dropdown);
    expect(
      await screen.findByRole('option', { name: 'Unisex' }),
    ).toBeInTheDocument();
    await userEvent.click(await screen.findByRole('option', { name: 'Male' }));
    expect(screen.getByText('Male')).toBeInTheDocument();
  });

  it('should change button text if pending', async () => {
    (useEditProduct as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: true,
      isError: false,
      error: null,
      data: null,
      isPending: true,
    });
    render(<TestComponent />);
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('should show snackbar on failed validation and validate all inputs if empty', async () => {
    (useUploadImages as jest.Mock).mockReturnValue({
      data: [],
      mutateAsync: jest.fn().mockResolvedValue({}),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      mutateAsync: jest.fn().mockResolvedValue({}),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });

    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const button = await screen.findByText('Save');

    await userEvent.click(button);

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith(
        'Form validation failed. Please check the fields.',
        {
          variant: 'error',
          autoHideDuration: 2000,
        },
      );
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Price must be positive')).toBeInTheDocument();
      expect(screen.getByText('Color is required')).toBeInTheDocument();
      expect(screen.getByText('Gender is required')).toBeInTheDocument();
      expect(screen.getByText('Brand is required')).toBeInTheDocument();
      expect(
        screen.getByText('You need to pick at least one category'),
      ).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
      expect(
        screen.getByText('You need to pick at least one size'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('You need to upload at least one image'),
      ).toBeInTheDocument();
    });
  });

  it('should validate price if negative value', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });
    await userEvent.type(screen.getByTestId('price-input'), '-100');
    const button = await screen.findByText('Save');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Price must be positive')).toBeInTheDocument();
    });
  });

  it('should validate a string of name that contains only spaces', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });
    await userEvent.type(screen.getByTestId('name-input'), '    ');
    const button = await screen.findByText('Save');

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('should validate too long description', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const str = new Array(302).join('s');
    await userEvent.type(screen.getByTestId('description-input'), str);
    const button = await screen.findByText('Save');

    await userEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText('Do not exceed 300 characters'),
      ).toBeInTheDocument();
    });
  }, 10000);

  it('should upload image', async () => {
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    window.URL.createObjectURL = jest
      .fn()
      .mockImplementation(file => `blob:${file.name}`);
    const inputEl = screen.getByTestId('file-input');
    const file = new File(['file'], 'file.jpg', { type: 'image/png' });
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    fireEvent.drop(inputEl);

    await waitFor(() => {
      const images = screen.getAllByAltText('Product Image');
      expect(images).toHaveLength(2);
    });
  });

  it('should not upload image file', async () => {
    (useUploadImages as jest.Mock).mockReturnValue({
      data: [],
      mutateAsync: jest.fn().mockResolvedValue({}),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      mutateAsync: jest.fn().mockResolvedValue({}),
      mutate: jest.fn((_, { onSuccess }) => {
        onSuccess();
      }),
      isLoading: false,
      isError: false,
      error: null,
      isPending: false,
    });
    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    window.URL.createObjectURL = jest
      .fn()
      .mockImplementation(file => `blob:${file.name}`);
    const inputEl = screen.getByTestId('file-input');
    const file = new File(['file'], 'file.json', { type: 'application/json' });
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);
    await waitFor(() => {
      expect(screen.queryByAltText('Product Image')).not.toBeInTheDocument();
    });
  });

  it('should update categories', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const dropdown = within(
      await screen.findByTestId('categories-input'),
    ).getByRole('combobox');

    await userEvent.click(dropdown);
    expect(
      await screen.findByRole('option', { name: 'Casual' }),
    ).toBeInTheDocument();
    await userEvent.click(
      await screen.findByRole('option', { name: 'Running' }),
    );
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  it('mutation is called after successfull validation', async () => {
    const mutate: any = jest.fn();
    (useCreateProduct as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
      isSuccess: true,
      mutate,
    });

    render(<TestComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    await fillUpForm({
      name: 'Test Product',
      price: '150',
      description: 'Test Description',
      file: { name: 'file.jpg', type: 'image/png' },
      size: 'EU-36',
      category: 'Running',
      color: 'Red',
      gender: 'Male',
      brand: 'Nike',
    });

    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(mutate).toHaveBeenCalledTimes(1);
    });
  }, 10000);

  it('should pre-populate form fields when editing a product', async () => {
    render(<TestEditComponent />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Mock name')).toBeInTheDocument();
      expect(screen.getByDisplayValue('100')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('Lorem ipsum Lorem ipsum'),
      ).toBeInTheDocument();
    });

    const brandDropdown = within(screen.getByTestId('brand-input')).getByRole(
      'combobox',
    );
    await userEvent.click(brandDropdown);
    expect(
      await screen.findByRole('option', { name: 'Nike' }),
    ).toBeInTheDocument();
  });

  it('should disable the save button when a mutation is pending', async () => {
    (useCreateProduct as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<TestComponent />);

    const saveButton = screen.getByText('Saving...');
    expect(saveButton).toBeDisabled();
  });

  it('should update product', async () => {
    const mutate = jest.fn();
    (useEditProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: null,
      mutate,
    });

    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        user: { username: 'test', id: '1', accessToken: 'mockAccessToken' },
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
      },
    });

    render(<TestEditComponent />);
    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });
    await userEvent.type(screen.getByTestId('name-input'), 'Edited product');
    await waitFor(() => {
      const images = screen.getAllByAltText('Product Image');
      expect(images).toHaveLength(2);
    });

    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(mutate).toHaveBeenCalled();
    });
  }, 10000);

  it('exits immediately without calling createProductMutation.mutate or reset when duplicate is true', async () => {
    let createProductMutationMock = jest.fn();
    (useCreateProduct as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      error: null,
      data: null,
      mutate: createProductMutationMock,
    });

    render(
      <QueryClientProvider client={queryClientTests}>
        <ProductForm
          title={'Edit Product'}
          desc={'You can edit product here'}
          mode="create"
          duplicate={true}
        />
      </QueryClientProvider>,
    );

    await fillUpForm({
      name: 'Test Product',
      price: '150',
      description: 'Test Description',
      file: { name: 'file.jpg', type: 'image/png' },
      size: 'EU-36',
      category: 'Running',
      color: 'Red',
      gender: 'Male',
      brand: 'Nike',
    });

    const submitButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(submitButton);

    expect(createProductMutationMock).not.toHaveBeenCalled();
  });

  it('ai button works and updates description', async () => {
    const mockHandleSubmit = jest.fn();

    (useChat as jest.Mock).mockReturnValue({
      messages: [{ content: 'Test product message', role: 'test' }],
      handleInputChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      isLoading: false,
    });

    render(<TestComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });
    await userEvent.type(screen.getByTestId('name-input'), 'Test component');
    await userEvent.click(screen.getByTestId('ai-button'));

    expect(mockHandleSubmit).toHaveBeenCalled();

    expect(screen.getByText('Test product message')).toBeInTheDocument();
  });

  it('should set formStatus to "normal" on error during edit', async () => {
    type MockUseEditProductReturn = {
      mutate: jest.Mock;
      isPending: boolean;
    };
    const mockEditProduct: MockUseEditProductReturn = {
      mutate: jest.fn().mockImplementation((_, { onError }) => {
        onError();
      }),
      isPending: false,
    };
    (useEditProduct as jest.Mock).mockReturnValue(mockEditProduct);

    render(<TestEditComponent />);

    await waitFor(() => {
      expect(useFilters).toHaveBeenCalled();
    });

    const button = await screen.findByText('Save');

    await userEvent.click(button);

    await waitFor(() => {
      expect(mockEditProduct.mutate).toHaveBeenCalled();
    });
  });
});
