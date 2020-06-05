/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  circularProgressBar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '9%'
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '20px',
    minHeight: '80vh',
    padding: '12%'
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    position: 'relative',
  },
}));

const meassage = ({ meassage }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {meassage === 'loading' ? (
        <div className={classes.circularProgressBar}>
            <CircularProgress  size={170} thickness={1.8} />
        </div>
      ) : (
        <Typography className={classes.typography}>{meassage}</Typography>
      )}
    </Paper>
  );
};

export default meassage;
