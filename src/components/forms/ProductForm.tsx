'use client';

import { Box, Typography } from '@mui/material';
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { enqueueSnackbar } from 'notistack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useChat } from 'ai/react';

import styles from '@/styles/forms/productForm.style';
import {
  ControlledDropdown,
  ControlledInput,
  ControlledTextArea,
  ControlledImageList,
  SelectCategories,
  SelectSizes,
} from '@/components/controlled';
import { queryClient, useFilters } from '@/tools';
import { AddProductFormSchema, AddProductFormData } from '@/lib/validation';
import { IProductInfoFormProps, IImage } from '@/lib/types';
import { useEditProduct, useCreateProduct } from '@/hooks';
import { AiSuggessionButton, BaseButton } from '@/components/ui';
import { getAiPromptForDescriptionByTitle } from '@/utils/ai-prompts';
import { DESCRIPTION_LIMIT } from '@/lib/constants';

const defaultValues = {
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
};

export type TFormStatus = 'normal' | 'pending' | 'success';

const ProductForm = ({
  title,
  desc,
  mode = 'create',
  product,
  onClose,
  openEditModal,
}: IProductInfoFormProps) => {
  const [formStatus, setFormStatus] = useState<TFormStatus>('normal');
  const { data: userData } = useSession();
  const { data: filtersData } = useFilters();
  const token = userData?.user?.accessToken;

  const editProductMutation = useEditProduct(); //TODO try to use one mutation hook only (for example: const mutation = mode === 'create' ? useCreateProduct() : mode === 'edit' ? useEditProduct() ...)
  const createProductMutation = useCreateProduct();

  const imagesQueryKey = ['productUploadedImages'];
  if (mode !== 'create' && product?.id) {
    imagesQueryKey.push(product?.id.toString());
  }
  const { data: uploadedImages, isPending: isPendingImages } = useQuery<
    IImage[]
  >({ queryKey: imagesQueryKey });

  const {
    handleSubmit,
    setValue,
    reset,
    resetField,
    getValues,
    control,
    watch,
    clearErrors,
  } = useForm<AddProductFormData>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues,
  });
  const watchName = watch('name');

  const {
    messages,
    handleInputChange: onChangeNameForChat,
    handleSubmit: onSubmitChat,
    isLoading: isLoadingChat,
  } = useChat();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const onClickAiSuggest = () => {
    clearErrors('description');

    onSubmitChat();

    const { name } = getValues();
    setValue('name', name + '   ');
    setTimeout(() => setValue('name', name), 0);
  };

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
      queryClient.setQueryData(imagesQueryKey, images.data);
    }
  };

  useEffect(() => {
    const value = getAiPromptForDescriptionByTitle(watchName);

    onChangeNameForChat({
      target: { value },
    } as ChangeEvent<HTMLInputElement>);
  }, [watchName]);

  const onSubmit: SubmitHandler<AddProductFormData> = data => {
    if (formStatus !== 'normal') return;
    setFormStatus('pending');

    if (mode === 'create') {
      createProductMutation.mutate(
        { data: { ...data } },
        { onSuccess: () => setFormStatus('success') },
      );
      reset();
    }
    if (mode === 'edit' && product) {
      editProductMutation.mutate(
        {
          id: product.id,
          data: { data: { ...data } },
          token,
        },
        {
          onSuccess: () => {
            if (onClose) onClose();
            setFormStatus('normal');
          },
          onError: () => setFormStatus('normal'),
        },
      );
    }
  };

  const onError = () => {
    enqueueSnackbar('Form validation failed. Please check the fields.', {
      variant: 'error',
      autoHideDuration: 2000,
    });
  };

  useEffect(() => {
    if (messages?.length) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.content && lastMessage?.role !== 'user') {
        setValue(
          'description',
          lastMessage.content.slice(0, DESCRIPTION_LIMIT),
        );
      }
    }
  }, [messages, setValue]);

  useEffect(setProductValues, [openEditModal]);

  useEffect(() => {
    if (userData) setValue('userID', userData.user.id);
  }, [userData, setValue]);

  useEffect(() => {
    if (filtersData) {
      resetField('sizes', {
        defaultValue: filtersData.sizes.data.map(_ => 0),
      });
      resetField('categories', {
        defaultValue: filtersData.categories.data.map(_ => 0),
      });
      if (product && mode === 'edit') {
        setProductValues();
      }
    }
  }, [filtersData]);

  useEffect(() => {
    setValue(
      'images',
      Array.isArray(uploadedImages) ? uploadedImages.map(item => item.id) : [],
    );
  }, [uploadedImages]);

  useLayoutEffect(() => {
    if (mode === 'create') {
      queryClient.setQueryData(imagesQueryKey, []);
    }
  }, []);

  const colorOptions = filtersData?.colors.data.map(elem => ({
    name: elem.attributes.name,
    value: elem.id,
  }));

  const genderOptions = filtersData?.genders.data.map(elem => ({
    name: elem.attributes.name,
    value: elem.id,
  }));

  const brandOptions = filtersData?.brands.data.map(elem => ({
    name: elem.attributes.name,
    value: elem.id,
  }));

  const isSubmitDisabled =
    formStatus !== 'normal' ||
    createProductMutation.isPending ||
    isPendingImages ||
    editProductMutation.isPending;

  const isAiSuggestionDisabled = isLoadingChat || !watchName.trim();

  return (
    <>
      <Box
        component="form"
        sx={styles.productInfoFormContainer}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Box>
          <Typography variant="h1" sx={{ pl: '0.28px' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={styles.productInfoTitle}>
            {desc}
          </Typography>
        </Box>
        <Box sx={styles.formAndImagesContainer}>
          <Box sx={styles.allFieldsContainer}>
            <ControlledInput
              name="name"
              control={control}
              label="Product name"
              required
              placeholder="Nike Air Max 90"
              ref={nameInputRef}
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
              options={colorOptions}
              withoutNone
            />
            <Box sx={styles.genderAndBrand}>
              <ControlledDropdown
                name="gender"
                control={control}
                labelText="Gender"
                options={genderOptions}
              />
              <ControlledDropdown
                name="brand"
                control={control}
                labelText="Brand"
                options={brandOptions}
              />
            </Box>
            <Box>
              <SelectCategories
                name="categories"
                control={control}
                filtersData={filtersData}
                label="Categories"
                required
              />
            </Box>
            <Box position="relative">
              <ControlledTextArea
                name="description"
                control={control}
                label="Description"
                placeholder="Do not exceed 300 characters."
                disabled={isLoadingChat}
              >
                <AiSuggessionButton
                  onClick={onClickAiSuggest}
                  isLoading={isLoadingChat}
                  disabled={isAiSuggestionDisabled}
                />
              </ControlledTextArea>
            </Box>
            <Box sx={styles.inputContainer}>
              <SelectSizes
                name="sizes"
                control={control}
                filtersData={filtersData}
                label="Add size"
                required
              />
            </Box>
          </Box>
          <ControlledImageList
            name="images"
            control={control}
            queryKey={imagesQueryKey}
          />
        </Box>
        <Box sx={styles.saveButtonContainer}>
          <BaseButton
            sx={styles.submitButton}
            type="submit"
            disabled={isSubmitDisabled}
          >
            {isSubmitDisabled ? 'Saving...' : 'Save'}
          </BaseButton>
        </Box>
      </Box>
    </>
  );
};

export default ProductForm;
