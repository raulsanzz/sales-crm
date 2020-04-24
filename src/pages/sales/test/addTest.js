/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useAlert } from 'react-alert';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;


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
  const classes = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const alert = useAlert();
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
      value:  '',
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
        type: 'text',
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
        isValid = value.trim() !== '' && isValid;
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
    const test = {
      test_type: formData.test_type.value,
      due_time: formData.due_time.value,
      due_date: formData.due_date.value,
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
      const res = await axios.post ( BASE_URL + "/api/test", body, config);
        console.log('====================================');
        console.log(res);
        console.log('====================================');
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
            (<TextField
              key={elem.id}
              id={elem.id}
              label={elem.config.elementConfig.placeholder}
              type='date'
              onChange={(event) => {onChangeHandler(event, elem.id)}}
              value={elem.config.value}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default addTest