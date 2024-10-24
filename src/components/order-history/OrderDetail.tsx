import { Box, Tooltip, Typography } from '@mui/material';
import { OrderInfoProps } from '@/lib/types';

const OrderDetail = ({
  labelText,
  infoText,
  reversed,
  containerStyle,
  infoStyle,
}: OrderInfoProps) => {
  return (
    <Box sx={{ display: 'flex', ...containerStyle }}>
      {!reversed ? (
        <>
          <Typography variant="orderLabel" sx={{ mr: '4px' }}>
            {labelText}
          </Typography>
          <Tooltip title={`${infoText}`} placement="top-end">
            <Typography variant="orderInfo" sx={{ ...infoStyle }}>
              {infoText}
            </Typography>
          </Tooltip>
        </>
      ) : (
        <>
          <Typography variant="orderInfo" sx={{ mr: '4px' }}>
            {labelText}
          </Typography>
          <Typography variant="orderLabel" sx={{ mx: 'auto' }}>
            {infoText}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default OrderDetail;
