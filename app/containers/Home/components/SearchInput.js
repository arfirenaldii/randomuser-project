import React from 'react';
import styled from 'styled-components';

import Input from 'components/Input';
import Button from 'components/Button';

import SearchIcon from '../images/search.svg';

const StyledIcon = styled.img`
  width: 15px;
  height: 15px;
`
function SearchInput({ search, onChange }) {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Search</label>
      </div>
      <Input
        type="text"
        placeholder="Search..."
        name="search"
        value={search}
        autoComplete="off"
        onChange={onChange}
      />
      <Button color="blue">
        <StyledIcon src={SearchIcon} alt="search" />
      </Button>
    </form>
  );
};

export default SearchInput;