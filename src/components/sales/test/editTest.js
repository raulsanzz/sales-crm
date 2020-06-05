/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from "react";
import { useAlert } from 'react-alert';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormControl from '@material-ui/core/FormControl';
import Edit from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import axios from './../../../axios-order';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: `${theme.spacing()}px auto`,
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto'
  },
  textField:{
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto' 
  }
}));

const editSalesTest = ({ history, location, testStatuses }) => {
  const classes = useStyles();
  const alert = useAlert();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    test_status: {
      elementType: 'select',
      elementConfig:{
        options: testStatuses,
        placeholder: 'Test Status'
      },
      value: location.state.detail.test.status,
      validation: {
        required: true
      },
      valid: location.state.detail.test.status? true : false,
      touched: location.state.detail.test.status? true : false,
      message: ''
    },
    notes: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        label: 'Notes'
      },
      value: location.state.detail.test.note,
      validation: {
        required: true
      },
      valid: location.state.detail.test.note? true : false,
      touched: location.state.detail.test.note? true : false,
      message: ''
    }
});
useEffect(() => {
  checkFormValidity(formData);
},[])
const validityCheck = (value, rules) => {
  let isValid = true;
  let message = '';
  if(rules){
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
      if(!isValid){
        message = 'required';
      }
    }; 
  };
  return {isValid, message};
}

const checkFormValidity = (form) => {
  let formIsValid = true;
  for (let elemIdentifier in form){
    if(form[elemIdentifier].touched || form[elemIdentifier].validation.required){
      formIsValid = form[elemIdentifier].valid && formIsValid;
    }   
  }
  setFromIsInvalid(!formIsValid);
}

const onChangeHandler = (e, elementIdentifier) => {
  const updatedForm = {
    ...formData
  }
  const updatedElement = {
    ...updatedForm[elementIdentifier]
  }
  updatedElement.value = e.target.value;
  const res = validityCheck(updatedElement.value, updatedElement.validation);
  updatedElement.valid = res.isValid;
  updatedElement.message = res.message;
  updatedElement.touched = true;
  updatedForm[elementIdentifier] = updatedElement;
  setFormData(updatedForm);
  checkFormValidity(updatedForm);
}

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const test = { 
      status: formData.test_status.value,
      note: formData.notes.value 
    }
    const body = JSON.stringify({test});
    try {
      await axios.put('/api/test/' + location.state.detail.id, body, config);
      alert.success('Test updated successfully...!!');
      history.goBack()
    } catch (error) {      
      alert.success('Failed to update test...!!');
    }
  };
  const formRender = () => {
    const fromElementArray = [];
    for (let key in formData){
      fromElementArray.push({
          id: key,
          config: formData[key]
      });
    };
    let form = (
      <form onSubmit={onSubmitHandler} autoComplete="off" className={classes.formControl}>
          {fromElementArray.map( elem => (
          elem.config.elementType === 'select' ? (
            <FormControl className={classes.textField} key={elem.id}>
              <InputLabel id={`${elem.id}-label`}>{elem.config.elementConfig.placeholder}</InputLabel>
                <Select
                  labelId={`${elem.id}-label`}
                  id={elem.id}
                  value={elem.config.value}
                  onChange={(event) => {onChangeHandler(event, elem.id)}}
                  >
                  {elem.config.elementConfig.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))} 
              </Select>
            </FormControl>
            ): 
            (<TextField
              key={elem.id}
              className={classes.textField}
              style={{marginTop:'20px'}}
              error = {!elem.config.valid && elem.config.touched}
              id={elem.id}
              multiline
              rows={2}  
              label={elem.config.elementConfig.label}
              type={elem.config.elementConfig.type}
              variant="outlined"
              value={elem.config.value}
              onChange={(event) => {onChangeHandler(event, elem.id)}}
              helperText={elem.config.message}/>)
          ))} 
          <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={fromIsInvalid}>
              Update
            </Button>
      </form>
      );
    return form;
  }

  return (
    <Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton 
            aria-label="edit"  
            onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>
          <Typography className={classes.typography} >
            Update Test Details
          </Typography>
          {formRender()}
        </Paper>
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  testStatuses: state.SelectOptions.pipelineTestStatus
});

export default connect(mapStateToProps)(errorHandler(editSalesTest));
