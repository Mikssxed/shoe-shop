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
import { IAddProductRequest } from '@/lib/types/requests/product.type';
import { addProduct, addImages, useFilters } from '@/tools';
import { IReactQueryError } from '@/lib/types';
import { IAddProductResponse } from '@/lib/types/responses/product.types';
import { AddProductFormSchema, AddProductFormData } from '@/lib/validation';
import { TextArea } from '../ui';
import ListProductImages from './ListProductImages';
import { stylingConstants } from '@/lib/constants/themeConstants';
import { IProductInfoFormProps, IFileWithPreview } from '@/lib/types';
import CategoriesSelect from './CategoriesSelect';
import SizesSelects from './SizesSelects';
import useEditProduct from '@/hooks/useEditProduct';
import RequiredStar from '../ui/RequiredStar';

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

const ProductInfoForm = ({
  title,
  desc,
  isEdit,
  product,
  onClose,
  openEditModal,
}: IProductInfoFormProps) => {
  const { data: userData } = useSession();
  const { data: filtersData } = useFilters();
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [oldFiles, setOldFiles] = useState<any[]>([]);
  const router = useRouter();
  const editMutation = useEditProduct();
  const token = userData?.user?.accessToken;

  const submitFormMutation: UseMutationResult<
    IAddProductResponse,
    IReactQueryError,
    IAddProductRequest
  > = useMutation({
    mutationFn: (data: IAddProductRequest) => {
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
    setProductValues();
  }, [openEditModal]);

  useEffect(() => {
    if (oldFiles.length === product?.images?.data?.length) {
      setValue('images', [...oldFiles]);
    }
  }, [oldFiles, setValue]);

  useEffect(() => {
    if (userData) {
      setValue('userID', userData.user.id);
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (filtersData) {
      resetField('sizes', {
        defaultValue: filtersData.sizes.data.map(_ => 0),
      });
      resetField('categories', {
        defaultValue: filtersData.categories.data.map(_ => 0),
      });
      if (product && isEdit) {
        setProductValues();
      }
    }
  }, [filtersData]);

  const setProductValues = () => {
    if (!filtersData || !product) return;

    const {
      name,
      brand,
      color,
      price,
      gender,
      description,
      categories,
      sizes,
      images,
    } = product;

    setValue('name', name);
    setValue('price', price);
    setValue('description', description);

    brand?.data?.id && setValue('brand', brand.data.id);
    color?.data?.id && setValue('color', color.data.id);
    gender?.data?.id && setValue('gender', gender.data.id);

    if (categories?.data) {
      const oldCategoryIds = categories.data.map(cat => cat.id);
      const newCategoryValues = filtersData.categories.data.map(elem =>
        oldCategoryIds.includes(elem.id) ? elem.id : 0,
      );
      setValue('categories', newCategoryValues);
    }

    if (sizes?.data) {
      const oldSizeIds = sizes.data.map(size => size.id);
      const newSizeValues = filtersData.sizes.data.map(size =>
        oldSizeIds.includes(size.id) ? size.id : 0,
      );
      setValue('sizes', newSizeValues);
    }

    if (images?.data) {
      setOldFiles([]);
      images.data.forEach(elem => convertImageUrlToFile(elem.attributes.url));
    }
  };

  const convertImageUrlToFile = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const newFile = new File([blob], 'image.jpg', { type: blob.type });
      setOldFiles(prev => [
        ...prev,
        Object.assign(newFile, { preview: imageUrl }),
      ]);
    } catch (error) {
      console.error('Error converting image URL to file', error);
    }
  };

  const isFileWithPreview = (item: unknown): item is IFileWithPreview => {
    return item instanceof File && 'preview' in item;
  };

  const imagesProps = (images: (File | number)[]) => {
    const notUploadedImages: File[] = [];
    const alreadyUploadedImages: File[] = [];
    const uploadedImagesIds: number[] = [];
    images.forEach(elem => {
      if (isFileWithPreview(elem)) {
        if (elem.preview?.startsWith('https://res.cloudinary.com/')) {
          alreadyUploadedImages.push(elem);
        } else {
          notUploadedImages.push(elem);
        }
      }
    });

    alreadyUploadedImages.forEach(elem => {
      if (isFileWithPreview(elem) && product?.images?.data) {
        product.images?.data.forEach(
          oldFile =>
            oldFile.attributes.url === elem.preview &&
            uploadedImagesIds.push(oldFile.id),
        );
      }
    });

    return { notUploadedImages, alreadyUploadedImages, uploadedImagesIds };
  };

  const onSubmit: SubmitHandler<AddProductFormData> = data => {
    const { images, ...rest } = data;

    if (isEdit && product) {
      const { notUploadedImages, alreadyUploadedImages, uploadedImagesIds } =
        imagesProps(images);
      if (!token) throw new Error('No JWT token available');
      if (notUploadedImages.length === 0) {
        const finalData = {
          data: {
            ...rest,
            images: [...uploadedImagesIds],
          },
        };
        editMutation.mutateAsync(
          { data: finalData, token, id: product.id },
          {
            onSuccess: _ => {
              setIsAddButtonDisabled(true);
              if (onClose) onClose();
              setTimeout(() => setIsAddButtonDisabled(false), 1000);
            },
          },
        );
      } else {
        uploadImagesMutation.mutate(notUploadedImages, {
          onSuccess: response => {
            const finalData = {
              data: {
                ...rest,
                images: [
                  ...uploadedImagesIds,
                  ...response.data.map((elem: any) => elem?.id),
                ],
              },
            };
            editMutation.mutate(
              { data: finalData, token, id: product.id },
              {
                onSuccess: _ => {
                  setIsAddButtonDisabled(true);
                  if (onClose) onClose();
                  setTimeout(() => setIsAddButtonDisabled(false), 1000);
                },
              },
            );
            setTimeout(() => {
              setOldFiles([...alreadyUploadedImages]);
              response.data.forEach((elem: any) =>
                convertImageUrlToFile(elem.url),
              );
            }, 1000);
          },
        });
      }
    } else {
      uploadImagesMutation.mutate(images, {
        onSuccess: response => {
          const finalData = {
            ...rest,
            images: response.data.map((elem: any) => elem?.id),
          };
          submitFormMutation.mutate({ data: finalData });
        },
      });
    }
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
              <InputLabel htmlFor={'cate'}>
                Categories
                <RequiredStar />
              </InputLabel>
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
                      required
                    />
                    {error && <ErrorMessage errorMessage={error?.message} />}
                  </>
                )}
              />
            </Box>
            <Box component="div" sx={inputContainer}>
              <InputLabel>
                Add size
                <RequiredStar />
              </InputLabel>
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
                  editProductImagesCount={product?.images?.data?.length}
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
              editMutation.isPending ||
              isAddButtonDisabled
            }
          >
            {submitFormMutation.isPending ||
            uploadImagesMutation.isPending ||
            editMutation.isPending ||
            isAddButtonDisabled
              ? 'Saving...'
              : 'Save'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductInfoForm;
