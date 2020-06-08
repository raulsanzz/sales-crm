/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import HowToReg from '@material-ui/icons/HowToReg';

import errorHandler from './../../hoc/ErrorHandler/ErrorHandler';
import { signUp } from '../../store/actions/user';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: '100%',
    display: 'block',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '65%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
  },
  paper: {
    minHeight: '300px',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: `${theme.spacing()}px auto`,
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
  },
}));

const signupForm = ({ userRoles, signUp, history }) => {
  const classes  = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    registration_number: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Employee Number*',
      },
      value: '',
      validation: {
        required: true,
        onlynum: true,
      },
      valid: false,
      touched: false,
      message: '',
    },
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name*',
      },
      value: '',
      validation: {
        required: true,
        onlyalphabet: true,
      },
      valid: false,
      touched: false,
      message: '',
    },
    select_designation: {
      elementType: 'select',
      elementConfig: {
        options: userRoles,
        placeholder: 'Select Designation*',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: '',
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password*',
      },
      value: '',
      validation: {
        minLength: 5,
        required: true,
      },
      valid: false,
      touched: false,
      message: '',
    },
    reenter_password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Re-enter Password*',
      },
      value: '',
      validation: {
        required: true,
        same_pass: true,
      },
      valid: false,
      touched: false,
      message: '',
    },
  });

  useEffect(() => {
    checkFormValidity(formData);
  }, []);

  const orderHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      registration_number: formData.registration_number.value,
      name: formData.name.value,
      designation: formData.select_designation.value,
      password: formData.password.value,
    };
    const res = await signUp(newUser)
    if(res){
      history.push('/dashboard');
    }
  };
  
  const checkFormValidity = (form) => {
    let formIsValid = true;
    for (let elemIdentifier in form) {
      if (
        form[elemIdentifier].touched ||
        form[elemIdentifier].validation.required
      ) {
        formIsValid = form[elemIdentifier].valid && formIsValid;
      }
    }
    setFromIsInvalid(!formIsValid);
  };

  const onChangeHandler = (e, elementIdentifier) => {
    const updatedForm = {
      ...formData,
    };
    const updatedElement = {
      ...updatedForm[elementIdentifier],
    };
    updatedElement.value = e.target.value;
    const res = validityCheck(updatedElement.value, updatedElement.validation);
    updatedElement.valid = res.isValid;
    updatedElement.message = res.message;
    updatedElement.touched = true;
    updatedForm[elementIdentifier] = updatedElement;
    setFormData(updatedForm);
    checkFormValidity(updatedForm);
  };

  const validityCheck = (value, rules) => {
    let isValid = true;
    let message = '';
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
        if (!isValid) {
          message = 'Required';
        }
      }
      if (rules.same_pass) {
        isValid = value.trim() === formData.password.value && isValid;
        if (!isValid && message === '') {
          message = 'Password must be same';
        }
      }
      if (rules.onlyalphabet) {
        const re = /^[a-zA-Z]+$/;
        isValid = value.trim().match(re) && isValid;
        if (!isValid && message === '') {
          message = 'Only characters allowed';
        }
      }
      if (rules.onlynum) {
        if (!Number(value)) {
          isValid = false;
        }
        if (!isValid && message === '') {
          message = 'Only numbers allowed';
        }
      }

      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
        if (!isValid && message === '') {
          message = 'Password is too short';
        }
      }

      if (!rules.required && value.trim() < 1) {
        isValid = true;
        message = '';
      }
    }
    return { isValid, message };
  };

  const formRender = () => {
    const fromElementArray = [];
    for (let key in formData) {
      fromElementArray.push({
        id: key,
        config: formData[key],
      });
    }

    let form = (
      <form onSubmit={orderHandler}>
        {fromElementArray.map((elem) =>
          elem.config.elementType === 'select' ? (
            <FormControl
              className={(classes.formControl, classes.textField)}
              key={elem.id} >
              <InputLabel id={`${elem.id}-label`}>
                {elem.config.elementConfig.placeholder}
              </InputLabel>
              <Select
                labelId={`${elem.id}-label`}
                id={elem.id}
                value={elem.config.value}
                onChange={(event) => {
                  onChangeHandler(event, elem.id);
                }} >
                {elem.config.elementConfig.options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> ) : (
            <TextField
              key={elem.id}
              pattern='[a-zA-Z]'
              className={classes.textField}
              error={!elem.config.valid && elem.config.touched}
              id={elem.id}
              label={elem.config.elementConfig.placeholder}
              type={elem.config.elementConfig.type}
              value={elem.config.value}
              onChange={(event) => {
                onChangeHandler(event, elem.id);
              }}
              helperText={elem.config.message} />
          )
        )}
        <Button
          variant='contained'
          color='primary'
          type='submit'
          className={classes.button}
          disabled={fromIsInvalid} >
          Submit
        </Button>
      </form>
    );
    return form;
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={1}>
          <Avatar className={classes.avatar}>
            <HowToReg />
          </Avatar>
          <Typography className={classes.typography} >Sign Up</Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};
const mapStateToProps = state => ({
  userRoles: state.SelectOptions.userRole
})

export default connect(mapStateToProps, { signUp })(errorHandler(signupForm));
