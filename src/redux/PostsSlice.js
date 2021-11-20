import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const retornaPostsAsync = createAsyncThunk(
  'posts/retornaPostsAsync',
  async (payload, thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    return thunkAPI.rejectWithValue(json);
  },
);

export const retornaComentariosAsync = createAsyncThunk(
  'posts/retornaComentariosAsync',
  async (payload, thunkAPI) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    return thunkAPI.rejectWithValue(json);
  },
);

const initialState = {
  status: 'idle',
  erroPosts: '',
  postagems: [],
  comentarios: [],
};

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retornaPostsAsync.pending, (state) => {
      state.status = 'loading';
      state.erroPosts = '';
    });
    builder.addCase(retornaPostsAsync.fulfilled, (state, { payload }) => {
      state.status = 'sucesso';
      state.postagems = payload;
    });
    builder.addCase(retornaPostsAsync.rejected, (state, action) => {
      state.status = 'falhou';
      state.erroPosts = action.error.message;
    });
  },
});

export const PostsSelector = createSelector(
  (state) => ({
    status: state.posts.status,
    postagems: state.posts.postagems,
    comentarios: state.posts.comentarios,
  }),
  (state) => state,
);

export default PostsSlice.reducer;
