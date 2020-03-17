/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import compose from "recompose/compose";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { updateLead } from "../../../actions/job";

const styles = theme => ({
  layout: {
    width: "100%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("md")]: {
      width: "65%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%"
    }
  },
  paper: {
    minHeight: "300px",
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: `${theme.spacing.unit}px auto`,
    backgroundColor: theme.palette.secondary.main
  },

  invalidElementError: {
    color: "red"
  },
  button: {
    width: "100%",
    marginTop: "5%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const editLead = ({ classes, children, history, location, updateLead }) => {
  // make this true
  const [fromIsInvalid, setFromIsInvalid] = useState(false);

  const [formData, setFormData] = useState({
    client_name: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Name'
      },
      value: location.state.detail.client_name,
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },
    call_time: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Call Time'
      },
      value: location.state.detail.call_time,
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },
    gmail_thread: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Gmail Thread'
      },
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },  
    call_date: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Call Date'
      },
      value:  location.state.detail.call_date,
      validation: {
          required: false,
      },
      valid: false,
      touched: false
    },  
    time_zone: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Time Zone'
      },
      value:  location.state.detail.time_zone,
      validation: {
          required: false,
      },
      valid: false,
      touched: false
    },  
    location: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Location'
      },
      value:  location.state.detail.location,
      validation: {
        required: false,
      },
      valid: false,
      touched: false
    },  
    device: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Device'
      },
      value: '',
      validation: {
        required: false,
      },
      valid: false,
      touched: false
    },  
    phone_number: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Client Number'
      },
      value:  location.state.detail.phone_number,
      validation: {
        required: false,
      },
      valid: false,
      touched: false
    },  
    call_status: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Call Status'
      },
      value: '',
      validation: {
        required: false,
      },
      valid: false,
      touched: false
    },  
    interview_status: {
      elementType: 'input',
      elementConfig:{
        options: [
        {value: '1st Tech', displayValue: '1st Tech' },
        {value: '2nd Tech', displayValue: '2nd Tech' }
       ],
        placeholder: 'Interview Status'
      },
      value: '',
      validation: {
        required: false,
      },
      valid: false,
      touched: false
    }
});

const validityCheck = (value, rules) => {
  let isValid = true;
  if(rules){
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    };
    if(rules.emailReg){
      isValid = rules.emailReg.test(value.trim()) && isValid;
    };  
    if(rules.urlReg){
      isValid = rules.urlReg.test(value.trim()) && isValid;
    };
    if(!rules.required && value.trim() < 1){
      isValid = true;
    }; 
  };
  return isValid;
}

const onChangeHandler = (e, elementIdentifier) => {
  const updatedForm = {
    ...formData
  }
  const updatedElement = {
    ...updatedForm[elementIdentifier]
  }
  updatedElement.value = e.target.value;
  updatedElement.valid = validityCheck(updatedElement.value, updatedElement.validation);
  updatedElement.touched = true;
  updatedForm[elementIdentifier] = updatedElement;
  
  let formIsValid = true;
  for (let elemIdentifier in updatedForm){
    if(updatedForm[elemIdentifier].touched || updatedForm[elemIdentifier].validation.required){
      formIsValid = updatedForm[elemIdentifier].valid && formIsValid;
    }   
  }
  
  setFormData(updatedForm);
  setFromIsInvalid(!formIsValid);
}

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(formData);
    // updateLead(
    //   id,
    //   profile,
    //   job_title,
    //   salary,
    //   source,
    //   email,
    //   website,
    //   client_name,
    //   phone_number,
    //   call_time,
    //   time_zone,
    //   call_date,
    //   history
    // );
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
      <form onSubmit={onSubmitHandler} autoComplete="off">
          {
            fromElementArray.map( elem => (
              elem.id === "interview_status" ? (
                <FormControl className={classes.formControl} key={elem.id}>
                  <InputLabel id={`${elem.id}-label`}>{elem.config.elementConfig.placeholder}</InputLabel>
                    <Select
                    labelId={`${elem.id}-label`}
                    id={elem.id}>
                    {elem.config.elementConfig.options.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.displayValue}</MenuItem>
                    ))} 
                  </Select>
                </FormControl>
                ): (
                  <div key={elem.id}>
                  <TextField
                    id={elem.id}
                    label={elem.config.elementConfig.placeholder}
                    type={elem.config.elementConfig.type}
                    placeholder={elem.config.elementConfig.placeholder}
                    className={classes.textField}
                    value={elem.config.value}
                    onChange={(event) => {onChangeHandler(event, elem.id)}}
                  />
                  {(elem.config.touched && elem.config.validation.required && elem.config.value.trim().length < 1 ) ? 
                    <p className={classes.invalidElementError}>{elem.config.elementConfig.placeholder} is required </p> : null
                  }
                  {(elem.config.touched && elem.config.validation.urlReg && !elem.config.valid && elem.config.value.trim().length > 0) ? 
                    <p className={classes.invalidElementError}>not a valid {elem.config.elementConfig.placeholder}</p> : null
                  }
                  {(elem.config.touched && elem.config.validation.emailReg && !elem.config.valid && elem.config.value.trim().length > 0) ? 
                    <p className={classes.invalidElementError}>Please enter a valid Email</p> : null
                  }
                  </div>
                )
            ))
          }
          
          <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={fromIsInvalid}
            >
              Update Lead
            </Button>
      </form>
      );
    return form;
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <IconButton aria-label="edit">
            <ArrowBackIcon
              fontSize="large"
              onClick={() => history.goBack()}
            />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            Edit Lead
          </Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};

editLead.propTypes = {
  classes: PropTypes.object.isRequired,
  updateLead: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(null, { updateLead })
)(editLead);
