// External imports
import React, { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { Field, FieldProps } from 'formik';

// Internal imports
import { sxStyles } from './styles';

export interface InputProps extends OutlinedInputProps {
  //   iconComponent?: IconTypes;
  errorMessage?: string;
  enableFormik?: boolean;
  innerHeight?: number;
  isErrorIcon?: boolean;
}

const InputField: React.FC<InputProps> = ({
  label,
  className,
  errorMessage,
  //   iconComponent,
  sx,
  multiline = false,
  innerHeight,
  fullWidth,
  isErrorIcon = false,
  required = false,
  rows,
  maxRows,
  minRows,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputType = useMemo(() => {
    if (props.type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return props.type;
  }, [showPassword, props.type]);

  const inputHeight = multiline && (rows || maxRows || minRows) ? undefined : innerHeight ?? '48px';

  return (
    <FormControl>
      <FormLabel sx={{ paddingBottom: '8px' }} required={required}>
        {label}
      </FormLabel>
      <TextField
        data-testid="input"
        multiline={multiline}
        classes={{ root: className }}
        error={!!errorMessage}
        sx={sxStyles()}
        inputProps={{ type: inputType }}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        InputProps={{
          sx: {
            height: inputHeight
          },
          ...props,
          endAdornment: (
            // <>
            //   {props.type === 'password' ? (
            //     <Button
            //       buttonType="tertiary"
            //       iconPosition="center"
            //       sourceIcon={true}
            //       iconName={showPassword ? 'show' : 'hide'}
            //       onClick={handleClickShowPassword}></Button>
            //   ) : (
            //     <Icon
            //       component={!!errorMessage && isErrorIcon ? 'error' : iconComponent}
            //       color={!!errorMessage && theme.palette.error.main}
            //     />
            //   )}
            // </>
            <IconButton></IconButton>
          )
        }}
        helperText={errorMessage}
        FormHelperTextProps={{
          sx: {
            '&.MuiFormHelperText-root.Mui-error': {
              marginLeft: '0'
            }
          }
        }}
      />
    </FormControl>
  );
};

const Input: React.FC<InputProps> = ({ enableFormik, ...props }) => {
  if (!enableFormik) {
    return <InputField {...props} />;
  }

  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => {
        return <InputField errorMessage={meta.touched ? meta.error : null} {...props} {...field} />;
      }}
    </Field>
  );
};

export default Input;
