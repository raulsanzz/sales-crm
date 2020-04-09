import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HowToReg from "@material-ui/icons/HowToReg";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/job";
import { withRouter } from "react-router-dom";
import { useAlert } from "react-alert";

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
  },
  ifCompExist:{
    marginBottom: "5px",
    fontSize: "15px",
    display: "inline-block",
    width: "50%"
  }
}));

const AddJob = ({ addJob, jobs}) => {
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [exist, setExist] = useState("");
  const [compExist, setCompExist] = useState(null);
  const alert = useAlert();

  useEffect( () => {
    initializeForm();
  }, [jobs.length]);

  const [formData, setFormData] = useState({
    companyName: {
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
    number: {
      elementType: 'text',
      elementConfig:{
        type: 'Number',
        placeholder: 'Company Phone Number'
      },
      value: '',
      validation: {
          required: false,
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
  });
  const classes = useStyles();

  const initializeForm = () => {
    const updatedForm = {
      ...formData
    };

    for(let ele in updatedForm){
      updatedForm[ele] = {
        ...updatedForm[ele],
        value: '',
        touched: false,
        valid: false
      }
    };
    setFormData(updatedForm);
    setFromIsInvalid(true);
  }
  const searchCompany = (companyName) => {
    const exist = jobs.filter(item => {
      return item.companyName.toLowerCase() === companyName.toLowerCase();
    });
    if (exist.length > 0) {
      setCompExist(exist[0]);
      setExist(true);
    } else {
      setCompExist(null);
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
    
    if(elementIdentifier === 'companyName'){
      searchCompany(e.target.value);
    }
    setFormData(updatedForm);
    setFromIsInvalid(!formIsValid);
  }
  const orderHandler = async(e) => {
    e.preventDefault();
    const jobData = {
      job_title: formData.job_title.value, 
      url: formData.url.value
    } 
    const clientData = {
      company_name: formData.companyName.value, 
      location: formData.location.value,
      website: formData.website.value,
      email: formData.email.value,
      phone_number: formData.number.value,

    }
    const res = await addJob(jobData,clientData);
    if(res){
      alert.success("Job Added successfully...!!");
    }
    else{
      alert.success("Failed to add job...!!");
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
      <form onSubmit={orderHandler} noValidate autoComplete="off">
          {
            fromElementArray.map( elem => (
              <div key={elem.id} className="form-group">
                <label>
                  {elem.config.elementConfig.placeholder}
                  {elem.config.validation.required ? " (*)": null}</label>
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
      <Fragment>
        {/* form to add job */}
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

        {/* display card if company already exists */}
        {compExist !== null ? (
          <div className={classes.compExist}>
            <h1 className={classes.header}>Job Alredy Exist</h1>
            <ul style={{ listStyleType: "none", textAlign: "left", margin: "0" }}>
              <li className={classes.ifCompExist}>
                <b style={{ marginRight: "10px" }}>Company Name:</b>
                <span>{compExist.companyName}</span>
              </li>
              <li className={classes.ifCompExist}>
                <b style={{ marginRight: "10px" }}>URL:</b>
                <span>{compExist.url}</span>
              </li>
              <li className={classes.ifCompExist}>
                <b style={{ marginRight: "10px" }}>Job Title:</b>
                <span>{compExist.job_title}</span>
              </li>
              <li className={classes.ifCompExist}>
                <b style={{ marginRight: "10px" }}>Profile:</b>
                <span>{ compExist.profile_id !== null ? compExist.profile.name : "None" }</span>
              </li>
              <li className={classes.ifCompExist}>
                <b style={{ marginRight: "10px" }}> Created at:</b>
                <span>{compExist.createdAt}</span>
              </li>
            </ul>
          </div>) : null 
        }
    </Fragment>);
};

const mapStateToProps = state => ({
  jobs: state.JobReducer.job
});

AddJob.propTypes = {
  addJob: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { addJob })(withRouter(AddJob));
