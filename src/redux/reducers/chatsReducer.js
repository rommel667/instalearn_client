const initialState = {
    chats: [],
    newChatsCount: 0,
    showChats: false
}



const chats = (state = initialState, action) => {
    switch (action.type) {
        case "CHATS": {
            return {
                ...state,
                chats: action.payload.chats
            }
        }
        case "NEW_CHAT": {
            const prevChats = state.chats
            return {
                ...state,
                chats: [...prevChats, action.payload.newChat]
            }
        }
        case "NEW_CHATS_COUNT": {
            return {
                ...state,
                newChatsCount: action.payload.newChatsCount
            }
        }
        case "SHOW_CHATS": {
            return {
                ...state,
                showChats: action.payload.showChats
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                chats: [],
                newChatCount: 0
            }
        }
        default: {
            return state;
        }
    }
}

export default chats