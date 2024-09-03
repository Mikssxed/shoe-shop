'use client'

import { Box, Button, Typography, Grid, InputLabel, Paper } from '@mui/material'
import React from 'react'
import { Dropdown, Input, TextArea } from './ui'
import theme from '@/theme'
import { Gallery } from 'iconsax-react'

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
}

// TODO: Make this component reusable when creating Edit Product Modal
// TODO: We might need to divide this component into 2-3 parts when adding functionality
// TODO: Create reusable Button component for buttons for this page and other pages
// TODO: Consider moving css to the styles directory
const AddProductForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        rowGap: "1rem",
        maxWidth: "1480px",
        justifyContent: { md: "space-between" }
      }}  
    >
      <Box component="div">
        <Typography variant="h1" sx={{ pl: "0.28px" }}>Add a product</Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: theme.typography.fontWeightLight,
            fontSize: { xs: "12px", sm: "15px" },
            lineHeight: { xs: "14.08px", sm: "17.6px" },
            margin: { xs: "12px 0 23.13px 0", md: "35.4px 0 40px 0" },
            padding: "0 4.8px 0 0.28px",
            maxWidth: "890px",
            letterSpacing: "-0.1px"
          }}
        >
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in 
          laying out print, graphic or web designs. The passage is attributed to
          an unknown typesetter in the 15th century who is thought to have scrambled
          parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen
          book. It usually begins with:
        </Typography>
        <Box
          component="div"
          sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, justifyContent:  { lg: "space-between" }, rowGap: "24px", columnGap: { xs: "24px" }, maxWidth: "890px" }}
        >
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", gap: "23px" }}
          >
            <Input label='Product name' placeholder='Nike Air Max 90' />
            <Input label='Price' placeholder='$160' />
            <Box
              component="div"
              sx={{ display: "flex", maxWidth: "436px", gap: "16px" }}
            >
              {/* TODO: Add options props from the database */}
              {/* TODO: handle data from backend (genders, sizes and colors...) */}
              <Dropdown labelText='Gender' />
              <Dropdown labelText='Brand' />
            </Box>
            <TextArea
              labelText='Description'
              name='product-description'
              style={{ maxWidth: "436px" }}
              placeholder='Do not exceed 300 characters.'
            />
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "column", maxWidth: "436px", gap: { xs: "5px", sm: "8px" } }}
            >
              <InputLabel>
                Add size
              </InputLabel>
              <Grid
                container
                spacing={2}
              >
                {sizes.data
                  .sort((a, b) => a.attributes.value - b.attributes.value)
                  .map(({ id, attributes: { value } }) => {
                    return (
                      // TODO: Discuss the size of the size buttons, fix them if it's needed
                      <Grid key={id} xs={3} xl={'auto'} item>
                        <Button
                          sx={{
                            width: "100%",
                            fontWeight: theme.typography.fontWeightLight,
                            fontSize: { xs: 10, sm: 15 },
                            textTransform: "uppercase",
                            borderColor: theme.palette.grey[700],
                            backgroundColor: "transparent",
                            padding: { xs: "8px 15px", sm: "10px 20px", xl: "10px 26px" },
                            "&:hover": {
                              borderColor: theme.palette.grey[700],
                              backgroundColor: theme.palette.grey[100],
                              color: theme.palette.grey[700],
                            },
                            borderRadius: "12px",
                            color: theme.palette.text.secondary,
                          }}
                          variant="outlined"
                        >
                          EU-{value}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", maxWidth: "436px", gap: { xs: "5px", sm: "8px" } }}
          >
            <InputLabel>
              Product Images
            </InputLabel>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                p: { xs: "74px 37px", xl: "147px 74px" },
                border: `1px dashed ${theme.palette.text.secondary}`,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#aaa',
                }
              }}
            >
              <Gallery size="38" color={theme.palette.grey[500]}/>
              <Typography 
                variant="body1"
                sx={{
                  fontWeight: theme.typography.fontWeightLight,
                  fontSize: "15px",
                  lineHeight: "17.6px",
                  color: theme.palette.text.secondary
                }}>
                Drop your image here, <br /> 
                or select <span style={{ color: "#151e7a", textDecoration: "underline" }}>click to browse</span>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Box component="div" sx={{ maxWidth: "436px", textAlign: "right", mt: { lg: "6px" } }}>
        <Button
          variant="contained"
          color="error"
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: { xs: 117, md: 152 },
            height: { xs: 30.79, md: 40 },
            fontSize: { xs: "12.32px", md: "1rem" },
            lineHeight: { xs: "14.45px", md: "18.77px" },
            fontWeight: 500,
            textTransform: "capitalize",
            padding: 0,
            borderRadius: { xs: "6.16px", md: "8px" },
            flexShrink: 0,
            alignSelf: { xs: "flex-end", lg: "flex-start" }
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  )
}

export default AddProductForm
