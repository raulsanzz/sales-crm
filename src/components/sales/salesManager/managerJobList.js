/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { fetchProfiles } from './../../../store/actions/profile';
import TopOptionsSelector from './../../UI/topOptionsSelector';
import axios from './../../../axios-order';
import Meassage from './../../UI/message';
import Table from './../../UI/table';
  
const useStyles = makeStyles( theme => ({
  root: {
    width: '100%'
  },
  tableWrapper: {
    overflow: 'auto'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginTop: '12px',
    marginRight: '22px',
    width: '100%'
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
}));

const managerJobList = ({ history, profiles, fetchProfiles}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'editButton', label: 'Add Lead Details', minWidth: 100, align: 'center',  editPath:'/add_lead' }
  ];

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
      const jobs =  await axios.get ('/api/appliedjob/manager');
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

  return(
    <Fragment>
      {loading === true ? <Meassage meassage={'loading'} /> : (
        <div>
          <TopOptionsSelector 
            selectChangeHandler={handleProfileChange}
            options={profiles}
            config={'Profile'}
            meassage={ selectedProfile === null ? 'Please select a profile first' : null}
          />
          {selectedProfile !== null ? filteredJobs.length >= 1 ? (
            <Table 
              jobs={filteredJobs}
              columns={columns}
              classes={classes}
              tableHeader={'Jobs List'}
              history={history}
              />
          ): <Meassage meassage={'No more jobs for the selected profile'} /> : null }
      </div>
      )}
  </Fragment>)
}


const mapStateToProps = state => ({
  profiles: state.ProfileReducer.profiles
});

export default connect(mapStateToProps, 
  {fetchProfiles})(errorHandler(managerJobList));