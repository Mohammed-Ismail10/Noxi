import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { movies: null, currentPage: 1 }


export let getMovies = createAsyncThunk('movies/getMovies', async (page) => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
  return data;
})



let moviesSlice = createSlice({
  name: 'movies',
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (initialState, action) => {
      initialState.movies = action.payload.results;
    })
  }

})


export let moviesReducer = moviesSlice.reducer;
export let { storeCurrentPage, decPage, incPage, search } = moviesSlice.actions;
