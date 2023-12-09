// External imports
import { FC } from 'react';
import { Box } from '@mui/material';

// Internal imports
import Checkbox from './Checkbox';
import { CheckboxArea, CheckboxItem } from '../Dropdown/styles';
import { labelStyle } from './styles';
import { SelectItem } from '../MultiSelect/MultiSelect';

interface CheckboxProps {
  name?: string;
  options: SelectItem[];
  isChecked: (id: string) => boolean;
  onCheckboxClick: (isChecked: boolean, selection: SelectItem | 'selectAll') => void;
  enableFormik?: boolean;
  enableSelectAll?: boolean;
}

export const CheckboxGroup: FC<CheckboxProps> = ({
  options,
  isChecked,
  onCheckboxClick,
  enableFormik = false,
  name,
  enableSelectAll = true
}) => {
  return (
    <CheckboxArea role="group">
      {enableSelectAll && (
        <CheckboxItem>
          <Checkbox
            name="selectAll"
            onChange={(e) => onCheckboxClick(e.target.checked, 'selectAll')}
          />
          Select all
        </CheckboxItem>
      )}
      {options &&
        options.map((option, idx) => {
          return (
            <Box key={idx}>
              {!enableFormik ? (
                <CheckboxItem key={idx}>
                  <Checkbox
                    name={name}
                    checked={isChecked(option.value)}
                    onChange={(e) => {
                      onCheckboxClick(e.target.checked, option);
                    }}
                  />
                  <Box sx={labelStyle}>{option.name}</Box>
                </CheckboxItem>
              ) : (
                <CheckboxItem key={idx}>
                  <Checkbox
                    enableFormik={enableFormik}
                    name={name}
                    value={option.value}
                    checked={isChecked(option.value)}
                    onChange={(e) => {
                      onCheckboxClick(e.target.checked, option);
                    }}
                  />
                  <Box sx={labelStyle}>{option.name}</Box>
                </CheckboxItem>
              )}
            </Box>
          );
        })}
    </CheckboxArea>
  );
};
