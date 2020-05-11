/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import { useAlert } from "react-alert";
import { makeStyles } from "@material-ui/styles";
import SalesDetails from "../UI/salesDetail";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import DateRange from "../UI/DateRange";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const salesExecutive = ({}) => {
  const [report, setReport] = useState([]);

  const alert = useAlert();
  const classes = useStyles();
  const handleDate = async (startDate, endDate) => {
    console.log("CHDHSHDSHDHS");
    console.log(startDate, endDate);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ startDate, endDate });
    const res = await axios.put(
      BASE_URL + "/api/appliedJob/report",
      body,
      config
    );
    setReport(res.data)
    console.log(res);
  };
  return (
    <Fragment>

        <DateRange handleClick={handleDate} />
        {report.length > 0 ? <SalesDetails data = {report}/> : null}
    </Fragment>
  );
};

export default salesExecutive;
