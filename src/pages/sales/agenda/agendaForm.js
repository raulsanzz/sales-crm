/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useAlert } from 'react-alert';

// import { updateLead } from '../../../actions/lead';

const agendaForm = ({ classes}) => {

//   const [agenda, setAgenda] = useState({});
  const [notes, setNotes] = useState('');
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const alert = useAlert();
  const [formData, setFormData] = useState({
    remote: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Ok with remote?'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      message:''
    },
    relocation: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Firm on relocation?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      w2_w9: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'W2/W9?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      work_type: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Type of work?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      Compensation: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Compensation?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      project_type: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Type of project?'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        message:''
      },
      test: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Done Test or not?'
        },
        // value: agenda.client_name ? agenda.client_name : '',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        // valid: agenda.client_name ? true : false,
        // touched: agenda.client_name ? true : false,
        message:''
      },
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
    
    // const res = await updateLead(query, LeadData, callData, clientData);
    // if(res){
    //   alert.success('Lead updated successfully...!!');
    // }
    // else{
    //   alert.success('Lead update failed...!!');
    // }
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
          ))}
          <div style={{marginTop: '20px'}}>
            <TextField
                className={classes.textField}   
                id="Notes"
                label="Notes"
                multiline
                rows={5}
                variant="outlined"
                value={notes}
                onChange={(event) => {setNotes(event.target.value)}}
                />
            </div>
            {/* <TextField
            id="outlined-full-width"
            label="Notes"
            fullWidth
            // margin="normal"
            value={notes}
            onChange={(event) => {setNotes(event.target.value)}}
            multiline
            variant="outlined" 
            InputLabelProps={{
              shrink: true,
            }}/> */}

          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
            disabled={fromIsInvalid}>
            Update Agenda
          </Button>
      </form>
      );
    return form;
  }

  return (
    <div>
        <Typography 
        className={classes.typography} >
        Edit Agenda
        </Typography>
        {formRender()}
    </div>
  );
};

export default agendaForm;
