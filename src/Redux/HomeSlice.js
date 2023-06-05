import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { movie:null, tv:null, person:null  }



export let getTrend = createAsyncThunk('home/getTrend', async (maediaItem) => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${maediaItem}/week?api_key=f597813c136fdbe4ff8e3e2976da14ad`);
  return data;
})



let homeSlice = createSlice({
  name: 'home',
  initialState,


  extraReducers: (builder) => {
    builder.addCase(getTrend.fulfilled, (initialState, action) => {
      if(action.payload.results[0].media_type=='movie'){
        initialState.movie = action.payload.results;
      }
      if(action.payload.results[0].media_type=='tv'){
        initialState.tv = action.payload.results;
      }
      if(action.payload.results[0].media_type=='person'){
        initialState.person = action.payload.results;
      }
      
    })
  }
})


export let homeReducer = homeSlice.reducer;
