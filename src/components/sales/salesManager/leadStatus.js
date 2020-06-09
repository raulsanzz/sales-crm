/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { fetchLeads } from '../../../store/actions/lead';
import TopOptionsSelector from '../../UI/topOptionsSelector';
import Meassage from './../../UI/message';
import Table from './../../UI/table';

const columns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'client_name', label: 'Client Name', minWidth: 170, align: 'center' },
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
  },
  hover:{
    cursor: 'pointer'
  }
}));

const leadStatus = ({fetchLeads, leads, leadLoading, leadStatuses, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false)
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
    let arr = leads.filter(lead => {
      return(
        lead.status === status ? lead : null
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
            options={leadStatuses}
            config={'Lead Status'}
            meassage={ leadStatus === null ? 'Please select a lead status first' : null}
          />
          {leadStatus !== null ? filteredLeads.length >= 1 ? (
            <Table 
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={'Leads'}
            history={history} 
            rowClickListener={true}/>
          ): <Meassage meassage={'No leads for the selected status'} /> : null }
        </div>
      )}
    </Fragment>
  )//end of return
};

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading,
  leadStatuses: state.SelectOptions.leadStatus
});
  
export default connect(mapStateToProps, { fetchLeads } )(errorHandler(leadStatus));