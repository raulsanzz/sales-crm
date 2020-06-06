/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import Paper from "@material-ui/core/Paper";
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import Meassage from './../../UI/message';
import axios from './../../../axios-order';
import errorHandler from './../../../hoc/ErrorHandler/ErrorHandler';

  
const useStyles = makeStyles(theme => ({
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    marginBottom: "20px",
    border:'1px solid rgba(0,0,0,0.125)',
  },
}));

const voicePerPerson = ({location, leadStatuses}) => {
  const voiceDetail = {...location.state}
  const classes = useStyles();
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    fetchLeads();
  }, [])
  const fetchLeads = async() => {
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ ids: voiceDetail.agendas });
      let res = await axios.put('/api/lead/voiceleads', body, config);
      const temp = leadStatuses.map( status => {
        const result = foundStatusInDbReport(status, res.data.leads);
          if(result.length === 0){
            return {
              status: status,
              total: 0
            }
          }
          else{
            return result[0]
          }
      })
      setReport(temp);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
    setLoading(false);
  }
  const foundStatusInDbReport = (status, DbReport) => {
    let check = DbReport.filter( record => {
      return record.status === status ? record : null;
    });
    return check;
  }
  const displayTable = () => {
    return(
      <Fragment>
        <Table style={{minWidth: '650'}} aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell align="center">Report of: {voiceDetail.voice}</TableCell>
              <TableCell align="right">Total Calls Taken: {voiceDetail.total} </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Lead Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((row, index) => (
              row.status ? ( 
                <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.status} 
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
        {loading ? <Meassage meassage={'loading'} /> : (
          <Paper className={classes.paper}> { displayTable() } </Paper> 
        )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leadStatuses: state.SelectOptions.leadStatus
});
export default connect(mapStateToProps)(errorHandler(voicePerPerson));
