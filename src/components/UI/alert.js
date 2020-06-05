/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'inherit', 
    position: 'absolute',
    right: '10px',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const alert = ({message}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity='error'>{message}</Alert>
    </div>
  );
}

export default alert;