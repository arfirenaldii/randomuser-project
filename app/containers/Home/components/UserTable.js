import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import TableHead from 'components/Table/TableHead';
import TableRowHead from 'components/Table/TableRowHead';
import TableRowBody from 'components/Table/TableRowBody';
import TableData from 'components/Table/TableData';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledArrow = styled.span`
  cursor: pointer;
  font-size: 10px;
  line-height: 10px;
`;

function getSortedName(users, sort) {
  let sortedUsers = [...users];
  if (sort === 'asc') {
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
  if (sort === 'asc') {
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
  if (sort === 'asc') {
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
  if (sort === 'asc') {
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

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`

function UserTable({ setUsers, filteredUsers, currentPage, resultPerPage }) {
  const last = currentPage * resultPerPage
  const first = last - resultPerPage
  let filteredUsersNew = filteredUsers.slice(first, last)

  return (
    <TableWrapper>
      <table style={{ width: '100%' }}>
        <thead>
          <TableRowHead>
            <TableHead>Username</TableHead>
            <TableHead style={{ display: 'flex' }}>
              Name
              <FlexColumn>
                <StyledArrow onClick={() => setUsers(getSortedName(filteredUsers, 'asc'))}>▲</StyledArrow>
                <StyledArrow onClick={() => setUsers(getSortedName(filteredUsers, 'desc'))}>▼</StyledArrow>
              </FlexColumn>
            </TableHead>
            <TableHead>
              Email
              <StyledArrow onClick={() => setUsers(getSortedEmail(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedEmail(filteredUsers, 'desc'))}>▼</StyledArrow>
            </TableHead>
            <TableHead>
              Gender
              <StyledArrow onClick={() => setUsers(getSortedGender(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedGender(filteredUsers, 'desc'))}>▼</StyledArrow>
            </TableHead>
            <TableHead>
              Registered Date
              <StyledArrow onClick={() => setUsers(getSortedDate(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedDate(filteredUsers, 'desc'))}>▼</StyledArrow>
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
      </table>
    </TableWrapper>
  )
};

export default UserTable