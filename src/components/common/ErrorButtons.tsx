import { Button } from '@mui/material';
import Link from 'next/link';

type Props = {
  onClick: () => void;
  cancelButtonText: string;
};

const ErrorButtons = ({ onClick, cancelButtonText }: Props) => {
  return (
    <>
      <Button variant="outlined" onClick={onClick}>
        {cancelButtonText}
      </Button>
      <Link href="/">
        <Button sx={{ width: '100%' }} variant="contained">
          Home
        </Button>
      </Link>
    </>
  );
};

export default ErrorButtons;
