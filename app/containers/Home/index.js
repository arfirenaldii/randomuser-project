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

import LoadingIndicator from 'components/LoadingIndicator';

import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  fetchUsers,
  setGender,
} from './actions';

import { useDebounce } from './utils/debounce';

import UserTable from './components/UserTable';
import SearchAndFilter from './components/SearchAndFilter';
import Pagination from './components/Pagination';

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

  useDebounce(() => {
    if (props.home.users.length > 0) {
      const searchUsers = props.home.users.filter(user =>
        user.name.first.toLowerCase().includes(search)
      )
      setCurrentPage(1)
      setUsers(searchUsers)
    }
  }, [search], 800);

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleResetFilter = () => {
    setSearch('')
    setCurrentPage(1)
    props.setGender('all')
  }

  return (
    <div>
      <h2>Example With Search and Filter</h2>
      <SearchAndFilter
        search={search}
        onChangeSearch={handleSearch}
        gender={props.home.gender}
        setGender={props.setGender}
        onClickFilter={handleResetFilter}
      />
      <br />
      <hr />
      <br />
      {props.home.loadingFetchUsers ?
        <LoadingIndicator />
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
