/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';

import { fetchLeads } from '../../../actions/lead';
import Table from './../../table';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'client_name', label: 'Client Name', minWidth: 170, align: 'center' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: 'job_title', label: 'Job Title', minWidth: 170, align: 'center' }
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
  textField: {
    marginTop: '12px',
    marginRight: '22px',
    width: '100%'
  }
}));

const leadStatus = ({fetchLeads, leads, LeadLoading}) => {
  const classes = useStyles();
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [leadStatus, setLeadStatus] = useState(null);

  useEffect(() => {
    fetchLeads();
    setFilteredLeads(leads);
  }, []);

  const handleLeadStatusChange = (status) => {
    setLeadStatus(status);
    let arr = leads.filter(lead => {
      return(
        lead.status === status ? lead : null
      )
    })
    setFilteredLeads(arr);
  };
  return( 
    <Fragment>
      {
        LeadLoading ? <p> Loading...!!!</p> : 
      (<div><FormControl className={classes.formControl}>
        <InputLabel id='lead-select-label'>Lead Status</InputLabel>
        <Select
          labelId='lead-select-label'
          id='lead-select'
          value= {leadStatus}
          onChange={(event) => {handleLeadStatusChange(event.target.value)}}>
          <MenuItem value='lead'>Lead</MenuItem>
          <MenuItem value='good'>Good</MenuItem>
          <MenuItem value='hot'>Hot</MenuItem>
          <MenuItem value='closed'>Closed</MenuItem>
          <MenuItem value='garbage'>Garbage</MenuItem>
          <MenuItem value='dead lead'>Dead Lead</MenuItem>
          <MenuItem value='Rejected by client'>Rejected by client</MenuItem>
          <MenuItem value='in-communication'>In-Communication</MenuItem>
        </Select>
      </FormControl>
      {leadStatus === null ? (
        <p style={{color:'red'}}> Please select a Lead Status first.</p>):  
        filteredLeads.length >= 1 ? (
          <Table 
            // history={history}
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={'Leads'} />
        ): <p> No leads with the selected status </p>}
        </div>)
      }
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  LeadLoading: state.LeadReducer.loading
});
  
export default connect(mapStateToProps, { fetchLeads } )(leadStatus);