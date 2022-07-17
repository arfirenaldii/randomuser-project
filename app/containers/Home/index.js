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

import UserTable from './components/UserTable';
import SearchAndFilter from './components/SearchAndFilter';

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
    if (props.home.users.length > 0) {
      setUsers(props.home.users)
    }
  }, [props.home.users])

  const handleSearch = (event) => {
    const searchUsers = props.home.users.filter(user =>
      user.name.first.toLowerCase().includes(event.target.value)
    )
    setSearch(event.target.value)
    setCurrentPage(1)
    setUsers(searchUsers)
  }

  const handleResetFilter = () => {
    setSearch('')
    props.setGender('all')
  }

  return (
    <div>
      <SearchAndFilter
        search={search}
        onChangeSearch={handleSearch}
        gender={props.home.gender}
        setGender={props.setGender}
        onClickFilter={handleResetFilter}
      />
      <br />
      <hr />
      {props.home.loadingFetchUsers ?
        <div>Loading...</div>
        :
        <>
          <UserTable
            setUsers={setUsers}
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
