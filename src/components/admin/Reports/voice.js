/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import ReportPage from './reportPage';
import axios from './../../../axios-order';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

const voice = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableHeader, setTableHeader] = useState('');

  const handleDate = async (startDate, endDate) => {
    setLoading(true);
    startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    setTableHeader(`Report of [${startDate}] - [${endDate}]`)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ startDate, endDate });
    const res = await axios.put('/api/note/voiceReport', body, config);
    setReport(res.data.voiceReport);
    setLoading(false);
  };
  
  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}}  aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Voice Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.voice ? ( 
                <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.voice} 
                </TableCell>
                <TableCell component='th' scope='row'>
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
    <Fragment>
      <ReportPage
        report={report}
        tableHeader={tableHeader}
        loading={loading}
        displayTable={displayTable}  
        dateRangeHandler={handleDate}
        pageHeader={'Voice Report'} />
    </Fragment>
  );
};

export default errorHandler(voice);
