/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './skeleton.css';
import PropTypes from 'prop-types';

function SkeletonElement({ type }) {
  const classes = `skeleton ${type}`;
  return <div className={classes} />;
}

SkeletonElement.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SkeletonElement;
