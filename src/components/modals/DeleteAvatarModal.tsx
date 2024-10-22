import { BaseModal } from '@/components/common';
import { IDeleteAvatarModalProps } from '@/lib/types';
import { useDeleteAvatarMutation } from '@/hooks';

const DeleteAvatarModal = ({
  isOpened,
  onCloseModal,
}: IDeleteAvatarModalProps) => {
  const deleteMutation = useDeleteAvatarMutation();

  const onConfirmDelete = async () => await deleteMutation.mutateAsync();

  return (
    <BaseModal
      open={isOpened}
      header="Are you sure that you want to delete your current avatar?"
      text="You avatar will be immediately deleted from your profile after confirming"
      onClose={onCloseModal}
      onSubmit={onConfirmDelete}
      submitText="Confirm"
    />
  );
};

export default DeleteAvatarModal;
