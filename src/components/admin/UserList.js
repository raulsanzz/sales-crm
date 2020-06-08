/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Meassage from '../UI/message';
import { fetchUser, deleteUser } from '../../store/actions/user';
import errorHandler from './../../hoc/ErrorHandler/ErrorHandler';

const columns = [
  { id: 'registration_number', label: 'Employee Number', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'Designation', label: 'Designation', minWidth: 170, align: 'center' },
  { id: 'role', label: 'Role', minWidth: 170, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 170, align: 'center' },
  { id: 'Action', label: 'Action', minWidth: 170, align: 'center' }
];

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  tableWrapper: {
    maxHeight: 622,
    overflow: 'auto'
  },
  jobHeader: {
    textAlign: 'center',
    fontFamily: 'initial',
    color: 'blue'
  },
  delete: {
    backgroundColor: 'red,'
  }
});

const userList = ({ fetchUser, deleteUser, history }) => {
  const alert = useAlert();
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async() => {
    setLoading(true);
    try {
      const res = await fetchUser();      
      setUsers(res);  
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const userDelete = id => {
    deleteUser(id);
    setCount(count + 1);
    alert.success('User Deleted !');
  };

  return (
    <Fragment>
    { loading ? <Meassage meassage={'loading'} /> : users.length > 0 ? (
      <Paper className={classes.root}>
        <h1 className={classes.jobHeader}>Users List</h1>
        <Table stickyHeader aria-label='sticky table' className={classes.tableWrapper}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover key={row.registration_number}>
                  <TableCell component='th' scope='row'>{row.registration_number}</TableCell>
                  <TableCell align='center'>{row.name}</TableCell>
                  <TableCell align='center'>{row.designation}</TableCell>
                  <TableCell align='center'>{row.role}</TableCell>
                  <TableCell align='center'>{row.createdAt}</TableCell>
                  <TableCell align='center'>
                    <IconButton 
                      aria-label='delete'
                      onClick={() => userDelete(row.registration_number)}>
                      <DeleteIcon fontSize='large' />
                    </IconButton>
                    <IconButton 
                      aria-label='edit'
                      onClick={() =>
                        history.push({
                          pathname: '/edit',
                          state: { detail: row }
                        })}>
                      <EditIcon fontSize='large' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );})
            }
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper> ) : <Meassage meassage={'No User Found'} /> }
    </Fragment>  
  );
};


export default connect(null,
   { fetchUser, deleteUser })(errorHandler(userList));
