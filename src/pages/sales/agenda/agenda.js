/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { PDFExport } from '@progress/kendo-react-pdf';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AgendaForm from './agendaForm';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
      },
      paper: {
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        textAlign: 'center',
      },
      avatar: {
        margin: `${theme.spacing()}px auto`,
        backgroundColor: theme.palette.secondary.main
      },
      button: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        margin: '10px auto'
      },
      textField:{
        width: '100%',
      },
      typography: {
        fontFamily: 'initial',
        fontSize: '25px',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto' 
      },
  }));

const agenda = ({ history, location, pdfExportComponent }) => {
    const classes = useStyles();   
    const [callStatus, setCallStatus] = useState('');

    let date = new Date();
    date = `(${date.getHours()}: ${date.getMinutes()}) ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    const lead = location.state.detail;
    const exportPDFWithComponent = () => {
      pdfExportComponent.save();
    };

    const getClientInfo = () => {
        return(
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <ul className={"list-group"}>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            <PersonIcon style={{ fontSize: 40, color:'black' }}></PersonIcon>
                            <span>Client's Information</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Company Name:
                            <span>{lead.job.client.company_name}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Client Name:
                            <span>{lead.job.client.client_name}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Client Location:
                            <span>{lead.job.client.location}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Client Time Zone:
                            <span>{lead.job.client.time_zone}</span>
                        </li>  
                    </ul>
                </Paper>
            </Grid>
        )
    }

    const getCallInfo = () => {
        return(
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <ul className={"list-group"}>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        <InfoIcon style={{ fontSize: 40, color:'black' }}></InfoIcon>
                        <span>Job & call Information</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Job Title:
                        <span>{lead.job.job_title}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Call Time:
                        <span>{lead.call.call_time}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Device:
                        <span>{lead.call.contact_via}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Decive Info:
                        {
                            lead.call.contact_via === 'Phone' ? <span>{lead.call.contact_via_detail}</span> : (
                                <a 
                                href={lead.call.contact_via_detail}
                                target='_blank' 
                                rel="noopener noreferrer"> {lead.call.contact_via} Link </a>         
                            )
                        }
                        
                    </li>  
                </ul>
            </Paper>
        </Grid>   
        )
    }

    const getYourInfo = () => {
        return(
            <Grid item xs={4}>
            <Paper className={classes.paper}>
                <ul className={"list-group"}>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        <PersonIcon style={{ fontSize: 40, color:'black' }}></PersonIcon>
                        <span>Your Information</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Profile:
                        <span>{lead.profile.name}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Voice:
                        <span>{lead.voice}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Interview Status:
                        <span>{lead.interview_status}</span>
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        Call Stauts:
                        <span>{lead.call.call_status}</span>
                    </li>  
                </ul>
            </Paper>
        </Grid>   
        )
    }

    const getLinks = () => {
        return(
            <Grid  item xs={4}>
            <Paper className={classes.paper}>
                <ul className={"list-group"}>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        {
                           lead.job.url ? (
                            <a 
                                href={lead.job.url} 
                                target='_blank' 
                                rel="noopener noreferrer"> job Link Url </a>         
                           ): <p> No Job Url Found</p>
                        }
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        {  
                           lead.gmail_thread ? (
                            <a 
                            href={lead.gmail_thread}
                            target='_blank' 
                            rel="noopener noreferrer"> Gmail Thread </a>                  
                           ): <p> No Gmail Thread Found</p>
                        }
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        {
                            lead.job.client.website ? (
                            <a 
                            href={lead.job.client.website}
                            target='_blank' 
                            rel="noopener noreferrer"> Client Company Website </a>         
                           ): <p> No Client Website Found</p>
                        }
                    </li>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        <FormControl className={classes.formControl, classes.textField}>
                            <InputLabel id={'call-status-label'}>Call Status</InputLabel>
                            <Select
                            labelId={'call-status-label'}
                            id={'call-status'}
                            value={callStatus}
                            onChange={(event) => {setCallStatus(event.target.value)}}>
                            <MenuItem value='done'>done</MenuItem>
                            <MenuItem value='not taken'>Not Taken</MenuItem>
                            <MenuItem value='rescheduled by client'>rescheduled by client</MenuItem>
                        </Select>
                        </FormControl>
                    </li>
                </ul>
            </Paper>
            </Grid>
        )
    }

  return (
    <PDFExport
        ref={component => (pdfExportComponent = component)}
        paperSize="auto"
        margin={40}
        fileName={`Agenda-${lead.job.client.client_name}-${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`}
        author="cloudTek Inc." >
        <Grid container spacing={3}>
            {/* time and PDF Button row */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                <ul className={"list-group"}>
                    <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                        <p>{date}</p>
                        <span>
                        <PictureAsPdfIcon style={{ fontSize: 40, color:'black' }} onClick={exportPDFWithComponent}></PictureAsPdfIcon>
                    </span>
                    </li>
                </ul>
            </Paper>
            </Grid>
            {/* client Information */}
            {getClientInfo()}
            {/* job Info and Call Info */}
            {getCallInfo()}
            {/* Your Information */}
            {getYourInfo()}
            {/* Important links */}
            {getLinks()}
            {/* form */}
            <Grid item xs={8}>
                <Paper className={classes.paper}>
                    <AgendaForm 
                        classes={classes} 
                        call_id={lead.call.id}
                        callStatus={callStatus} 
                        voice={lead.voice}/>
                </Paper>
            </Grid>
            {/* end of full page (grid)*/}
          </Grid>
    </PDFExport>
  )
};

export default agenda;