/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import Table from "../table";
import { fetchLeads } from "../../actions/lead";

const columns = [
    { id: "company_name", label: "Company Name", minWidth: 170 },
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

const managerJobLinks = ({fetchLeads, leads, history}) => {
    const classes = useStyles();
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
      fetchLeads();
      setFilteredJobs(leads);
      console.log('====================================');
      }, [leads.length]);

    return(
      <Fragment>
        {
          leads.length > 0 ?
          (<Table 
            jobs={filteredJobs}
            columns={columns}
            classes={classes}
            tableHeader={"Leads"}
            history={history}
          />) : <p> Loading...!!!</p>
        }
      </Fragment>
    )
}

const mapStateToProps = state => ({
    leads: state.LeadReducer.leads
  });

export default  connect(mapStateToProps, { fetchLeads })(managerJobLinks);