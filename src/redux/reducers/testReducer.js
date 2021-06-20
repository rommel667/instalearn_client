const initialState = {
    showQuizResult: false,
    showExamResult: false,
    showQuizCorrectAnswers: false,
    showExamCorrectAnswers: false,
    score: 0,
    showCorrectOrWrong: false,
    correctOrWrong: null,
    timerReset: '',
    currentQuestionNumber: 0
}



const test = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_QUIZ_RESULT": {
            return {
                ...state,
                showQuizResult: action.payload.showQuizResult
            }
        }
        case "SHOW_EXAM_RESULT": {
            return {
                ...state,
                showExamResult: action.payload.showExamResult
            }
        }
        case "SHOW_QUIZ_CORRECT_ANSWERS": {
            return {
                ...state,
                showQuizCorrectAnswers: action.payload.showQuizCorrectAnswers
            }
        }
        case "SHOW_EXAM_CORRECT_ANSWERS": {
            return {
                ...state,
                showExamCorrectAnswers: action.payload.showExamCorrectAnswers
            }
        }
        case "UNSHOW_RESULTS": {
            return {
                ...state,
                showQuizResult: false,
                showExamResult: false,
                showQuizCorrectAnswers: false,
                showExamCorrectAnswers: false,
            }
        }
        case "SET_SCORE": {
            return {
                ...state,
                score: action.payload.score
            }
        }
        case "SET_CURRENT_QUESTION_NUMBER": {
            return {
                ...state,
                currentQuestionNumber: action.payload.currentQuestionNumber
            }
        }
        case "SHOW_CORRECT_OR_WRONG_MODAL": {
            return {
                ...state,
                showCorrectOrWrong: action.payload.showCorrectOrWrong
            }
        }
        case "CORRECT_OR_WRONG": {
            return {
                ...state,
                correctOrWrong: action.payload.correctOrWrong
            }
        }
        case "RETRY_TIMER_RESET": {
            return {
                ...state,
                timerReset: action.payload.timerReset
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                showQuizResult: false,
                showExamResult: false,
                showQuizCorrectAnswers: false,
                showExamCorrectAnswers: false,
                score: 0,
                showCorrectOrWrong: false,
                correctOrWrong: null,
                timerReset: '',
                currentQuestionNumber: 0
            }
        }

        default: {
            return state;
        }
    }
}

export default test