// External imports
import styled from 'styled-components';
import { SxProps } from '@mui/material';

// Internal imports
import { BORDER_RADIUS, COLORS } from '../../../globalStyles';


export const DropdownContainer = styled.div`
  border-radius: ${BORDER_RADIUS}px;
  width: 280px;
  padding: 12px 16px;
  max-height: 400px;
  box-shadow: 4px 4px 20px 0px #00000026;
  display: flex;
  position: absolute;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 1px;
  background-color: ${COLORS.WHITE};
  z-index: 2000;
`;

export const dropdownChildrenStyle:SxProps={
  display:'flex',
  alignItems:'center',
  flexDirection:'column'
}

export const CheckboxArea = styled.div`
  width: 95%;
  overflow-y: auto;
  font-size: 14px;
  flex-direction: column;
  display: flex;
  gap: 0px;
  max-height: 210px;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${COLORS.NEUTRAL_300};
    margin-top: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.NEUTRAL_500};
    border-radius: 6px;
    opacity: 1;
  }
`;

export const CheckboxItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
