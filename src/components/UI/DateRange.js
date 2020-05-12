/* eslint-disable react-hooks/rules-of-hooks */
import 'date-fns';
import React, { useState, Fragment } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';

const DateRange = ({classes, handleClick}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              variant='inline'
              inputVariant='outlined'
                margin='normal'
                id='start-date'
                label='Start Date'
                format='dd/MM/yyyy'
                value={startDate}
                onChange={(date)=> setStartDate(date)}
                maxDate={new Date()}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}/>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            variant='inline'
            inputVariant='outlined'
              margin='normal'
              id='end-date'
              label='End Date'
              format='dd/MM/yyyy'
              value={endDate}
              onChange={(date)=> setEndDate(date)}
              maxDate={new Date()}
              minDate={startDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}/>
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={classes.button}
              onClick={()=> handleClick(startDate,endDate)}>
              Show Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default DateRange;
