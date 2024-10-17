import { Controller } from 'react-hook-form';

import Dropdown from '../ui/Dropdown';

interface IControlledDropdownProps {
  name: string;
  control: any;
  type?: 'password' | 'number';
  labelText?: string;
  options?: { value: number | string; name: string }[];
  withoutNone?: boolean;
}

const ControlledDropdown = ({
  name,
  control,
  type,
  options = [],
  withoutNone = false,
  labelText,
  ...props
}: IControlledDropdownProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Dropdown
            labelText={labelText}
            options={options}
            onChange={onChange}
            value={value}
            errorMessage={error?.message}
            {...props}
          />
        </>
      )}
    />
  );
};

export default ControlledDropdown;
