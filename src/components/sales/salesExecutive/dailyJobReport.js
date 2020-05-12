/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto' 
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
    const body = JSON.stringify({ date, date });
    const res = await axios.put(BASE_URL + "/api/appliedJob/report", body, config);
    setReport(res.data);
    setLoading(false);
  };
  return (
    <Fragment>
      <main className={classes.root}>
        {tableHeader !== '' ? loading === false ? report.length > 0 ? ( 
          <SalesDetails 
            classes={classes}
            data = {report} 
            tableHeader = {tableHeader}/>
          ) : 
          (<Paper className={classes.paper}> 
            <Typography className={classes.typography}>No Reports for the selected dates.</Typography> 
          </Paper>) : 
          (<Paper className={classes.paper}> 
            <Typography className={classes.typography}>Loading.</Typography> 
          </Paper>) : 
          (
           <Paper className={classes.paper}> 
            <Typography className={classes.typography}> Select the date and press the show report button to display reports.</Typography>
          </Paper> )}
      </main>
    </Fragment>
  );
};

export default salesExecutive;
