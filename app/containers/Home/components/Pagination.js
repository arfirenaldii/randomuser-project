import React from 'react';
import styled from 'styled-components';

import PaginationWrapper from 'components/Pagination/Wrapper';
import PaginationItem from 'components/Pagination/Item';

const Wrapper = styled(PaginationWrapper)`
  justify-content: end;
`;

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
    <Wrapper>
      <PaginationItem
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </PaginationItem>
      {pageNumbers.map(number => (
        <PaginationItem
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </PaginationItem>
      ))}
      <PaginationItem
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        {'>'}
      </PaginationItem>
    </Wrapper>
  )
}

export default Pagination;