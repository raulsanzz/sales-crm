import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from "@material-ui/icons/LockOutlined";

import { logIn } from "../../store/actions/auth";
import errorHandler from './../../hoc/ErrorHandler/ErrorHandler';

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
    backgroundColor: theme.palette.secondary.main,
  },

  invalidElementError: {
    color: "red",
  },
  button: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "10px auto",
  },
  textField: {
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
  },
}));

const SignIn = ({ logIn}) => {
  const classes  = useStyles();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    registration_number: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Employee Number*",
      },
      value: "",
      validation: {
        required: true,
        onlynum: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password*",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: "",
    }  
  });  
    
  useEffect(() => {
    checkFormValidity(formData);
  }, []);  
    
  const formRender = () => {
    const fromElementArray = [];
    for (let key in formData) {
      fromElementArray.push({
        id: key,
        config: formData[key],
      });
    }
    let form = (
      <form onSubmit={submitHandler}>
        {fromElementArray.map((elem) =>
          <TextField
            key={elem.id}
            className={classes.textField}
            error={!elem.config.valid && elem.config.touched}
            id={elem.id}
            label={elem.config.elementConfig.placeholder}
            type={elem.config.elementConfig.type}
            value={elem.config.value}
            onChange={(event) => {
              onChangeHandler(event, elem.id);
            }}
            helperText={elem.config.message}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={fromIsInvalid}>
          Submit
        </Button>
      </form>
    );
    return form;
  };

  const validityCheck = (value, rules) => {
    let isValid = true;
    let message = "";
    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== "" && isValid;
        if (!isValid) {
          message = "required";
        }
      }
      if (rules.onlynum) {
        if (!Number(value)) {
          isValid = false
        }
        if (!isValid && message === '') {
          message = "Employee number must be integer";
        }
      }

      if (!rules.required && value.trim() < 1) {
        isValid = true;
        message = "";
      }
    }
    return { isValid, message };
  };

  const checkFormValidity = (form) => {
    let formIsValid = true;
    for (let elemIdentifier in form) {
      if (form[elemIdentifier].touched || form[elemIdentifier].validation.required) {
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

  const submitHandler = e => {
    e.preventDefault();
    const newUser = {
      registration_number: formData.registration_number.value,
      password: formData.password.value,
    };
    logIn(newUser);
  };

  return (
    <Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography>Sign in</Typography>
          {formRender()}
        </Paper>
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.authReducer.isAuth
});

export default connect(mapStateToProps, { logIn })(errorHandler(SignIn));
