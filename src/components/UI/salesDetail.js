/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

export default function salesDetail({classes, tableHeader, data}) {
  const [total, setTotal] = useState({
    appliedJobCount: 0,
    fetchedJobCount: 0
  })

  useEffect(() => {
    console.log("WOKRINGINGIGN")
    if(data.length > 0){
      let newTotal

      if(data.length === 1){
        newTotal = {
          appliedJobCount: data[0].appliedJobCount > 0 ? data[0].appliedJobCount : '0',
          fetchedJobCount: data[0].fetchedJobCount > 0 ? data[0].fetchedJobCount : '0'
        }
      }
      else{
        newTotal = data.reduce( (prev, cur) => {
          return {
            appliedJobCount:  Number(prev.appliedJobCount) + Number(cur.appliedJobCount),
            fetchedJobCount: Number(prev.fetchedJobCount) + Number(cur.fetchedJobCount)
          } 
        });
      }
      setTotal({...newTotal});
    }
  }, [data.length]);

  return (
    <Paper className={classes.root}>
      { data.length !== 0 ?
      (<Fragment>
        <h1 className={classes.center}>{tableHeader}</h1>
        <span className={classes.text}>Total Fetched Job:</span>
        <Badge badgeContent={total.fetchedJobCount === 0 ? '0' : total.fetchedJobCount} color='secondary'></Badge>
        <span className={classes.text}>Total Applied Job:</span>
        <Badge badgeContent={total.appliedJobCount === 0 ? '0'  : total.appliedJobCount} color='secondary'></Badge>
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
