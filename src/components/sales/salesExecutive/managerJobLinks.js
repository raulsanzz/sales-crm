/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { updateAppliedJob } from './../../../store/actions/job';
import { fetchProfiles } from './../../../store/actions/profile';
import TopOptionsSelector from './../../UI/topOptionsSelector';
import Meassage from './../../UI/message';
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

const managerJobLinks = ({ updateAppliedJob, fetchProfiles, profiles }) => {
  const alert = useAlert();
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

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
  
  const fetchAppliedJobs = async () => {
    try {
      const jobs =  await axios.get ( BASE_URL + '/api/appliedjob');
      setJobs(jobs.data.appliedJobs);  
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
      {loading === true ? <Meassage meassage={'loading'} /> :(
          <div>
            <TopOptionsSelector 
              selectChangeHandler={handleProfileChange}
              options={profiles}
              config={'Profile'}
              meassage={ selectedProfile === null ? 'Please select a profile first' : null}
            />
            {selectedProfile !== null ? filteredJobs.length >= 1 ?(
              <Table 
                // history={history}
                jobs={filteredJobs}
                columns={columns}
                classes={classes}
                tableHeader={'Job Links'}
                onApplyHandler={onApplyButtonHandler}/>
            ): <Meassage meassage={'No more jobs for the selected profile'} /> : null}
          </div>
      )}
    </Fragment>)

};

const mapStateToProps = state => ({
  profiles: state.ProfileReducer.profiles
});
export default  connect(mapStateToProps, {updateAppliedJob, fetchProfiles})(managerJobLinks);