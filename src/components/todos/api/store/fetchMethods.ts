import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, getTodos, patchTodo, postTodo } from '../api';
import { ITodoForRecive, TodosType } from '../apiTypes';

export const fetchGetTodos = createAsyncThunk('todos/getTodos', async () => {
  try {
    const response = await getTodos();
    const todos: TodosType = response.data.map(task => ({
        id: task.id,
        completed: task.completed,
        title: task.title
    }))
    return { todos };
  } catch (error: any) {
    return { error: error.message };
  }
});

export const fetchPatchTodo = createAsyncThunk(
  'todos/postTodo',
  async ({ id, data }: {id: number, data: ITodoForRecive}) => {
    try {
      const response = await patchTodo(id, data);
      return { todo : response.data };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);

export const fetchPostTodo = createAsyncThunk(
  'todos/patchTodo',
  async (data: ITodoForRecive) => {
    try {
      const response = await postTodo(data);
      return { todo : response.data };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);

export const fetchDeleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    try {
      await deleteTodo(id);
      return { id };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);
