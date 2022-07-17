import styled from 'styled-components';

import { color } from 'components/colors';

export const Input = styled.input`
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: ${color.white};
  background-clip: padding-box;
  border: 1px solid ${color.lightGrey};
  appearance: none;
  border-radius: 4px;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:focus {
    color: #212529;
    background-color: ${color.white};
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;

export default Input;
