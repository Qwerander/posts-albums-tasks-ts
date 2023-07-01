import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import posts from '../components/posts/api/store/postsSlice';
import todos from '../components/todos/api/store/todosSlice';
import albums from '../components/albums/api/store/albumsSlice';

export const store = configureStore({
  reducer: {
    posts,
    albums,
    todos,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
