import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        name: 'Son', 
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name
        },
    }
})

export const { 
    setName
} = appSlice.actions
export default appSlice.reducer