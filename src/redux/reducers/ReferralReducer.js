import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    refLink: 'MASTER' // default

}

export const RefLinkSlice = createSlice({
    name: 'refs', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setRefLink: (state, action) => {
            state.refLink = action.payload
        },
        resetRefLink: () => initialState
    }

})

export const { resetRefLink, setRefLink } = RefLinkSlice.actions

export default RefLinkSlice.reducer
