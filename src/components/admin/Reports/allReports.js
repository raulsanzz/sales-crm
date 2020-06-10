/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import { PDFExport } from '@progress/kendo-react-pdf';
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

// import ReportPage from "./reportPage";
import axios from './../../../axios-order';
import LeadReport from './lead';
import TestReport from './test'
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
const appliedJobs = ({pdfExportComponent}) => {
  const classes = useStyles();
  const [report, setReport] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [tableHeader, setTableHeader] = useState("");

  const exportPDFWithComponent = () => {
    pdfExportComponent.save();
  };
  const handleDate = async (startDate, endDate) => {
    setLoading(false);
    setStartDate(startDate);
    setEndDate(endDate);
    setLoading(true);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.lead_status ? ( 
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.lead_status} 
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
          </TableBody>
        </Table>
      </Fragment>
    )
  }

  return (
    <PDFExport
      ref={component => (pdfExportComponent = component)}
      paperSize="auto"
      margin={40}
      fileName={'full report'}
      author="cloudTek Inc." >
        <Fragment>
            <Paper className={classes.paper}>
            <Typography className={classes.typography}>
                Full Report
              <PictureAsPdfIcon className={classes.pdfButton} onClick={exportPDFWithComponent}></PictureAsPdfIcon>
              </Typography>
            </Paper>
            <DateRange handleClick={handleDate} classes={classes} /> 
            <AppliedJobReport 
            allReportStartDate={startDate}
            allReportEndDate={endDate}
            shouldFetch={loading} />
            <LeadReport 
            allReportStartDate={startDate}
            allReportEndDate={endDate}
            shouldFetch={loading} />
            <TestReport 
            allReportStartDate={startDate}
            allReportEndDate={endDate}
            shouldFetch={loading} />   
          </Fragment>
    </PDFExport>

  );
};

const mapStateToProps = state => ({
  jobStatuses: state.SelectOptions.jobStatus
}
)
export default connect(mapStateToProps)(errorHandler(appliedJobs));
