import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IModalStateType = {
  isOpen: boolean;
  id: number | null;
};

type IInitialStateType = {
  detailModal: IModalStateType;
  formModal: IModalStateType;
  deleteModal: IModalStateType;
  params: {
    search: string;
  };
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
  params: {
    search: "",
  },
};

const foodSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetailModal: (
      state,
      action: PayloadAction<{
        field: keyof IModalStateType;
        value: IModalStateType[keyof IModalStateType];
      }>
    ) => {
      const { field, value } = action.payload;

      (state.detailModal[field] as IModalStateType[keyof IModalStateType]) =
        value;
    },
    setFormModal: (
      state,
      action: PayloadAction<{
        field: keyof IModalStateType;
        value: IModalStateType[keyof IModalStateType];
      }>
    ) => {
      const { field, value } = action.payload;

      (state.formModal[field] as IModalStateType[keyof IModalStateType]) =
        value;
    },
    setDeleteModal: (
      state,
      action: PayloadAction<{
        field: keyof IModalStateType;
        value: IModalStateType[keyof IModalStateType];
      }>
    ) => {
      const { field, value } = action.payload;

      (state.formModal[field] as IModalStateType[keyof IModalStateType]) =
        value;
    },
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

export default foodSlice.reducer;
export const { setDetailModal, setFormModal, setDeleteModal, setParams } =
  foodSlice.actions;
