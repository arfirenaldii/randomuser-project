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

function UserTable({ users, currentPage, resultPerPage }) {
  const [filteredUsers, setUsers] = useState([])

  const last = currentPage * resultPerPage
  const first = last - resultPerPage

  useEffect(() => {
    setUsers(users.results.slice(first, last))
  }, [filteredUsers])

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
        {filteredUsers.map(user =>
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
          autoComplete="off"
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

function Pagination(props) {
  const pageNumbers = []
  const lastPage = Math.ceil(props.results / props.resultPerPage)

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <button
        onClick={() => props.setCurrentPage(props.currentPage - 1)}
        disabled={props.currentPage === 1}
      >
        {'<'}
      </button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => props.setCurrentPage(number)}>
          {number}
        </button>
      ))}
      <button
        onClick={() => props.setCurrentPage(props.currentPage + 1)}
        disabled={props.currentPage === lastPage}
      >
        {'>'}
      </button>
    </div>
  )
}

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(10);

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
        <UserTable
          users={props.home.users}
          currentPage={currentPage}
          resultPerPage={resultPerPage}
        />
      }
      <Pagination
        results={props.home.users.results && props.home.users.results.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        resultPerPage={resultPerPage}
      />
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
