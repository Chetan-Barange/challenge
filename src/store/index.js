import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    posts: postsReducer,
  },
});

export default store;