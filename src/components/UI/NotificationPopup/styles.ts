// External imports
import { SxProps } from '@mui/system';
import styled from 'styled-components';

export const DialogHeaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 35px;
  padding-bottom: 25px;
`;

export const dialogContentStyle: SxProps = {
  paddingTop: '0',
  paddingBottom: '0',
  textAlign: 'center',
  minWidth: '460px'
};

export const dialogActionsStyle: SxProps = {
  padding: '20px 0 25px 0',
  justifyContent: 'center'
};
