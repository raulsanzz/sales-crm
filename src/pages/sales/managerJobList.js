/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import Table from "../table";

import { fetchJob, UpdateJobStatus } from "../../actions/job";

const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "list", label: "Profile", minWidth: 100, align: "center", 
      placeholder: "profile", listItems: ["Ali Muhammad", "Aamir khan", "Kevan Jay"]},
    { id: "list", label: "Status", minWidth: 100, align: "center", 
      placeholder: "status", listItems: ["job", "lead", "garbage", "recuriter"]},
    { id: "updateButton", label: "Action", minWidth: 100, align: "center" }
];
  
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

const managerJobLinks = ({fetchJob, jobs, history, UpdateJobStatus}) => {
  const classes = useStyles();
  const alert = useAlert();
  const [jobUpdated, setJobUpdated] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  useEffect(() => {
    fetchJob();
    let arr = jobs.filter(job => {
      return(
          job.status === 'job' ? job : null
      )
    })
    setFilteredJobs(arr);
  }, [jobs.length, jobUpdated]);

  const jobUpdateHandeler = async(id, updateData) => {
    const res = await UpdateJobStatus(id, updateData)
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
    <Table 
      jobs={filteredJobs}
      columns={columns}
      classes={classes}
      tableHeader={"Job List"}
      history={history}
      onUpdateHandler={jobUpdateHandeler}
    />
  )
}

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
});


export default  connect(mapStateToProps, { UpdateJobStatus, fetchJob })(managerJobLinks);