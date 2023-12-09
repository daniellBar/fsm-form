// External imports
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

// Internal imports
import { Divider } from '@mui/material';
import { SelectItem } from '../MultiSelect';
import Dropdown from '../../Dropdown/Dropdown';
import { CheckboxGroup } from '../../Checkbox/CheckboxGroup';
import FiltersDropdownFooter from '../../FiltersDropdownFooter/FiltersDropdownFooter';

export interface IMultiSelectDropdownProps {
  name: string;
  options: SelectItem[];
  isOpen: boolean;
  value: SelectItem[];
  currentSelection: SelectItem[];
  setCurrentSelection: Dispatch<SetStateAction<SelectItem[]>>;
  setPlaceholder: Dispatch<SetStateAction<any>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onChange: (options: SelectItem[], formikField?: string) => void;
  onClear: () => void;
  isSearch?: boolean;
  enableFormik?: boolean;
  enableSelectAll?: boolean;
}

const MultiSelectDropdown: React.FC<IMultiSelectDropdownProps> = ({
  name,
  options,
  isOpen,
  value,
  currentSelection,
  setCurrentSelection,
  setIsOpen,
  setPlaceholder,
  onChange,
  onClear,
  enableFormik = false,
  enableSelectAll = true
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const filterOptions = useMemo(() => {
    return options.filter((option) => option.name?.toUpperCase().match(searchValue?.toUpperCase()));
  }, [searchValue, options]);

  const getPlaceholder = useCallback(() => {
    if (currentSelection === undefined) {
      return name;
    }
    switch (currentSelection.length) {
      case 0:
        return isOpen ? 'Select' : name;
      case 1:
        return currentSelection[0].name;
      default:
        return `${currentSelection.length} ${name} selected`;
    }
  }, [currentSelection, isOpen, name]);

  useEffect(() => {
    const tempPlaceHolder = getPlaceholder();
    setPlaceholder(tempPlaceHolder);
  }, [currentSelection, isOpen, getPlaceholder, setPlaceholder]);

  const onClose = () => {
    setCurrentSelection(value);
    setSearchValue('');
    setIsOpen(false);
  };

  const onSaveSelection = () => {
    onChange(currentSelection, enableFormik ? name : undefined);
    setIsOpen(false);
  };

  const onCheckboxClick = (isChecked: boolean, selection: SelectItem | 'selectAll') => {
    if (selection === 'selectAll') {
      handleClickSelectAll(isChecked);
    } else {
      handleClickSelection(isChecked, selection);
    }
  };

  const removeCheckedItem = (selection: SelectItem) => {
    const filteredArray = currentSelection.filter((option) => option.value !== selection.value);
    setCurrentSelection(filteredArray);
  };

  const isChecked = (id: string) => {
    if (currentSelection.length) {
      return currentSelection.some((select) => select.value === id);
    }
    return false;
  };

  const handleClickSelection = (isChecked: boolean, selection: SelectItem) => {
    if (isChecked) {
      setCurrentSelection([...currentSelection, selection]);
    } else {
      removeCheckedItem(selection);
    }
  };

  const handleClickSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      setCurrentSelection(options);
    } else {
      setCurrentSelection([]);
    }
  };

  return (
    <Dropdown isOpen={isOpen} onClose={onClose}>
      <CheckboxGroup
        name={name}
        options={filterOptions}
        isChecked={isChecked}
        onCheckboxClick={onCheckboxClick}
        enableSelectAll={enableSelectAll}
        enableFormik={enableFormik}
      />
      <Divider style={{ width: '100%' }} />
      <FiltersDropdownFooter
        canClear={Boolean(currentSelection.length)}
        canSubmit={Boolean(currentSelection.length)}
        onSaveSelection={onSaveSelection}
        onClearSelection={onClear}
      />
    </Dropdown>
  );
};

export default MultiSelectDropdown;
