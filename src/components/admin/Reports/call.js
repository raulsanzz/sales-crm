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

const call = ({history, interviewStatuses, getInterviewReport, allReportStartDate, allReportEndDate, shouldFetch, closedLeads }) => {
  const [report, setReport] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [subTotal, setSubTotal] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');

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
    const callReport = await getInterviewReport(startD, endD, interviewStatuses);
    setReport(callReport.report);
    console.log('====================================');
    console.log(callReport.report);
    console.log('====================================');
    setSubTotal({subtotal: callReport.subTotal, technicalCallReport: callReport.technicalCallReport, closedToLegals: callReport.closedToLegals});
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
                <TableRow 
                  hover
                  style={{cursor: 'pointer'}}
                  key={index}
                  onClick={ () => history.push({
                    pathname: '/detail',
                    state: {
                      status: row.interview_status,
                      startDate: startDate,
                      endDate: endDate,
                      routeName: 'call'
                    }
                  })}>
                <TableCell>
                  {row.interview_status} 
                </TableCell>
                <TableCell align='center'>
                {row.total > 0 ? `${((row.total/subTotal.subtotal)*100).toFixed(2)} %` : 0}
                </TableCell>
                <TableCell align='right'>
                  {row.total}
                </TableCell>
              </TableRow>
              ): null
            ))}
            {Object.keys(subTotal.technicalCallReport).map( (status, index) => {
                return(
                  <TableRow                   
                    hover
                    style={{cursor: 'pointer'}}
                    key={index}
                    onClick={ () => history.push({
                      pathname: '/detail',
                      state: {
                        dataFromParent: subTotal.technicalCallReport[status],
                        routeName: 'call'
                      }
                    })}>
                    <TableCell> {`Technical Call -> ${status}`}  </TableCell>
                    <TableCell align='center'>
                      {subTotal.technicalCallReport[status].length > 0 ? (
                        `${((subTotal.technicalCallReport[status].length/report[1].total)*100).toFixed(2)} %`
                      ) : 0}
                    </TableCell>
                    <TableCell  align='right'> {subTotal.technicalCallReport[status].length} </TableCell>
                  </TableRow> )
            })}
            <TableRow 
              hover
              style={{cursor: 'pointer'}}
              onClick={ () => history.push({
                pathname: '/detail',
                state: {
                  dataFromParent: subTotal.closedToLegals,
                  routeName: 'call'
                }
              })}> 
              <TableCell>
               {"Closed -> Legals"}   </TableCell>
              <TableCell align='center'>
              {subTotal.closedToLegals.length > 0 ? (
                `${((subTotal.closedToLegals.length/closedLeads)*100).toFixed(2)} %` ) : 0}
              </TableCell>
              <TableCell  align='right'> {subTotal.closedToLegals.length} </TableCell>
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
        pageHeader={'Calls Report'} 
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  interviewStatuses : state.SelectOptions.interviewStatus
})

export default connect(mapStateToProps, {getInterviewReport})(errorHandler(call));
