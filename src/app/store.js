import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../feature/student/studentSlice";

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});

export default store;
