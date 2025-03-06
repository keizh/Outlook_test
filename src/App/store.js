import { configureStore } from "@reduxjs/toolkit";
import EmailSlice from "../Features/EmailSlice";

const store = configureStore({
  reducer: {
    email: EmailSlice.reducer,
  },
});

export default store;
