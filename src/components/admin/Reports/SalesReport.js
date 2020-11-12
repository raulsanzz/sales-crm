/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState,useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from '../../../axios-order';
import SalesReport from "../../UI/salesReportDetail";

import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Meassage from '../../UI/message';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '20px',
    border:'1px solid rgba(0,0,0,0.125)',
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
    margin: '10px auto',
    position: 'relative'
  },
  pdfButton:{
    position: 'absolute',
    right: '10px',
    fontSize: 40,
    color:'black',
  }
}));



  
const SalesReportDetail = (props) => {
  const [loading, setLoading] = useState(false);
  const [fetchDetails, setFetchDetails] = useState([]);
  const [appliedDetails, setAppliedDetails] = useState([]);
  const user_id = props.history.location.state.userId;
  const startDate = props.history.location.state.startDate;
  const endDate = props.history.location.state.endDate;

  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = async (req, res) => {
  setLoading(true);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ user_id, startDate, endDate });
    const res = await axios.post("/api/appliedJob/reportDetail", body, config);
    setFetchDetails(res.data.fetchedJobsAll);
    setAppliedDetails(res.data.appliedJobsAll);
    
  }
    catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <main>
      { loading === false  ? ( 
          <SalesReport 
          fetchDetails = {fetchDetails}
          appliedDetails = {appliedDetails}
           /> 
            ) : (
          <Meassage meassage={'loading'}  /> )  
        }
      </main>
    </Fragment>
  );
};

export default errorHandler(SalesReportDetail);
