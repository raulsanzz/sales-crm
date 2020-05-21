/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import axios from "axios";
import { PDFExport } from '@progress/kendo-react-pdf';
import { makeStyles } from "@material-ui/styles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import Meassage from '../../UI/message';
import SalesDetails from "../../UI/salesDetail";
import DateRange from "../../UI/DateRange";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '20px',
    border:'1px solid rgba(0,0,0,0.125)',
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '22px auto',
  },
  center: {
    textAlign: 'center'
  },
  table: {
    minWidth: 650
  },
  text: {
    padding: '28px',
    fontFamily: 'initial',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  typography: {
    fontFamily: 'initial',
    fontSize: '25px',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    position: 'relative'
  },
  pdfButton:{
    position: 'absolute',
    right: '10px',
    fontSize: 40,
    color:'black',
  }
}));

const salesExecutive = ({pdfExportComponent}) => {
  const [report, setReport] = useState([]);
  const [tableHeader, setTableHeader] = useState('');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  
  const exportPDFWithComponent = () => {
    pdfExportComponent.save();
  };

  const handleDate = async (startDate, endDate) => {
    setLoading(true);
    startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    setTableHeader(`Report of [${startDate}] - [${endDate}]`)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ startDate, endDate });
    const res = await axios.put(BASE_URL + "/api/appliedJob/report", body, config);
    setReport(res.data);
    setLoading(false);
  };
  return (
    <PDFExport
    ref={component => (pdfExportComponent = component)}
    paperSize="auto"
    margin={40}
    fileName={'Sales Executive Report'}
    author="cloudTek Inc." >
    <Fragment>
      <main className={classes.root}>
        <Paper className={classes.paper}>
          <Typography className={classes.typography}>
            Sales Executive Report
            <PictureAsPdfIcon className={classes.pdfButton} onClick={exportPDFWithComponent}></PictureAsPdfIcon>
          </Typography>
        </Paper>
        <DateRange handleClick={handleDate} classes={classes} />
        {tableHeader !== '' ? loading === false ? report.length > 0 ? ( 
          <SalesDetails 
            classes={classes}
            data = {report} 
            tableHeader = {tableHeader}/> ) : (
          <Meassage meassage={'No reports for the selected dates'} /> ) : (
          <Meassage meassage={'loading'} /> ) : (
          <Meassage meassage={'Select the date and press the show report button to display reports'} />)
        }
      </main>
    </Fragment>
    </PDFExport>
  );
};

export default salesExecutive;
