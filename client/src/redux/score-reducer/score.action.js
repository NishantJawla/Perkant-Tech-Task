import {ScoreActionTypes} from './score.action-types'
export const setScore = (score) => (
    {
        type: ScoreActionTypes.SET_SCORE_DATA,
        payload: score
    }
)