/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Table from '../../UI/table';
import { fetchLeads } from '../../../actions/lead';

const columns = [
    { id: 'company_name', label: 'Company Name', minWidth: 170 },
    { id: 'profile', label: 'Profile', minWidth: 100, align: 'center' },
    { id: 'editButton', label: 'Add Test Details', minWidth: 100, align: 'center', editPath:'/add_test' },
    { id: 'editButton', label: 'Add Lead Details', minWidth: 100, align: 'center',  editPath:'/lead_edit' }
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

const managerJobLinks = ({fetchLeads, leads, leadLoading, history}) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  return(
    <Fragment>
      {
        leadLoading ? <p> Loading...!!! </p> : leads.length > 0 ?
        (<Table 
          jobs={leads}
          columns={columns}
          classes={classes}
          tableHeader={'Leads'}
          history={history}/>) : <p> Loading...!!!</p>
      }
    </Fragment>
  )
}

const mapStateToProps = state => ({
  leads: state.LeadReducer.leads,
  leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads })(managerJobLinks);