import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 
    total_users : false, 
    active_users : false,
    total_wd : false,
    total_paid : false,
    users_stats : false, // for graph
    allowReloadStats : false

    
}

export const StatstSlice = createSlice({
    name: 'stats', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setTotal_users: (state, action) => { // not used to prevent error only
            state.total_users = action.payload 
        },
        setActive_users: (state, action) => { // not used to prevent error only
            state.active_users = action.payload 
        },
        setTotal_wd: (state, action) => { // not used to prevent error only
            state.total_wd = action.payload 
        },
        setTotal_paid: (state, action) => { // not used to prevent error only
            state.total_paid = action.payload 
        },
        setUsers_stats: (state, action) => { // not used to prevent error only
            state.users_stats = action.payload 
        },
        setAllowReloadStats: (state, action) => { // not used to prevent error only
            state.allowReloadStats = action.payload 
        },
       
     
    }

})

export const { setTotal_users,setActive_users,setTotal_wd,setTotal_paid, setUsers_stats, setAllowReloadStats
  
} = StatstSlice.actions

export default StatstSlice.reducer
