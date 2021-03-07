/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tag.css';

function Tag({ tagName }) {
  return (
    <div className="tag">
      <div>
        <a href="#">{tagName}</a>
      </div>
    </div>
  );
}

Tag.propTypes = {
  tagName: PropTypes.string.isRequired,
};

export default Tag;
