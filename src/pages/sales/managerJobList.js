/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchJob, updateJob } from "../../actions/job";

import Table from "../table";
const BASE_URL = process.env.REACT_APP_BASE_URL;

  
const useStyles = makeStyles( theme => ({
  root: {
    width: "100%"
  },
  tableWrapper: {
    overflow: "auto"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginTop: "12px",
    marginRight: "22px",
    width: "100%"
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
}));

const managerJobLinks = ({fetchJob, history, updateJob}) => {
  const classes = useStyles();
  const alert = useAlert();
  const [jobs, setJobs] = useState([]);
  const [jobUpdated, setJobUpdated] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "list", label: "Status", minWidth: 100, align: "center", 
      placeholder: "status", listItems: ["lead", "garbage", "recuriter", "in-house", "rejected by client"]},
    { id: "updateButton", label: "Action", minWidth: 100, align: "center" }
  ];
  

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
      const jobs =  await axios.get ( BASE_URL + "/api/appliedjob/manager");
      setJobs(jobs.data.appliedJobs); 
    } catch (error) {
      console.log(error);
    }
  };
  const jobUpdateHandeler = async(id, updateData) => {
    const res = await updateJob(id, updateData)
    if(res){
      alert.success("Job updated successfully...!!");
      await fetchJob() 
      setJobUpdated(!jobUpdated);

    }
    else{
      alert.success("Job update failed...!!");
    }
  }
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
        tableHeader={"Jobs List"}
        history={history}
        // onUpdateHandler={jobUpdateHandeler}
        />
      ): <p> No More jobs </p>
    }
  </Fragment>)
}

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
});


export default  connect(mapStateToProps, { updateJob, fetchJob })(managerJobLinks);