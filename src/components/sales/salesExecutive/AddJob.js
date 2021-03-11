import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import HowToReg from '@material-ui/icons/HowToReg';

import Meassage from './../../UI/message';
import { fetchJob, addJob } from '../../../store/actions/job';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const useStyles = makeStyles(theme => ({
  layout: {
    width: '100%',
    display: 'block',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      width: '80%'
    },
    [theme.breakpoints.up('md')]: {
      width: '65%'
    },
    [theme.breakpoints.up('lg')]: {
      width: '45%'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  textField:{
    width: '100%',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: ' 0 auto'
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto' 
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto'
  },
  header: {
    textAlign: 'center',
    fontSize: '20px',
    color: 'red'
  }, 
  compExist: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    marginBottom: theme.spacing(8),
    width: '20%',
    position: 'absolute',
    right: '10px',
    top: '30%'
  },
  ifCompExist:{
    marginBottom: '5px',
    fontSize: '15px',
    display: 'inline-block',
    width: '100%'
  }
}));

const AddJob = ({ fetchJob, addJob, jobs, jobLoading}) => {
  const alert = useAlert();
  const [fromIsInvalid, setFromIsInvalid] = useState(true);
  const [compExist, setCompExist] = useState(null);

  useEffect( () => {
    fetchJob();
    initializeForm();
  }, [jobs.length]);

  const [formData, setFormData] = useState({
    company_name: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Company Name*'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
      message:''
    },  
    job_title: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Job Title*'
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
      touched: false,
      message:''
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
        urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;%=.]+$/
      },
      valid: false,
      touched: false,
      message:''
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
          emailReg: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      },
      valid: false,
      touched: false,
      message:''
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
      touched: false,
      message:''
    },  
    url: {
      elementType: 'input',
      elementConfig:{
        type: 'text',
        placeholder: 'Job Link URL*'
      },
      value: '',
      validation: {
          required: true,
          urlReg:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;%=.]+$/
      },
      valid: false,
      touched: false,
      message:''
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
  const searchCompany = (company_name) => {
    let company = company_name.toLowerCase()
    const exist = jobs.filter(item => item.client.company_name.includes(company)
    );
    if (exist.length > 0) {
      setCompExist(exist);
      return true;
    } else {
      setCompExist(null);
      return false;
    }
  };
  
  
  const validityCheck = (value, rules) => {
    let isValid = true;
    let message = '';
    if(rules){
      if(rules.required){
        isValid = value.trim() !== '' && isValid;
        if(!isValid){
          message = 'Required';
        }
      };
      if(rules.emailReg){
        isValid = rules.emailReg.test(value.trim()) && isValid;
        if(!isValid && message === ''){
          message = 'Invalid Email';
        }
      };  
      if(rules.urlReg){
        isValid = rules.urlReg.test(value.trim()) && isValid;
        if(!isValid && message === ''){
          message = 'Invalid url';
        }
      };
      if(!rules.required && value.trim() < 1){
        isValid = true;
        message = '';
      }; 
    };
    return  {isValid, message};
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
    if(elementIdentifier === 'company_name'){
      const exist =  searchCompany(e.target.value);
      if(exist){
        updatedElement.valid = false;
        updatedElement.message = 'Already Exists';
      }
    }
    checkFormValidity(updatedForm);
    setFormData(updatedForm);
  }

  const orderHandler = async(e) => {
    e.preventDefault();
    const jobData = {
      job_title: formData.job_title.value, 
      url: formData.url.value
    } 
    const clientData = {
      company_name: formData.company_name.value, 
      location: formData.location.value,
      website: formData.website.value,
      email: formData.email.value,
      phone_number: formData.number.value,

    }
    const res = await addJob(jobData, clientData);
    if(res){
      alert.success('Job Added successfully...!!');
    }
    else{
      alert.success('Failed to add job...!!');
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
      <form onSubmit={orderHandler} noValidate autoComplete='off'>
          {
            fromElementArray.map( elem => (
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
            ))
          }
          <Button 
            variant='contained'
            color='primary'
            type='submit'
            className={classes.button}
            disabled={fromIsInvalid}>
            Add Job
          </Button>
      </form>
      );
    return form;
  }
    return (
      <Fragment>
        <main className={classes.layout}>
        {/* form to add job */}
        {jobLoading === true ? <Meassage meassage={'loading'} /> :(
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HowToReg />
            </Avatar>
            <Typography
              className={classes.typography}
              align='center'>
              Add New Job
            </Typography>
            {formRender()}
          </Paper>)
        }
         {/* display card if company already exists */}
         {compExist && (
          <div className={classes.compExist} style={{overflowY: 'scroll', overflowX: 'hidden', height: '40%'}}>
            <h1 className={classes.header}>Similar Companies</h1>
            <ul style={{ listStyleType: 'none', textAlign: 'left', margin: '0' }}>
              { /*maping array*/ }
              { compExist.map((item,i)=>(  
                <div key={i} style={{borderBottom: '1px solid black', marginRight: '40px', padding: '10px'}}>
                  <li  className={classes.ifCompExist}>
                    <b style={{ marginRight: '8px' }}>Company Name:</b>
                    <span>{item.client.company_name}</span>
                  </li>
                  <li className={classes.ifCompExist}>
                    <b style={{ marginRight: '8px' }}>URL:</b>
                    <span>
                      <a 
                        href={item.url} 
                        target='_blank' 
                        rel="noopener noreferrer">  
                        job link Url 
                      </a>
                    </span>
                  </li>
                  <li className={classes.ifCompExist}>
                    <b style={{ marginRight: '8px' }}>Job Title:</b>
                    <span>{item.job_title}</span>
                  </li>
                  <li className={classes.ifCompExist}>
                    <b style={{ marginRight: '8px' }}> Created at:</b>
                    <span>{item.createdAt}</span>
                  </li>
                </div>
                )
              )}
            </ul>
          </div>) 
        }
      </main>
    </Fragment>);
};

const mapStateToProps = state => ({
  jobs: state.JobReducer.job,
  jobLoading: state.JobReducer.loading
});

export default connect(mapStateToProps, 
  { addJob, fetchJob })(errorHandler(withRouter(AddJob)));
