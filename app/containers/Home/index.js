/**
 *
 * Home
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchUsers } from './actions';

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  useEffect(() => {
    props.fetchUsers()
  }, [])

  if (props.home.loadingFetchUsers) {
    return <div>Loading...</div>
  }

  return (
    <div>
      Home container
      {props.home.users.results && props.home.users.results.map(user =>
        <div key={user.id.value}>
          <p><b>{`Username: `}</b>{user.login.username}</p>
          <p><b>{`Name: `}</b>{`${user.name.first} ${user.name.last}`}</p>
          <p><b>{`Email: `}</b>{user.email}</p>
          <p><b>{`Registered Date: `}</b>{user.registered.date}</p>
          <hr />
        </div>
      )}
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
