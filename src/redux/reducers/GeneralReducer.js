import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    masterUser: 'CRAZYRICH', // for not login user to see m-tree
    domain: 'https://admin.fivefortunefx.com',
    title: 'FIVE FORTUNEFX',
    desc: 'FIVE FORTUNE',
    currency: 'Wallet',
    crypto: 'USDT',
    
}

export const GeneralSlice = createSlice({
    name: 'general', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setDomain: (state, action) => { // not used to prevent error only
            state.domain = action.payload
        },
        setWidth: (state, action) => { // not used to prevent error only
            state.width = action.payload
        },
    }

})

export const { setDomain,  setWidth} = GeneralSlice.actions

export default GeneralSlice.reducer
