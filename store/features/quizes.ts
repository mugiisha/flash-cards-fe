import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const quizesSlice = createSlice({
    name:'quizes',
    initialState:{
        quizes:[]
    },
    reducers:{
        getQuizes:(state,action) => {
            state.quizes=action.payload
        },
        updateQuiz:(state,action) => {
            let id = action.payload.id
            let index = state.quizes.findIndex(q => q.id === id)
            state.quizes[index] =action.payload.data.update
            
        },
        deleteQuiz:(state,action) => {
            let id=action.payload.id
            let index = state.quizes.findIndex(q => q.id === id)
            state.quizes.splice (index,1)
        },
        createQuiz:(state,action) => {
            state.quizes.push(action.payload.post)
        }
    }

})

export const {getQuizes,updateQuiz,deleteQuiz,createQuiz} = quizesSlice.actions

export default quizesSlice.reducer 

