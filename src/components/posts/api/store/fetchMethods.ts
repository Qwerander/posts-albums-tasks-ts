import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deletePost,
  getComments,
  getPosts,
  getUsers,
  patchPost,
  postPost,
} from '../api';
import { UsersType, PostsType, IPostForRecive } from '../apiTypes';


export const fetchGetPosts = createAsyncThunk(
  'posts/getPosts', async () => {
    try {
      const response = await getPosts();
      const posts = response.data;

      const usersResponse = await getUsers();
      const users: UsersType = usersResponse.data.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }));

      const postsWithUsers: PostsType = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId)!;
        return { ...post, user };
      });
      return { postsWithUsers, users };
    } catch (error: any) {
      return { error: error.message }
    }
  }
);

export const fetchPostPost = createAsyncThunk(
  'posts/postPost',
  async (data: IPostForRecive) => {
    try {
      const response = await postPost(data);
      return { post: response.data };
    } catch (error: any) {
      return { error: error.message }
    }
  }
);

export const fetchPatchPost = createAsyncThunk(
  'posts/patchPost',
  async ({ id, data }: { id: number, data: IPostForRecive }) => {
    try {
      const response = await patchPost(id, data);
      return { post: response.data };
    } catch (error: any) {
      return { error: error.message }
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number) => {
    try {
      await deletePost(id);
      return { id };
    } catch (error: any) {
      return { error: error.message }
    }
  }
);

export const fetchGetComments = createAsyncThunk(
  'posts/getComments',
  async (id: number) => {
    try {
      const response = await getComments(id);
      const comments = response.data;
      const commentsByPostId = { [id]: comments };
      return { comments: commentsByPostId };
    } catch (error: any) {
      return { error: error.message }
    }
  }
);
