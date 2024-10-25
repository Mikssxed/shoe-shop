import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';

import { SelectSizes } from '@/components/controlled';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { mockFiltersData } from '@/lib/mocks/productInfoFormMock';

const { data: filtersData } = mockFiltersData;

const TestComponent = () => {
  const { control } = useForm({
    defaultValues: { sizes: [0, 0, 0] },
  });

  return (
    <SelectSizes name="sizes" control={control} filtersData={filtersData} />
  );
};

const TestComponentWithError = () => {
  const { control, setError } = useForm({
    defaultValues: {
      sizes: [0, 0, 0],
    },
  });
  setError('sizes', { type: 'manual', message: 'Field is required' });

  return (
    <SelectSizes name="sizes" control={control} filtersData={filtersData} />
  );
};

describe('ListProductImages Component', () => {
  test('renders the size buttons correctly', () => {
    render(<TestComponent />);

    expect(screen.getByText('EU-36')).toBeInTheDocument();
    expect(screen.getByText('EU-37')).toBeInTheDocument();
    expect(screen.getByText('EU-38')).toBeInTheDocument();
  });

  test('clicking size buttons updates the values correctly', async () => {
    render(<TestComponent />);

    const button36 = screen.getByText('EU-36');
    const button37 = screen.getByText('EU-37');

    expect(button36).toHaveStyle(
      `border-color: ${stylingConstants.palette.grey[700]}`,
    );
    expect(button37).toHaveStyle(
      `border-color: ${stylingConstants.palette.grey[700]}`,
    );

    fireEvent.click(button36);

    waitFor(() => {
      expect(button36).toHaveStyle(
        `border-color: ${stylingConstants.palette.error.main}`,
      );
    });

    fireEvent.click(button37);

    waitFor(() => {
      expect(button37).toHaveStyle(
        `border-color: ${stylingConstants.palette.error.main}`,
      );
    });
  });

  test('displays the error message when there is an error', () => {
    render(<TestComponentWithError />);

    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });
});
