import { clearToken, getToken, saveToken } from "@/utils/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      saveToken(action.payload);
    },
    clearTokens: (state) => {
      state.token = null;
      clearToken();
    },
    getTokens: (state) => {
      const token = getToken();
      if (token) {
        state.token = token;
      }
    },
  },
});

export const { setToken, clearTokens, getTokens } = authSlice.actions;
export default authSlice.reducer;
