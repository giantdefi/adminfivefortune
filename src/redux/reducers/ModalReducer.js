import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalMessage: false, // will consist ( true/false, modalType, message )
  modalToast: false, // will consist ( true/false, modalType, message )
  modalConfirmLogOut: false, 
  modalMenuDrawer: false,

};

export const modalSlice = createSlice({
  name: 'modal', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload
    },
    setModalToast: (state, action) => {
      state.modalToast = action.payload
    },
    setModalConfirmLogOut: (state, action) => {
      state.modalConfirmLogOut = action.payload
    },
    setModalMenuDrawer: (state, action) => {
      state.modalMenuDrawer = action.payload
    },
   

   


    resetModal: () => initialState
  }

});

export const { 
  resetModal, setModalMessage, setModalToast, setModalConfirmLogOut, setModalMenuDrawer

   
} = modalSlice.actions;

export default modalSlice.reducer;
