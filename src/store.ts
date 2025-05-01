import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import postsReducer from "./features/posts/postsSlice";
import usersReducer from "./features/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const selectAllUsers = (state: RootState) => state.users;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
