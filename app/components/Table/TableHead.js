import styled from 'styled-components';

export const TableHead = styled.th`
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  padding: 12px;
  color: #333333;
  background-color: ${props => props.active ? '#f5f5f5': '#fafafa'};

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

export default TableHead;
