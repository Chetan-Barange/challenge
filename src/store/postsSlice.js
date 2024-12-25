// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     return response.data.filter(post => post.id % 2 === 0);
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: { data: [], loading: false, error: null },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchPosts.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default postsSlice.reducer;
// src/store/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { setPosts, addPost, removePost } = postsSlice.actions;

export const fetchPosts = () => async dispatch => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(setPosts(response.data));
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

export default postsSlice.reducer;
