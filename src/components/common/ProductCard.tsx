"use client";
import { ProductAttributes } from "@/lib/types";
import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { BagTick } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useState } from "react";
import ButtonMenu from "./ButtonMenu";

type Props = {
  product: ProductAttributes;
  imagePriority: boolean;
};

const ProductCard = ({ product, imagePriority }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //TODO: implement add to cart
  };

  const pathName = usePathname();
  const isProfile = pathName.includes("/profile/my-products");

  const deleteProduct = (id: number) => {
    // TODO: implement delete product
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            width: 1,
            borderRadius: 0,
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ position: "relative", aspectRatio: 320 / 380 }}>
            {!isProfile && (
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: "0%",
                  transition: "opacity 0.3s ease-in-out",
                  ":hover": { opacity: "100%" },
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "rgba(255,255,255, 0.70)",
                    borderRadius: "50%",
                    flexDirection: "column",
                    fontSize: "14px",
                    width: "100px",
                    height: "100px",
                    boxShadow: "0px 4px 10px 0px #00000026",
                  }}
                  onClick={addToCart}
                >
                  <BagTick />
                  Add to cart
                </IconButton>
              </Box>
            )}
            {product.images?.data ? (
              <Image
                src={product.images.data[0].attributes.url}
                alt={product.name!}
                fill
                style={{ objectFit: "cover" }}
                priority={imagePriority}
                sizes="100%"
              />
            ) : (
              <Paper
                sx={{
                  height: 1,
                  backgroundColor: "grey.A100",
                  borderRadius: 0,
                }}
              >
                <Image fill src="/icons/galleryIcon.svg" alt="icon" />
              </Paper>
            )}
          </Box>
          <CardActionArea
            LinkComponent={Link}
            sx={{
              "&:hover .MuiCardActionArea-focusHighlight": {
                opacity: 0,
              },
              backgroundColor: "background.paper",
              flex: 1,
            }}
          >
            <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: 0,
                }}
              >
                <Box>
                  <Typography variant="h3" fontSize={14}>
                    {product.name}
                  </Typography>
                  {product.gender?.data?.attributes.name && (
                    <Typography
                      variant="h5"
                      fontSize={14}
                      textTransform="capitalize"
                      color="text.secondary"
                    >
                      {`${product.gender?.data?.attributes.name}'s Shoes`}
                    </Typography>
                  )}
                </Box>
                <Typography variant="h3" fontSize={14}>
                  ${product.price}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      {isProfile && (
        <Box>
          <IconButton
            aria-label="settings"
            sx={{
              position: "absolute",
              zIndex: "1",
              padding: "10px",
              top: 5,
              right: 5,
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreHoriz />
          </IconButton>
          <ButtonMenu
            name={product.name}
            productid={product.id!}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setAnchorEl(null)}
            onDeleteProduct={() => deleteProduct(product.id)}
          />
        </Box>
      )}
    </Box>
  );
};
export default ProductCard;
