/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { updateAppliedJob } from './../../../store/actions/job';
import { addLead } from './../../../store/actions/lead';
import Table from './../../UI/table';
const BASE_URL = process.env.REACT_APP_BASE_URL;

  
const useStyles = makeStyles( theme => ({
  root: {
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

const managerJobLinks = ({updateAppliedJob, addLead, history}) => {
  const classes = useStyles();
  const alert = useAlert();
  const didMountRef = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'editButton', label: 'Add Lead Details', minWidth: 100, align: 'center',  editPath:'/add_lead' }
  ];
  

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchProfiles();
      fetchAppliedJobs();
      didMountRef.current = true
    }
    const interval = setInterval(fetchAppliedJobs, 60000);//get all jobs from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);


  useEffect(() => {
    if(selectedProfile){
      handleProfileChange(selectedProfile)
    }
  }, [jobs.length]);

  const fetchProfiles = async () => {
    try {
      const profiles = await axios.get ( BASE_URL + '/api/profile');
      setProfiles(profiles.data.profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const jobs =  await axios.get ( BASE_URL + '/api/appliedjob/manager');
      setJobs(jobs.data.appliedJobs); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileChange = (profile_id) => {
    setSelectedProfile(profile_id)
    let arr = jobs.filter(job => {
      return(
        job.profile_id ===  profile_id ? job : null
      )
    })
   setFilteredJobs(arr);
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
      selectedProfile === null ? (
      <p style={{color:'red'}}> Please select a profile first.</p>):  
      filteredJobs.length >= 1 ? (
      <Table 
        jobs={filteredJobs}
        columns={columns}
        classes={classes}
        tableHeader={'Jobs List'}
        history={history}
        />
      ): <p> No More jobs </p>
    }
  </Fragment>)
}

export default connect(null, {updateAppliedJob, addLead})(managerJobLinks);