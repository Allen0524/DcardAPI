/* eslint-disable object-curly-newline */
import { useEffect, useState } from 'react';

export default function useFetchPost(lastId) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [hasMorePost, setHasMore] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (lastId) {
      setTimeout(() => {
        fetch(
          `http://localhost:3001/my-service/posts?popular=true&before=${lastId}&limit=4`,
        )
          .then((res) => res.json())
          .then((post) => {
            setPosts((prevPosts) => [...prevPosts, ...post]);
            setHasMore(post.length > 0);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
          });
      }, 1000);
    } else {
      setTimeout(() => {
        fetch('http://localhost:3001/my-service/posts?popular=true&limit=4')
          .then((res) => res.json())
          .then((post) => {
            setPosts(post);
            setHasMore(post.length > 0);
            setLoading(false);
          })
          .catch(() => {
            setError(true);
          });
      }, 1000);
    }
  }, [lastId]);

  return { loading, posts, hasMorePost, error };
}
