import BaseModal from './BaseModal';

type DeleteModalProps = {
  name: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text?: string;
};

const defaultText =
  'This action cannot be undone. Please confirm deletion of this item. If you do not want to complete this action press Cancel.';

const DeleteModal = ({
  name,
  open,
  onClose,
  onSubmit,
  text = defaultText,
}: DeleteModalProps) => {
  return (
    <BaseModal
      onClose={onClose}
      onSubmit={onSubmit}
      text={defaultText}
      open={open}
      submitText="Delete"
      header={`Are you sure you want to delete ${name}?`}
    />
  );
};

export default DeleteModal;
