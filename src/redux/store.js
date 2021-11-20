import { configureStore } from '@reduxjs/toolkit';
import Posts from './PostsSlice';
import Comentarios from './ComentariosSlice';

export default configureStore({
  reducer: {
    posts: Posts,
    comentarios: Comentarios,
  },
});
