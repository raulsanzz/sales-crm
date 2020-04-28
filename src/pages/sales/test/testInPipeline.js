/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import Table from "./../../table";
import { fetchLeads } from "../../../actions/lead";

const columns = [
    { id: "company_name", label: "Company Name", minWidth: 170 },
    { id: "profile", label: "profile", minWidth: 100, align: "center" },
    { id: "due_date", label: "Due Date", minWidth: 100, align: "center" },
    { id: "due_time", label: "Due Time", minWidth: 100, align: "center" },
    { id: "test_gmail_thread", label: "Gmail Thread", minWidth: 100, align: "center" },
    { id: "agendaButton", label: "Agenda", minWidth: 100, align: "center" },
    { id: 'editButton', label: 'Add Test Details', minWidth: 100, align: 'center', editPath:'/edit_test' },
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
    textField:{
      width: '100%',
    },
  }));

const testInPipeline = ({fetchLeads, leads, history, leadLoading}) => {
  const classes = useStyles();
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
      fetchLeads();
      let arr = leads.filter( lead => {
        return(
            (lead.test !== null && (lead.test.status === null || lead.test.status === 'In progress' )) ? lead : null
        )
      })
      setFilteredLeads(arr);
    }, [JSON.stringify(leads)]);
    
  return(     
    <Fragment>
      {leadLoading ? <p> Loading </p>: 
      (<Table 
          jobs={filteredLeads}
          columns={columns}
          classes={classes}
          tableHeader={"Sales test"}
          history={history}/>
        )}
    </Fragment> 
  )
}

const mapStateToProps = state => ({
    leads: state.LeadReducer.leads,
    leadLoading: state.LeadReducer.loading
});

export default  connect(mapStateToProps, { fetchLeads })(testInPipeline);