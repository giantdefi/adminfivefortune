import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  userid : false,
  isActive : false,
  isAdmin : false,
  name: false,
  email: false,
  sponsor: false, // object
  token: false,
  wallet : false,
  authToken :  false,

  warningAllowLogin : true,

 
}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setUserid: (state, action) => {
      state.userid = action.payload
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
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
   setWarningAllowLogin: (state, action) => {
    state.warningAllowLogin = action.payload
   },
  
  
   
    setLogout: () => initialState
  }

})

export const { setLogout, setUserid, setIsLogin, setName, setIsActive, setIsAdmin, setToken, setWallet, setSponsor, setAuthToken, setEmail,
  setWarningAllowLogin
  
  

} = AuthSlice.actions

export default AuthSlice.reducer
