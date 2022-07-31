import { configureStore } from "@reduxjs/toolkit";
import quizesReducer from "./features/quizes";
 
const store = configureStore({
    reducer:{
        quizes:quizesReducer
    }
})


export default store;