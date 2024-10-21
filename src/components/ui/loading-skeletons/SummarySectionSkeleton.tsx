import { Box, Skeleton, Typography } from '@mui/material';

const SummarySectionSkeleton = () => {
  return (
    <Box
      data-testid="bag__summary__skeleton"
      sx={{
        mt: '60px',
        mb: '70px',
        mx: 'auto',
        width: { xs: '90%', sm: '400px' },
      }}
    >
      <Typography variant="h1" component="h2" sx={{ marginBottom: '2' }}>
        <Skeleton variant="text" width={100} />
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {new Array(3).fill(0).map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '4px',
            }}
          >
            <Typography variant="h2">
              <Skeleton variant="text" width={50} />
            </Typography>
            <Typography variant="h2">
              <Skeleton variant="text" width={50} />
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          pt: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          mt: '60px',
          pb: '30px',
          borderTop: '1px solid #EAECF0',
          borderBottom: '1px solid #EAECF0',
        }}
      >
        <Typography variant="h2" sx={{ marginTop: '4' }}>
          <Skeleton variant="text" width={100} />
        </Typography>
        <Typography variant="h2" sx={{ marginTop: '4' }}>
          <Skeleton variant="text" width={100} />
        </Typography>
      </Box>
    </Box>
  );
};

export default SummarySectionSkeleton;
