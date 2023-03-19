import { createSlice } from "@reduxjs/toolkit";

export const donationSlice = createSlice({
    name: 'donation',
    initialState: {
        donation: [],
        myDonation: {},
        infoCharity: {},
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
            // state.myDonation = action.payload
        },
        getInfoCharity: (state, action) => {
            // console.log(action)
            // state.myDonation = action.payload.myDonation
            state.infoCharity = action.payload
        },
    }
})

export const { getDonation, getMyDonation, updateMyDonation, getInfoCharity} = donationSlice.actions
export default donationSlice.reducer