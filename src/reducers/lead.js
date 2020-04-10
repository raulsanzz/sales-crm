import {
    LEAD_ADD_SUCCESS,
    LEAD_ADD_FAIL,
    FETCH_LEAD_SUCCESS,
    FETCH_LEAD_FAIL
    // LEAD_UPDATE_FAIL,
    // LEAD_UPDATE_SUCCESS
} from "../actions/types";

const initialState = {
leads: [],
error: {},
loading: true
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        case LEAD_ADD_SUCCESS:
            return {
                ...state,
                leads: state.leads.concat(action.payload),
                loading: false
            };
        case FETCH_LEAD_SUCCESS:
            return {
                ...state,
                leads: action.payload,
                loading: false
            };
        case FETCH_LEAD_FAIL:
        case LEAD_ADD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
