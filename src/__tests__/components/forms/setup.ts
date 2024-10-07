import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function setup(tsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
}
