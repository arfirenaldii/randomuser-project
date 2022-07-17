import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';

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
      <Button
        color="black"
        line={true}
        onClick={onClickFilter}
      >
        Reset Filter
      </Button>
    </Wrapper>
  );
};

export default SearchAndFilter;