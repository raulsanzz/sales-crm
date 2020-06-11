/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import ReportPage from './reportPage';
import { getTestReport } from './../../../store/actions/profile';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const test = ({testStatuses, getTestReport, allReportStartDate, allReportEndDate, shouldFetch }) => {
  const [report, setReport] = useState([]);
  const [subTotal, setSubTotal] = useState(''); 
  const [loading, setLoading] = useState(false);
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
    const testReport = await getTestReport(startDate, endDate, testStatuses);
    setReport(testReport.report);
    setSubTotal(testReport.subTotal);
    setLoading(false);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Test Status</TableCell>
              <TableCell align='center'>Percentage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.status ? ( 
                <TableRow key={index}>
                <TableCell>
                  {row.status} 
                </TableCell>
                <TableCell align='center'>
                {row.total > 0 ? `${((row.total/subTotal)*100).toFixed(2)} %` : 0}
                </TableCell>
                <TableCell  align='right'>
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">Total Tests</TableCell>
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
        pageHeader={'Tests Report'} 
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false} />
    </Fragment>
  );
};
const mapStateToProps = state => ({
  testStatuses : state.SelectOptions.allTestStatus
})

export default connect(mapStateToProps, {getTestReport})(errorHandler(test));
