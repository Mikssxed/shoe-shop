import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

// Import internal components and hooks

// Import utility functions
import CheckoutForm from '@/app/(home)/bag/(checkout-flow)/checkout/components/CheckoutForm';
import Checkout from '@/app/(home)/bag/(checkout-flow)/checkout/page';
import { useIsMobile } from '@/hooks';
import { useQueryCartItems } from '@/tools';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

jest.mock('@/tools');
jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('next/navigation');
jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  PaymentElement: () => <div data-testid="payment-element" />, // Mock PaymentElement
  Elements: ({ children }: PropsWithChildren) => <div>{children}</div>, // Mock Elements
}));

describe('Checkout Page', () => {
  const mockRouter = {
    push: jest.fn(),
    pathname: '/',
  };

  const mockSession = {
    user: {
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
  };
  const mockCart = [{ price: 100, amount: 1 }];
  const mockClientSecret = 'test_client_secret';
  const mockOrderId = 'test_order_id';
  const mockElements = {
    getElement: jest.fn().mockReturnValue({}),
  };
  const setupMocks = () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: mockSession,
    });
    (usePathname as jest.Mock).mockReturnValue('/products');
    (useQueryCartItems as jest.Mock).mockReturnValue({ data: [] });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useIsMobile as jest.Mock).mockReturnValue(false);

    jest
      .spyOn(require('next-auth/react'), 'useSession')
      .mockReturnValue({ data: mockSession });
    jest
      .spyOn(require('@/tools'), 'useQueryCartItems')
      .mockReturnValue({ data: mockCart });
    jest.spyOn(require('axios'), 'post').mockResolvedValue({
      data: { clientSecret: mockClientSecret, id: mockOrderId },
    });

    (axios.post as jest.Mock).mockResolvedValue({
      data: { clientSecret: mockClientSecret, id: mockOrderId },
    });
    (useElements as jest.Mock).mockReturnValue(mockElements); // Return mockElements
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('renders loading skeletons when clientSecret and session are not available', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { clientSecret: null, id: mockOrderId },
    });
    await act(async () => {
      render(<Checkout />);
    });

    expect(screen.getByTestId('checkout-form-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('bag__summary__skeleton')).toBeInTheDocument();
  });

  it('renders CheckoutForm when clientSecret is available', async () => {
    await act(async () => {
      render(<Checkout />);
    });

    await screen.findByTestId('checkout-form');

    expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
  });

  it('renders the component with default values from session', () => {
    render(<CheckoutForm id="test_order_id" />);

    // Check if the main container is rendered
    expect(screen.getByTestId('checkout-form')).toBeInTheDocument();

    // Check if personal info fields are rendered
    expect(screen.getByTestId('Name-input')).toBeInTheDocument();
    expect(screen.getByTestId('Surname-input')).toBeInTheDocument();
    expect(screen.getByTestId('Email-input')).toBeInTheDocument();
    expect(screen.getByTestId('Phone Number-input')).toBeInTheDocument();

    // Check if shipping info fields are rendered
    expect(screen.getByTestId('Country-input')).toBeInTheDocument();
    expect(screen.getByTestId('City-input')).toBeInTheDocument();
    expect(screen.getByTestId('State-input')).toBeInTheDocument();
    expect(screen.getByTestId('Zip Code-input')).toBeInTheDocument();
    expect(screen.getByTestId('Address-input')).toBeInTheDocument();

    // Check if PaymentElement is rendered
    expect(screen.getByTestId('payment-element')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const confirmPaymentMock = jest.fn().mockResolvedValue({});
    (useStripe as jest.Mock).mockReturnValue({
      confirmPayment: confirmPaymentMock,
    });
    render(<CheckoutForm id="test_order_id" />);
    expect(screen.getByText('Confirm & Pay')).toBeInTheDocument();
    // Simulate form submission
    fireEvent.change(screen.getByTestId('Name-input'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByTestId('Surname-input'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByTestId('Email-input'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByTestId('Phone Number-input'), {
      target: { value: '123456789' },
    });
    fireEvent.change(screen.getByTestId('Country-input'), {
      target: { value: 'USA' },
    });
    fireEvent.change(screen.getByTestId('City-input'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByTestId('State-input'), {
      target: { value: 'NY' },
    });
    fireEvent.change(screen.getByTestId('Zip Code-input'), {
      target: { value: '10001' },
    });
    fireEvent.change(screen.getByTestId('Address-input'), {
      target: { value: '123 Main St' },
    });

    fireEvent.click(screen.getByTestId('order__checkout-button-desktop'));

    await waitFor(() => {
      expect(confirmPaymentMock).toHaveBeenCalled();
    });
  });

  it('handles form submission with error', async () => {
    const confirmPaymentMock = jest.fn().mockResolvedValue({});
    (useStripe as jest.Mock).mockReturnValue({
      confirmPayment: confirmPaymentMock,
    });

    const { rerender } = render(<CheckoutForm id="test_order_id" />);

    fireEvent.click(screen.getByTestId('order__checkout-button-desktop'));

    await waitFor(() => {
      expect(confirmPaymentMock).not.toHaveBeenCalled();
    });
    rerender(<CheckoutForm id="test_order_id" />);
    expect(screen.getByTestId('Address-error')).toBeInTheDocument();
    expect(screen.getByTestId('Zip Code-error')).toBeInTheDocument();
    expect(screen.getByTestId('State-error')).toBeInTheDocument();
    expect(screen.getByTestId('City-error')).toBeInTheDocument();
    expect(screen.getByTestId('Country-error')).toBeInTheDocument();
  });

  it('renders mobile-specific elements when on mobile', () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);

    render(<CheckoutForm id="test_order_id" />);

    expect(screen.getByTestId('summary__title-mobile')).toBeInTheDocument();
  });
});
