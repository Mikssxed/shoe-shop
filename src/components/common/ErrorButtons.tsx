import Link from 'next/link';
import BaseButton from '../ui/BaseButton';

type Props = {
  onClick: () => void;
  cancelButtonText: string;
};

const ErrorButtons = ({ onClick, cancelButtonText }: Props) => {
  return (
    <>
      <BaseButton variant="outlined" onClick={onClick}>
        {cancelButtonText}
      </BaseButton>
      <Link href="/">
        <BaseButton sx={{ width: '100%' }}>Home</BaseButton>
      </Link>
    </>
  );
};

export default ErrorButtons;
