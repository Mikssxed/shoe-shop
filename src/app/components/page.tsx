import { Dropdown, Input, TextArea } from "@/components/ui";
import { Box, Button } from "@mui/material";
// TO DELETE, ITS JUST FOR TESTING
const Components = () => {
  return (
    <Box>
      <Input
        label="Label"
        required
        inputProps={{ placeholder: "test" }}
        errorMessage="test"
      />
      <Dropdown />
      <Button variant="outlined">test</Button>
      <TextArea placeholder="dupa" labelText="test" name="dupa" />
    </Box>
  );
};

export default Components;
