/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
// import axios from 'axios';
import { fetchLeads, updateLead } from '../../../actions/lead';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';

import Table from './../../table';

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'profile', label: 'Profile', minWidth: 100, align: 'center' },
    { id: 'call_time', label: 'Time', minWidth: 100, align: 'center' },
    { id: 'call_date', label: 'Date', minWidth: 100, align: 'center' },
    { id: 'list', label: 'Lead Status', minWidth: 100, align: 'center', 
    placeholder: 'Status', for: 'status' , 
    listItems: ['lead' ,'good', 'hot', 'closed', 'garbage', 'dead lead', 'Rejected by client']},
    { id: 'input', label: 'Voice', for: 'voice', minWidth: 100, align: 'center'},
    { id: 'updateButton', label: 'Action', minWidth: 100, align: 'center' }
];
  
const useStyles = makeStyles(theme => ({
  root:{
    width: '100%'
  },
  tableWrapper: {
    overflow: 'auto'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginTop: '12px',
    marginRight: '22px',
    width: '100%'
  },
  jobHeader: {
    textAlign: 'center',
    fontFamily: 'initial',
    color: 'blue'
  },  
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
}));

const scheduledLeads = ({fetchLeads, updateLead, leads, leadLoading, history}) => {
  const classes = useStyles();
  const alert = useAlert();
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    fetchLeads()
      let  arr = leads.filter(lead => {
        return(
            lead.call.call_date !== null ? lead : null
        )
      })
      setFilteredLeads(arr);  
    }, [leads.length]);

    const leadUpdateHandeler = async(lead) => {
      const data = {
        voice: lead.voice,
        status: lead.status
      }
      const res = await updateLead({lead_id:lead.id}, data);
      if(res){
        alert.success('Lead updated successfully...!!');
      }
      else{
        alert.success('Lead update failed...!!');
      }
    }

  return(
    <Fragment>
      {
        leadLoading ? <p> Loading </p>: 
        (<Table 
          jobs={filteredLeads}
          columns={columns}
          classes={classes}
          tableHeader={'Scheduled Leads'}
          onUpdateHandler={leadUpdateHandeler}
          // history={history}
        /> )
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads, updateLead })(scheduledLeads);