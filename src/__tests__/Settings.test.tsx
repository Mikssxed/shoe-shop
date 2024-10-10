import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ProfileSettings from '@/app/(home)/profile/settings/page';
import DeleteAvatarModal from '@/components/modals/DeleteAvatarModal';
import { useIsMobile } from '@/hooks';
import { mockSession } from '@/lib/mocks';
import {
  useDeleteAvatarMutation,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from '@/tools/mutations';

jest.mock('next-auth/react');
jest.mock('@/hooks');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/tools/mutations');

const queryClient = new QueryClient();

const mockProfileUpdate = jest.fn();
const mockAvatarUpload = jest.fn();

(useUpdateProfileMutation as jest.Mock).mockReturnValue({
  mutateAsync: mockProfileUpdate,
  isPending: false,
});

(useUploadAvatarMutation as jest.Mock).mockReturnValue({
  mutateAsync: mockAvatarUpload,
  isPending: false,
  isSuccess: false,
  reset: jest.fn(),
});
describe('ProfileSettings Component', () => {
  let mockDeleteAvatarMutation: jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue(mockSession);

    // Mock useIsMobile hook
    (useIsMobile as jest.Mock).mockReturnValue(false);

    // Mock next/navigation hooks
    (usePathname as jest.Mock).mockReturnValue('/profile/settings');
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/',
    });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    mockDeleteAvatarMutation = jest.fn();
    (useDeleteAvatarMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockDeleteAvatarMutation,
      isPending: false,
    });
  });

  it('should render profile settings form with pre-filled user data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('Name-input')).toHaveValue('John');
    expect(screen.getByTestId('Surname-input')).toHaveValue('Doe');
    expect(screen.getByTestId('Email-input')).toHaveValue(
      'johndoe@example.com',
    );
    expect(screen.getByTestId('Phone number-input')).toHaveValue('+123456789');

    expect(
      screen.getByRole('button', { name: 'Save Changes' }),
    ).toBeInTheDocument();
  });
  it('should trigger form submission when file is selected', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    const fileInput = screen.getByLabelText('Change Photo');
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    // Simulate selecting a file
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    // Expect the mutation to be called with the file
    await waitFor(() => {
      expect(mockAvatarUpload).toHaveBeenCalledTimes(1);
      expect(mockAvatarUpload).toHaveBeenCalledWith(expect.any(FormData));
    });
  });

  it('should open and close delete avatar modal', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    const deleteButton = screen.getByText('Delete');

    // Open modal
    fireEvent.click(deleteButton);
    expect(
      screen.getByTestId(
        'modal-Are you sure that you want to delete your current avatar?',
      ),
    ).toBeVisible();

    // Close modal
    const closeButton = within(
      screen.getByTestId(
        'modal-Are you sure that you want to delete your current avatar?',
      ),
    ).getByText('Cancel');
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(
        screen.queryByTestId(
          'modal-Are you sure that you want to delete your current avatar?',
        ),
      ).toHaveClass('MuiModal-hidden'),
    );
  });

  it('should trigger avatar deletion when confirming', async () => {
    const onCloseModal = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <DeleteAvatarModal isOpened={true} onCloseModal={onCloseModal} />
      </QueryClientProvider>,
    );

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockDeleteAvatarMutation).toHaveBeenCalledTimes(1);
    });

    expect(onCloseModal).toHaveBeenCalledTimes(1);

    (useSession as jest.Mock).mockReturnValue({
      ...mockSession,
      data: {
        ...mockSession.data,
        user: {
          ...mockSession.data.user,
          avatar: null,
        },
      },
    });
  });

  it('should update profile with valid data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    // Update the form fields
    fireEvent.change(screen.getByTestId('Name-input'), {
      target: { value: 'Jane' },
    });

    fireEvent.change(screen.getByTestId('Surname-input'), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByTestId('Phone number-input'), {
      target: { value: '+987654321' },
    });
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    // Ensure mutateAsync is called with updated data
    await waitFor(() => {
      expect(mockProfileUpdate).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'johndoe@example.com',
        phoneNumber: '+987654321',
        id: undefined,
        jwt: undefined,
      });
    });
  });

  it('should not update profile with invalid phone number', async () => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    await act(async () => {
      // Simulating the change and click events inside act()
      fireEvent.change(screen.getByTestId('Phone number-input'), {
        target: { value: 'invalid-phone' },
      });

      fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    });

    expect(mockProfileUpdate).not.toHaveBeenCalled();
  });

  it('should display error message when Name is empty', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    // Clear the Name input
    fireEvent.change(screen.getByTestId('Name-input'), {
      target: { value: '' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    // Expect the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 2 characters'),
      ).toBeInTheDocument();
    });

    // Ensure the profile update function was not called
    expect(mockProfileUpdate).not.toHaveBeenCalled();
  });
  it('should keep email field disabled', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    // Ensure the email input is disabled
    expect(screen.getByTestId('Email-input')).toBeDisabled();
  });

  it('should show error when only spaces are input as Name', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfileSettings />
      </QueryClientProvider>,
    );

    // Input only spaces as the Name
    fireEvent.change(screen.getByTestId('Name-input'), {
      target: { value: '   ' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));

    // Expect the error message to be displayed
    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 2 characters'),
      ).toBeInTheDocument();
    });

    // Ensure the profile update function was not called
    expect(mockProfileUpdate).not.toHaveBeenCalled();
  });

  // TODO: Add tests for avatar file format after fixing bug with it
});
