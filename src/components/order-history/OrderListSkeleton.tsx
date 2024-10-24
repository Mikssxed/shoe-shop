import { Stack, Skeleton } from '@mui/material';

const OrderListSkeleton = () => {
  return (
    <Stack gap={2}>
      {[...Array(3)].map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          sx={{ width: '100%', height: { xs: '102px', md: '56px' } }}
        />
      ))}
    </Stack>
  );
};

export default OrderListSkeleton;
