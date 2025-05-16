// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  communities: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.communities = action.payload.communities
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.communities = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
