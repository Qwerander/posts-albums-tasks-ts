import { apiRequest, IResponse } from '../../../api/instanceApi';
import { IUser } from '../../posts/api/apiTypes';
import { IAlbum, IAlbumForRecive, PhotosType } from './apiTypes';

// получение альбомов
export const getAlbums = async (): Promise<IResponse<IAlbum[]>> => {
  const response = await apiRequest.get('/albums');
  return response;
};

// изменение альбомапо id
export const patchAlbum = async (id: number, data: IAlbumForRecive): Promise<IResponse<IAlbum>> => {
  const response = await apiRequest.patch(`/albums/${id}`, data);
  return response;
};

// удфление альбома по id
export const deleteAlbum = async (id: number) => {
  await apiRequest.delete(`/albums/${id}`);
};

// получение фото
export const getPhotos = async (): Promise<IResponse<PhotosType>> => {
  const response = await apiRequest.get(`/photos/`);
  return response;
};

// получение пользователей
export const getUsers = async (): Promise<IResponse<IUser[]>> => {
  const response = await apiRequest.get('/users');
  return response;
};
