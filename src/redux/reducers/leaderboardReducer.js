const initialState = {
    leaderboards: [],
}



const leaderboards = (state = initialState, action) => {
    switch (action.type) {
        case "LEADERBOARDS": {
            return {
                ...state,
                leaderboards: action.payload.leaderboards
            }
        }
        case "NEW_LEADERBOARD": {
            const target = state.leaderboards.find(lb => lb.ranker._id === action.payload.newLeaderboard.ranker._id && lb.category === action.payload.newLeaderboard.category)
            console.log(target);
            let filteredLeaderboards;
            if(target) {
                filteredLeaderboards = state.leaderboards.filter(lb => lb._id !== target._id)
            } else {
                filteredLeaderboards = [ ...state.leaderboards ]
            }
            console.log("NEW LB",action.payload.newLeaderboard)
            console.log("FILTERED LB",filteredLeaderboards);
            const newLeaderboards = [ ...filteredLeaderboards, action.payload.newLeaderboard ].sort((a,b) => b.rating - a.rating)
            console.log("SORTED LB",newLeaderboards);
            return {
                ...state,
                leaderboards: newLeaderboards
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                leaderboards: [],
            }
        }
       
        default: {
            return state;
        }
    }
}

export default leaderboards