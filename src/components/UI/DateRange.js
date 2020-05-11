/* eslint-disable react-hooks/rules-of-hooks */
import "date-fns";
import TextField from "@material-ui/core/TextField";
import React, { useState, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "10px auto",
  },
}));

const DateRange = ({handleClick}) => {


  const classes = makeStyles();
  const [startDate,setStartDate] = useState('')
  const [endDate,setEndDate] = useState('')
  return (
    <Fragment>
      <Paper className={classes.paper}>
      <Grid  style = {{textAlign:"center"}}  container spacing={3}>
        <Grid item xs={4}>
          
            <TextField
              id="date"
              label="Start Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=> setStartDate(e.target.value)}
            />
     
        </Grid>
        <Grid item xs={4}>
          
            <TextField
              id="date"
              label="End Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=> setEndDate(e.target.value)}
            />
 
        </Grid>
        <Grid item xs={4}>
         
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              onClick={()=> handleClick(startDate,endDate)}
            >
              Submit
            </Button>
        </Grid>
      </Grid>
          </Paper>
    </Fragment>
  );
};

export default DateRange;
