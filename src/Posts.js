import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './store/postsSlice';
import './index.css';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);  

  useEffect(() => {
    dispatch(fetchPosts());  
  }, [dispatch]);

  if (!Array.isArray(posts)) {
    return <div>Loading...</div>;  
  }

  const evenPosts = posts.filter(post => post.id % 2 === 0);

  return (
    <div>
    <h2 class="font-bold text-center m-2 text-blue-500">Task 2 Downwards</h2>
      {evenPosts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {evenPosts.map(post => (
            <li key={post.id}>{post.id} - {post.title}</li>  
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
