import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import donationReducer from "./donationSlice";
import adminReducer from "./adminSlice";

export default configureStore({
  reducer: {
    app: appReducer,
    donation: donationReducer,
    admin: adminReducer,
  },
});
