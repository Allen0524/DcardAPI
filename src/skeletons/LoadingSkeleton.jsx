import React from 'react';
import SkeletonElement from './SkeletonElement';
import './skeleton.css';

function LoadingSkeleton() {
  return (
    <div className="skeleton__wrapper">
      <div className="listUp__wrapper">
        <SkeletonElement type="avatar" />
        <SkeletonElement type="title" />
      </div>
      <div className="listDown__wrapper">
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
}

export default LoadingSkeleton;
