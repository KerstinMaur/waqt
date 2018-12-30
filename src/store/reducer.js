import { DateTime } from 'luxon';
import * as actionTypes from './actions';

const initialState = {
    universalDate : DateTime.utc(),
    clocks : [],
    primaryZone : "",
    checkTime : "",
}

const reducer = (state = initialState, action) => {
    console.log(state)
    switch(action.type) {
        case actionTypes.UNIVERSAL_UPDATE:
            return {
                ...state,
                universalDate : action.payload.newDate
            }
        case actionTypes.CHECK_TIME:
            return {
                ...state,
                checkTime : action.payload.checkTime
            }
        default:
            return state;
    }
}

export default reducer;