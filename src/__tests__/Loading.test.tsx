import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageLoading from '@/app/loading';

describe('PageLoading', () => {
  it('renders the loading logo', () => {
    render(<PageLoading />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/icons/logo.svg');
  });

  it('has the correct styles applied', () => {
    const { container } = render(<PageLoading />);

    const box = container.firstChild;

    expect(box).toHaveStyle('position: absolute');
    expect(box).toHaveStyle('top: 0');
    expect(box).toHaveStyle('left: 0');
    expect(box).toHaveStyle('width: 100vw');
    expect(box).toHaveStyle('height: 100vh');
    expect(box).toHaveStyle('display: flex');
    expect(box).toHaveStyle('align-items: center');
    expect(box).toHaveStyle('justify-content: center');
  });

  it('applies the correct animation to the image', () => {
    const { getByAltText } = render(<PageLoading />);
    const logo = getByAltText('logo');

    expect(logo).toHaveStyle('animation: spinAndGlow 3s infinite linear');
    expect(logo).toHaveStyle('transform-origin: center');
  });
});
