/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Table from './../../UI/table';
import Meassage from './../../UI/message';
import { fetchLeads } from '../../../store/actions/lead';
import TopOptionsSelector from '../../UI/topOptionsSelector';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: "due_date", label: "Due Date", minWidth: 100, align: "center" },
  { id: "due_time", label: "Due Time", minWidth: 100, align: "center" },
  { id: "test_gmail_thread", label: "Gmail Thread", minWidth: 100, align: "center" }
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
  hover:{
    cursor: 'pointer'
  }
}));

const test = ({fetchLeads, leads, leadLoading, testStatuses, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [leadStatus, setLeadStatus] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
    handleLeadStatusChange(leadStatus);
  }, [JSON.stringify(leads)]);

  const handleLeadStatusChange = (status) => {
    setLeadStatus(status);
    let arr = leads.filter( lead => {
        return(
            (lead.test !== null && lead.test.status === status ) ? lead : null
        )
      })
    setFilteredLeads(arr);
  };
  return( 
    <Fragment>
       {leadLoading === true ? <Meassage meassage={'loading'} /> : (
        <div>
          <TopOptionsSelector 
            selectChangeHandler={handleLeadStatusChange}
            options={testStatuses}
            config={'Test Status'}
            meassage={ leadStatus === null ? 'Please select a test Status first' : null}
          />
          {leadStatus !== null ? filteredLeads.length >= 1 ? (
            <Table 
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={'Tests'}
            history={history} 
            rowClickListener={true} />
          ): <Meassage meassage={'No test with the selected status'} /> : null }
        </div>
      )}
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading,
  testStatuses: state.SelectOptions.testStatus
});
  
export default connect(mapStateToProps, { fetchLeads } )(errorHandler(test));