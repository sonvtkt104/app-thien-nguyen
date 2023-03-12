import { configureStore } from '@reduxjs/toolkit'
import appReducer  from './appSlice'
import donationReducer  from './donationSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        donation: donationReducer
    }
})