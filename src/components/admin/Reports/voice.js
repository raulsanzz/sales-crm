/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DateRange from "../../UI/DateRange";
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

const voice = () => {
  const [report, setReport] = useState([]);
  const [tableHeader, setTableHeader] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  
  const handleDate = async (startDate, endDate) => {
    setLoading(true);
    startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    setTableHeader(`Report of [${startDate}] - [${endDate}]`)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ startDate, endDate });
    // const res = await axios.put(BASE_URL + "/api/appliedJob/report", body, config);
    // setReport(res.data);
    setLoading(false);
  };
  return (
    <Fragment>
      <main className={classes.root}>
        <DateRange 
          handleClick={handleDate} 
          classes={classes} />
        {tableHeader !== '' ? loading === false ? report.length > 0 ? ( 
          <p> display the list component here</p> )
          : 
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

export default voice;
