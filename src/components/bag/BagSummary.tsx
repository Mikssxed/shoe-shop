import { Box, Typography } from '@mui/material';

import OrderForm from '@/components/forms/OrderForm';

const BagSummary: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'sticky',
        alignSelf: 'flex-start',
        top: { xs: '32px', md: '200px' },
        flexDirection: 'column',
        maxWidth: '400px',
        flex: '1',
      }}
    >
      <Typography
        data-testid="summary__title-desktop"
        variant="h1"
        sx={{ mb: '68px', display: { xs: 'none', md: 'block' } }}
      >
        Summary
      </Typography>

      <OrderForm />
    </Box>
  );
};

export default BagSummary;
