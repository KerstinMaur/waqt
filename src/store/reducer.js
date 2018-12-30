import { DateTime } from 'luxon';
import * as actionTypes from './actions';

const initialState = {
    universalDate : DateTime.utc(),
    clocks : [],
    primaryZone : "",
    checkTime : "",
}

const reducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type) {
        case actionTypes.UNIVERSAL_UPDATE:
            return {
                universalDate : action.payload.newDate
            }
        default:
            return state;
    }
}

export default reducer;