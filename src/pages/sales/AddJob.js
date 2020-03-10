import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HowToReg from "@material-ui/icons/HowToReg";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob } from "../../actions/job";
import { withRouter } from "react-router-dom";

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
  error2: {
    position: "absolute",
    top: "227px",
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

const AddJob = ({ addJob, history, job, count }) => {
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
          required: true
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
          placeholder: 'URL'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
    // profile: null,
    // salary: '',
  });
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [exist, setExist] = useState("");
  const [existComp, setExistComp] = useState("");
  const [compExist, setCompExist] = useState([]);

  // const { company_name, job_title, url, profile, location, salary } = formData;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const searchCompany = (companyName) => {
    const exist = job.filter(item => {
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
    }
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
      history
      );
    count(      
      formData.company_name.value, 
      formData.job_title.value, 
      formData.url.value, 
      );
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
              </div>
            ))
          }
          <button type="submit" disabled={exist || fromIsInvalid} className="btn btn-primary">Add Job</button>
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
