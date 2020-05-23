/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import TopOptionsSelector from '../../UI/topOptionsSelector';
import Meassage from './../../UI/message';
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

const voiceStatus = ({history, callStatuses}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callStatus, setCallStatus] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);

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
    let count = 1;
    leads.forEach(lead => {
      count = 1;
      let temp =  lead.call.agenda.notes.map( note => {
        return note ? note.call_status === status ? {...lead, callTakenOn: note.createdAt, totalCalls: count++} : null : null
      })
      arr = [...arr, ...temp]
    });
    let highestDateIndex = 0;
    let lastElement = null;
    count = 1;
    arr = arr.filter(ele => {
      return ele ? ele : null
    })
    arr = arr.map((ele, index) => {
      if (ele){
        if( index !== arr.length - 1){
          if(arr[highestDateIndex].id === arr[index].id){
            let n =  arr[highestDateIndex].callTakenOn.localeCompare(arr[index].callTakenOn)
            if(n < 0){//higestIndexDate is less then the current
              highestDateIndex = index;
            }
            else{
              count = arr[index].totalCalls;
            }
          }
          else{
            let temp = highestDateIndex;
            highestDateIndex = index;
            return {...arr[temp], totalCalls: count }
          }
        }
        else{ //for the last element 
          if(arr[highestDateIndex].id === arr[index].id){
            let n =  arr[highestDateIndex].callTakenOn.localeCompare(arr[index].callTakenOn)
            if(n < 0){//highestDateIndex is less then the current
              return {...arr[index], totalCalls: count }
            }
            else{
              return {...arr[highestDateIndex], totalCalls: arr[index].totalCalls }     
            }
          }
          else{ //if the last ele is different from the highestDateIndex 
            lastElement = {...arr[index], totalCalls: 1};
            return {...arr[highestDateIndex], totalCalls: count}
          }
        }
      }
      else{
        return null
      }
    });
    if(lastElement){
      arr = [...arr, ...[{...lastElement}]];
    }
    arr = arr.filter(ele => {
      return ele ? ele : null
    })
    setFilteredLeads(arr);
  };
  return( 
    <Fragment>
      {loading === true ? <Meassage meassage={'loading'} /> : (
        <div>
          <TopOptionsSelector 
            selectChangeHandler={handleCallStatusChange}
            options={callStatuses}
            config={'Call Status'}
            meassage={ callStatus === null ? 'Please select a call status first' : null}
          />
          {callStatus !== null ? filteredLeads.length >= 1 ? (
            <Table 
            jobs={filteredLeads}
            columns={columns}
            history={history} 
            classes={classes}
            tableHeader={'Voice'}
            rowClickListener={true}
          /> 
          ): <Meassage meassage={'No Job with the selected status'} /> : null }
        </div>
      )}
    </Fragment>
  )//end of return
}

const mapStateToProps = state => ({
  callStatuses: state.SelectOptions.callStatus
});

export default   connect(mapStateToProps)(voiceStatus);