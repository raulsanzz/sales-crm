/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment } from "react";
import { PDFExport } from '@progress/kendo-react-pdf';
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import Meassage from '../../UI/message';
import DateRange from "../../UI/DateRange";

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
  center: {
    textAlign: "center",
  },
  text: {
    padding: "28px",
    fontFamily: "initial",
    fontSize: "18px",
    fontWeight: "bold",
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

const reportTable = ({report, tableHeader, loading, displayTable, dateRangeHandler, pageHeader, pdfExportComponent, shouldShowControls}) => {
  const classes = useStyles();
  
  const exportPDFWithComponent = () => {
    pdfExportComponent.save();
  };
  return (
    <PDFExport
      ref={component => (pdfExportComponent = component)}
      paperSize="auto"
      margin={40}
      fileName={`${pageHeader}`}
      author="cloudTek Inc." >
    <Fragment>
      <main className={classes.root}>
        {shouldShowControls ? (
          <Fragment>
            <Paper className={classes.paper}>
            <Typography className={classes.typography}>
                {pageHeader}
              <PictureAsPdfIcon className={classes.pdfButton} onClick={exportPDFWithComponent}></PictureAsPdfIcon>
              </Typography>
            </Paper>
            <DateRange handleClick={dateRangeHandler} classes={classes} />    
          </Fragment> ): (
          <Paper className={classes.paper}>
            <Typography className={classes.typography}>
              {pageHeader}
            </Typography>
          </Paper> )}
        {tableHeader !== "" ? loading === false ? report.length > 0 ? ( 
          <Paper className={classes.paper}> { displayTable() } </Paper> ): (
          <Meassage meassage={'No reports for the selected dates'} /> ) : (
          <Meassage meassage={'loading'} /> ) : (
          <Meassage meassage={'Select the date and press the show report button to display reports.'} /> )
        }      
      </main>
    </Fragment>
    </PDFExport>
  );
};

export default reportTable;
