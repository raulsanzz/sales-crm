/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { PDFExport } from '@progress/kendo-react-pdf';
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import LeadReport from './lead';
import TestReport from './test';
import CallReport from "./call";
import Meassage from '../../UI/message';
import DateRange from "../../UI/DateRange";
import AppliedJobReport from './appliedJob';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginBottom: "20px",
    border:'1px solid rgba(0,0,0,0.125)',
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "22px auto",
  },
  typography: {
    fontFamily: "initial",
    fontSize: "25px",
    display: "flex",
    justifyContent: "center",
    margin: "10px auto",
    position: 'relative'
  },
  pdfButton:{
    position: 'absolute',
    right: '10px',
    fontSize: 40,
    color:'black',
  }
  
}));
const allReports = ({history, pdfExportComponent}) => {
  const classes = useStyles();
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [closedCount, setClosedCount] = useState(0);

  const exportPDFWithComponent = () => {
    pdfExportComponent.save();
  };

  const handleDate = async (startDate, endDate) => {
    setLoading(false);
    setStartDate(startDate);
    setEndDate(endDate);
    setLoading(true);
  };
  const setClosed = async (total) => {
    setClosedCount(total);
  };
  return (
    <PDFExport
      ref={component => (pdfExportComponent = component)}
      paperSize="auto"
      margin={40}
      fileName={'full report'}
      author="cloudTek Inc." >
        <Paper className={classes.paper}>
        <Typography className={classes.typography}>
            Executive Report
          <PictureAsPdfIcon className={classes.pdfButton} onClick={exportPDFWithComponent}></PictureAsPdfIcon>
          </Typography>
        </Paper>
        <DateRange handleClick={handleDate} classes={classes} />
        { startDate === '' && endDate === '' ? (  
          <Meassage meassage={'Select the date and press the show report button to display reports.'} /> ) : (
          <Grid container spacing={1}>
            <Grid item xs={6}>      
              <AppliedJobReport 
                allReportStartDate={startDate}
                allReportEndDate={endDate}
                shouldFetch={loading} 
                history={history} />
            </Grid>
            <Grid item xs={6}>  
              <TestReport 
                allReportStartDate={startDate}
                allReportEndDate={endDate}
                shouldFetch={loading} 
                history={history} />
            </Grid>
            <Grid item xs={6}>         
              <LeadReport 
                allReportStartDate={startDate}
                allReportEndDate={endDate}
                shouldFetch={loading} 
                setClosedCount={setClosed} 
                history={history} />
            </Grid>
            <Grid item xs={6}>
              <CallReport 
                allReportStartDate={startDate}
                allReportEndDate={endDate}
                shouldFetch={loading} 
                closedLeads={closedCount} 
                history={history} />
            </Grid>
          </Grid>)}      
    </PDFExport>

  );
};

const mapStateToProps = state => ({
  jobStatuses: state.SelectOptions.jobStatus
}
)
export default connect(mapStateToProps)(errorHandler(allReports));
