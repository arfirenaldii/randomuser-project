import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  min-height: 30px;
`;

function GenderSelect({ gender, setGender }) {
  return (
    <form>
      <div>
        <label>Gender</label>
      </div>
      <StyledSelect value={gender} onChange={e => setGender(e.target.value)}>
        <option value="all">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </StyledSelect>
    </form>
  );
};

export default GenderSelect;