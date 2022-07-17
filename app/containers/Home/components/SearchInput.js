import React from 'react';

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
      <input
        type="text"
        placeholder="Search..."
        name="search"
        value={search}
        autoComplete="off"
        onChange={onChange}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchInput;