import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import TableHead from 'components/Table/TableHead';
import TableRowHead from 'components/Table/TableRowHead';
import TableRowBody from 'components/Table/TableRowBody';
import TableData from 'components/Table/TableData';

import { color } from 'components/colors';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 900px;
`;

const StyledArrow = styled.span`
  cursor: pointer;
  font-size: 10px;
  line-height: 10px;

  color: ${props => props.active ? color.blue : color.lightGrey};
`;

const SortWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function getSortedName(users, sort) {
  let sortedUsers = [...users];
  if (sort) {
    sortedUsers.sort((a, b) =>
      a.name.first > b.name.first ? 1 : -1
    )
  } else {
    sortedUsers.sort((a, b) =>
      a.name.first < b.name.first ? 1 : -1
    );
  }
  return sortedUsers
}

function getSortedEmail(users, sort) {
  let sortedUsers = [...users];
  if (sort) {
    sortedUsers.sort((a, b) =>
      a.email > b.email ? 1 : -1
    )
  } else {
    sortedUsers.sort((a, b) =>
      a.email < b.email ? 1 : -1
    );
  }
  return sortedUsers
}

function getSortedGender(users, sort) {
  let sortedUsers = [...users];
  if (sort) {
    sortedUsers.sort((a, b) =>
      a.gender > b.gender ? 1 : -1
    )
  } else {
    sortedUsers.sort((a, b) =>
      a.gender < b.gender ? 1 : -1
    );
  }
  return sortedUsers
}

function getSortedDate(users, sort) {
  let sortedUsers = [...users];
  if (sort) {
    sortedUsers.sort((a, b) =>
      a.registered.date > b.registered.date ? 1 : -1
    )
  } else {
    sortedUsers.sort((a, b) =>
      a.registered.date < b.registered.date ? 1 : -1
    );
  }
  return sortedUsers
}

function UserTable({ setUsers, filteredUsers, currentPage, resultPerPage }) {
  const [sorted, setSorted] = useState('');
  const [active, setActive] = useState('');

  const last = currentPage * resultPerPage
  const first = last - resultPerPage
  let filteredUsersNew = filteredUsers.slice(first, last)

  const handleSortName = (sort) => {
    setActive('name')
    if (active !== 'name') {
      setSorted(sort)
      setUsers(getSortedName(filteredUsers, sort))
    } else {
      setSorted(!sorted)
      setUsers(getSortedName(filteredUsers, !sorted))
    }
  }

  const handleSortEmail = (sort) => {
    setActive('email')
    if (active !== 'email') {
      setSorted(sort)
      setUsers(getSortedEmail(filteredUsers, sort))
    } else {
      setSorted(!sorted)
      setUsers(getSortedEmail(filteredUsers, !sorted))
    }
  }

  const handleSortGender = (sort) => {
    setActive('gender')
    if (active !== 'gender') {
      setSorted(sort)
      setUsers(getSortedGender(filteredUsers, sort))
    } else {
      setSorted(!sorted)
      setUsers(getSortedGender(filteredUsers, !sorted))
    }
  }

  const handleSortDate = (sort) => {
    setActive('date')
    if (active !== 'date') {
      setSorted(sort)
      setUsers(getSortedDate(filteredUsers, sort))
    } else {
      setSorted(!sorted)
      setUsers(getSortedDate(filteredUsers, !sorted))
    }
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <TableRowHead>
            <TableHead>Username</TableHead>
            <TableHead
              active={active === 'name'}
              onClick={() => handleSortName(true)}
            >
              <HeaderWrapper>
                <span>Name</span>
                <SortWrapper>
                  <StyledArrow active={active === 'name' && sorted === true}>▲</StyledArrow>
                  <StyledArrow active={active === 'name' && sorted === false}>▼</StyledArrow>
                </SortWrapper>
              </HeaderWrapper>
            </TableHead>
            <TableHead active={active === 'email'} onClick={() => handleSortEmail(true)}>
              <HeaderWrapper>
                <span>Email</span>
                <SortWrapper>
                  <StyledArrow active={active === 'email' && sorted === true}>▲</StyledArrow>
                  <StyledArrow active={active === 'email' && sorted === false}>▼</StyledArrow>
                </SortWrapper>
              </HeaderWrapper>
            </TableHead>
            <TableHead active={active === 'gender'} onClick={() => handleSortGender(true)}>
              <HeaderWrapper>
                <span>Gender</span>
                <SortWrapper>
                  <StyledArrow active={active === 'gender' && sorted === true}>▲</StyledArrow>
                  <StyledArrow active={active === 'gender' && sorted === false}>▼</StyledArrow>
                </SortWrapper>
              </HeaderWrapper>
            </TableHead>
            <TableHead active={active === 'date'} onClick={() => handleSortDate(true)}>
              <HeaderWrapper>
                <span>Registered Date</span>
                <SortWrapper>
                  <StyledArrow active={active === 'date' && sorted === true}>▲</StyledArrow>
                  <StyledArrow active={active === 'date' && sorted === false}>▼</StyledArrow>
                </SortWrapper>
              </HeaderWrapper>
            </TableHead>
          </TableRowHead>
        </thead>
        <tbody>
          {filteredUsersNew.map(user =>
            <TableRowBody key={user.login.username}>
              <TableData>{user.login.username}</TableData>
              <TableData>{`${user.name.first} ${user.name.last}`}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.gender}</TableData>
              <TableData>{format(new Date(user.registered.date), 'yyyy-MM-dd HH:mm')}</TableData>
            </TableRowBody>
          )}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
};

export default UserTable