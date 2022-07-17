import React from 'react';

import Select from 'components/Select';

function GenderSelect({ gender, setGender }) {
  return (
    <form>
      <div>
        <label>Gender</label>
      </div>
      <Select value={gender} onChange={e => setGender(e.target.value)}>
        <option value="all">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </Select>
    </form>
  );
};

export default GenderSelect;