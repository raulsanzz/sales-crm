/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// import { fetchJob } from "../../actions/job";
  
const table = ({ jobs, history, columns, classes, tableHeader, onUpdateHandler, onApplyHandler}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [match, setMatch] = useState("Search");

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
      setFilteredJobs([...jobs]);
    }, [jobs]);


  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  
  const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  
  const handleChange = (event, row, identifier) => {
    let updatedJobs = [...filteredJobs];
    const updatedJob = updatedJobs.filter(job => {
      return job.id === row.id ? {...job} : null
    })
    updatedJob[0][identifier] = event.target.value
    updatedJobs = updatedJobs.map(job => {
      return job.id === row.id ? updatedJob[0] : job
    })
    setFilteredJobs(updatedJobs)
  }
  const searchHandler = e => {
      let lists = filteredJobs;
      if (e.target.value) {
        const newList = lists.filter(item => {
          const list  = tableHeader === "Job Links" ? item.job.companyName.toLowerCase(): item.companyName.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return list.includes(filter);
        });
        if (newList.length > 0) {
          setFilteredJobs(newList);
          setMatch("Match");
        } else {
          setFilteredJobs(jobs);
          setMatch("Does not Match");
        }
      } else {
        setFilteredJobs(jobs);
        setMatch("Search");
      }
    };

  return(
    <div className={classes.root}>
    {
      tableHeader !== "Job List" ? (
      <TextField
        id="search"
        label={match}
        margin="normal"
        type="text"
        className={classes.textField}
        placeholder="Search by Company Name ...."
        onChange={searchHandler}
        />) : null
    }
    <Paper className={classes.paper}> 
    <div className={classes.tableWrapper}>
      <h1 className={classes.jobHeader}>{tableHeader}</h1>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id === "list" ? column.placeholder : column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredJobs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => {
              return (
                <TableRow key={row.id}>
                  {
                    columns.map(column => {
                      switch (column.id){
                        case "companyName":
                          return (<TableCell key={column.id} component="th" scope="row">
                                  { tableHeader === "Job Links" ? row.job.companyName: row.companyName }
                                  </TableCell>)
                        case "client_name":
                        case "status":
                        case "lead_status":
                        case "call_date":
                        case "location":
                        case "job_title":
                        case "createdAt":
                          return (<TableCell key={column.id} align="center">
                                    {row[column.id]}
                                  </TableCell>)
                        case "profile":
                          return (<TableCell key={column.id} align="center">
                                    {row.profile_id ? row.profile.name : '-' }
                                  </TableCell>)
                        case "url":
                          return(<TableCell key={column.id} align="left">
                                  { tableHeader === "Job Links" ? row.job.url: row.url } 
                                </TableCell>)
                        case "call_time":
                          return(<TableCell key={column.id} align="center">
                                    {row.call_time} ({row.time_zone})
                                </TableCell>)
                        case "device":
                          return (<TableCell key={column.id} align="center">
                                    some Device
                                  </TableCell>)
                        case "list":
                          return(<TableCell key={column.placeholder} align="center">
                                  <FormControl className={classes.formControl}>
                                      <InputLabel id={`${column.placeholder}-label`}>{column.label}</InputLabel>
                                      <Select
                                        labelId={`${column.placeholder}-label`}
                                        id={column.placeholder}
                                        value={row[column.placeholder]}
                                        onChange={(event) => {handleChange(event, row, column.placeholder)}}>
                                          { column.listItems.map(item => {
                                              return (
                                              column.placeholder === 'profile_id' ?
                                              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                              :<MenuItem key={item} value={item}>{item}</MenuItem>
                                              )
                                            })
                                          }
                                      </Select>
                                  </FormControl>   
                                </TableCell>)
                        case "jobApplyButton":
                          return(<TableCell  key={column.id} align="center">
                                  <Button 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={() => {onApplyHandler(row)}}>
                                      Apply
                                  </Button>    
                                </TableCell>)
                        case "editButton":
                          return (<TableCell key={column.id} align="center">
                                    <IconButton 
                                      aria-label="edit"
                                      onClick={() =>
                                        history.push({
                                          pathname: column.editPath,
                                          state: { detail: row }
                                        })}>
                                      <EditIcon fontSize="large"/>
                                    </IconButton>
                                  </TableCell>)
                        case "updateButton" :
                          return(<TableCell key={column.id} align="center">
                                  <Button 
                                    variant="contained" 
                                    color="primary"
                                    disabled={row.profile_id === null || row.status === "job"}
                                    onClick={() => {onUpdateHandler(row.id, { profile_id:row.profile_id, status: row.status})}}>
                                      Update
                                  </Button>
                                </TableCell>
                          )
                        default:
                          return(<TableCell component="th" scope="row">
                                    {column.id} "case" not handles
                                  </TableCell>)
                      }
                        
                    })
                  }
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={filteredJobs.length}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        "aria-label": "previous page"
      }}
      nextIconButtonProps={{
        "aria-label": "next page"
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </Paper>
  </div>
  )
}

export default  table