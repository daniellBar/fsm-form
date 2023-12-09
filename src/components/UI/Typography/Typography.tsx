import React from 'react';
import { StyledTypography } from './styles';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { COLORS } from '../../../globalStyles';

export type typographyTypes =
  | 'heading-md'
  | 'heading-lg'
  | 'heading-xl'
  | 'subheading'
  | 'body'
  | 'body-semibold'
  | 'caption'
  | 'x-small'
  | 'btn-medium-big'
  | 'button-sm'
  | 'subheading-xl'
  | 'heading-xxl';

export type weightType = 'regular' | 'medium' | 'semibold' | 'bold' | 'lighter';

export interface TypographyProps {
  type?: typographyTypes;
  weight?: weightType;
  color?: string;
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties;
}
const Typography: React.FC<TypographyProps> = ({
  children,
  type = 'body',
  weight = 'regular',
  color = COLORS.PRIMARY_BLACK,
  className,
  style
}) => {
  return (
    <StyledTypography
      style={style}
      data-testid="typography"
      className={className}
      type={type}
      weight={weight}
      color={color}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
