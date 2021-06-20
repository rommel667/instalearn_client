import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    const decodedToken = jwtDecode(localStorage.getItem("token"))

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
    } else {
        initialState.user = decodedToken
    }
}

const user = (state = initialState, action) => {
    
    switch(action.type) {
        case "LOGIN": {
            localStorage.setItem("token", action.payload.user.token)
            return {
                ...state,
                user: action.payload.user
            }
        }
        case "LOGOUT": {
            localStorage.removeItem("token")
            return {
                user: null,
            }
        }
        case "EDIT_PROFILE": {
            localStorage.setItem("token", action.payload.user.token)
            return {
                ...state,
                user: action.payload.user
            }
        }
        default: {
            return state;
        }
    }
}

export default user