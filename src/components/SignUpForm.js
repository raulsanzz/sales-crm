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
import React, { useState , useEffect} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import { signUp } from "../actions/auth";


const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "50%",
    margin: "0 auto",
    minHeight: "250px",
  },
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  button: {
    marginTop: "5%",
    width: "100%",
  },
});
const orderHandler = (e) => {
  e.preventDefault();
  console.log(e.target.select_designation);
  console.log("JERE iN EE");
  const form_data = {
    employee_number: e.target.registration_number.value,
    name: e.target.name.value,
    // select_designation : e.target.select_designation.value,
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
        placeholder: "Employee Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: "",
    },
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      validation: {
        required: true,
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
        placeholder: "Select Designation",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: false,
      touched: false,
      message: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      message: "Password is too short",
    },
  });
  useEffect(() => {
    checkFormValidity(formData);
  },[])
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
    console.log("elementIdentifier");
    console.log(elementIdentifier);
    const updatedForm = {
      ...formData,
    };
    const updatedElement = {
      ...updatedForm[elementIdentifier],
    };
    updatedElement.value = e.target.value;
    console.log("JERERERER");
    console.log(updatedElement.value);
    const res = validityCheck(updatedElement.value, updatedElement.validation);
    updatedElement.valid = res.isValid;
    updatedElement.message = res.message;
    updatedElement.touched = true;
    updatedForm[elementIdentifier] = updatedElement;
    console.log("updatedForm");
    console.log(updatedForm)
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
      if (!rules.required && value.trim() < 1) {
        isValid = true;
        message = "";
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
                onChange={(event) => {onChangeHandler(event, elem.id)}}
              >
                {elem.config.elementConfig.options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.displayValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <div key={elem.id} className="form-group">
              <label>
                {elem.config.elementConfig.placeholder}
                {elem.config.validation.required ? " (*)" : null}
              </label>
              <input
                id={elem.id}
                className="form-control"
                type={elem.config.elementConfig.type}
                value={elem.config.value}
                onChange={(event) => {onChangeHandler(event, elem.id)}}
              />
            </div>
          )
        )}
        <button  className="btn btn-primary">Submit</button>
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
