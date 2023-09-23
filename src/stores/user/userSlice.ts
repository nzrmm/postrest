import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IModalStateType = {
  isOpen: boolean;
  id: number | null;
};

type IInitialStateType = {
  detailModal: IModalStateType;
  formModal: IModalStateType;
  deleteModal: IModalStateType;
};

const initialState: IInitialStateType = {
  detailModal: {
    isOpen: false,
    id: null,
  },
  formModal: {
    isOpen: false,
    id: null,
  },
  deleteModal: {
    isOpen: false,
    id: null,
  },
};

const foodSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setModalState: (
      state,
      action: PayloadAction<{
        modal: keyof IInitialStateType;
        field: keyof IModalStateType;
        value: IModalStateType[keyof IModalStateType];
      }>
    ) => {
      const { modal, field, value } = action.payload;

      (state[modal][field] as IModalStateType[keyof IModalStateType]) = value;
    },
  },
});

export default foodSlice.reducer;
export const { setModalState } = foodSlice.actions;
