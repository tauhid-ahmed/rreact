import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Learning Redux toolkit",
    content: "I've heard good things",
    reactions: {
      wow: 0,
      love: 0,
      like: 0,
      dislike: 0,
      sad: 0,
    },
  },
  {
    id: "2",
    title: "Slices",
    content: "The more I say slice, the more I want pizza.",
    reactions: {
      wow: 0,
      love: 0,
      like: 0,
      dislike: 0,
      sad: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userName: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userName,
            reactions: {
              wow: 0,
              love: 0,
              like: 0,
              dislike: 0,
              sad: 0,
            },
          },
          meta: undefined,
          error: undefined,
        };
      },
    },
    addReaction(state, action) {
      const postId = action.payload.postId;
      const post = state.find((p) => p.id === postId);
      post.reactions[action.payload.reaction]++;
    },
  },
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
