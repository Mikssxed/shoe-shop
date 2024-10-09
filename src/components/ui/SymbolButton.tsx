import { MouseEvent, ReactNode } from 'react';
import { Button } from '@mui/material';
import { buttonStyles } from '@/styles/commonStyles';

interface ISymbolButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
}

const SymbolButton: React.FC<ISymbolButtonProps> = ({
  children,
  onClick,
  disabled = false,
  dataTestId,
}) => {
  return (
    <Button
      data-testid={dataTestId}
      sx={{
        ...buttonStyles.symbolBtn,
        position: 'relative',
        bgcolor: disabled ? '#E8E8E8' : '#FFD7D6',
        filter: disabled ? 'grayscale(100%)' : undefined,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SymbolButton;
