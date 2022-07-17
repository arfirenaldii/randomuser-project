import styled from 'styled-components';

import { color } from 'components/colors';

const black = {
  color: color.white,
  border: color.lightGrey,
  backgroundColor: color.black,
}

const blue = {
  color: color.white,
  border: color.blue,
  backgroundColor: color.blue,
  hover: color.hoverBlue
}

function getColor(color) {
  switch (color) {
    case 'black':
      return black;

    case 'blue':
      return blue;

    default:
      return blue;
  }
}


export const Button = styled.button`
  cursor: pointer;
  outline: 0;

  ${props => props.line ? `
    color: ${getColor(props.color).backgroundColor};
    border: 1px solid ${getColor(props.color).border};
    background-color: ${getColor(props.color).color};
  `:
  `
    color: ${getColor(props.color).color};
    border: 1px solid ${getColor(props.color).border};
    background-color: ${getColor(props.color).backgroundColor};
  `}

  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  ${props => props.line ? `
    &:hover {
      color: ${getColor(props.color).color};
      background-color: ${getColor(props.color).backgroundColor};
      border-color: ${getColor(props.color).border};
    }
  `:
  `
    &:hover {
      color: ${color.white};
      background-color: ${getColor(props.color).hover};
      border-color: ${getColor(props.color).hover};
    }
  `}

`;

export default Button;
