import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, currentPage, handlePaginationClick }) => {
  const handleClick = (pageNumber, event) => {
    event.preventDefault();  // Prevent default behavior
    handlePaginationClick(pageNumber);
  };

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={(event) => handleClick(i + 1, event)}
          className={i + 1 === currentPage ? 'active' : ''}
          style={{ backgroundColor: i + 1 === currentPage ? '#4a235a' : '#f9f9f9', color: i + 1 === currentPage ? '#fff' : '#333' }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
