/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { makeStyles } from '@material-ui/styles';

import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { fetchLeads, updateLead } from '../../../store/actions/lead';
import axios from './../../../axios-order';
import Meassage from './../../UI/message';
import Table from './../../UI/table';
  
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
 
  const alert = useAlert();
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [voices, setVoices] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  
  const fetchVoices = async() => {
    try {
      const res = await axios.get ("/api/user/voice");
      let names = [];
      names = res.data.users.map(user => (user.name));
      setVoices(names);
    } catch (error) {
     console.log(error);
    }
  };

  const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'profile', label: 'Profile', minWidth: 100, align: 'center' },
    { id: 'call_time', label: 'Time', minWidth: 100, align: 'center' },
    { id: 'createdAt', label: 'Date', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Lead Status', minWidth: 100, align: 'center' },
    { id: 'onChangeList', label: 'Voice', minWidth: 100, align: 'center', 
      placeholder: 'Voice', for: 'voice' , listItems: voices}
  ];


  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchVoices();
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);
  
  useEffect(() => {
    let  arr = leads.filter(lead => {
      return(
          lead.call.call_date !== null ? lead : null
      )
    })
    setFilteredLeads(arr);  
  }, [JSON.stringify(leads)]);

  const leadUpdateHandeler = async(lead_id, lead_voice) => {
    const data = {
      voice: lead_voice
    }
    const res = await updateLead({lead_id:lead_id}, data, null, null, false);
    if(res){
      alert.success('Lead updated successfully...!!');
    }
    else{
      alert.success('Lead update failed...!!');
    }
  }

  return(
    <Fragment>
      {leadLoading ? <Meassage meassage={'loading'} /> : (
        <Table 
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

export default  connect(mapStateToProps,
   { fetchLeads, updateLead })(errorHandler(scheduledLeads));