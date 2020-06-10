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

const appliedJobs = ({jobStatuses, getApplicationReport, allReportStartDate, allReportEndDate, shouldFetch }) => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState('');
  const [tableHeader, setTableHeader] = useState('');

  useEffect(()=> {
    if(shouldFetch === true){
      handleDate(allReportStartDate, allReportEndDate)
    }
  },[shouldFetch, allReportEndDate, allReportStartDate]);
  
  const handleDate = async (startDate, endDate) => {
    setLoading(true);
    startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    setTableHeader(`Report of [${startDate}] - [${endDate}]`);
    const jobReport = await getApplicationReport(startDate, endDate, jobStatuses);
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
                <TableRow key={index}>
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
        tableHeader={tableHeader}
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
