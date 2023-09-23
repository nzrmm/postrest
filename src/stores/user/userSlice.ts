import { createSlice } from "@reduxjs/toolkit";

type IInitialStateType = {
  detailModal: {
    isOpen: boolean;
    id: string | number | null;
  };
  formModal: {
    isOpen: boolean;
    id?: string | number | null;
  };
  deleteModal: {
    isOpen: boolean;
    id: string | number | null;
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
};

const foodSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default foodSlice.reducer;
