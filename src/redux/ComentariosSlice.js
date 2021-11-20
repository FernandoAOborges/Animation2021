import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

export const retornaComentariosAsync = createAsyncThunk(
  'comentarios/retornaComentariosAsync',
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
  erroComentarios: '',
  comentarios: [],
};

export const ComentariosSlice = createSlice({
  name: 'comentarios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(retornaComentariosAsync.pending, (state) => {
      state.status = 'loading';
      state.erroComentarios = '';
    });
    builder.addCase(retornaComentariosAsync.fulfilled, (state, { payload }) => {
      state.status = 'sucesso';
      state.comentarios = payload;
    });
    builder.addCase(retornaComentariosAsync.rejected, (state, action) => {
      state.status = 'falhou';
      state.erroComentarios = action.error.message;
    });
  },
});

export const ComentariosSelector = createSelector(
  (state) => ({
    status: state.comentarios.status,
    comentarios: state.comentarios.comentarios,
  }),
  (state) => state,
);

export default ComentariosSlice.reducer;
