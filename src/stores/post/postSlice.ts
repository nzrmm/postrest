import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IInitialStateType = {
  params: {
    page: number;
    limit: number;
  };
};

const initialState: IInitialStateType = {
  params: {
    page: 1,
    limit: 10,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setParams: (
      state,
      action: PayloadAction<{
        field: keyof IInitialStateType["params"];
        value: IInitialStateType["params"][keyof IInitialStateType["params"]];
      }>
    ) => {
      const { field, value } = action.payload;

      (state.params[
        field
      ] as IInitialStateType["params"][keyof IInitialStateType["params"]]) =
        value;
    },
  },
});

export default postSlice.reducer;
export const { setParams } = postSlice.actions;
