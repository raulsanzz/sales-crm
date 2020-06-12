/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import ReportPage from './reportPage';
import { getInterviewReport } from '../../../store/actions/profile';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

const call = ({interviewStatuses, getInterviewReport, allReportStartDate, allReportEndDate, shouldFetch }) => {
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
    const callReport = await getInterviewReport(startDate, endDate, interviewStatuses);
    setReport(callReport.report);
    setSubTotal({subtotal: callReport.subTotal, closedAfterTechnical: callReport.closedAfterTechnical});
    setLoading(false);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Call Status</TableCell>
              <TableCell align='center'>Percentage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.interview_status ? ( 
                <TableRow key={index}>
                <TableCell>
                  {row.interview_status} 
                </TableCell>
                <TableCell align='center'>
                {row.total > 0 ? `${((row.total/subTotal.subtotal)*100).toFixed(2)} %` : 0}
                </TableCell>
                <TableCell  align='right'>
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
            <TableRow>
              <TableCell rowSpan={2}/>
              <TableCell align="left">Total Calls</TableCell>
              <TableCell align="right">{subTotal.subtotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'> Closed After Technical Calls 
              </TableCell>
              <TableCell  align='right'>
              {subTotal.closedAfterTechnical > 0 ? (
                `${subTotal.closedAfterTechnical}(${((subTotal.closedAfterTechnical/report[1].total)*100).toFixed(2)} %)`
              ) : 0}</TableCell>
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
        pageHeader={'Calls Report'} 
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  interviewStatuses : state.SelectOptions.interviewStatus
})

export default connect(mapStateToProps, {getInterviewReport})(errorHandler(call));
