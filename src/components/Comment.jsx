/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import '../styles/Comment.css';

export default function Comment({
  content,
  school,
  likeCount,
  gender,
  floor,
  host,
}) {
  function getHtml() {
    return { __html: content };
  }

  return (
    <div className="comment">
      <div className="comment__wrapper">
        <div className="userInfo__wrapper">
          <div className="wrapper">
            <Avatar
              className={gender === 'M' ? 'avatar__male' : 'avatar__female'}
              style={{ height: '32px', width: '32px' }}
            />
            <div className="school">
              <div className="name">{host ? '原 PO' : school}</div>
              <div className="date">{`B${floor}`}</div>
            </div>
          </div>
          <div className="likeCount">{likeCount}</div>
        </div>
        <div className="comment__content" dangerouslySetInnerHTML={getHtml()}>
          {}
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  content: PropTypes.string,
  school: PropTypes.string,
  likeCount: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  floor: PropTypes.number.isRequired,
  host: PropTypes.bool.isRequired,
};

Comment.defaultProps = {
  content: '',
  school: '',
};
