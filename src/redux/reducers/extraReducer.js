export const initialState = {
    randomQuestions: [],
    correctAnswers: [],
    chosenAnswers: []
}



export const extraReducer = (state, action) => {
    switch (action.type) {
        case "RANDOM_QUESTIONS": {

            return {
                ...state,
                randomQuestions: action.payload.randomQuestions
            }
        }
        case "CORRECT_ANSWERS": {

            return {
                ...state,
                correctAnswers: action.payload.correctAnswers
            }
        }
        case "CHOSEN_ANSWERS": {


            return {
                ...state,
                chosenAnswers: action.payload.chosenAnswers
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                randomQuestions: [],
                correctAnswers: [],
                chosenAnswers: []
            }
        }

        default:
            return state
    }
}