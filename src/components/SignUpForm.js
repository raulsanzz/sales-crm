import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import HowToReg from "@material-ui/icons/HowToReg";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import { signUp } from "../actions/auth";

const styles = (theme) => ({
  layout: {
    width: "100%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "65%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%",
    },
  },
  paper: {
    minHeight: "300px",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
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
});
const orderHandler = (e) => {
  e.preventDefault();
  console.log(e.target.select_designation);
  console.log("JERE iN EE");
  const form_data = {
    employee_number: e.target.registration_number.value,
    name: e.target.name.value,
    select_designation: e.target.select_designation.value,
    password: e.target.password.value,
  };
};

const PaperSheet = ({ signUp, classes, history }) => {
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [formData, setFormData] = useState({
    registration_number: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Employee Number * ",
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
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name *",
      },
      value: "",
      validation: {
        required: true,
        onlyalphabet: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
    select_designation: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Sales Voice", displayValue: "Sales Voice" },
          { value: "Sales Executive", displayValue: "Sales Executive" },
          { value: "Sales Manager", displayValue: "Sales Manager" },
          { value: "Asst.Sales Manager", displayValue: "Asst.Sales Manager" },
          { value: "Technical Voice", displayValue: "Technical Voice" },
          { value: "Admin", displayValue: "Admin" },
        ],
        placeholder: "Select Designation *",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Password *",
      },
      value: "",
      validation: {
        minLength: 5,
        required: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
    reenter_password: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Re-enter Password *",
      },
      value: "",
      validation: {
        required: true,
        same_pass: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
  });
  useEffect(() => {
    checkFormValidity(formData);
  }, []);
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
    console.log(elementIdentifier);
    const updatedForm = {
      ...formData,
    };
    const updatedElement = {
      ...updatedForm[elementIdentifier],
    };
    updatedElement.value = e.target.value;
    console.log(updatedElement.value);
    const res = validityCheck(updatedElement.value, updatedElement.validation);
    updatedElement.valid = res.isValid;
    updatedElement.message = res.message;
    updatedElement.touched = true;
    updatedForm[elementIdentifier] = updatedElement;
    console.log(updatedForm);
    setFormData(updatedForm);
    checkFormValidity(updatedForm);
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
      if (rules.same_pass) {
        isValid = value.trim() === formData.password.value && isValid;
        if (!isValid && message === '') {
          message = "Password must be same";
        }
      }
      if (rules.onlyalphabet) {
        const re = /^[a-zA-Z]+$/;
        isValid = value.trim().match(re) && isValid;
        if (!isValid && message === '') {
          message = "Please enter only characters";
        }
      }
      if (rules.onlynum) {
        const re = /^[0-9\b]+$/;
        if (!Number(value)) {
          isValid = false;
        }
        console.log(isValid);
        console.log(isValid);
        if (!isValid && message === '') {
          message = "Employee number must be integer";
        }
      }

      if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
        if (!isValid && message === '') {
          message = "Password is too short";
        }
      }

      if (!rules.required && value.trim() < 1) {
        isValid = true;
        message = "";
      }
    }
    console.log(message);
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
          elem.config.elementType === "select" ? (
            <FormControl
              className={(classes.formControl, classes.textField)}
              key={elem.id}
            >
              <InputLabel id={`${elem.id}-label`}>
                {elem.config.elementConfig.placeholder}
              </InputLabel>
              <Select
                labelId={`${elem.id}-label`}
                id={elem.id}
                value={elem.config.value}
                onChange={(event) => {
                  onChangeHandler(event, elem.id);
                }}
              >
                {elem.config.elementConfig.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.displayValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={elem.id}
              pattern="[a-zA-Z]"
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
          )
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={fromIsInvalid}
        >
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
          <Typography variant="headline">Sign Up</Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  connect(null, { signUp })
)(withRouter(PaperSheet));
