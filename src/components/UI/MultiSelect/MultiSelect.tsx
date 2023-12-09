// External imports
import React, { useEffect, useState } from 'react';
import { FormHelperText } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';

// Internal imports
import {
  IconsContainer,
  MultiSelectField,
  PositionContainer,
  StyledLabel,
  TextContainer
} from './styles';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import Typography from '../Typography/Typography';
import { helperTextStyles } from '../../../globalStyles';

export interface SelectItem {
  value: string;
  name: string;
}

export interface IMultiSelectProps {
  name: string;
  value?: SelectItem[];
  onChange?: (items: SelectItem[], formikField?: string) => void;
  dropdownSize?: string;
  options: SelectItem[];
  isSearch?: boolean;
  enableFormik?: boolean;
  errorMessage?: string | string[];
  enableSelectAll?: boolean;
  placeHolderWidth?: string;
  fieldWidth?: string;
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  name,
  options,
  value = [],
  onChange,
  isSearch = true,
  enableFormik = false,
  errorMessage,
  enableSelectAll = true,
  placeHolderWidth,
  fieldWidth
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(name);
  const [currentSelection, setCurrentSelection] = useState<SelectItem[]>(value);

  const onToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const onClearHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setPlaceholder(name);
    onClear();
  };

  const onClear = () => {
    setCurrentSelection([]);
    onChange([], enableFormik ? name : undefined);
  };

  useEffect(() => {
    if (!value.length) {
      setPlaceholder(name);
      setCurrentSelection([]);
    }
  }, [value, name, setPlaceholder, setCurrentSelection]);

  return (
    <PositionContainer width={fieldWidth}>
      <Typography type="body" weight="regular">
        <MultiSelectField
          data-testid="multiSelect"
          hasSelection={Boolean(currentSelection.length)}
          disabled={false}
          onClick={onToggleDropdown}
          isOpen={isOpen}>
          <StyledLabel>
            <FilterAltIcon />
            <TextContainer width={placeHolderWidth}>{placeholder}</TextContainer>
          </StyledLabel>

          <IconsContainer>
            {Boolean(currentSelection.length) && <CloseIcon onClick={onClearHandler} />}
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconsContainer>
        </MultiSelectField>
        <MultiSelectDropdown
          name={name}
          value={value}
          isOpen={isOpen}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          setIsOpen={setIsOpen}
          onChange={onChange}
          setPlaceholder={setPlaceholder}
          options={options}
          isSearch={isSearch}
          enableFormik={enableFormik}
          onClear={onClear}
          enableSelectAll={enableSelectAll}
        />
      </Typography>
      {enableFormik && errorMessage && (
        <FormHelperText sx={helperTextStyles}>{errorMessage}</FormHelperText>
      )}
    </PositionContainer>
  );
};

export default MultiSelect;
