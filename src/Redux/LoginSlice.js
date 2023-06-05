import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { loginData: null, loading: false, alert: false, userData: null }



export let postLogin = createAsyncThunk('login/postLogin', async (values) => {
  let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  return data;
})



let loginSlice = createSlice({
  name: 'login',
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
    },
    saveUserData: (initialState) => {
      if (localStorage.getItem('token') !== null) {
        initialState.userData = localStorage.getItem('token');
      }
    },
    emptyUserData: (initialState) => {
      localStorage.removeItem('token');
      initialState.userData = null;
    }
  },


  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (initialState, action) => {
      initialState.loginData = action.payload;
    })
  }
})


export let loginReducer = loginSlice.reducer;
export let { trueLoading, falseLoading, falseAlert, saveUserData, emptyUserData } = loginSlice.actions;
