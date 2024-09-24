'use client';

import { Box, Button, Typography, InputLabel } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';

import {
  formAndImagesContainer,
  formSaveButton,
  inputContainer,
  productInfoFormContainer,
  productInfoTitle,
  saveButtonContainer,
} from '@/styles/products/productInfoFormStyles';
import ControlledInput from './ControlledInput';
import ControlledDropdown from '../ui/ControlledDropdown';
import ErrorMessage from '../ui/ErrorMessage';
import { useFilters } from '@/tools';
import { IAddProductRequest } from '@/lib/types/requests/product.type';
import { addProduct, addImages } from '@/tools';
import { IReactQueryError } from '@/lib/types';
import { IAddProductResponse } from '@/lib/types/responses/product.types';
import { AddProductFormSchema, AddProductFormData } from '@/lib/validation';
import { TextArea } from '../ui';
import ListProductImages from './ListProductImages';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { IProductInfoFormProps } from '@/lib/types';
import CategoriesSelect from './CategoriesSelect';
import SizesSelects from './SizesSelects';

const FormTitleAndDesc = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Box component="div">
      <Typography variant="h1" sx={{ pl: '0.28px' }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={productInfoTitle}>
        {desc}
      </Typography>
    </Box>
  );
};

const ProductInfoForm = ({ title, desc, isEdit }: IProductInfoFormProps) => {
  const { data: userData } = useSession();
  const { data: filtersData } = useFilters();
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const router = useRouter();

  const submitFormMutation: UseMutationResult<
    IAddProductResponse,
    IReactQueryError,
    IAddProductRequest
  > = useMutation({
    mutationFn: (data: IAddProductRequest) => {
      const token = userData?.user?.accessToken; // Get the JWT token from NextAuth
      if (!token) throw new Error('No JWT token available');

      return addProduct(data, token);
    },
    onSuccess: () => {
      setIsAddButtonDisabled(true);
      enqueueSnackbar('Product added successfully.', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/profile/my-products');
    },
    onError: () => {
      throw new Error('Something went wrong');
    },
  });

  const { handleSubmit, setValue, getValues, resetField, control } =
    useForm<AddProductFormData>({
      resolver: zodResolver(AddProductFormSchema),
      defaultValues: {
        gender: 0,
        price: 0,
        name: '',
        images: [],
        brand: 0,
        color: 0,
        description: '',
        sizes: new Array(20).fill(0),
        userID: '',
        teamName: 'team-1',
        categories: new Array(7).fill(0),
      },
    });

  const uploadImagesMutation = useMutation<
    AxiosResponse,
    IReactQueryError,
    AddProductFormData['images']
  >({
    mutationFn: (images: (number | File)[] | undefined) => {
      const formData = new FormData();
      if (images) {
        images.forEach((file: any) => formData.append('files', file));
      }

      return addImages(formData);
    },
    onError: () => {
      throw new Error('Something went wrong');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const preValues = getValues('images');
      if (preValues) {
        setValue('images', [
          ...preValues,
          ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);
      } else {
        setValue(
          'images',
          acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  useEffect(() => {
    if (userData) {
      setValue('userID', userData.user.id);
    }
  }, [userData]);

  useEffect(() => {
    if (filtersData) {
      resetField('sizes', {
        defaultValue: filtersData.sizes.data.map(_ => 0),
      });
      resetField('categories', {
        defaultValue: filtersData.categories.data.map(_ => 0),
      });
    }
  }, [filtersData]);

  const onSubmit: SubmitHandler<AddProductFormData> = data => {
    const { images, ...rest } = data;
    uploadImagesMutation.mutate(images, {
      onSuccess: response => {
        const finalData = {
          ...rest,
          images: response.data.map((elem: any) => elem?.id),
        };

        submitFormMutation.mutate({ data: finalData });
      },
    });
  };

  const onError = () => {
    enqueueSnackbar('Form validation failed. Please check the fields.', {
      variant: 'error',
      autoHideDuration: 2000,
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={productInfoFormContainer}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <FormTitleAndDesc title={title} desc={desc} />
        <Box component="div" sx={formAndImagesContainer}>
          <Box
            component="div"
            sx={{ display: 'flex', flexDirection: 'column', gap: '23px' }}
          >
            <ControlledInput
              name="name"
              control={control}
              label="Product name"
              required
              placeholder="Nike Air Max 90"
            />
            <ControlledInput
              name="price"
              control={control}
              label="Price"
              required
              placeholder="$160"
              type="number"
            />
            <ControlledDropdown
              name="color"
              control={control}
              labelText="Color"
              options={filtersData?.colors.data.map(elem => ({
                name: elem.attributes.name,
                value: elem.id,
              }))}
              withoutNone
            />
            <Box
              component="div"
              sx={{ display: 'flex', maxWidth: '436px', gap: '16px' }}
            >
              <ControlledDropdown
                name="gender"
                control={control}
                labelText="Gender"
                options={filtersData?.genders.data.map(elem => ({
                  name: elem.attributes.name,
                  value: elem.id,
                }))}
              />
              <ControlledDropdown
                name="brand"
                control={control}
                labelText="Brand"
                options={filtersData?.brands.data.map(elem => ({
                  name: elem.attributes.name,
                  value: elem.id,
                }))}
              />
            </Box>
            <Box component="div">
              <InputLabel htmlFor={'cate'}>Categories</InputLabel>
              <CategoriesSelect
                name="categories"
                control={control}
                filtersData={filtersData}
              />
            </Box>
            <Box component="div">
              <Controller
                name={'description'}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextArea
                      labelText="Description"
                      name="product-description"
                      style={{
                        maxWidth: '436px',
                        borderColor: `${error ? stylingConstants.palette.error.main : stylingConstants.palette.grey[700]}`,
                        marginTop: '3px',
                        marginBottom: '3px',
                      }}
                      placeholder="Do not exceed 300 characters."
                      value={value}
                      onChange={onChange}
                    />
                    {error && <ErrorMessage errorMessage={error?.message} />}
                  </>
                )}
              />
            </Box>
            <Box component="div" sx={inputContainer}>
              <InputLabel>Add size</InputLabel>
              <SizesSelects
                name="sizes"
                control={control}
                filtersData={filtersData}
              />
            </Box>
          </Box>
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <ListProductImages
                  productImages={value}
                  onChange={onChange}
                  getRootProps={getRootProps}
                  isDragActive={isDragActive}
                  getInputProps={getInputProps}
                  error={error}
                />
              </>
            )}
          />
        </Box>
        <Box component="div" sx={saveButtonContainer}>
          <Button
            variant="contained"
            color="error"
            sx={{
              ...formSaveButton,
              '&.Mui-disabled': {
                backgroundColor: stylingConstants.palette.primary.main,
                color: '#fff',
                opacity: 0.5,
              },
            }}
            type="submit"
            disabled={
              submitFormMutation.isPending ||
              uploadImagesMutation.isPending ||
              isAddButtonDisabled
            }
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductInfoForm;
