"use client";

import {
  formAndImagesContainer,
  formSaveButton,
  imageCoverOnHover,
  imageUploadBox,
  imageUploadText,
  inputContainer,
  productImageContainer,
  productInfoFormContainer,
  productInfoTitle,
  productSizeButton,
  saveButtonContainer,
  trashIconContainer,
} from "@/styles/products/productInfoFormStyles";
import theme from "@/theme";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { Gallery } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";
import DeleteModal from "./common/DeleteModal";
import { Dropdown, Input, TextArea } from "./ui";

// TODO: use real sizes from backend
const sizes = {
  data: [
    { id: 1, attributes: { value: 36 } },
    { id: 2, attributes: { value: 37 } },
    { id: 3, attributes: { value: 38 } },
    { id: 4, attributes: { value: 39 } },
    { id: 5, attributes: { value: 40 } },
    { id: 6, attributes: { value: 41 } },
    { id: 7, attributes: { value: 42 } },
    { id: 8, attributes: { value: 43 } },
    { id: 9, attributes: { value: 44 } },
    { id: 10, attributes: { value: 45 } },
  ],
};

const FormTitleAndDesc = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Box component="div">
      <Typography variant="h1" sx={{ pl: "0.28px" }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={productInfoTitle}>
        {desc}
      </Typography>
    </Box>
  );
};

// TODO: Create a reusable component for displaying size buttons for this component and product details
const ListProductSizes = () => {
  return (
    <Box component="div" sx={inputContainer}>
      <InputLabel>Add size</InputLabel>
      <Grid container spacing={2}>
        {/* TODO: Depending on edit or add product, some sizes should be rendered as selected */}
        {sizes.data
          .sort((a, b) => a.attributes.value - b.attributes.value)
          .map(({ id, attributes: { value } }) => {
            return (
              // TODO: Discuss the size of the size buttons, fix them if it's needed
              <Grid key={id} xs={4} sm={3} xl={"auto"} item>
                <Button sx={productSizeButton} variant="outlined">
                  EU-{value}
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

const ListProductImages = ({ productImages }: { productImages: number[] }) => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  return (
    <Box
      component="div"
      sx={{ ...inputContainer, maxWidth: { xs: "436px", lg: "none" } }}
    >
      <InputLabel>Product Images</InputLabel>
      <Grid
        container
        spacing={{ xs: 2, sm: 5, lg: 2 }}
        sx={{ minWidth: { xl: "692px" } }}
      >
        {productImages.map((item) => {
          return (
            <Grid key={item} item xs={6} lg={12} xl={6}>
              <Box sx={productImageContainer}>
                <Box sx={imageCoverOnHover}>
                  <IconButton
                    sx={trashIconContainer}
                    onClick={() => setIsDelete(true)}
                  >
                    <Image
                      width={20}
                      height={20}
                      src={"/icons/trash.svg"}
                      alt="trash"
                    />
                  </IconButton>
                </Box>
                <Image
                  src={"/images/sneakers_side_decor_1.png"}
                  alt={"Product Image"}
                  fill
                  style={{ objectFit: "contain" }}
                  priority={true}
                  sizes="100%"
                />
              </Box>
              {/* TODO: Update this modal to delete the selected image properly */}
              <DeleteModal
                open={isDelete}
                name="selected image"
                onClose={() => setIsDelete(false)}
                onSubmit={() => console.log("Item deleted")}
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
          <Paper elevation={0} sx={imageUploadBox}>
            <Gallery
              size="38"
              color={theme.palette.grey[500]}
              style={{ flexShrink: 0 }}
            />
            <Typography variant="body1" sx={imageUploadText}>
              Drop your image here, <br />
              or select{" "}
              <span style={{ color: "#151e7a", textDecoration: "underline" }}>
                click to browse
              </span>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

interface IProductInfoFormProps {
  title: string;
  desc: string;
  productId?: number; // TODO: fetch the edited product from this id
  isEdit: boolean; // TODO: update the values of inputs with the edited product's values depending on this boolean
}

const ProductInfoForm = ({ title, desc, isEdit }: IProductInfoFormProps) => {
  // TODO: Create form states and assign values to inputs. Get onSubmit as props, assign it to save button.
  // TODO: replace this state with the actual data
  const [productImages, setProductImages] = useState([1, 2, 3]);
  return (
    <Box component="form" sx={productInfoFormContainer}>
      <FormTitleAndDesc title={title} desc={desc} />
      <Box component="div" sx={formAndImagesContainer}>
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: "column", gap: "23px" }}
        >
          <Input label="Product name" placeholder="Nike Air Max 90" />
          <Input label="Price" placeholder="$160" />
          <Dropdown labelText="Color" />
          <Box
            component="div"
            sx={{ display: "flex", maxWidth: "436px", gap: "16px" }}
          >
            {/* TODO: Add options props from the database */}
            {/* TODO: handle data from backend (genders, sizes and colors...) */}
            <Dropdown labelText="Gender" />
            <Dropdown labelText="Brand" />
          </Box>
          <TextArea
            labelText="Description"
            name="product-description"
            style={{ maxWidth: "436px" }}
            placeholder="Do not exceed 300 characters."
          />
          <ListProductSizes />
        </Box>
        <ListProductImages productImages={productImages} />
      </Box>
      {/* Save Button */}
      <Box component="div" sx={saveButtonContainer}>
        <Button variant="contained" color="error" sx={formSaveButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfoForm;
