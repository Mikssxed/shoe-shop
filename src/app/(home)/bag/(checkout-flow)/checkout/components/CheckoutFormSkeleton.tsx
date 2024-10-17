import { bagPageStyles as styles } from '@/styles/bag/bag.style';
import {
  Box,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

export default function CheckoutFormSkeleton() {
  return (
    <>
      <Container
        component={'main'}
        maxWidth="xl"
        sx={{ ...styles.main, pt: 0, flexDirection: 'column' }}
      >
        <Typography>
          <Skeleton width={100} height={30} />
        </Typography>
        <Box sx={styles.container}>
          <Typography variant="h1" sx={{ mb: 8 }}>
            <Skeleton width={300} height={60} />
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Skeleton width={200} height={40} />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
          </Grid>
          <Divider sx={styles.itemsDivider} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Skeleton width={200} height={40} />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
          </Grid>
          <Divider sx={styles.itemsDivider} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            <Skeleton width={200} height={40} />
          </Typography>

          <Skeleton variant="rectangular" height={56} />
        </Box>
      </Container>
    </>
  );
}
