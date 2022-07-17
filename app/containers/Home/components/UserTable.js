import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledArrow = styled.span`
  cursor: pointer;
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

function UserTable({ setUsers, filteredUsers, currentPage, resultPerPage }) {
  const last = currentPage * resultPerPage
  const first = last - resultPerPage
  let filteredUsersNew = filteredUsers.slice(first, last)

  return (
    <TableWrapper>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>
              Name
              <StyledArrow onClick={() => setUsers(getSortedName(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedName(filteredUsers, 'desc'))}>▼</StyledArrow>
            </th>
            <th>
              Email
              <StyledArrow onClick={() => setUsers(getSortedEmail(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedEmail(filteredUsers, 'desc'))}>▼</StyledArrow>
            </th>
            <th>
              Gender
              <StyledArrow onClick={() => setUsers(getSortedGender(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedGender(filteredUsers, 'desc'))}>▼</StyledArrow>
            </th>
            <th>
              Registered Date
              <StyledArrow onClick={() => setUsers(getSortedDate(filteredUsers, 'asc'))}>▲</StyledArrow>
              <StyledArrow onClick={() => setUsers(getSortedDate(filteredUsers, 'desc'))}>▼</StyledArrow>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsersNew.map(user =>
            <tr key={user.login.username}>
              <td>{user.login.username}</td>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{format(new Date(user.registered.date), 'yyyy-MM-dd HH:mm')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </TableWrapper>
  )
};

export default UserTable