const initialState = {
    categories: null,
    subcategories: null
}



const statistics = (state = initialState, action) => {

    switch (action.type) {
        case "CATEGORIES": {
            return {
                ...state,
                categories: action.payload.categories
            }
        }
        case "SUBCATEGORIES": {

            return {
                ...state,
                subcategories: action.payload.subcategories
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                categories: null,
                subcategories: null
            }
        }
        default: {
            return state;
        }
    }
}

export default statistics