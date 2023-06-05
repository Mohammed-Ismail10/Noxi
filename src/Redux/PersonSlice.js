import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { persons: null, currentPage: 1 }


export let getPersons = createAsyncThunk('persons/getPersons', async (page) => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US&page=${page}`);
  return data;
})



let personsSlice = createSlice({
  name: 'persons',
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
    builder.addCase(getPersons.fulfilled, (initialState, action) => {
      initialState.persons = action.payload.results;
    })
  }

})


export let personsReducer = personsSlice.reducer;
export let { storeCurrentPage, decPage, incPage } = personsSlice.actions;
