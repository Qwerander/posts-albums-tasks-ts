import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchDeleteAlbum,
  fetchGetPhotos,
  fetchPatchAlbum,
  fetchgetAlbums,
} from './fetchMethods';
import { UsersType } from '../../../posts/api/apiTypes';
import { AlbumsType, IFavoriteAlbums, IPhotosByAlbum } from '../apiTypes';

interface AlbumsTypeState {
  albums: AlbumsType
  users: UsersType
  photos: IPhotosByAlbum
  favoriteAlbums: IFavoriteAlbums
  error: string
}

const initialState: AlbumsTypeState = {
  albums: [],
  users: [],
  photos: {},
  favoriteAlbums: {},
  error: '',
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    restoreFavoriteAlbums: (state) => {
      const favoriteAlbumsString = localStorage.getItem('favoriteAlbums');
      if (favoriteAlbumsString) {
        const favoriteAlbums = JSON.parse(favoriteAlbumsString);
        if (favoriteAlbums) {
          state.favoriteAlbums = favoriteAlbums;
        }
      }
    },
    setFavotie: (state, action: PayloadAction<{id: number, bool: boolean}>) => {
      state.favoriteAlbums = {
        ...state.favoriteAlbums,
        [action.payload.id]: action.payload.bool,
      };
      localStorage.setItem(
        'favoriteAlbums',
        JSON.stringify(state.favoriteAlbums)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAlbums.fulfilled, (state, action) => {
        state.albums = action.payload.albumsWithUsers;
        state.users = action.payload.users;
      })
      .addCase(fetchgetAlbums.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchPatchAlbum.fulfilled, (state, action) => {
        const updatedAlbum = action.payload.album;
        if (updatedAlbum) {
          const user = state.users.find(
            (user) => user.id === updatedAlbum.userId)!;
          const index = state.albums.findIndex(
            (album) => album.id === updatedAlbum.id
          );
          if (index !== -1) {
            state.albums[index] = { ...updatedAlbum, user };
          }
        }
      })
      .addCase(fetchPatchAlbum.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchDeleteAlbum.fulfilled, (state, action) => {
        const deletedAlbumId = action.payload.id;
        state.albums = state.albums.filter(
          (album) => album.id !== deletedAlbumId
        );
      })
      .addCase(fetchDeleteAlbum.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchGetPhotos.fulfilled, (state, action) => {
        state.photos = action.payload;
      })
      .addCase(fetchGetPhotos.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  },
});

export const { restoreFavoriteAlbums, setFavotie } = albumsSlice.actions;

export default albumsSlice.reducer;
