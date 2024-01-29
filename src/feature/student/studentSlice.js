import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getAllStudent,
} from "./studentApiSlice";

const studenSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    loader: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudent.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(getAllStudent.fulfilled, (state, action) => {
        state.loader = false;
        state.students = [...action.payload];
        state.message = "Student Get Successful";
      })
      .addCase(getAllStudent.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createStudent.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loader = false;
        state.students = [...state.students, action.payload];
        state.message = "Student Create Successful";
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteStudent.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loader = false;
        state.students = state.students.filter(
          (data) => data.id != action.payload.id
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(editStudent.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.loader = false;
        state.students[
          state.students.findIndex((data) => data.id === action.payload.id)
        ] = action.payload;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      });
  },
});

export default studenSlice.reducer;
