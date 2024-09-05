import { Controller } from "react-hook-form";
import { Input } from "../ui";

interface IControlledInputProps {
  name: string;
  control: any;
  label: string;
  required: boolean;
  placeholder: string;
  type?: "password";
}

const ControlledInput = ({
  name,
  control,
  label,
  required,
  placeholder,
  type,
}: IControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Input
            required={required}
            label={label}
            inputProps={{ value, onChange, placeholder, type }}
            errorMessage={error ? error?.message : undefined}
          />
        </>
      )}
    />
  );
};

export default ControlledInput;
