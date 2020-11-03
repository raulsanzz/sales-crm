/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, Fragment} from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { PDFExport } from '@progress/kendo-react-pdf';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import AgendaForm from './agendaForm';
import AgendaNotes from "./agendaNotes";

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
      note: {
        fontFamily: 'initial',
        fontSize: '25px',
        display:'flex',
        justifyContent: 'left'  
      }
  }));

const agenda = ({ callStatuses, location, pdfExportComponent }) => {
    const classes = useStyles();   
    const [notes, setNotes] = useState([]);
    const [callStatus, setCallStatus] = useState('');
    const lead = location.state.detail;

    let date = new Date();
    date = `(${date.getHours()}: ${date.getMinutes()}) ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    const exportPDFWithComponent = () => {
      pdfExportComponent.save();
    };

    const getClientInfo = () => {
        return(
            <Grid item xs={6}>
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

    const getYourInfo = () => {
        return(
            <Grid item xs={6}>
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
    const tConvert = (time) => { 
        time = time.split(":")
       if (time.length > 1) { 
            time[3] = time[0] < 12 ? ' AM' : ' PM';
            time[0] = (time[0] % 12 + ':' );
       }
        return time.join('');
    }
    const getTestInfo = () => {
        return(
            <Fragment>
            {lead.test !== null ? 
            (<Grid item xs={12}>
                <Paper className={classes.paper}>
                    <ul className={"list-group"}>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            <InfoIcon style={{ fontSize: 40, color:'black' }}></InfoIcon>
                            <span>Test Information</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Type of test:
                            <span>{lead.test.test_type}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Test Status:
                            <span>{lead.test.status}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Due Date:
                            <span>{lead.test.due_date}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Due Time:
                            <span>{tConvert(lead.test.due_time)}</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Test Gmail Thread:
                            <a 
                            href={lead.test.gmail_thread}
                            target='_blank' 
                            rel="noopener noreferrer"> Gmail Thread </a>         
                        </li>
                        
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Notes:
                            <span>{lead.test.note}</span>
                        </li>  
                    </ul>
                </Paper>
            </Grid>) : null
            }
            </Fragment>
        )
    }
    const getCallInfo = () => {
        const callDate = new Date(lead.call.call_date);
        const todayDate = new Date();
        callDate.setDate(callDate.getDate() + 1);
        return(
            <Grid  item xs={4}>
            <Paper className={classes.paper}>
                <ul className={"list-group"}>
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    <InfoIcon style={{ fontSize: 40, color:'black' }}></InfoIcon>
                    <span>Job & Call Information</span>
                </li>
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    Lead Status:
                    <span>{lead.status}</span>
                </li>
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    Job Title:
                    <span>{lead.job.job_title}</span>
                </li>
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    Contract Status:
                    <span>{lead.contract_status ? lead.contract_status : 'None'}</span>
                </li>
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    Call Time:
                    <span>{tConvert(lead.call.call_time)}</span>
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
                <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    Job Link:
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
                    Gmail Thread:
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
                    Client Website:
                    {
                        lead.job.client.website ? (
                        <a 
                        href={lead.job.client.website}
                        target='_blank' 
                        rel="noopener noreferrer"> Client Company Website </a>         
                        ): <p> Not Found</p>
                    }
                </li>
                {location.state.editable ? callDate.getTime() >= todayDate.getTime() ?
                (<li className={"list-group-item d-flex justify-content-between align-items-center"}>
                    <FormControl className={classes.formControl, classes.textField}>
                        <InputLabel id={'call-status-label'}>Call Status</InputLabel>
                        <Select
                        labelId={'call-status-label'}
                        id={'call-status'}
                        value={callStatus}
                        onChange={(event) => {setCallStatus(event.target.value)}}>
                        {callStatuses.map( status => <MenuItem value={status}>{status}</MenuItem> )}
                        </Select>
                    </FormControl>
                </li>): null : null}
                </ul>
            </Paper>
            </Grid>
        )
    }

    const updateNotes = (notes) => {
        setNotes(notes)
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
            {getClientInfo()}
            {getYourInfo()}
            {getCallInfo()}
            {/* form */}
            <Grid item xs={8}>
                <Paper className={classes.paper} style={{border:'1px solid rgba(0,0,0,0.125)'}}>
                    <AgendaForm 
                        classes={classes} 
                        call_id={lead.call.id}
                        callStatus={callStatus} 
                        interviewStatus={lead.interview_status}
                        voice={lead.voice}
                        editable={location.state.editable}
                        updateNotes={updateNotes}/>
                </Paper>
            </Grid>
            {getTestInfo()}
            {notes.length > 0 ? (
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" color="textSecondary" component="h2" className={classes.note}>
                            Previous Notes:
                        </Typography>
                        <AgendaNotes
                        notes={notes}/>
                    </Paper>
                </Grid>
                ): null}
            {/* end of full page (grid)*/}
          </Grid>
    </PDFExport>
  )
};
const mapStateToProps = state => ({
    callStatuses : state.SelectOptions.callStatus
});
export default connect(mapStateToProps)(agenda);