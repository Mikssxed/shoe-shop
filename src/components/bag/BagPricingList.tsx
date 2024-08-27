import { Typography, Box } from "@mui/material"

interface BagPricingListProps {
  name: string
  value: number
  bold?: boolean
}

const BagPricingList: React.FC<BagPricingListProps> = ({
  name,
  value,
  bold,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "20px", sm: "20px" },
          lineHeight: { xs: "24px", sm: "35px" },
        }}
        fontWeight={bold ? 600 : 400}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "20px", sm: "20px" },
          lineHeight: { xs: "24px", sm: "35px" },
        }}
        fontWeight={bold ? 600 : 400}
      >
        ${value}
      </Typography>
    </Box>
  )
}

export default BagPricingList
