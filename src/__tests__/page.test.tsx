import Home from '@/app/page';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

describe('Page - example test', () => {
  it('renders a heading - example test', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {level: 1});

    expect(heading).toBeInTheDocument();
  });
});
