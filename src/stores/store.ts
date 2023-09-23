import { configureStore } from "@reduxjs/toolkit";

import postSlice from "@/stores/post/postSlice";
import userSlice from "@/stores/user/userSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
