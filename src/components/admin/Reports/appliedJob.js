/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";

import ReportPage from "./reportPage";
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';
import { getApplicationReport } from './../../../store/actions/profile';

const appliedJobs = ({history, jobStatuses, getApplicationReport, allReportStartDate, allReportEndDate, shouldFetch }) => {
  const [report, setReport] = useState([]);
  const [subTotal, setSubTotal] = useState('');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(()=> {
    if(shouldFetch === true){
      handleDate(allReportStartDate, allReportEndDate)
    }
  },[shouldFetch, allReportEndDate, allReportStartDate]);
  
  const handleDate = async (startD, endD) => {
    setLoading(true);
    startD = `${startD.getFullYear()}-${startD.getMonth() + 1}-${startD.getDate()}`;
    endD = `${endD.getFullYear()}-${endD.getMonth() + 1}-${endD.getDate()}`;
    setStartDate(startD);
    setEndDate(endD);
    const jobReport = await getApplicationReport(startD, endD, jobStatuses);
    setReport(jobReport.report);
    setSubTotal(jobReport.subTotal);
    setLoading(false);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Application Status</TableCell>
              <TableCell align='center'>Percentage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.lead_status ? ( 
                <TableRow 
                  hover
                  style={{cursor: 'pointer'}}
                  key={index}
                  onClick={ () =>history.push({
                    pathname: '/detail',
                    state: {
                      status: row.lead_status,
                      startDate: startDate,
                      endDate: endDate,
                      routeName: 'appliedJob'
                    }
                })}>
                <TableCell>
                  {row.lead_status} 
                </TableCell>
                <TableCell align='center'>
                {row.total > 0 ? `${((row.total/subTotal)*100).toFixed(2)} %` : 0}
                </TableCell>
                <TableCell align='right'>
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">Total Applications</TableCell>
              <TableCell align="right">{subTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <ReportPage
        report={report}
        tableHeader={`Report of [${startDate}] - [${endDate}]`}
        loading={loading}
        displayTable={displayTable} 
        dateRangeHandler={handleDate}
        pageHeader={'Application Report'} 
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false}/>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobStatuses: state.SelectOptions.jobStatus
}
)
export default connect(mapStateToProps, {getApplicationReport})(errorHandler(appliedJobs));
