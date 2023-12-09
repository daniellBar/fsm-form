// External imports
import styled, { css } from 'styled-components';

// Internal imports
import { BORDER_RADIUS, COLORS } from '../../../globalStyles';

export const PositionContainer = styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width};
`;

export const StyledLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const TextContainer = styled.div<{
  width?: string;
}>`
  ${({ width }) => css`
    width: ${width};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  `}
`;

export const MultiSelectField = styled.div<{
  hasSelection: boolean;
  disabled: boolean;
  isOpen: boolean;
  width?: string;
}>`
  ${({ disabled, hasSelection: isSelection, isOpen }) => css`
    height: 40px;
    gap: 10px;
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    opacity: ${disabled && '0.5'};
    pointer-events: ${disabled && 'none'};
    border-radius: ${BORDER_RADIUS}px;
    border: 1px solid ${isOpen ? COLORS.PRIMARY : isSelection ? 'none' : COLORS.NEUTRAL_300};
    background: ${isSelection ? '#FAFAFA' : isOpen ? 'inherit' : COLORS.WHITE};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 12px;
    color: ${isSelection ? COLORS.PRIMARY_BLACK : COLORS.NEUTRAL_800};
    :hover {
      border: 1px solid ${!isOpen && !isSelection ? COLORS.PRIMARY_BLACK : 'none'};
    }
  `}
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  z-index: 1;
`;
