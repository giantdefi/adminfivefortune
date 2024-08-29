import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminPackageArray : false,
  itemToEdit : false,



  allowRelaodPackage : false,
    
}

export const PackageSlice = createSlice({
    name: 'packages', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setAdminPackageArray: (state, action) => { // not used to prevent error only
            state.adminPackageArray = action.payload
        },
        setItemToEdit: (state, action) => { // not used to prevent error only
            state.itemToEdit = action.payload
        },
        setAllowRelaodPAckage: (state, action) => { // not used to prevent error only
            state.allowRelaodPackage = action.payload
        },
     
    }

})

export const { setAdminPackageArray, setAllowRelaodPAckage, setItemToEdit} = PackageSlice.actions

export default PackageSlice.reducer
