import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  fetchDeletePost,
  fetchGetComments,
  fetchGetPosts,
  fetchPatchPost,
  fetchPostPost,
} from './fetchMethods';
import { IComments, IFavoritePosts, PostsType, UsersType } from '../apiTypes';

interface PostsTypeState {
  posts: PostsType
  users: UsersType
  comments: IComments
  favoritePosts: IFavoritePosts
  error: string
}

const initialState: PostsTypeState = {
  posts: [],
  users: [],
  comments: {},
  favoritePosts: {},
  error: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    restoreFavoritePosts: (state) => {
      const favoritePostsString = localStorage.getItem('favoritePosts');
      if (favoritePostsString) {
        const favoritePosts = JSON.parse(favoritePostsString);
        state.favoritePosts = favoritePosts;
      }
    },
    setFavotie: (state, action: PayloadAction<{id: number, bool: boolean}>) => {
      state.favoritePosts = {
        ...state.favoritePosts,
        [action.payload.id]: action.payload.bool,
      };
      localStorage.setItem(
        'favoritePosts',
        JSON.stringify(state.favoritePosts)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.fulfilled, (state, action) => {        
        state.posts = action.payload.postsWithUsers!;
        state.users = action.payload.users!;
      })
      .addCase(fetchGetPosts.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchPatchPost.fulfilled, (state, action) => {
        const updatedPost = action.payload.post;
        if (updatedPost) {
          const user = state.users.find((user) => user.id === updatedPost.userId)!;
          const index = state.posts.findIndex(
            (post) => post.id === updatedPost.id
          );
          if (index !== -1) {
            state.posts[index] = { ...updatedPost, user };
          }
        }
      })
      .addCase(fetchPatchPost.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchPostPost.fulfilled, (state, action) => {
        const newPost = action.payload.post;
        if (newPost) {
          const author = state.users.find((user) => user.id === newPost.userId)!;
          state.posts.push({ ...newPost, user: author });
        }
      })
      .addCase(fetchPostPost.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload.id;
        state.posts = state.posts.filter((post) => post.id !== deletedPostId);
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchGetComments.fulfilled, (state, action) => {
        state.comments = { ...state.comments, ...action.payload.comments };
      })
      .addCase(fetchGetComments.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  },
});

export const { setFavotie, restoreFavoritePosts } = postsSlice.actions;

export default postsSlice.reducer;
