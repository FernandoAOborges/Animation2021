import { configureStore } from '@reduxjs/toolkit';
import Posts from './PostsSlice';

export default configureStore({
  reducer: {
    posts: Posts,
  },
});
