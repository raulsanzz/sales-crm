/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from '../../UI/table';
import { fetchLeads } from '../../../store/actions/lead';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'client_name', label: 'Client Name', minWidth: 170 },
    { id: 'gmail_thread', label: 'Gmail Thread', minWidth: 170 },
    { id: 'editButton', label: 'Add Test Details', minWidth: 100, align: 'center', editPath:'/add_test' },
    { id: 'editButton', label: 'Add Lead Details', minWidth: 100, align: 'center',  editPath:'/lead_edit' }
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
  }));

const managerJobLinks = ({fetchLeads, leads, leadLoading, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      fetchProfiles();
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);


  useEffect(() => {
    if(selectedProfile){
      handleProfileChange(selectedProfile)
    }
  }, [leads.length]);

  const handleProfileChange = (profile_id) => {
    setSelectedProfile(profile_id)
    let arr = leads.filter(lead => {
      return(
        lead.profile_id ===  profile_id ? lead : null
      )
    })
   setFilteredLeads(arr);
  };

  const fetchProfiles = async () => {
    try {
      const profiles = await axios.get ( BASE_URL + '/api/profile');
      setProfiles(profiles.data.profiles);
    } catch (error) {
      console.log(error);
    }
  };
  return(
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id='profile-select-label'>Profile</InputLabel>
        <Select
          labelId='profile-select-label'
          id='profile-select'
          onChange={(event) => {handleProfileChange(event.target.value)}}>
            { profiles.map(item => {
                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              })
            }
        </Select>
      </FormControl>
      {
        leadLoading ? <p> Loading...!!! </p> : selectedProfile === null ? (
          <p style={{color:'red'}}> Please select a profile first.</p>):  
          filteredLeads.length >= 1 ? 
        (<Table 
          jobs={filteredLeads}
          columns={columns}
          classes={classes}
          tableHeader={'Leads'}
          history={history}/>) : <p>  No More Leads...!!!</p>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads })(managerJobLinks);