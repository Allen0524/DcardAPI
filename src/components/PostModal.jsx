/* eslint-disable object-shorthand */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import Tag from './Tag';
import Comment from './Comment';
import replaceImg from '../utils/stringToHtml';
import transDate from '../utils/dateTransfer';
import PostModalSkeleton from '../skeletons/PostModalSkeleton';
import '../styles/PostModal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '52%',
    width: '50%',
    height: '100%',
    padding: '20px 0px',
    transform: 'translate(-50%, -50%)',
  },
};

function PostModal({ isOpen, onRequestClose, postId }) {
  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getHtml() {
    return { __html: posts.content };
  }

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  const fetchPostContent = () => {
    return fetch(`http://localhost:3001/my-service/posts/${postId}`)
      .then((res) => res.json())
      .then((post) => {
        const content = replaceImg(post.content);
        return {
          posts: { ...post, content },
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchComment = () => {
    return fetch(`http://localhost:3001/my-service/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        return {
          data: data,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (postId) {
      const fetchData = async () => {
        const [postContent, commentContent] = await Promise.all([
          fetchPostContent(),
          fetchComment(),
        ]);
        setPosts(postContent.posts);
        setComments(commentContent.data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [postId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PostModal"
      style={customStyles}
    >
      {isLoading ? (
        <PostModalSkeleton />
      ) : (
        <>
          <div className="modal__header">
            <Avatar
              className={
                posts.gender === 'M' ? 'avatar__male' : 'avatar__female'
              }
              style={{ height: '32px', width: '32px' }}
            />
            <div>
              <h5>{posts.school ? posts.school : '匿名'}</h5>
              <h5>{posts.department ? `@${posts.department}` : ''}</h5>
            </div>
          </div>
          <div className="modal__content">
            <h1>{posts.title}</h1>
            <div className="content__stat">
              <div className="stat__tag">{posts.forumName}</div>
              <div>{transDate(posts.createdAt)}</div>
            </div>
            <div id="content666" dangerouslySetInnerHTML={getHtml()}>
              {}
            </div>
            <div className="tags">
              {posts.topics &&
                posts.topics.map((tag, index) => (
                  <Tag key={index} tagName={tag} />
                ))}
            </div>
          </div>
          <div className="comments">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                content={comment.content && replaceImg(comment.content)}
                school={comment.school}
                likeCount={comment.likeCount}
                gender={comment.gender}
                floor={comment.floor}
                host={comment.host}
              />
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}

PostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.any.isRequired,
  postId: PropTypes.any.isRequired,
};

export default PostModal;
