/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAlert } from "react-alert";

import Table from "./../table";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "url", label: "URL", minWidth: 100, align: "left" },
    { id: "jobApplyButton", label: "Action", minWidth: 100, align: "center" }
];
  
  const useStyles = makeStyles(theme => ({
    root:{
      width: "100%"
    },
    tableWrapper: {
      overflow: "auto"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    jobHeader: {
      textAlign: "center",
      fontFamily: "initial",
      color: "blue"
    },  
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
      marginTop: "12px",
      marginRight: "22px",
      width: "100%"
    },
  }));

const managerJobLinks = () => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const alert = useAlert();

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    if(selectedProfile){
      handleProfileChange(selectedProfile)
    }
  }, [jobs.length]);
  
  const fetchAppliedJobs = async () => {
    try {
      const profiles = await axios.get ( BASE_URL + "/api/profile");
      setProfiles(profiles.data.profiles);
      const jobs =  await axios.get ( BASE_URL + "/api/appliedjob");
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
    const config = {
      headers: { "Content-Type": "application/json" }
    };
    const query = {
      job_id: job.job_id,
      user_id: job.user_id,
      profile_id: job.profile_id
    };
    const body = JSON.stringify({ query });

    try {
      const res =  await axios.put ( BASE_URL + "/api/appliedjob", body, config);
      if(res.data.updatedJob.length === 1){
        let updatedJobs = jobs.filter(job => {
          if(job.job_id !== query.job_id || job.profile_id !== query.profile_id || job.user_id !== query.user_id){
            return job;
          }
          else{
            return null;
          }
        })
        setJobs(updatedJobs);
        alert.success("Applied successfully...!!");
      }
    } 
    catch (error) {
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
        selectedProfile === null ? (
        <p style={{color:'red'}}> Please select a profile first.</p>):  
        filteredJobs.length >= 1 ? (
          <Table 
            // history={history}
            jobs={filteredJobs}
            columns={columns}
            classes={classes}
            tableHeader={"Job Links"}
            onApplyHandler={onApplyButtonHandler}/>
        ): <p> No More jobs </p>
      }
    </Fragment>)

};

export default  managerJobLinks;