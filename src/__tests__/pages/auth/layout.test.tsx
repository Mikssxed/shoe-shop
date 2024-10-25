import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@/app/auth/layout';
import { usePathname } from 'next/navigation';

jest.mock('@/components/common/SideImageLayout', () =>
  // eslint-disable-next-line react/display-name
  ({ children }: { children: React.ReactNode }) => (
    <div data-testid="side-image-layout">{children}</div>
  ),
);

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useServerInsertedHTML: jest.fn(),
}));

describe('Layout component', () => {
  const childrenContent = 'Test children content';

  it('renders children correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/auth/sign-in');

    render(
      <Layout>
        <div>{childrenContent}</div>
      </Layout>,
    );

    expect(screen.getByText(childrenContent)).toBeInTheDocument();
  });

  it('sets correct imageSrc for /auth/sign-in', () => {
    (usePathname as jest.Mock).mockReturnValue('/auth/sign-in');

    render(
      <Layout>
        <div>{childrenContent}</div>
      </Layout>,
    );

    const sideImageLayout = screen.getByTestId('side-image-layout');
    expect(sideImageLayout).toBeInTheDocument();
  });

  it('shows testimonial for /auth/sign-up', () => {
    (usePathname as jest.Mock).mockReturnValue('/auth/sign-up');

    render(
      <Layout>
        <div>{childrenContent}</div>
      </Layout>,
    );

    expect(screen.getByTestId('side-image-layout')).toBeInTheDocument();
  });
});
