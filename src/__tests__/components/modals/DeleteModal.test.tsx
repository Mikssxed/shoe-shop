import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DeleteModal } from '@/components/common';
import { mockModalProps } from '@/lib/mocks/DeleteModalMock';

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
    expect(screen.getByTestId('deleteModal')).toBeInTheDocument();
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
