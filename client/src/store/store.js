import { configureStore } from "@reduxjs/toolkit"
import creditReducer from "../AuthSlice"

const store = configureStore({
  reducer: {
    credit: creditReducer,
  },
});
export default store;