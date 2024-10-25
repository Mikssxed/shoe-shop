import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { FieldError } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { queryClient } from '@/tools';
import { ListProductImages } from '@/components/common';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn().mockReturnValue({ data: [] }),
}));

jest.mock('@/hooks', () => ({
  useUploadImages: jest.fn(() => ({
    mutateAsync: jest.fn((_, { onSuccess }) => onSuccess([{ id: 1 }])),
  })),
}));

jest.mock('@/tools', () => ({
  queryClient: {
    setQueryData: jest.fn(),
  },
}));

describe('ListProductImages Component', () => {
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

  beforeEach(() => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProductImages,
    });
  });

  test('renders component with images', () => {
    render(<ListProductImages queryKey={['productUploadedImages']} />);

    const images = screen.getAllByTestId('product-image');
    expect(images.length).toBe(mockProductImages.length);
  });

  test('renders skeleton placeholders when images are loading', async () => {
    render(<ListProductImages queryKey={['testQueryKey']} />);

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['dummy content'], 'test-image.jpg', {
      type: 'image/jpg',
    });

    await userEvent.upload(fileInput, file);

    const skeleton = screen.getAllByTestId('skeleton');
    expect(skeleton.length).toBeGreaterThan(0);
  });

  test('triggers onChange when new files are uploaded', async () => {
    const mockSetQueryData = jest.spyOn(queryClient, 'setQueryData');

    render(<ListProductImages queryKey={['testQueryKey']} error={undefined} />);

    const fileInput = screen.getByTestId('file-input');
    const file = new File(['dummy content'], 'test-image.jpg', {
      type: 'image/jpg',
    });
    await userEvent.upload(fileInput, file);

    await waitFor(() => {
      expect(mockSetQueryData).toHaveBeenCalled();
    });
  });

  test('renders error message if error is passed and no images', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
    });

    render(
      <ListProductImages
        queryKey={['testQueryKey']}
        error={{ message: 'This field is required' } as FieldError}
      />,
    );

    const errorMessage = screen.getByText(/This field is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('opens delete modal and deletes an image', async () => {
    const mockSetQueryData = jest.spyOn(queryClient, 'setQueryData');

    render(<ListProductImages queryKey={['testQueryKey']} error={undefined} />);

    const deleteButton = screen.getAllByTestId('delete-image-button')[0];
    expect(deleteButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(deleteButton);
    });

    const deleteModalText = screen.getAllByText(
      'Do you want to delete the selected image?',
    )[0];
    expect(deleteModalText).toBeInTheDocument();

    const confirmButton = screen.getAllByText('Delete')[1];
    act(() => {
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      expect(mockSetQueryData).toHaveBeenCalled();
    });
  });
});
