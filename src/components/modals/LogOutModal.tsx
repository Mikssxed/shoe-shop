import BaseModal from './BaseModal';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function LogOutModal({ open, onClose, onSubmit }: Props) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText="Log out"
      header="Are you sure you want to log out?"
    />
  );
}

export default LogOutModal;
