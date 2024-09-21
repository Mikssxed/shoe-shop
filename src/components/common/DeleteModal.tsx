import BaseModal from './BaseModal';

type DeleteModalProps = {
  name: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text?: string;
};

const defaultText =
  'Lorem ipsum dolor sit amet cosectetur. Sed imerdient tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor amet consectetur.';

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
