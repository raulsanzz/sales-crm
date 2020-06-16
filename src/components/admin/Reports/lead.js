/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import ReportPage from "./reportPage";
import { getLeadReport } from './../../../store/actions/profile';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const leads = ({history, leadStatuses, getLeadReport, allReportStartDate, allReportEndDate, shouldFetch, setClosedCount }) => {
  const [report, setReport] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [subTotal, setSubTotal] = useState('');
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
    const leadReport = await getLeadReport(startD, endD, leadStatuses);
    if(allReportEndDate && allReportStartDate){
      leadReport.report.forEach(record => {
        if(record.status === 'closed'){
          setClosedCount(record.total);
          return;
        }
      });
    }
    setReport(leadReport.report);
    setSubTotal(leadReport.subTotal);
    setLoading(false);
  };

  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Lead Status</TableCell>
              <TableCell align='center'>Percentage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.status ? ( 
                <TableRow
                hover
                style={{cursor: 'pointer'}}
                key={index}
                onClick={ () => history.push({
                  pathname: '/detail',
                  state: {
                    status: row.status,
                    startDate: startDate,
                    endDate: endDate,
                    routeName: 'lead'
                  }
              })}>
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
              <TableCell colSpan={2} align="right">Total Leads</TableCell>
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
        pageHeader={'Leads Report'}
        shouldShowControls={!allReportEndDate && !allReportStartDate ? true : false} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leadStatuses: state.SelectOptions.leadStatus
});

export default connect(mapStateToProps, {getLeadReport})(errorHandler(leads));
