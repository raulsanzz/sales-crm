/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from "axios";
import { fetchLeads, updateLead } from '../../../store/actions/lead';
import Table from './../../UI/table';
const BASE_URL = process.env.REACT_APP_BASE_URL;


  
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
      const res = await axios.get ( BASE_URL + "/api/user/voice");
      let names = [];
      names = res.data.users.map(user => (user.name));
      console.log(names)
      setVoices(names);
    } catch (error) {
     console.log(error);
    }
  };

  const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'profile', label: 'Profile', minWidth: 100, align: 'center' },
    { id: 'call_time', label: 'Time', minWidth: 100, align: 'center' },
    { id: 'call_date', label: 'Date', minWidth: 100, align: 'center' },
    { id: 'status', label: 'Lead Status', minWidth: 100, align: 'center' },
    { id: 'list', label: 'Voice', minWidth: 100, align: 'center', 
    placeholder: 'Voice', for: 'voice' , 
    listItems: voices},
    { id: 'updateButton', label: 'Action', minWidth: 100, align: 'center' }
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


    const leadUpdateHandeler = async(lead) => {
      const data = {
        voice: lead.voice
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