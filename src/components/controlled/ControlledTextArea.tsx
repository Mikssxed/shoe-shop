import { Control, Controller } from 'react-hook-form';

import { TextArea } from '@/components/ui';
import { stylingConstants } from '@/lib/constants/themeConstants';
import ErrorMessage from '../ui/ErrorMessage';

type Props = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder?: string;
};

const ControlledTextArea = ({ name, control, label, placeholder }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <TextArea
            labelText={label}
            name={name}
            style={{
              maxWidth: '436px',
              borderColor: `${error ? stylingConstants.palette.error.main : stylingConstants.palette.grey[700]}`,
              marginTop: '3px',
              marginBottom: '3px',
            }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
          />
          {error && (
            <ErrorMessage
              label="product-description"
              errorMessage={error?.message}
            />
          )}
        </>
      )}
    />
  );
};

export default ControlledTextArea;
