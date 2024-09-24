import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { Gallery } from 'iconsax-react';

import { stylingConstants } from '@/lib/constants/themeConstants';
import {
  imageCoverOnHover,
  imageUploadBox,
  imageUploadText,
  inputContainer,
  productImageContainer,
  trashIconContainer,
} from '@/styles/products/productInfoFormStyles';
import DeleteModal from './DeleteModal';
import ErrorMessage from '../ui/ErrorMessage';
import { IListProductImagesProps } from '@/lib/types';

const ListProductImages = ({
  productImages = [],
  onChange,
  getRootProps,
  isDragActive,
  getInputProps,
  error,
}: IListProductImagesProps) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);

  function onDelete() {
    const updatedImages = productImages.filter(
      (_, index) => index !== selectedIndex,
    );
    onChange(updatedImages);
    setIsDelete(false);
  }

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    setIsDelete(true);
  };

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <Box
      component="div"
      sx={{ ...inputContainer, maxWidth: { xs: '436px', lg: 'none' } }}
    >
      <InputLabel>Product Images</InputLabel>
      <Grid
        container
        spacing={{ xs: 2, sm: 5, lg: 2 }}
        sx={{ minWidth: { xl: '692px' } }}
      >
        {productImages.map((item, index) => {
          return (
            <Grid key={item.preview + index} item xs={6} lg={12} xl={6}>
              <Box sx={productImageContainer}>
                <Box sx={imageCoverOnHover}>
                  <IconButton
                    sx={trashIconContainer}
                    onClick={() => handleDeleteClick(index)}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={'/icons/trash.svg'}
                      alt="trash"
                    />
                  </IconButton>
                </Box>
                <Image
                  src={item.preview}
                  alt={'Product Image'}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  sizes="100%"
                />
              </Box>
              <DeleteModal
                open={isDelete}
                name="selected image"
                onClose={() => setIsDelete(false)}
                onSubmit={onDelete}
                text={`Do you want to delete the selected image?`}
              />
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sm={productImages.length > 0 ? 6 : 12}
          lg={12}
          xl={6}
          padding={0}
        >
          <Paper
            {...getRootProps()}
            elevation={0}
            sx={{
              ...imageUploadBox,
              borderColor: `${error && productImages.length < 1 ? stylingConstants.palette.error.main : isDragActive ? '#aaa' : stylingConstants.palette.text.secondary}`,
              mb: '3px',
            }}
          >
            <input
              {...getInputProps()}
              onChange={e => {
                onChange(e.target.files);
              }}
            />
            <Gallery
              size="38"
              color={stylingConstants.palette.grey[500]}
              style={{ flexShrink: 0 }}
            />
            <Typography variant="body1" sx={imageUploadText}>
              Drop your image here, <br />
              or select{' '}
              <span style={{ color: '#151e7a', textDecoration: 'underline' }}>
                click to browse
              </span>
            </Typography>
          </Paper>
          {error && productImages.length < 1 && (
            <ErrorMessage errorMessage={error?.message} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListProductImages;