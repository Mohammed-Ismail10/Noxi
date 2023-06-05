import { configureStore } from "@reduxjs/toolkit";
import { detailsReducer } from "./DetailsSlice.js";
import { homeReducer } from "./HomeSlice.js";
import { loginReducer } from "./LoginSlice.js";
import { moviesReducer } from "./MoviesSlice.js";
import { personsReducer } from "./PersonSlice.js";
import { registerReducer } from "./RegisterSlice.js";
import { tvsReducer } from "./TvSlice.js";

export let store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    home:homeReducer,
    details:detailsReducer,
    movies:moviesReducer,
    tv:tvsReducer,
    person:personsReducer,
  }
})