const initialState = {
    testType: '',
    categoryId: '',
    subcategoryId: ''
}



const options = (state = initialState, action) => {
    switch (action.type) {
        case "TEST_TYPE": {
            return {
                ...state,
                testType: action.payload.testType
            }
        }
        case "CATEGORY_ID": {
            return {
                ...state,
                categoryId: action.payload.categoryId
            }
        }
        case "SUBCATEGORY_ID": {

            return {
                ...state,
                subcategoryId: action.payload.subcategoryId
            }
        }
        case "RESET_OPTIONS": {

            return {
                ...state,
                testType: '',
                categoryId: '',
                subcategoryId: ''
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                testType: '',
                categoryId: '',
                subcategoryId: ''
            }
        }
        default: {
            return state;
        }
    }
}

export default options