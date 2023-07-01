import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteAlbum,
  getAlbums,
  getPhotos,
  getUsers,
  patchAlbum,
} from '../api';
import { AlbumsType, IAlbumForRecive, IPhoto, IPhotosByAlbum } from '../apiTypes';
import { UsersType } from '../../../posts/api/apiTypes';

interface IGetAlbumsResponse {
  albumsWithUsers: AlbumsType;
  users: UsersType;
  error: string;
}


export const fetchgetAlbums = createAsyncThunk<IGetAlbumsResponse>(
  //@ts-ignore
  'albums/getAlbums', async () => {
    try {
      const response = await getAlbums();
      const albums = response.data;

      const usersResponse = await getUsers();
      const users = usersResponse.data.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }));

      const albumsWithUsers = albums.map((album) => {
        const user = users.find((user) => user.id === album.userId);
        return { ...album, user };
      });
      return { albumsWithUsers, users };
    } catch (error: any) {
      return { error: error.message };
    }
  });

export const fetchPatchAlbum = createAsyncThunk(
  'posts/patchAlbum',
  async ({ id, data }: { id: number, data: IAlbumForRecive }) => {
    try {
      const response = await patchAlbum(id, data);
      return { album: response.data };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);

export const fetchDeleteAlbum = createAsyncThunk(
  'posts/deleteAlbum',
  async (id: number) => {
    try {
      await deleteAlbum(id);
      return { id };
    } catch (error: any) {
      return { error: error.message };
    }
  }
);

export const fetchGetPhotos = createAsyncThunk<IPhotosByAlbum, void, { rejectValue: { error: string } }>(
  'posts/photosByAlbum',
  async () => {
    try {
      const response = await getPhotos();

      const photosByAlbum = response.data.reduce((acc: { [albumId: number]: IPhoto[] }, photo) => {
        const albumId = photo.albumId;

        if (!acc[albumId]) {
          acc[albumId] = [];
        }

        acc[albumId].push(photo);

        return acc;
      }, {});

      return photosByAlbum ;
    } catch (error: any) {
      return { error: error.message };
    }
  }
);
