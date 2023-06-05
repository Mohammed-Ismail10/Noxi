import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { tvs: null, currentPage: 1 }


export let getTvs = createAsyncThunk('tvs/getTvs', async (page) => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
  return data;
})



let tvsSlice = createSlice({
  name: 'tvs',
  initialState,
  reducers: {
    storeCurrentPage: (initialState, action) => {
      initialState.currentPage = action.payload;
      console.log(initialState.currentPage);
    },
    decPage: (initialState) => {
      initialState.currentPage--;
      console.log(initialState.currentPage);
    },
    incPage: (initialState) => {
      initialState.currentPage++;
      console.log(initialState.currentPage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTvs.fulfilled, (initialState, action) => {
      initialState.tvs = action.payload.results;
    })
  }

})


export let tvsReducer = tvsSlice.reducer;
export let { storeCurrentPage, decPage, incPage } = tvsSlice.actions;
