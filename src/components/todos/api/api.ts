import { IResponse, apiRequest } from '../../../api/instanceApi';
import { ITodo, ITodoForRecive, TodosType } from './apiTypes';

// получение задач
export const getTodos = async (): Promise<IResponse<TodosType>> => {
  const response = await apiRequest.get('/todos');
  return response;
};

// добавление задачи
export const postTodo = async (data: ITodoForRecive): Promise<IResponse<ITodo>> => {
  const response = await apiRequest.post(`/todos`, data);
  return response;
};

// изменение задачи по id
export const patchTodo = async (id: number, data: ITodoForRecive): Promise<IResponse<ITodo>> => {
  const response = await apiRequest.patch(`/todos/${id}`, data);
  return response;
};

// удаление задачи по id
export const deleteTodo = async (id: number) => {
  await apiRequest.delete(`/todos/${id}`);
};
