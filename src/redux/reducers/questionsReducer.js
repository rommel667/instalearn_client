const initialState = {
    randomQuestions: [],
    correctAnswers: [],
    chosenAnswers: []
}



const questions = (state = initialState, action) => {

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
            const newArray = state.chosenAnswers

            return {
                ...state,
                chosenAnswers: newArray
            }
        }
        case "RESET_QUESTIONS": {

            return {
                ...state,
                randomQuestions: [],
                correctAnswers: [],
                chosenAnswers: []
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
        default: {
            return state;
        }
    }
}

export default questions