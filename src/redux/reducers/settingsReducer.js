const initialState = {
    theme: 'dark',
    questionSize: 10,
    showFloatingButton: true
}



const settings = (state = initialState, action) => {
    switch(action.type) {
        case "CHOOSE_THEME": {
            if(state.theme === 'dark') {
                return {
                    ...state,
                    theme: 'light'
                }
                } else {   
                return {
                   ...state,
                   theme: 'dark'
                }
                }
        }
        case "QUESTION_SIZE": {
            return {
                ...state,
                questionSize: action.payload.questionSize
            }
        }
        case "SHOW_FLOATING_BUTTON": {
            return {
                ...state,
                showFloatingButton: action.payload.showFloatingButton
            }
        }
        default: {
            return state;
        }
    }
   
}

export default settings