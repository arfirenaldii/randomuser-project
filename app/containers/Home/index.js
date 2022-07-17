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

function UserTable({ filteredUsers, currentPage, resultPerPage }) {
  const last = currentPage * resultPerPage
  const first = last - resultPerPage
  let filteredUsersNew = filteredUsers.slice(first, last)

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
        {filteredUsersNew.map(user =>
          <tr key={user.login.username}>
            <td>{`[${user.gender}]`}{user.login.username}</td>
            <td>{`${user.name.first} ${user.name.last}`}</td>
            <td>{user.email}</td>
            <td>{user.registered.date}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
};

function SearchInput({ search, onChange }) {
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
          autoComplete="off"
          onChange={onChange}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
};

function GenderFilter(props) {
  return (
    <form>
      <label>
        Gender
        <select value={props.home.gender} onChange={e => props.setGender(e.target.value)}>
          <option value="all">All</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </label>
    </form>
  );
};

function Pagination(props) {
  const {
    users,
    currentPage,
    setCurrentPage,
    resultPerPage,
  } = props

  const pageNumbers = []
  const lastPage = Math.ceil(users / resultPerPage)

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => setCurrentPage(number)}>
          {number}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        {'>'}
      </button>
    </div>
  )
}

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  const [filteredUsers, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.fetchUsers();
  }, [])

  useEffect(() => {
    if (props.home.users.results && props.home.users.results.length > 0) {
      setUsers(props.home.users.results)
    }
  }, [props.home.users])

  const handleSearch = (event) => {
    const searchUsers = props.home.users.results.filter(user =>
      user.name.first.toLowerCase().includes(event.target.value)
    )
    setSearch(event.target.value)
    setCurrentPage(1)
    setUsers(searchUsers)
  }

  return (
    <div>
      <SearchInput
        search={search}
        onChange={handleSearch}
      />
      <GenderFilter {...props} />
      <button>Reset Filter</button>
      {props.home.loadingFetchUsers ?
        <div>Loading...</div>
        :
        <>
          <UserTable
            filteredUsers={filteredUsers}
            currentPage={currentPage}
            resultPerPage={resultPerPage}
          />
          <Pagination
            users={filteredUsers.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            resultPerPage={resultPerPage}
          />
        </>
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
