import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "John Doe",
  },
  { id: "2", name: "Jane Doe" },
];

const usersSlice = createSlice({
  name: "users",
  reducers: {},
  initialState,
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
