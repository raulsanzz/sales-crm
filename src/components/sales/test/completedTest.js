/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, Fragment } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { useAlert } from 'react-alert';
import { makeStyles } from "@material-ui/styles";

import Table from "./../../UI/table";
import Meassage from './../../UI/message';
import { fetchLeads } from "../../../store/actions/lead";

const BASE_URL = process.env.REACT_APP_BASE_URL;


  
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

const completedTest = ({fetchLeads, leads, history, leadLoading, testStatuses}) => {
  const alert = useAlert();
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const columns = [
    { id: "company_name", label: "Company Name", minWidth: 170 },
    { id: "profile", label: "profile", minWidth: 100, align: "center" },
    { id: "due_date", label: "Due Date", minWidth: 100, align: "center" },
    { id: "due_time", label: "Due Time", minWidth: 100, align: "center" },
    { id: "test_gmail_thread", label: "Gmail Thread", minWidth: 100, align: "center" },
    { id: "onChangeList", label: "Test Status", minWidth: 100, align: "center",
    placeholder: "Test Status", for: 'status' , listItems: testStatuses},
];
  useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchLeads(true);
      didMountRef.current = true;
    }
    const interval = setInterval(fetchLeads, 60000);//get all leads from DB after every 1 mint 
    return () => clearInterval(interval);// for ComponentWillUnMount
  }, []);

  useEffect(() => {
      let arr = leads.filter( lead => {
        return(
            (lead.test !== null && lead.test.status === 'Completed' ) ? lead : null
        )
      })
      setFilteredLeads(arr);
    }, [JSON.stringify(leads)]);
  
  const testStatusChangeHandler = async(lead_id, test_status) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const test = { status: test_status }
    const body = JSON.stringify({test});  
    try {
      await axios.put( BASE_URL + "/api/test/" + lead_id, body, config);
      alert.success('Test status updated successfully...!!');
      fetchLeads();
    } catch (error) {      
      alert.success('Failed to update test Status...!!');
    }
  }

  return(     
    <Fragment>
        {leadLoading ? <Meassage meassage={'loading'} /> : filteredLeads.length > 0 ?
          (<Table 
            jobs={filteredLeads}
            columns={columns}
            classes={classes}
            tableHeader={"Completed Tests"}
            onUpdateHandler={testStatusChangeHandler}
            history={history}/>
          ) : <Meassage meassage={'No tests have been completed yet'} />
        }
    </Fragment> 
  )
}

const mapStateToProps = state => ({
    leads: state.LeadReducer.leads,
    leadLoading: state.LeadReducer.loading,
    testStatuses: state.SelectOptions.CompletedTestStatus
});

export default  connect(mapStateToProps, { fetchLeads })(completedTest);