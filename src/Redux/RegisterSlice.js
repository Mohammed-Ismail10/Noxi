import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { registerData: null, loading: false, alert: false }



export let postRegister = createAsyncThunk('register/postRegister', async (values) => {
  let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
  return data;
})



let registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    trueLoading: (initialState) => {
      initialState.loading = true;
    },
    falseLoading: (initialState) => {
      initialState.loading = false;
    },
    falseAlert: (initialState) => {
      initialState.alert = true;
    }
  },


  extraReducers: (builder) => {
    builder.addCase(postRegister.fulfilled, (initialState, action) => {
      initialState.registerData = action.payload;
    })
  }
})


export let registerReducer = registerSlice.reducer;
export let { trueLoading, falseLoading, falseAlert } = registerSlice.actions;
