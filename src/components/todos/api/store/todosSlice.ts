import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDeleteTodo,
  fetchGetTodos,
  fetchPatchTodo,
  fetchPostTodo,
} from './fetchMethods';
import { TodosType } from '../apiTypes';

interface TodosTypeState {
  todos: TodosType
  error: string
}


const initialState: TodosTypeState = {
  todos: [],
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.todos = action.payload.todos!;
      })
      .addCase(fetchGetTodos.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchPostTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload.todo!);
      })
      .addCase(fetchPostTodo.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchPatchTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.todo?.id
        );
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...action.payload.todo };
        }
      })
      .addCase(fetchPatchTodo.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchDeleteTodo.fulfilled, (state, action) => {
        const deletedTodoId = action.payload.id;
        state.todos = state.todos.filter((post) => post.id !== deletedTodoId);
      })
      .addCase(fetchDeleteTodo.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  },
});

export default todosSlice.reducer;
