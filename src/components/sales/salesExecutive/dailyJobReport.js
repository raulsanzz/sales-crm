/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

import Meassage from './../../UI/message';
import SalesDetails from "../../UI/salesDetail";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '20px',
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '22px auto',
  },
  center: {
    textAlign: 'center'
  },
  table: {
    minWidth: 650
  },
  text: {
    padding: '28px',
    fontFamily: 'initial',
    fontSize: '18px',
    fontWeight: 'bold'
  }
}));

const salesExecutive = () => {
  const [report, setReport] = useState([]);
  const [tableHeader, setTableHeader] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  
  useEffect(( ) => {
     fetchData(); 
  },[])
  
  const fetchData = async () => {
    setLoading(true);
    let date = new Date();
    date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    setTableHeader(`Report of (${date})`)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ startDate: date, endDate: date });
    const res = await axios.put(BASE_URL + "/api/appliedJob/report", body, config);
    setReport(res.data);
    setLoading(false);
  };

  return (
    <Fragment>
      <main className={classes.root}>
        {loading === false ? report.length > 0 ? ( 
          <SalesDetails 
            classes={classes}
            data = {report} 
            tableHeader = {tableHeader} />) : (
          <Meassage meassage={'No reports for the today'} /> ) : (
          <Meassage meassage={'loading'} />)
        }
      </main>
    </Fragment>
  );
};

export default salesExecutive;
