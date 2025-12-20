import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface StateDataType {
  email: string ;
  userId: string;
  userToken: string;
}

interface AuthStateType { 
    status : boolean | null , 
    userData : StateDataType
}


const initialState: AuthStateType = {
  status: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<StateDataType>) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
