/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Table from './../../UI/table';
import Meassage from './../../UI/message';
import axios from './../../../axios-order';
import TopOptionsSelector from '../../UI/topOptionsSelector';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'url', label: 'Job Link URL', minWidth: 170, align: 'center' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: 'job_title', label: 'Job Title', minWidth: 170, align: 'center' }
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
  }
}));

const jobStatus = ({jobStatuses}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobStatus, setJobStatus] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchAppliedJobs(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchAppliedJobs, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    handleJobStatusChange(jobStatus)
  }, [jobs.length]);

  const fetchAppliedJobs = async (shouldUpdateLoading) => {
    if(shouldUpdateLoading){
      setLoading(true);
    }  
    try {
      const jobs =  await axios.get ('/api/appliedjob/leads');
      setJobs(jobs.data.appliedJobs);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleJobStatusChange = (status) => {
    setJobStatus(status);
    let arr = jobs.filter(job => {
      return(
        job.lead_status === status ? (job) : null
        )
      })
    setFilteredJobs(arr);
  };
  
  return( 
    <Fragment>
      {loading === true ? <Meassage meassage={'loading'} /> : (
        <div>
          <TopOptionsSelector 
            selectChangeHandler={handleJobStatusChange}
            options={jobStatuses}
            config={'Job Status'}
            meassage={ jobStatus === null ? 'Please select a Job status first' : null}
          />
          {jobStatus !== null ? filteredJobs.length >= 1 ? (
            <Table 
            // history={history}
              jobs={filteredJobs}
              columns={columns}
              classes={classes}
              tableHeader={'Jobs'} />
          ): <Meassage meassage={'No Job with the selected status'} /> : null }
        </div>
      )}
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
  jobStatuses: state.SelectOptions.jobStatus
});

export default connect(mapStateToProps)(errorHandler(jobStatus));