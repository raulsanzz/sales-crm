/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginBottom: '20px',
    border:'1px solid rgba(0,0,0,0.125)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
}));

const topOptionsSelector = ({selectChangeHandler, meassage, options, config}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <FormControl variant='outlined' className={classes.formControl} error={meassage ? true : false}>
        <InputLabel id={`${config}-select-label`}>{config}</InputLabel>
        <Select
          labelId={`${config}-select-label`}
          id={`${config}-select`}
          onChange={(event) => {
            selectChangeHandler(event.target.value);
          }}
          label={config} >
          {options.map((item) => {
            return (
              <MenuItem 
               key={ config === 'Profile' ? item.id : item} 
               value={ config === 'Profile' ? item.id : item}>
                { config === 'Profile' ? item.name : item}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{meassage}</FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default topOptionsSelector;
