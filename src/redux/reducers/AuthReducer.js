import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  isActive : false,
  name: false,
  email: false,
  sponsor: false, // object
  token: false,
  wallet : false,
  authToken :  false

 
}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
  },
   
    setToken: (state, action) => {
      state.token = action.payload
    },
   setSponsor: (state, action) => {
      state.sponsor = action.payload
    },
    setWallet: (state, action) => {
      state.wallet = action.payload
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload
  },
  
  
   
    setLogout: () => initialState
  }

})

export const { setLogout,setIsLogin, setName, setIsActive, setToken, setWallet, setSponsor, setAuthToken, setEmail
  
  

} = AuthSlice.actions

export default AuthSlice.reducer
