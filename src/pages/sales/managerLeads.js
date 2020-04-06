/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import Table from "../table";
import { fetchJob } from "../../actions/job";

const columns = [
    { id: "companyName", label: "Company Name", minWidth: 170 },
    { id: "profile", label: "Profile", minWidth: 100, align: "center" },
    { id: "editButton", label: "Action", minWidth: 100, align: "center", editPath:"/lead_edit" }
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

const managerJobLinks = ({fetchJob, jobs, history}) => {
    const classes = useStyles();
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        fetchJob();
        let arr = jobs.filter(job => {
          return(
              job.status === 'lead' ? job : null
          )
        })
        setFilteredJobs(arr);
      }, [jobs.length]);

    return(
      <Table 
        jobs={filteredJobs}
        columns={columns}
        classes={classes}
        tableHeader={"Leads"}
        history={history}
      />
    )
}

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
  });

export default  connect(mapStateToProps, { fetchJob })(managerJobLinks);