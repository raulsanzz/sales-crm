/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import Table from "../table";
import axios from "axios";

import { fetchJob, updateJob } from "../../actions/job";

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

const managerJobLinks = ({fetchJob, jobs, history, updateJob}) => {
  const classes = useStyles();
  const alert = useAlert();
  const [jobUpdated, setJobUpdated] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "list", label: "Profile", minWidth: 100, align: "center", 
      placeholder: "profile_id", listItems: profiles},
    { id: "list", label: "Status", minWidth: 100, align: "center", 
      placeholder: "status", listItems: ["lead", "garbage", "recuriter", "in-house", "rejected by client"]},
    { id: "updateButton", label: "Action", minWidth: 100, align: "center" }
  ];
  useEffect(() => {
    fetchJob();
    fetchProfiles();
    let arr = jobs.filter(job => {
      return(
          job.status === 'job' ? job : null
      )
    })
    setFilteredJobs(arr);
  }, [jobs.length, jobUpdated]);

  const fetchProfiles = async () => {
    try {
      const profiles = await axios.get ( BASE_URL + "/api/profile");
      setProfiles(profiles.data.profiles);  
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
  return(
    <Fragment>
    {
      profiles.length > 0 ?
      (<Table 
      jobs={filteredJobs}
      columns={columns}
      classes={classes}
      tableHeader={"Job List"}
      history={history}
      onUpdateHandler={jobUpdateHandeler}
    />): <p>Loading</p>
    }
    </Fragment>
  )
}

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
});


export default  connect(mapStateToProps, { updateJob, fetchJob })(managerJobLinks);