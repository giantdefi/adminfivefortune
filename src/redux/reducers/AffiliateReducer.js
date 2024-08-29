import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    myAffiliateLevel: false, // table
    totalAffilitesLevel: false,
    totalAffilitesBonus: false,

    myDirestReferrals: false,

    leadershipStats: false,
    getUsername: false, // look up users diret ref numbers
    previousUser: false, // back up 1 level or previous user search

    level_1_percent: false, // from databse stat constant?
    level_2_percent: false,
    level_3_percent: false,

    level_1_bonus: false,
    level_2_bonus: false,
    level_3_bonus: false,


    //-----------------
    payment_target_1: false,
    payment_target_2: false,
    payment_target_3: false,

    // payment_target_1_left: false, // value when it claimed
    // payment_target_1_right: false,

    // payment_target_2_left: false, // value when it claimed
    // payment_target_2_right: false,

    // payment_target_3_left: false, // value when it claimed
    // payment_target_3_right: false,
}

export const AffiliateSlice = createSlice({
    name: 'affiliate', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setMyAffiliateLevel: (state, action) => {
            state.myAffiliateLevel = action.payload
        },
        seTotalAffilitesLevel: (state, action) => {
            state.totalAffilitesLevel = action.payload
        },
        setTotalAffilitesBonus: (state, action) => {
            state.totalAffilitesBonus = action.payload
        },

        setMyDirestReferrals: (state, action) => {
            state.myDirestReferrals = action.payload
        },

        setLeadershipStats: (state, action) => {
            state.leadershipStats = action.payload
        },
        setGetUsername: (state, action) => {
            state.getUsername = action.payload
        },

        setPreviousUser: (state, action) => {
            state.previousUser = action.payload
        },


        setLevel_1_percent: (state, action) => {
            state.level_1_percent = action.payload
        },
        setLevel_2_percent: (state, action) => {
            state.level_2_percent = action.payload
        },
        setLevel_3_percent: (state, action) => {
            state.level_3_percent = action.payload
        },

        setLevel_1_bonus: (state, action) => {
            state.level_1_bonus = action.payload
        },
        setLevel_2_bonus: (state, action) => {
            state.level_2_bonus = action.payload
        },
        setLevel_3_bonus: (state, action) => {
            state.level_3_bonus = action.payload
        },

        setPayment_target_1: (state, action) => {
            state.payment_target_1 = action.payload
        },
        setPayment_target_2: (state, action) => {
            state.payment_target_2 = action.payload
        },
        setPayment_target_3: (state, action) => {
            state.payment_target_3 = action.payload
        },

        resetAffiliate: () => initialState

    }

})

export const {
    resetAffiliate, setMyAffiliateLevel, seTotalAffilitesLevel,
    setMyDirestReferrals, setTotalAffilitesBonus,
    setLeadershipStats, setGetUsername, setPreviousUser,
    setLevel_1_percent, setLevel_2_percent, setLevel_3_percent,
    setLevel_1_bonus, setLevel_2_bonus, setLevel_3_bonus,
    setPayment_target_1, setPayment_target_2, setPayment_target_3,
    // setPayment_target_1_left, setPayment_target_1_right,
    // setPayment_target_2_left, setPayment_target_2_right,
    // setPayment_target_3_left, setPayment_target_3_right,



} = AffiliateSlice.actions

export default AffiliateSlice.reducer
