/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";

import { fetchJob } from "../../actions/job";
import Table from "./../table";

const columns = [
  { id: "companyName", label: "Company Name", minWidth: 170},
  { id: "client_name", label: "Client Name", minWidth: 170, align: "center" },
  { id: "profile", label: "Profile", minWidth: 170, align: "center" },
  { id: "job_title", label: "Job Title", minWidth: 170, align: "center" }
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
  }
}));

const leadStatus = ({fetchJob, jobs}) => {
  const classes = useStyles();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [leadStatus, setLeadStatus] = useState(null);

  useEffect(() => {
    console.log('====================================');
    console.log();
    console.log('====================================');
    fetchJob();
    setFilteredJobs(jobs);
  }, []);

  const handleLeadStatusChange = (status) => {
    setLeadStatus(status);
    let arr = jobs.filter(job => {
      return(
        job.status === status ? job : null
      )
    })
   setFilteredJobs(arr);
  };
  
  return( 
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id='lead-select-label'>Lead Status</InputLabel>
        <Select
          labelId='lead-select-label'
          id='lead-select'
          value= {leadStatus}
          onChange={(event) => {handleLeadStatusChange(event.target.value)}}>
          <MenuItem value='Scheduled'>Scheduled</MenuItem>
          <MenuItem value='Recruiter'>Recruiter</MenuItem>
          <MenuItem value='Garbage'>Garbage</MenuItem>
          <MenuItem value='In-house'>In-house</MenuItem>
          <MenuItem value='Rejected by client'>Rejected by client</MenuItem>
          <MenuItem value='Rescheduled leads'>Rescheduled leads</MenuItem>
          <MenuItem value='Call Taken'>Call Taken</MenuItem>
          <MenuItem value='Not Taken'>Not Taken</MenuItem>
        </Select>
      </FormControl>
      {leadStatus === null ? (
        <p style={{color:'red'}}> Please select a Lead Status first.</p>):  
        filteredJobs.length >= 1 ? (
          <Table 
            // history={history}
            jobs={filteredJobs}
            columns={columns}
            classes={classes}
            tableHeader={"Leads"} />
        ): <p> No leads with the selected status </p>}
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
});
  
export default connect(mapStateToProps, { fetchJob } )(leadStatus);