/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

  
const table = ({ jobs, history, columns, classes, tableHeader, onUpdateHandler, onApplyHandler, rowClickListener}) => {
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
      if(row.id){
        return job.id === row.id ? {...job} : null}
      else{
      return job.job_id === row.job_id ? {...job} : null}
    })
    updatedJob[0][identifier] = event.target.value;
    updatedJobs = updatedJobs.map(job => {
      if(row.id){
        return job.id === row.id ? updatedJob[0] : job}
      else{
      return job.job_id === row.job_id ? updatedJob[0] : job}
    })
    setFilteredJobs(updatedJobs);
  }

  const searchHandler = e => {
      let lists = filteredJobs;
      if (e.target.value) {
        const newList = lists.filter(item => {
          const list  = item.job.client.company_name.toLowerCase();
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
      <TextField
        id="search"
        label={match}
        margin="normal"
        type="text"
        className={classes.textField}
        onChange={searchHandler} />
    <Paper className={classes.paper}> 
    <div className={classes.tableWrapper}>
      <h1 className={classes.jobHeader}>{tableHeader}</h1>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align={column.align}
                style={{ minWidth: column.minWidth }}>
                {column.id === "list" ? column.placeholder : column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredJobs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
              <TableRow 
                key={index}
                onClick={rowClickListener ? (() =>
                  history.push({
                    pathname: "/agenda",
                    state: { detail: row,
                      editable: tableHeader === 'Scheduled Calls' ? true : false }
                  })): null}>
                  {
                    columns.map(column => {
                      switch (column.id){
                        case "company_name":
                          return (<TableCell key={column.id} component="th" scope="row">
                                  {row.job.client.company_name}                                  
                                  </TableCell>)
                        //lead cases
                        case "status":
                        case "voice":
                        case "interview_status":
                        case "lead_status":
                        case "totalCalls":
                        case "createdAt":
                          return (<TableCell key={column.id} align={column.align}>
                                    {row[column.id]}
                                  </TableCell>)
                        //job cases
                        case "job_title":
                          return (<TableCell key={column.id} align={column.align}>
                                  {row.job[column.id] }
                        </TableCell>)
                        //client cases
                        case "client_name":
                        case "location":
                          return (<TableCell key={column.id} align={column.align}>
                                  {row.job.client[column.id] }
                        </TableCell>)
                        case "profile":
                          return (<TableCell key={column.id} align={column.align}>
                                    {row.profile_id ? row.profile.name : '-' }
                                  </TableCell>)
                        case "url":
                          return(<TableCell key={column.id} align={column.align}>
                                  <a 
                                    href={row.job.url}
                                    target='_blank' 
                                    rel="noopener noreferrer">  job link Url </a>
                                </TableCell>)
                        case "gmail_thread":
                          return(<TableCell key={column.id} align={column.align}>
                                  <a 
                                    href={row.gmail_thread}
                                    target='_blank' 
                                    rel="noopener noreferrer">  Gmail Thread</a>  
                                </TableCell>)
                        case "test_gmail_thread":
                          return(<TableCell key={column.id} align={column.align}>
                                    <a 
                                    href={row.test.gmail_thread}
                                    target='_blank' 
                                    rel="noopener noreferrer"> Gmail Thread</a>
                                </TableCell>)
                        case "test_type":
                        case "due_date":
                        case "due_time":
                          return(<TableCell key={column.id} align={column.align}>
                                    {row.test[column.id]}
                                </TableCell>)
                        case "contact_via":
                        case "call_date":
                        case "call_time":
                          return(<TableCell key={column.id} align={column.align}>
                                    {row.call[column.id]}
                                </TableCell>)
                        case "notes_date":
                          return (<TableCell key={column.id} align={column.align}>
                                    {row.callTakenOn}
                                  </TableCell>)
                        case "list":
                          return(<TableCell key={column.label} align={column.align}>
                                  <FormControl className={classes.formControl}>
                                      <InputLabel id={`${column.label}-label`}>{column.placeholder}</InputLabel>
                                      <Select
                                        labelId={`${column.label}-label`}
                                        id={column.label}
                                        value={row[column.for]}
                                        onChange={(event) => {handleChange(event, row, column.for)}}>
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
                        case "onChangeList":
                          return(<TableCell key={column.label} align={column.align}>
                                  <FormControl className={classes.formControl}>
                                      <InputLabel id={`${column.label}-label`}>{column.placeholder}</InputLabel>
                                      <Select
                                        labelId={`${column.label}-label`}
                                        id={column.label}
                                        defaultValue={ column.label === 'Test Status' ? row.test[column.for]: row[column.for]}
                                        onChange={(event) => {onUpdateHandler(row.id, event.target.value)}}>
                                          { column.listItems.map(item => 
                                                <MenuItem key={item} value={item}>{item}</MenuItem>)
                                          }
                                      </Select>
                                  </FormControl>   
                                </TableCell>)
                        case "input":
                          return (<TableCell key={column.id} align={column.align}>
                                    <form className={classes.form} noValidate autoComplete="off">
                                      <TextField 
                                      id={column.label} 
                                      label={column.label} 
                                      variant="outlined" 
                                      value={row[column.for]}
                                      onChange={(event) => {handleChange(event, row, column.for)}}
                                      />
                                    </form>
                                  </TableCell>)
                        case "jobApplyButton":
                          return(<TableCell  key={column.id} align={column.align}>
                                  <Button 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={() => {onApplyHandler(row)}}>
                                      Apply
                                  </Button>    
                                </TableCell>)
                        case "editButton":
                          return (<TableCell key={column.id} align={column.align}>
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
                          return(<TableCell key={column.id} align={column.align}>
                                  <Button 
                                    variant="contained" 
                                    color="primary"
                                    disabled={row.profile_id === null || row.status === "job"}
                                    onClick={() => {onUpdateHandler(row)}}>
                                      Update
                                  </Button>
                                </TableCell>)
                          case "agendaButton" :
                          return(<TableCell key={column.id} align={column.align}>
                                  <Button 
                                    variant="contained" 
                                    color="primary"
                                    disabled={row.profile_id === null || row.status === "job"}
                                    onClick={() =>
                                      history.push({
                                        pathname: "/agenda",
                                        state: { detail: row, editable: false }
                                      })}>
                                      Agenda
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