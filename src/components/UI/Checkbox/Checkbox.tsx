// External imports
import { FC } from "react";
import {
  Box,
  FormControl,
  Checkbox as MuiCheckbox,
  SxProps,
} from "@mui/material";
import {
  CheckboxProps as MuiCheckboxProps,
  FormHelperText,
} from "@mui/material";
import { Field } from "formik";

// Internal imports
import { checkBoxStyles } from "./styles";
import { helperTextStyles } from "../../../globalStyles";

export interface CheckboxProps extends MuiCheckboxProps {
  showError?: boolean;
  enableFormik?: boolean;
  errorMessage?: string;
  containerSx?: SxProps;
}
const BaseCheckbox: FC<CheckboxProps> = ({
  disabled,
  checked,
  showError = false,
  errorMessage,
  containerSx,
  sx,
  ...props
}) => {
  return (
    <FormControl>
      <Box sx={containerSx}>
        <MuiCheckbox
          checked={checked}
          data-testid="checkbox"
          disabled={disabled}
          sx={{
            ...checkBoxStyles,
            color: errorMessage && showError ? "error.main" : "default",
            ...sx,
          }}
          {...props}
        />
        {errorMessage && showError && (
          <FormHelperText sx={helperTextStyles}>{errorMessage}</FormHelperText>
        )}
      </Box>
    </FormControl>
  );
};

const Checkbox: React.FC<CheckboxProps> = ({ enableFormik, ...props }) => {
  if (!enableFormik) {
    return <BaseCheckbox {...props} />;
  }

  return (
    <Field
      type="checkbox"
      name={props.name}
      value={props.value}
      component={BaseCheckbox}
      onChange={props.onChange}
      checked={props.checked}
    />
  );
};

export default Checkbox;
