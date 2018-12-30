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
        case actionTypes.PRIMARY_ZONE:
            // get index
            const index = action.payload.clockId
            // fetch clock
            const clock = state.clocks[index]
            // get zone
            const zone = clock.timezone
            // modify clocks array
            let clocks_copy = [...state.clocks]
            clocks_copy[index].isPrimary = true;
            for (let i = 0; i < clocks_copy.length; i++) {
                if (i !== index) {
                    clocks_copy[i].isPrimary = false;
                }
            }
            // return new, modified state
            return {
                ...state,
                clocks : clocks_copy,
                primaryZone : zone
            }
        case actionTypes.ADD_CLOCK:
            // clock
            let add_clock = action.payload.clock
            // update primary zone if first clock
            if (state.clocks.length === 0) {
                add_clock.isPrimary = true
                return {
                    ...state,
                    clocks: [add_clock, ...state.clocks],
                    primaryZone : add_clock.timezone,
                }
            // general case
            } else {
                return {
                    ...state,
                    clocks: [add_clock, ...state.clocks]
                }
            }
        case actionTypes.DELETE_CLOCK:
            // get clock
            const delete_clock = state.clocks[action.payload.clockId]
            // remove from array
            let clocks_updated = state.clocks.filter((item) => item !== delete_clock)
            // set new state
            return {
                ...state,
                clocks: clocks_updated,
            }
        default:
            return state;
    }
}

export default reducer;