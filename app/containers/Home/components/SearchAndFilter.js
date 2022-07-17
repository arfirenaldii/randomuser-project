import React from 'react';
import styled from 'styled-components';

import SearchInput from './SearchInput';
import GenderSelect from './GenderSelect';

const Wrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;

function SearchAndFilter({ search, onChangeSearch, gender, setGender, onClickFilter }) {
  return (
    <Wrapper>
      <SearchInput
        search={search}
        onChange={onChangeSearch}
      />
      <GenderSelect
        gender={gender}
        setGender={setGender}
      />
      <button onClick={onClickFilter}>Reset Filter</button>
    </Wrapper>
  );
};

export default SearchAndFilter;