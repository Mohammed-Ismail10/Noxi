import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { itemDetails: null }


export let getDetails = createAsyncThunk('details/getDetails', async ({mediaType,id}) => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=f597813c136fdbe4ff8e3e2976da14ad&language=en-US`);
  return data;
})



let detailsSlice = createSlice({
  name: 'details',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getDetails.fulfilled, (initialState, action) => {
      initialState.itemDetails = action.payload;      
    })
  }

})


export let detailsReducer = detailsSlice.reducer;
