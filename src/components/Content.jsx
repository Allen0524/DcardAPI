/* eslint-disable object-curly-newline */
/* eslint-disable no-else-return */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import useFetchPost from '../hooks/useFetchPost';
import LoadingSkeleton from '../skeletons/LoadingSkeleton';
import PostModal from './PostModal';
import Post from './Post';
import '../styles/Content.css';

export default function Content() {
  const [lastId, setLastId] = useState(null);
  const { loading, posts, hasMorePost, error } = useFetchPost(lastId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPostId, setModalPostId] = useState(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (postId) => {
    setIsModalOpen(true);
    setModalPostId(postId);
  };

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePost) {
          setLastId(node.getAttribute('id'));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMorePost],
  );

  return (
    <div className="content">
      {posts.length !== 0 ? (
        <>
          <List
            className="list"
            width={780}
            height={640}
            itemSize={162}
            itemCount={posts.length}
          >
            {({ index, style }) => {
              if (posts.length === index + 1) {
                // 最後一筆文章，觸發無限載入用的
                return (
                  <div style={style} ref={lastPostRef} id={posts[index].id}>
                    <Post
                      key={posts[index].id}
                      title={posts[index].title}
                      forumName={posts[index].forumName}
                      school={posts[index].school}
                      excerpt={posts[index].excerpt}
                      likeCount={posts[index].likeCount}
                      commentCount={posts[index].commentCount}
                      img={
                        !posts[index].mediaMeta
                          ? '123'
                          : posts[index].mediaMeta[0]
                      }
                      gender={posts[index].gender}
                      reactions={posts[index].reactions}
                      onClick={() => {
                        handleModalOpen(posts[index].id);
                      }}
                    />
                    {loading ? <LoadingSkeleton /> : null}
                  </div>
                );
              } else {
                return (
                  <div style={style}>
                    <Post
                      key={posts[index].id}
                      title={posts[index].title}
                      forumName={posts[index].forumName}
                      school={posts[index].school}
                      excerpt={posts[index].excerpt}
                      likeCount={posts[index].likeCount}
                      commentCount={posts[index].commentCount}
                      img={
                        !posts[index].mediaMeta
                          ? '123'
                          : posts[index].mediaMeta[0]
                      }
                      gender={posts[index].gender}
                      reactions={posts[index].reactions}
                      onClick={() => {
                        handleModalOpen(posts[index].id);
                      }}
                    />
                  </div>
                );
              }
            }}
          </List>
          <PostModal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            postId={modalPostId}
          />
        </>
      ) : (
        <div className="list">
          {[1, 2, 3].map((n) => (
            <LoadingSkeleton key={n} />
          ))}
        </div>
      )}
    </div>
  );
}
