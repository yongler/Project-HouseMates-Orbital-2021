import {GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAIL } from "../actions/types";
    
const initialState = {
    question_list: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                question_list: payload
            }

        case GET_QUESTIONS_FAIL:
            return {
                ...state
            }

        default: 
            return state
    }
}
