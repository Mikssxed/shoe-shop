import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    priority,
    fill,
    onLoad,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    fill?: boolean;
  }) => {
    return <img {...props} onLoad={onLoad} />;
  },
}));

describe('ImageWithSkeleton Component', () => {
  const preview = `https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/733f449a54204462b9ee3cc5e116983c_9366/Campus_00s_x_Mata_Bialy_JQ4891_01_00_standard.jpg`;
  test('renders skeleton initially while the image is loading', () => {
    render(<ImageWithSkeleton src={preview} />);

    const skeleton = screen.getByRole('img', { hidden: true });
    expect(skeleton).toBeInTheDocument();
  });

  test('renders the image and hides the skeleton after loading', async () => {
    render(<ImageWithSkeleton src={preview} />);

    const img = screen.getByTestId('product-image');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', preview);

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();

    fireEvent.load(img);

    await waitFor(() => {
      expect(skeleton).not.toBeInTheDocument();
    });
  });
});
