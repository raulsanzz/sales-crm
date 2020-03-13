import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HowToReg from "@material-ui/icons/HowToReg";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/job";
import { withRouter } from "react-router-dom";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid 6c697859",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "58%"
  },
  compExist: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid 6c697859",
    boxShadow: theme.shadows[5],

    width: "41%",
    float: "right",
    marginTop: "-481px"
  },
  button: {
    position: "relative"
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  h1: {
    fontSize: "25px",
    fontFamily: "auto"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "31"
  },
  buttonform: {
    marginTop: "5%",
    width: "100%"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: " 0 auto"
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    position: "relative",
    left: "260px"
  },
  error1: {
    position: "absolute",
    right: "777px",
    top: "226px",
    color: "red"
  },
  invalidElementError: {
    color: "red"
  },
  profile: {
    marginTop: "24px"
  },
  header: {
    textAlign: "center",
    fontSize: "20px",
    color: "red"
  }
}));

const AddJob = ({ addJob, history, count }) => {
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [exist, setExist] = useState("");
  const [existComp, setExistComp] = useState("");
  const [compExist, setCompExist] = useState([]);
  const [render, setRender] = useState('true');
  const [jobs, setJobs] = React.useState([]);

  useEffect( () => {
    console.log('====================================');
    console.log("working");
    console.log('====================================');
    axios.get ( BASE_URL + "/api/job/user_daily_job_created").then(res => {
      setJobs(res.data.result);
    });
  }, [render]);

  const [formData, setFormData] = useState({
      job_title: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Job Title'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      location: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Location'
        },
        value: '',
        validation: {
          required: false
        },
        valid: false,
        touched: false
      },
      company_name: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Company Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },  
      url: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Job Link URL'
        },
        value: '',
        validation: {
            required: true,
            urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        },
        valid: false,
        touched: false
      },  
      email: {
        elementType: 'input',
        elementConfig:{
          type: 'email',
          placeholder: 'Company Email'
        },
        value: '',
        validation: {
            required: false,
            emailReg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        valid: false,
        touched: false
      },  
      website: {
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Company Website'
        },
        value: '',
        validation: {
            required: false,
            urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
        },
        valid: false,
        touched: false
      },
  });
  const classes = useStyles();

  const searchCompany = (companyName) => {
    console.log(jobs);
    const exist = jobs.filter(item => {
      return item.companyName.toLowerCase() === companyName.toLowerCase();
    });

    if (exist.length > 0) {
      setExistComp("Company Name Already Exist");
      setCompExist(exist);
      setExist(true);
    } else {
      setCompExist([]);
      setExistComp("");
      setExist(false);
    }
  };
  
  
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
      if(!rules.required){
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
        formIsValid = updatedForm[elemIdentifier].valid && formIsValid;
    }
    
    if(elementIdentifier === 'company_name'){
      searchCompany(e.target.value);
    }
    setFormData(updatedForm);
    setFromIsInvalid(!formIsValid);
  }
  const orderHandler = (e) => {
    e.preventDefault(); 
    addJob(
      formData.company_name.value, 
      formData.job_title.value, 
      formData.url.value, 
      null, //profile
      formData.location.value,
      null,//salary
      formData.email.value,
      formData.website.value 
      );
    count(      
      formData.company_name.value, 
      formData.job_title.value, 
      formData.url.value, 
      );
      setRender(!render);
      // formData.company_name.value
      // formData.job_title.value
      // formData.url.value
      // formData.location.value
      // formData.email.value
      // formData.website.value 
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
      <form onSubmit={orderHandler} noValidate autoComplete="off">
          {
            fromElementArray.map( elem => (
              <div className="form-group">
                <label for={elem.id}>{elem.config.elementConfig.placeholder}</label>
                <input
                  id={elem.id}
                  className="form-control"
                  type={elem.config.elementConfig.type}
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
            ))
          }
          <button disabled={exist || fromIsInvalid} className="btn btn-primary">Add Job</button>
      </form>
      );
    return form;
  }
    return (
      <div>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HowToReg />
        </Avatar>
        <Typography
          className={classes.typography}
          align="center"
          variant="headline"
          >
          Add new Job
        </Typography>
        {formRender()}
      </div>
      {compExist.length > 0 ? (
        <div className={classes.compExist}>
          <h1 className={classes.header}>Job Alredy Exist</h1>
          <ul style={{ listStyleType: "none", textAlign: "left", margin: "0" }}>
            {compExist.map((comp, index) => {
              return (
                <Fragment>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Company Name:</b>
                    <span>{comp.companyName}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>URL:</b>
                    <span>{comp.url}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Job Title:</b>
                    <span>{comp.job_title}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}>Profile:</b>{" "}
                    <span>{comp.profile}</span>
                  </li>
                  <li
                    style={{
                      marginBottom: "5px",
                      fontSize: "15px",
                      display: "inline-block",
                      width: "50%"
                    }}
                  >
                    <b style={{ marginRight: "10px" }}> CreateAt:</b>
                    <span>{comp.createdAt}</span>
                  </li>
                  <hr></hr>
                </Fragment>
              );
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(null, { addJob })(withRouter(AddJob));
