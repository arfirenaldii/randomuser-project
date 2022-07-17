import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { color } from 'components/colors';

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: block;
  padding: 4px 12px;
  text-decoration: none;
  margin: 0 4px;
  color: ${props => props.active ? color.blue : color.black};
  background-color: #fff;
  border: ${props => props.active ? `1px solid ${color.blue}` : "1px solid #dee2e6"};

  ${props => !props.active && `
    &:hover {
      text-decoration: none;
      color: ${color.black};
      background-color: #e9ecef;
      border-color: #dee2e6;
    }
  `}

  ${props => props.disabled && `
    pointer-events: none;
    cursor: auto;
    color: #6c757d;
    background-color: #fff;
    border-color: #dee2e6;
  `}
`;

function Item({ children, onClick, active, disabled }) {
  return (
    <li>
      <StyledButton
        onClick={onClick}
        active={active}
        disabled={disabled}
      >
        {children}
      </StyledButton>
    </li>
  )
}

Item.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Item;