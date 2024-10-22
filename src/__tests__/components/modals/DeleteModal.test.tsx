import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DeleteModal } from '@/components/modals';

export const mockModalProps = {
  name: 'product',
  open: true,
  text: 'This action cannot be undone. Please confirm deletion of this item. If you do not want to complete this action press Cancel.',
  onClose: jest.fn(),
  onSubmit: jest.fn(),
};

describe('DeleteModal component', () => {
  beforeEach(() => {
    render(
      <DeleteModal
        name={mockModalProps.name}
        open={mockModalProps.open}
        onClose={mockModalProps.onClose}
        onSubmit={mockModalProps.onSubmit}
        text={mockModalProps.text}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render delete modal and its content', () => {
    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal__cross')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Are you sure you want to delete product?/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockModalProps.text)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('should call onClose function after click on Cancel button', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockModalProps.onClose).toHaveBeenCalled();
  });

  it('should call onClose function after click on cross', () => {
    fireEvent.click(screen.getByTestId('modal__cross'));
    expect(mockModalProps.onClose).toHaveBeenCalled();
  });

  it('should call onSubmit function after click on delete button', () => {
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(mockModalProps.onSubmit).toHaveBeenCalled();
  });
});
