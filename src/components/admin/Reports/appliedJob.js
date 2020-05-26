/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ReportPage from "./reportPage";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const appliedJobs = ({jobStatuses}) => {
  const [report, setReport] = useState([]);
  const [tableHeader, setTableHeader] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDate = async (startDate, endDate) => {
    setLoading(true);
    startDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    endDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
    setTableHeader(`Report of [${startDate}] - [${endDate}]`);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ startDate, endDate });
    const res = await axios.put(BASE_URL + "/api/appliedJob/jobReport", body, config);
    const temp = jobStatuses.map( status => {
      const result = foundStatusInDbReport(status, res.data.jobReport);
      if(result.length === 0){
        return {
          lead_status: status,
          total: 0
        }
      }
      else{
        return result[0]
      }
    })
    setReport(temp);
    setLoading(false);
  };

  const foundStatusInDbReport = (status, DbReport) => {
    let check = DbReport.filter( record => {
      return record.lead_status === status ? record : null;
    });
    return check;
  }
  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Job Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.lead_status ? ( 
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.lead_status} 
                </TableCell>
                <TableCell component="th" scope="row">
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
        pageHeader={'Jobs Report'} />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  jobStatuses: state.SelectOptions.jobStatus
}
)
export default connect(mapStateToProps)(appliedJobs);
