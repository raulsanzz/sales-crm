/* eslint-disable react-hooks/rules-of-hooks */
import 'date-fns';
import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

import axios from './../../../axios-order';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const useStyles = makeStyles(theme => ({
    layout: {
        width: '100%',
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
          width: '80%'
        },
        [theme.breakpoints.up('md')]: {
          width: '65%'
        },
        [theme.breakpoints.up('lg')]: {
          width: '45%'
        }
      },
      paper: {
        minHeight: '300px',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
      },
      avatar: {
        margin: `${theme.spacing()}px auto`,
        backgroundColor: theme.palette.secondary.main
      },
    
      invalidElementError: {
        color: 'red'
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

const addTest = ({ history, location }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    gmail_thread: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Test Gmail Thread*'
      },
      value: '',
      validation: {
        required: true,
        urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;%=.]+$/
      },
      valid: false,
      touched: false,
      message:''
    },
    test_type: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Type of Test*'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
    due_date: {
      elementType: 'date',
      elementConfig:{
        type: 'text',
        placeholder: 'Due Date*'
      },
      value:  new Date(),
      validation: {
          required: true,
      },
      valid: false,
      touched: false,
      message:''
    },
    due_time: {
      elementType: 'input',
      elementConfig:{
        type: 'time',
        placeholder: 'Due Time*'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      message:''
    },  
  });
    useEffect(() => {

    },[])

const validityCheck = (value, rules) => {
  let isValid = true;
  let message = '';
  if(rules){
    if(rules.required){
        isValid = String(value).trim() !== '' && isValid;
      if(!isValid){
        message = 'required';
      }
    }; 
    if(rules.urlReg){
      isValid = rules.urlReg.test(value.trim()) && isValid;
      if(!isValid && message === ''){
        message = 'invalid url';
      }
    };
    if(!rules.required && value.trim() < 1){
      isValid = true;
      message = '';
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
  if(elementIdentifier === 'due_date'){
    updatedElement.value =  e;
  }
  else{
    updatedElement.value = e.target.value;
  }
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
    const date =  formData.due_date.value.getFullYear() + '-' +
                  Number(formData.due_date.value.getMonth()+ 1) + '-' +
                  formData.due_date.value.getDate();
    const test = {
      test_type: formData.test_type.value,
      due_time: formData.due_time.value,
      due_date: date,
      lead_id: location.state.detail.id,
      gmail_thread: formData.gmail_thread.value,
    }
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ test });  
    try {
      await axios.post ("/api/test", body, config);
      alert.success('Test Added successfully...!!');
      history.goBack();
    } catch (error) { 
      alert.success('Failed to add Test...!!');
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
      <form onSubmit={onSubmitHandler} autoComplete='off'>
        {fromElementArray.map( elem => (
          elem.config.elementType === 'select' ? (
            <FormControl className={classes.formControl, classes.textField} key={elem.id}>
              <InputLabel id={`${elem.id}-label`}>{elem.config.elementConfig.placeholder}</InputLabel>
                <Select
                  labelId={`${elem.id}-label`}
                  id={elem.id}
                  value={elem.config.value}
                  onChange={(event) => {onChangeHandler(event, elem.id)}}
                  >
                  {elem.config.elementConfig.options.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>{opt.displayValue}</MenuItem>
                  ))} 
              </Select>
            </FormControl>
            ): elem.config.elementType === 'date' ? 
            (<MuiPickersUtilsProvider utils={DateFnsUtils} key={elem.id}>
              <KeyboardDatePicker
                id={elem.id}
                label={elem.config.elementConfig.placeholder}
                variant="inline"
                format="yyyy/MM/dd"
                className={classes.textField}
                value={elem.config.value}
                minDate={new Date()}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
             </MuiPickersUtilsProvider>
            ) : (
              <TextField
                key={elem.id}
                className={classes.textField}
                error = {!elem.config.valid && elem.config.touched}
                id={elem.id}
                label={elem.config.elementConfig.placeholder}
                type={elem.config.elementConfig.type}
                value={elem.config.value}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
                helperText={elem.config.message}/>      
              )
          ))}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
            disabled={fromIsInvalid}>
            Add Test
          </Button>
      </form>
      );
    return form;
  }

  return (
    <Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {
            location.state.detail.test === null ? (
              <Fragment>
                <IconButton 
                  aria-label='Add'
                  onClick={() => history.goBack()}>
                  <ArrowBackIcon fontSize='large' />
                </IconButton>
                <Typography 
                  className={classes.typography} >
                  Add Test
                </Typography>
                {formRender()}
              </Fragment>
            ): <h1> Test Already Exists</h1>
          }
        </Paper>
      </main>
    </Fragment>
  );
};

export default errorHandler(addTest)