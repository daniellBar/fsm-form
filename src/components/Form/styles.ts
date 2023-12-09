// External imports
import { SxProps } from '@mui/material';
import styled from 'styled-components';

// Internal imports
import { COLORS } from '../../globalStyles';


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.WHITE};
  padding: 18px 0;
`;

export const FieldsContainer = styled.div`
  margin: 16px 0 6px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AccordionHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const accordionSummeryStyle:SxProps = {
  '& .MuiAccordionSummary-content.Mui-expanded': {
    padding: '0',
    margin: '12px 0'
  }
};

export const accordionStyle:SxProps = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 5px',
  maxWidth: '880px',
  borderRadius: `8px`,
  border: `1px solid  #F9F9F9`,
  boxShadow: '0px 1px 16px 0px rgba(197, 197, 197, 0.24)',
  '&.Mui-expanded': {
    margin: 0,
    minHeight: '400px'
  },
  '&:before': {
    display: 'none'
  }
};
