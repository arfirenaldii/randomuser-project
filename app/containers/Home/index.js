/**
 *
 * Home
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  fetchUsers,
  setGender,
} from './actions';

function UserTable({ users }) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Registered Date</th>
        </tr>
      </thead>
      <tbody>
        {users.results && users.results.map(user =>
          <tr key={user.login.username}>
            <td>{user.login.username}</td>
            <td>{`${user.name.first} ${user.name.last}`}</td>
            <td>{user.email}</td>
            <td>{user.registered.date}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

function SearchInput() {
  const [search, setSearch] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    alert(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
};

const useSetGender = (props) => {
  const [gender, setGender] = useState('all');
  return [gender, setGender];
};

function GenderFilter(props) {
  // const [gender, setGender] = useSetGender(props);

  return (
    <form>
      <label>
        Gender
        {/* <select value={gender} onChange={e => setGender(e.target.value)}> */}
        <select value={props.home.gender} onChange={e => props.setGender(e.target.value)}>
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
    </form>
  );
};

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  useEffect(() => {
    props.fetchUsers();
  }, [])

  return (
    <div>
      <SearchInput />
      <GenderFilter {...props} />
      <button>Reset Filter</button>
      {props.home.loadingFetchUsers ?
        <div>Loading...</div>
        :
        <UserTable users={props.home.users} />
      }
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchUsers: () => dispatch(fetchUsers()),
    setGender: gender => dispatch(setGender(gender)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
