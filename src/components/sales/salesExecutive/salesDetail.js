/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  center: {
    textAlign: 'center'
  },
  text: {
    padding: '28px',
    fontFamily: 'initial',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function salesDetail() {
  const [data, SetData] = useState([]);
  const [total, setTotal] = useState({
    appliedJobs: 0,
    fetchedJobs: 0
  })

  useEffect(() => {
    axios.get ( BASE_URL + '/api/appliedJob/dailyreport').then(res => {
      SetData(res.data);
    });
  }, []);

  useEffect(() => {
    if(data.length > 0){
      let newTotal

      if(data.length === 1){
        newTotal = {
          appliedJobs: data[0].appliedJobCount > 0 ? data[0].appliedJobCount : '0',
          fetchedJobs: data[0].fetchedJobCount > 0 ? data[0].fetchedJobCount : '0'
        }
      }
      else{
        newTotal = data.reduce( (prev, cur) => {
          return {
            appliedJobs: parseInt(prev.appliedJobCount) + parseInt(cur.appliedJobCount),
            fetchedJobs: parseInt(prev.fetchedJobCount) + parseInt(cur.fetchedJobCount)
          } 
        });
      }
      setTotal({...newTotal});
    }
  }, [data.length]);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      { data.length !== 0 ?
      (<Fragment>
        <h1 className={classes.center}>Daily Applied Job Details</h1>
        <span className={classes.text}>Total Fetched Job:</span>
        <Badge badgeContent={total.fetchedJobs === 0 ? '0' : total.fetchedJobs} color='secondary'></Badge>
        <span className={classes.text}>Total Applied Job:</span>
        <Badge badgeContent={total.appliedJobs === 0 ? '0'  : total.appliedJobs} color='secondary'></Badge>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Fetched Jobs</TableCell>
              <TableCell>Applied Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.fetchedJobCount}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.appliedJobCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment> ) : <p>No Reports</p>}
    </Paper>
  );
}
