import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    spinner: false,
    btnSpinner: false,
    btnDisabled: false,
    menuSpinner: false,
  
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setSpinner: (state, action) => {
            state.spinner = action.payload
        },
        setBtnSpinner: (state, action) => {
            state.btnSpinner = action.payload
        },
        setBtnDisabled: (state, action) => {
            state.btnDisabled = action.payload
        },
        setMenuSpinner: (state, action) => {
            state.menuSpinner = action.payload
        },
     
        
        setLoader: (state, action) => {
            state.loader = action.payload
        },

        resetLoader: () => initialState
    }

})

export const { resetLoader, setSpinner, setBtnSpinner, setBtnDisabled, setMenuSpinner,
} = loaderSlice.actions

export default loaderSlice.reducer
