import { createSlice } from "@reduxjs/toolkit";

export const donationSlice = createSlice({
    name: 'donation',
    initialState: {
        donation: [],
        myDonation: [],
    },
    reducers: {
        getDonation: (state, action) => {
            console.log(action)
            state.donation = action.payload
        },
    }
})

export const { getDonation} = donationSlice.actions
export default donationSlice.reducer