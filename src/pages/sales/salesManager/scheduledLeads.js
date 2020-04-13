/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Table from "./../../table";
import { fetchJob } from "./../../../actions/job";

const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "profile", label: "Profile", minWidth: 100, align: "center" },
    { id: "lead_status", label: "Lead Status", minWidth: 100, align: "center" },
    { id: "call_time", label: "Time", minWidth: 100, align: "center" },
    { id: "call_date", label: "Date", minWidth: 100, align: "center" },
    { id: "list", label: "Voice", minWidth: 100, align: "center", 
      placeholder: "voice", listItems: ["person 1", "person 2", "person 3"]}
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

const scheduledLeads = ({fetchJob, jobs}) => {
  const classes = useStyles();

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
      fetchJob();
      let arr = jobs.filter(job => {
        console.log('====================================');
        console.log(job.call_date > new Date());
        console.log(new Date(job.call_date));
        console.log(job.call_date);
        console.log('====================================');
        return(
            job.status !== 'job' ? job : null
        )
      })
      setFilteredJobs(arr);
    }, [jobs.length]);

  return(
    <Table 
      jobs={filteredJobs}
      columns={columns}
      classes={classes}
      tableHeader={"Scheduled Leads"}
      // history={history}
    /> 
  )
}

const mapStateToProps = state => ({
  jobs: state.JobReducer.job
});

export default  connect(mapStateToProps, { fetchJob })(scheduledLeads);