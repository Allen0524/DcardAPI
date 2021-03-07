/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */
import React from 'react';
import '../styles/Post.css';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import reactionDict from '../utils/reactionDict';

function Post({
  title,
  forumName,
  school,
  excerpt,
  likeCount,
  commentCount,
  img,
  gender,
  reactions,
  onClick,
}) {
  let newImg = '';
  if (img) {
    newImg = img.url.replace('https://i.imgur.com/', 'https://imgur.dcard.tw/');
  } else {
    newImg = '';
  }
  return (
    <div className="post" onClick={onClick}>
      <div className="post__left">
        <div className="post__avatar">
          <Avatar
            className={gender === 'M' ? 'avatar__male' : 'avatar__female'}
            style={{ height: '20px', width: '20px' }}
          />
          <h5>
            {forumName}。<span>{school}</span>
          </h5>
        </div>
        <h3>{title}</h3>
        <div className="post__excerpt">
          <span>{excerpt}</span>
        </div>
        <div className="post__status">
          <div>
            {reactions.map((emoj, index) => {
              if (index >= 3) return;
              return (
                <img key={emoj.id} src={reactionDict.get(emoj.id)} alt="" />
              );
            })}
          </div>
          <p>{likeCount}</p>

          <p>
            回應<span>{commentCount}</span>
          </p>
          <p>收藏</p>
        </div>
      </div>
      <div className="post__img">
        {newImg ? <img src={newImg} alt="" /> : ''}
      </div>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  forumName: PropTypes.string.isRequired,
  school: PropTypes.string,
  excerpt: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  img: PropTypes.object.isRequired,
  gender: PropTypes.string.isRequired,
  reactions: PropTypes.array.isRequired,
  onClick: PropTypes.any.isRequired,
};

Post.defaultProps = {
  school: '',
};

export default Post;
