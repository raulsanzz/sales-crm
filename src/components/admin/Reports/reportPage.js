/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DateRange from "../../UI/DateRange";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginBottom: "20px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "22px auto",
  },
  center: {
    textAlign: "center",
  },
  text: {
    padding: "28px",
    fontFamily: "initial",
    fontSize: "18px",
    fontWeight: "bold",
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
}));

const reportTable = ({report, tableHeader, loading, displayTable, dateRangeHandler, pageHeader}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.root}>
      <Paper className={classes.paper}>
          <Typography className={classes.typography}>
            {pageHeader}
          </Typography>
        </Paper>
        <DateRange handleClick={dateRangeHandler} classes={classes} />
        <Paper className={classes.paper}>
          {tableHeader !== "" ? loading === false ? 
           report.length > 0 ? displayTable() : (
            <Typography className={classes.typography}>
              No Reports for the selected dates.
            </Typography>) : (
            <Typography className={classes.typography}>
              Loading.
            </Typography>) : (
            <Typography className={classes.typography}>
              Select the date and press the show report button to display
              reports.
            </Typography>)
          }
        </Paper>
      </main>
    </Fragment>
  );
};

export default reportTable;
