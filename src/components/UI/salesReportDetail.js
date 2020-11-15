/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/styles";
import TablePagination from '@material-ui/core/TablePagination';


const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
    display: 'flex',
    position: 'relative',
    fontSize: '40px',
    fontfamily: 'initial',
    justifyContent: 'center',
    marginBottom: '20px',
    backgroundColor: '#285151',
    color: '#fff',
  },
  paper: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
    marginBottom: '20px',
    border:'1px solid rgba(0,0,0,0.125)',

  },
  table: {
    minWidth: 700
  }

}));
export default function salesReportDetail({fetchDetails,appliedDetails}) {
  const classes = useStyles();

  const [pageFetch, setPageFetch] = useState(0);
  const [rowsPerPageFetch, setRowsPerPageFetch] = useState(10);

  const [pageApplied, setPageApplied] = useState(0);
  const [rowsPerPageApplied, setRowsPerPageApplied] = useState(10);

  const handleChangePageFetched = (event, newPage) => {
    setPageFetch(newPage);
  };

  const handleChangeRowsPerPageFetched = event => {
    setRowsPerPageFetch(+event.target.value);
    setPageFetch(0);
  };

  const handleChangePageApplied = (event, newPage) => {
    setPageApplied(newPage);
  };

  const handleChangeRowsPerPageApplied = event => {
    setRowsPerPageApplied(+event.target.value);
    setPageApplied(0);
  };



  return (
    <Paper className={classes.paper} >
    { fetchDetails.length !== 0 ? 
      (<Fragment>
        <h3 className={classes.center}>All Fetched Jobs</h3>
        <Table className={classes.paper} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Job Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {fetchDetails.slice(pageFetch * rowsPerPageFetch, pageFetch * rowsPerPageFetch + rowsPerPageFetch).map((row, index) => {
              return (  
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                {row.job_title ? ( row.job_title ):<p>N/A</p> }
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.createdAt}
                </TableCell>
                <TableCell component='th' scope='row'>
                {row.url ? ( row.url ):<p>N/A</p> }
                </TableCell>
              </TableRow>
           ); } )
          }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component='div'
          count={fetchDetails.length}
          rowsPerPage={rowsPerPageFetch}
          page={pageFetch}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePageFetched}
          onChangeRowsPerPage={handleChangeRowsPerPageFetched} />
      </Fragment>  ) : <p>No Fetched Jobs</p> 
    } 
    

{ appliedDetails.length !== 0 ? 
      (<Fragment>
        <h3 className={classes.center}>All Applied Jobs</h3>
        <Table className={classes.paper} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Applied Profile</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Job Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {appliedDetails.slice(pageApplied * rowsPerPageApplied, pageApplied * rowsPerPageApplied + rowsPerPageApplied).map((row, index) => {
              return (  
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.profile.name ? ( row.profile.name ): <p>N/A</p> }
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.applied_on}
                </TableCell>
                <TableCell component='th' scope='row'>
                {row.job.job_title ? ( row.job.job_title ):<p>N/A</p> }
                </TableCell>
                <TableCell component='th' scope='row'>
                {row.job.url ? ( row.job.url ):<p>N/A</p> }
                </TableCell>
              </TableRow>
             ); } )
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component='div'
          count={appliedDetails.length}
          rowsPerPage={rowsPerPageApplied}
          page={pageApplied}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePageApplied}
          onChangeRowsPerPage={handleChangeRowsPerPageApplied} />
      </Fragment>  ) : <p>No Applied Jobs</p> 
    } 
  </Paper>
  );
}
