/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { fetchLeads } from '../../../store/actions/lead';
import Table from './../../UI/table';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: "due_date", label: "Due Date", minWidth: 100, align: "center" },
  { id: "due_time", label: "Due Time", minWidth: 100, align: "center" },
  { id: "test_gmail_thread", label: "Gmail Thread", minWidth: 100, align: "center" }
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

const test = ({fetchLeads, leads, LeadLoading, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [leadStatus, setLeadStatus] = useState(null);

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    handleLeadStatusChange(leadStatus);
  }, [JSON.stringify(leads)]);

  const handleLeadStatusChange = (status) => {
    setLeadStatus(status);
    let arr = leads.filter( lead => {
        return(
            (lead.test !== null && lead.test.status === status ) ? lead : null
        )
      })
    setFilteredLeads(arr);
  };
  return( 
    <Fragment>
      {
        LeadLoading ? <p> Loading...!!!</p> : 
      (<div><FormControl className={classes.formControl}>
        <InputLabel id='test-status-select-label'>Test Status</InputLabel>
        <Select
          labelId='test-status-select-label'
          id='test-status-select'
          value= {leadStatus}
          onChange={(event) => {handleLeadStatusChange(event.target.value)}}>
          <MenuItem value='Passed'>Passed</MenuItem>
          <MenuItem value='Failed'>Failed</MenuItem>
          <MenuItem value='No Response'>No Response</MenuItem>
          <MenuItem value='Dropped'>Dropped</MenuItem>
        </Select>
      </FormControl>
      {leadStatus === null ? (
        <p style={{color:'red'}}> Please select a Test Status first.</p>):  
        filteredLeads.length >= 1 ? (
          <Table 
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={'Tests'}
            history={history} 
            rowClickListener={true}/>
        ): <p> No test with the selected status </p>}
        </div>)
      }
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  LeadLoading: state.LeadReducer.loading
});
  
export default connect(mapStateToProps, { fetchLeads } )(test);