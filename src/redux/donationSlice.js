import { createSlice } from "@reduxjs/toolkit";

export const donationSlice = createSlice({
    name: 'donation',
    initialState: {
        donation: [],
        myDonation: {},
    },
    reducers: {
        getDonation: (state, action) => {
            // console.log(action)
            state.donation = action.payload
        },
        getMyDonation: (state, action) => {
            // console.log(action)
            state.myDonation = action.payload.myDonation
        },
        updateMyDonation: (state, action) => {
            // console.log(action)
            state.myDonation = action.payload.myDonation
        },
    }
})

export const { getDonation, getMyDonation, updateMyDonation} = donationSlice.actions
export default donationSlice.reducer