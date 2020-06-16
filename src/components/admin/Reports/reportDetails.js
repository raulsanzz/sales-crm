/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import Table from './../../UI/table';
import Meassage from "./../../UI/message";
import axios from "./../../../axios-order";
import errorHandler from "./../../../hoc/ErrorHandler/ErrorHandler";

const ApplicationsColumns = [
  { id: "company_name", label: "Company Name", minWidth: 170 },
  { id: "url", label: "Job Link URL", minWidth: 170, align: "center" },
  { id: "profile", label: "Profile", minWidth: 170, align: "center" },
  { id: "job_title", label: "Job Title", minWidth: 170, align: "center" },
];

const TestColumns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: "due_date", label: "Due Date", minWidth: 100, align: "center" },
  { id: "due_time", label: "Due Time", minWidth: 100, align: "center" },
  { id: "test_gmail_thread", label: "Gmail Thread", minWidth: 100, align: "center" }
];

const LeadColumns = [
  { id: 'company_name', label: 'Company Name', minWidth: 170},
  { id: 'client_name', label: 'Client Name', minWidth: 170, align: 'center' },
  { id: 'profile', label: 'Profile', minWidth: 170, align: 'center' },
  { id: 'job_title', label: 'Job Title', minWidth: 170, align: 'center' }
];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  tableWrapper: {
    overflow: "auto",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  jobHeader: {
    textAlign: "center",
    fontFamily: "initial",
    color: "blue",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: "12px",
    marginRight: "22px",
    width: "100%",
  },
}));

const reportDetail = ({ location }) => {
  const { status, startDate, endDate, routeName } = location.state;

  const classes = useStyles();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ startDate, endDate, status });
      let res
      if(routeName === 'test'){
        res = await axios.put(`/api/lead/dateSpecificTests`, body, config);
      }
      else{
        res = await axios.put(`/api/${routeName}/dateSpecific`, body, config);        
      }
      setReport(res.data.report);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
    setLoading(false);
  };
  const dispalyReport = () => {
    if(routeName === 'appliedJob'){
      return(
        <Table 
        // history={history}
          jobs={report}
          columns={ApplicationsColumns}
          classes={classes}
          tableHeader={'Applications'} />
      )
    }
    else if(routeName === 'test'){
      return(
        <Table 
        // history={history}
          jobs={report}
          columns={TestColumns}
          classes={classes}
          tableHeader={'Tests'} />
      )
    }
    else if(routeName === 'lead'){
      return(
        <Table 
        // history={history}
          jobs={report}
          columns={LeadColumns}
          classes={classes}
          tableHeader={'Lead'} />
      )
    }
  }

  return (
    <Fragment>
      {loading ? <Meassage meassage={"loading"} /> : report.length >= 1 ? 
        dispalyReport() : <Meassage meassage={'No Report with the selected status'} />}
    </Fragment>
  );
};

export default errorHandler(reportDetail);
