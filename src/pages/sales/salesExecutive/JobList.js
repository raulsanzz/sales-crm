/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import AddJob from './AddJob';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from './../../table';
import { fetchJob } from './../../../actions/job';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170 },
  { id: 'job_title', label: 'Job Title', minWidth: 100, align: 'center' },
  { id: 'url', label: 'URL', minWidth: 100, align: 'center' },
  { id: 'location', label: 'Location', minWidth: 170, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'center' },
  { id: 'createdAt', label: 'Applied Date', minWidth: 170, align: 'center' }
];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  tableWrapper: {
    overflow: 'auto'
  },
  jobHeader: {
    textAlign: 'center',
    fontFamily: 'initial',
    color: 'blue'
  }
});

const jobList = ({ fetchJob, jobs }) => {
  
  const classes = useStyles();
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJob();
    let arr = jobs.filter(job => {
      return(
          job.status === 'job' ? job : null
      )
    })
    setFilteredJobs(arr);
  }, [jobs.length]);
  
  return (
    <Paper className={classes.root}>
      <AddJob />
      <div style={{margin:'20px'}}></div>
      <Table 
        jobs={filteredJobs}
        columns={columns}
        classes={classes}
        tableHeader={'Job List'}
        // history={history}
      />
    </Paper> 
  );
};

const mapStateToProps = state => ({
  jobs: state.JobReducer.job
});

jobList.propTypes = {
  fetchJob: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { fetchJob })(jobList);