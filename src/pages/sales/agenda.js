/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { PDFExport } from '@progress/kendo-react-pdf';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },    

  }));

const agenda = ({ history, location, pdfExportComponent }) => {
  const classes = useStyles();   

let date = new Date();
date = `(${date.getHours()}: ${date.getMinutes()}) ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  const lead = location.state.detail;
  const exportPDFWithComponent = () => {
      pdfExportComponent.save();
  };
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
            {/* job Info and Call Info */}
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
                            <span>{lead.call.contact_via_detail}</span>
                        </li>  
                    </ul>
                </Paper>
            </Grid>
            {/* Your Information */}
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
                            Location:
                            <span>some Location</span>
                        </li>
                        <li className={"list-group-item d-flex justify-content-between align-items-center"}>
                            Email:
                            <span>some Email</span>
                        </li>  
                    </ul>
                </Paper>
            </Grid>

            {/* end of full page (grid)*/}
          </Grid>
    </PDFExport>
  )
};

export default agenda;



{/* <div class="card-header" className={classes.cardHeader1}>
            <TextField
            id="outlined-full-width"
            label="Notes"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined" />
          </div> */}