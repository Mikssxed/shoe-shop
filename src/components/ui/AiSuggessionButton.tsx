import { Button, Typography } from '@mui/material';

import styles from '@/styles/components/ui/AiSuggessionButton.style';
import { AnimatedThreeDots, LogoIcon } from '@/components/ui/icons';

type Props = {
  onClick?: () => void;
  disabled: boolean;
  isLoading?: boolean;
};

export const AiSuggessionButton: React.FC<Props> = ({
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Button
      sx={styles.root}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      data-testid="ai-button"
    >
      <Typography sx={styles.text}>Use AI suggestion</Typography>
      {isLoading ? <AnimatedThreeDots /> : <LogoIcon />}
    </Button>
  );
};
