import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

import { stylingConstants } from "@/lib/constants/themeConstants";

//UPDATE PROPS
interface BagItemProps {
  data: {
    name: string;
    images: {
      data: string[];
    };
    description: string;
    number: number;
    teamName: string;
    gender: string;
    price: number;
    amount: number;
  };
}

const BagItem: React.FC<BagItemProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: { xs: "15px", md: "30px", xl: "46px" },
      }}
    >
      <Box
        component="img"
        sx={{
          height: { xs: "100px", md: "156px", xl: "214px" },
          width: { xs: "105px", md: "160px", xl: "223px" },
          objectFit: "cover",
        }}
        src={data.images.data[0]}
      />
      <Box
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ flex: "1" }}>
            <Typography
              fontWeight={500}
              sx={{
                fontSize: { xs: "12px", md: "20px", xl: "30px" },
                lineHeight: { xs: "14px", md: "23px", xl: "35px" },
              }}
              color={stylingConstants.palette.text.primary}
            >
              {data.teamName} {data.name}
            </Typography>
            <Typography
              fontWeight={500}
              color="#5C5C5C"
              sx={{
                mt: "4px",
                fontSize: { xs: "8px", md: "12px", xl: "20px" },
                lineHeight: { xs: "10px", md: "14px", xl: "23.5px" },
              }}
            >
              {data.gender}&apos;s Shoes
            </Typography>
            <Typography
              fontWeight={600}
              fontSize={25}
              lineHeight="29.3px"
              color="#FE645E"
              sx={{ mt: "12px", display: { xs: "none", xl: "block" } }}
            >
              In Stock
            </Typography>
          </Box>
          <Box>
            <Typography
              fontWeight={500}
              sx={{
                fontSize: { xs: 12, md: 20, xl: 30 },
                lineHeight: { xs: "14px", md: "23px", xl: "35.2px" },
              }}
              color={stylingConstants.palette.text.primary}
            >
              ${data.price}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "end", md: "center" },
            gap: { xs: "5px", md: "7px", xl: "9px" },
            justifyContent: { xs: "space-between", md: "right" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "5px", xl: "9px" },
              justifyContent: "right",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "5px", md: "7px", xl: "9px" },
                justifyContent: "right",
              }}
            >
              <Button
                sx={{
                  position: "relative",
                  minWidth: { xs: "15px", md: "26px", xl: "32px" },
                  height: { xs: "15px", md: "26px", xl: "32px" },
                  bgcolor: "#E8E8E8",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={"/icons/minus.svg"}
                  alt="minus"
                />
              </Button>
              <Typography
                fontWeight={400}
                sx={{
                  fontSize: { xs: 12, md: 18, xl: 24 },
                  lineHeight: { xs: "14px", md: "20px", xl: "28px" },
                }}
              >
                {data.amount}
              </Typography>

              <Button
                sx={{
                  position: "relative",
                  minWidth: { xs: "15px", md: "26px", xl: "32px" },
                  height: { xs: "15px", md: "26px", xl: "32px" },
                  bgcolor: "#FFD7D6",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={"/icons/plus.svg"}
                  alt="plus"
                />
              </Button>
            </Box>

            <Typography
              fontWeight={400}
              color="#494949"
              sx={{
                mx: { xs: "4px", md: "6px", xl: "8px" },
                fontSize: { xs: 12, md: 18, xl: 24 },
                lineHeight: { xs: "14px", md: "20px", xl: "28px" },
              }}
            >
              Quantity
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "1px",
                height: "24px",
                bgcolor: "#8B8E93",
              }}
            />
          </Box>
          <Button
            sx={{
              fontSize: { xs: "12px", md: "18px", xl: "24px" },
              lineHeight: { xs: "14px", md: "20px", xl: "28px" },
              p: 0,
              fontWeight: "400",
              textTransform: "none",
              color: "#6E7278",
            }}
          >
            <Box
              sx={{
                position: "relative",
                mr: "4px",
                height: { xs: "14px", xl: "24px" },
                width: { xs: "14px", xl: "24px" },
              }}
            >
              <Image
                layout="fill"
                objectFit="contain"
                src={"/icons/trash.svg"}
                alt="trash"
              />
            </Box>
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BagItem;
