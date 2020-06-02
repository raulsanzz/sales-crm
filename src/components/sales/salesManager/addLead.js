/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { updateAppliedJob } from './../../../store/actions/job';
import { addLead } from './../../../store/actions/lead';

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

const addTest = ({ history, location, updateAppliedJob, addLead, jobStatuses }) => {
  const classes = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const alert = useAlert();
  const [formData, setFormData] = useState({
    gmail_thread: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Gmail Thread*'
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
    client_name: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Client Name*'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      lead_status: {
        elementType: 'select',
        elementConfig:{
            options: jobStatuses,
          placeholder: 'Job Status*'
        },
        value: '',
        validation: {
          required: true,
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
    const query = {
      job_id: location.state.detail.job_id,
      user_id: location.state.detail.user_id,
      profile_id: location.state.detail.profile_id
    };
    const clientData = {
        id: location.state.detail.job.client_id,
        client_name: formData.client_name.value,
    };
    const appliedJobData = {
        gmail_thread: formData.gmail_thread.value,
        lead_status: formData.lead_status.value
    };
    let res = await updateAppliedJob(query, appliedJobData, false, clientData);
    if(res){
      if(formData.lead_status.value === 'lead'){
        const newLeadData = {
          job_id: location.state.detail.job_id,
          profile_id: location.state.detail.profile_id,
          gmail_thread: formData.gmail_thread.value,
          status:  formData.lead_status.value,
        }
        res = await addLead(newLeadData);
        if(res){
          alert.success('Updated...!!');
        }
        else{
          alert.success('Failed to Add Lead...!!');
        }
      }
      else{
        alert.success('Updated...!!');
      }
      history.goBack();
    }
    else{
      alert.success('Failed to Update...!!');
    }
  }

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
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
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
              <Fragment>
                <IconButton 
                  aria-label='Add'
                  onClick={() => history.goBack()}>
                  <ArrowBackIcon fontSize='large' />
                </IconButton>
                <Typography 
                  className={classes.typography} >
                  Update Lead
                </Typography>
                {formRender()}
              </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  jobStatuses : state.SelectOptions.jobStatus
});

export default connect(mapStateToProps, {updateAppliedJob, addLead})(addTest);
