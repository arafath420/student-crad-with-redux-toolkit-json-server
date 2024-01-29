import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Student From Api
export const getAllStudent = createAsyncThunk(
  "students/getAllStudent",
  async () => {
    try {
      const respons = await axios.get("http://localhost:5050/student");
      return respons.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

//Create Student
export const createStudent = createAsyncThunk(
  "students/createStudent",
  async (data) => {
    try {
      const respons = await axios.post("http://localhost:5050/student", data);
      return respons.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

//Delete Student
export const deleteStudent = createAsyncThunk(
  "Student/deleteStudent",
  async (data) => {
    await axios.delete(`http://localhost:5050/student/${data.id}`);
    return data;
    try {
    } catch (error) {
      throw new Error(error);
    }
  }
);

//Edit Student
export const editStudent = createAsyncThunk(
  "student/editStudent",
  async (data) => {
    try {
      const respons = await axios.patch(
        `http://localhost:5050/student/${data.id}`,
        data
      );
      return respons.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
