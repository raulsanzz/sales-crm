/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { updateAppliedJob } from './../../../store/actions/job'
import Table from './../../UI/table';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'url', label: 'URL', minWidth: 100, align: 'center' },
    { id: 'jobApplyButton', label: 'Action', minWidth: 100, align: 'center' }
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
    },
  }));

const managerJobLinks = ({ updateAppliedJob }) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const alert = useAlert();

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
      const jobs =  await axios.get ( BASE_URL + '/api/appliedjob');
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

  const onApplyButtonHandler = async (job) => {
    const query = {
      job_id: job.job_id,
      user_id: job.user_id,
      profile_id: job.profile_id
    };

    const res = await updateAppliedJob(query, {applied: true, applied_on: new Date()}, true);
    if(res){
      let updatedJobs = jobs.filter(job => {
        if(job.job_id !== query.job_id || job.profile_id !== query.profile_id || job.user_id !== query.user_id){
          return job;
        }
      })
      setJobs(updatedJobs);
      alert.success('Applied successfully...!!');
    }
    else{
      alert.success('Applied Job Failed...!!');
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
        selectedProfile === null ? (
        <p style={{color:'red'}}> Please select a profile first.</p>):  
        filteredJobs.length >= 1 ? (
          <Table 
            // history={history}
            jobs={filteredJobs}
            columns={columns}
            classes={classes}
            tableHeader={'Job Links'}
            onApplyHandler={onApplyButtonHandler}/>
        ): <p> No More jobs </p>
      }
    </Fragment>)

};

export default  connect(null,{updateAppliedJob})(managerJobLinks);