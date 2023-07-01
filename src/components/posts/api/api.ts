import { apiRequest, IResponse } from '../../../api/instanceApi';
import { IComment, IPost, IPostForRecive, IUser } from './apiTypes';

// получение постов
export const getPosts = async (): Promise<IResponse<IPost[]>> => {
  const response = await apiRequest.get('/posts');
  return response;
};

// получение пользователей
export const getUsers = async (): Promise<IResponse<IUser[]>> => {
  const response = await apiRequest.get('/users');
  return response;
};
// добавление поста
export const postPost = async (data: IPostForRecive): Promise<IResponse<IPost>> => {
  const response = await apiRequest.post('/posts', data);
  return response;
};

// изменение поста по id
export const patchPost = async (id: number, data: IPostForRecive): Promise<IResponse<IPost>> => {
  const response = await apiRequest.patch(`/posts/${id}`, data);
  return response;
};

// удаление поста по id
export const deletePost = async (id: number) => {
  await apiRequest.delete(`/posts/${id}`);
};


// получение комментариев
export const getComments = async (id: number): Promise<IResponse<IComment[]>> => {
  const response = await apiRequest.get(`/comments?postId=${id}`);
  return response;
};
