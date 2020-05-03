/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from './../../UI/table';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'client_name', label: 'Client Name', minWidth: 170, align: 'center' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: 'job_title', label: 'Job Title', minWidth: 170, align: 'center' },
  { id: 'notes_date', label: 'Call Date', minWidth: 170, align: 'center' }
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

const voiceStatus = ({history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [callStatus, setCallStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      getData(true);
      didMountRef.current = true;
    }
    const interval = setInterval(getData, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    handleCallStatusChange(callStatus);
  }, [JSON.stringify(leads)]);

  const getData = async(shouldSetLoading) => {
    if(shouldSetLoading){
      setLoading(true);
    }
      try {
      const res = await axios.get ( BASE_URL + "/api/lead/callTaken");
      setLeads(res.data.leads);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }  
    setLoading(false);
  }

  const handleCallStatusChange = (status) => {
    setCallStatus(status);
    let arr = [];
    leads.forEach(lead => {
      let temp =  lead.call.agenda.notes.map( note => {
        return note ? note.call_status === status ? {...lead, callTakenOn: note.createdAt} : null : null
      })
      arr = [...arr, ...temp]
    });
    arr = arr.filter(ele => {
      return ele ? ele : null
    })
    setFilteredLeads(arr);
  };
  return( 
    <Fragment>
      {
        loading ? <p> Loading...!!!</p> : 
      (<div><FormControl className={classes.formControl}>
        <InputLabel id='lead-select-label'>call Status</InputLabel>
        <Select
          labelId='lead-select-label'
          id='lead-select'
          value= {callStatus}
          onChange={(event) => {handleCallStatusChange(event.target.value)}}>
          <MenuItem value='done'>Done</MenuItem>
          <MenuItem value='not taken'>Not Taken</MenuItem>
          <MenuItem value='rescheduled by client'>Rescheduled by client</MenuItem>
        </Select>
      </FormControl>
      {callStatus === null ? (
        <p style={{color:'red'}}> Please select a call Status first.</p>):  
        filteredLeads.length >= 1 ? (
          <Table 
          jobs={filteredLeads}
          columns={columns}
          history={history} 
          classes={classes}
          tableHeader={'Voice'}
          rowClickListener={true}
        /> 
          ): <p> No leads with the selected status </p>}
        </div>)
      }
    </Fragment>
  )//end of return
}

export default voiceStatus;