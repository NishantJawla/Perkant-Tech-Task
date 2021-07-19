import {ScoreActionTypes} from './score.action-types'
const INITIAL_STATE = {
    currentUser: null
}
const scoreReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ScoreActionTypes.SET_SCORE_DATA:
            return {
                ...state,
                score: action.payload
            }
            default:
                return state
    }
}

export default scoreReducer;