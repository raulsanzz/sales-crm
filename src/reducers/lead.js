import {
    LEAD_ACTION_START,
    LEAD_ADD_SUCCESS,
    LEAD_ADD_FAIL,
    LEAD_FETCH_SUCCESS, 
    LEAD_FETCH_FAIL,
    LEAD_UPDATE_SUCCESS,
    LEAD_UPDATE_FAIL
} from "../actions/types";

const initialState = {
leads: [],
error: {},
loading: true
};
  
export default function(state = initialState, action) {
    switch (action.type) {
        
        case LEAD_ACTION_START:
            return {
                ...state,
                loading: true
            };
        case LEAD_ADD_SUCCESS:
            return {
                ...state,
                leads: state.leads.concat(action.payload),
                loading: false,
                error: null
            };
        case LEAD_FETCH_SUCCESS:
            return {
                ...state,
                leads: action.payload,
                loading: false,
                error: null
            };
        case LEAD_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case LEAD_ADD_FAIL:
        case LEAD_FETCH_FAIL:
        case LEAD_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
