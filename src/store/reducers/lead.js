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

const updateLead = (state, action) => {
    let updatedLeads = [...state.leads];
    let updatedLead = updatedLeads.filter(lead => lead.id === action.payload.lead_id ? lead : null);
    let updatedCall = updatedLead[0].call;
    let updatedJob = updatedLead[0].job;
    let updatedCLient = updatedLead[0].job.client;
    if(action.payload.newCallData){
        updatedCall = {
            ...updatedCall,
            ...action.payload.newCallData
        }
    }  
    if(action.payload.newClientData){
        updatedCLient = {
            ...updatedCLient,
            ...action.payload.newClientData
        }
        updatedJob.client = {
            ...updatedCLient
        } 
    }  
    if(action.payload.newLeadData)
    {
        updatedLead[0] = {
            ...updatedLead[0],
            ...action.payload.newLeadData,
            call : {...updatedCall},
            job : {...updatedJob}
        }
    }
    updatedLeads = updatedLeads.map(lead => {
        return lead.id === updatedLead[0].id ? updatedLead[0] : lead
    })
   
    return {
        leads: updatedLeads,
        loading: false,
        error: null
    }
}
  
export default (state = initialState, action) => {
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
        case LEAD_UPDATE_SUCCESS: return updateLead(state, action);
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
