import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    app_title : false,
    app_domain : false, 
    app_description : false, 
    app_tags : false,
    app_currency : false,
    admin_wallet : false,
    splittoEWallet : false,
    splittoRwallet : false,

    //admin send Wallet
    to_E_Wallet : false,
    to_R_Wallet : false,

    // bonus sponsor 

    level_1 : false,
    level_2 : false,
    level_3 : false,
    level_4 : false,
    level_5 : false,
    level_6 : false,
    level_7 : false,
    level_8 : false,
    level_9 : false,
    level_10 : false,

    
}

export const ConstantSlice = createSlice({
    name: 'constant', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setApp_title: (state, action) => { // not used to prevent error only
            state.app_title = action.payload 
        },
        setApp_domain: (state, action) => { // not used to prevent error only
            state.app_domain = action.payload
        },
        setApp_description: (state, action) => { // not used to prevent error only
            state.app_description = action.payload
        },
        setApp_tags: (state, action) => { // not used to prevent error only
            state.app_tags = action.payload
        },
        setApp_currency: (state, action) => { // not used to prevent error only
            state.app_currency = action.payload
        },
        setAdmin_wallet: (state, action) => { // not used to prevent error only
            state.admin_wallet = action.payload
        },
        setTo_E_Wallet: (state, action) => { // not used to prevent error only
            state.to_E_Wallet = action.payload
        },
        setTo_R_Wallet: (state, action) => { // not used to prevent error only
            state.to_R_Wallet = action.payload
        },
        setSplittoEWallet: (state, action) => { // not used to prevent error only
            state.splittoEWallet = action.payload
        },
        setSplittoRwallet: (state, action) => { // not used to prevent error only
            state.splittoRwallet = action.payload
        },
        setLevel_1: (state, action) => { // not used to prevent error only
            state.level_1 = action.payload
        },
        setLevel_2: (state, action) => { // not used to prevent error only
            state.level_2 = action.payload
        },
        setLevel_3: (state, action) => { // not used to prevent error only
            state.level_3 = action.payload
        },
        setLevel_4: (state, action) => { // not used to prevent error only
            state.level_4 = action.payload
        },
        setLevel_5: (state, action) => { // not used to prevent error only
            state.level_5 = action.payload
        },
        setLevel_6: (state, action) => { // not used to prevent error only
            state.level_6= action.payload
        },
        setLevel_7: (state, action) => { // not used to prevent error only
            state.level_7 = action.payload
        },
        setLevel_8: (state, action) => { // not used to prevent error only
            state.level_8 = action.payload
        },
        setLevel_9: (state, action) => { // not used to prevent error only
            state.level_9 = action.payload
        },
        setLevel_10: (state, action) => { // not used to prevent error only
            state.level_10 = action.payload
        },
     
    }

})

export const { 
    setApp_title, setApp_domain, setApp_description, setApp_tags, setApp_currency, setAdmin_wallet,setSplittoEWallet,setSplittoRwallet,
    setLevel_1, setLevel_2, setLevel_3, setLevel_4, setLevel_5, setLevel_6, setLevel_7, setLevel_8, setLevel_9, setLevel_10, setTo_E_Wallet,
    setTo_R_Wallet
} = ConstantSlice.actions

export default ConstantSlice.reducer
