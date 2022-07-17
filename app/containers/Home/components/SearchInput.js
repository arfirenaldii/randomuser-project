import React from 'react';

import Input from 'components/Input';
import Button from 'components/Button';

function SearchInput({ search, onChange }) {
  const handleSubmit = event => {
    event.preventDefault();
    alert(search);
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
      <Button>Search</Button>
    </form>
  );
};

export default SearchInput;