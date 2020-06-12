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

const leads = ({leadStatuses, getLeadReport, allReportStartDate, allReportEndDate, shouldFetch, setClosedCount }) => {
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
    setTableHeader(`Report of [${startDate}] - [${endDate}]`)
    const leadReport = await getLeadReport(startDate, endDate, leadStatuses);
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
        tableHeader={tableHeader}
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
