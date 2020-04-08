/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
// import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
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
}));

const editSalesTest = ({ history }) => {
    const classes = useStyles();
    // make this true
  const [fromIsInvalid, setFromIsInvalid] = useState(false);

  const [formData, setFormData] = useState({
    test_type: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        label: 'Type Of Test'
      },
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },
    due_date: {
      elementType: 'input',
      elementConfig:{
        type: 'date',
        label: 'due Date'
      },
      value:'',
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },
    developer_assigned: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        label: 'Developer Assigned'
      },
      value: '',
      validation: {
        required: false
      },
      valid: false,
      touched: false
    },
    notes: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        label: 'Notes'
      },
      value: '',
      validation: {
        required: false
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
                  <div key={elem.id}>
                  <TextField
                    id={elem.id}
                    {...elem.config.elementConfig}
                    className={classes.textField}
                    value={elem.config.value}
                    onChange={(event) => {onChangeHandler(event, elem.id)}}
                  />
                  {(elem.config.touched && elem.config.validation.required && elem.config.value.trim().length < 1 ) ? 
                    <p className={classes.invalidElementError}>{elem.config.elementConfig.placeholder} is required </p> : null
                  }
                  </div>
                )
            )
          }
          
          <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={fromIsInvalid}
            >
              Update
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
            aria-label="edit"  
            onClick={() => history.goBack()}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center" variant="headline">
            Update Job Test Details
          </Typography>
          {formRender()}
        </Paper>
      </main>
    </React.Fragment>
  );
};


export default editSalesTest
