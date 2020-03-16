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
  
const managerJobLinks = ({ jobs, history, columns, classes, tableHeader}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [match, setMatch] = useState("Search");

    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        setFilteredJobs(jobs);
      }, [jobs.length]);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const searchHandler = e => {
        let lists = filteredJobs;
        if (e.target.value) {
          const newList = lists.filter(item => {
            const list = item.companyName.toLowerCase();
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
            placeholder="Search by Company Name ...."
            onChange={searchHandler}
            />
        <Paper className={classes.paper}>
        {
          tableHeader === "Job Links" ? (
              <FormControl className={classes.formControl}>
                <InputLabel id="profile-label">Profile</InputLabel>
                <Select
                  labelId="profile-label"
                  id="profile-select">
                  <MenuItem value={"Ali Muhammad"}>Ali Muhammad</MenuItem>
                  <MenuItem value={"Aamir khan"}>Aamir khan</MenuItem>
                  <MenuItem value={"Kevan Jay"}>Kevan Jay</MenuItem>
                </Select>
            </FormControl>
           ) : null  
        } 
      <div className={classes.tableWrapper}>
        <h1 className={classes.jobHeader}>{tableHeader}</h1>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
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
                                      {row.companyName}
                                    </TableCell>)
                          case "profile":
                            if(column.dropDown){
                              return(<TableCell key={column.id} align="center">
                                      <FormControl className={classes.formControl}>
                                        <InputLabel id="profile-label">Profile</InputLabel>
                                        <Select
                                          labelId="profile-label"
                                          id="profile-select">
                                          <MenuItem value={"Ali Muhammad"}>Ali Muhammad</MenuItem>
                                          <MenuItem value={"Aamir khan"}>Aamir khan</MenuItem>
                                          <MenuItem value={"Kevan Jay"}>Kevan Jay</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>)
                            }
                            else{
                              return (<TableCell key={column.id} align="center">
                                        {row.profile}
                                      </TableCell>)
                            }
                          case "status":
                            if(column.dropDown){
                              return(<TableCell key={column.id} align="center">
                                      <FormControl className={classes.formControl}>
                                          <InputLabel id="profile-label">status</InputLabel>
                                          <Select
                                            labelId="profile-label"
                                            id="profile-select">
                                            <MenuItem value={"job"}>job</MenuItem>
                                            <MenuItem value={"lead"}>lead</MenuItem>
                                            <MenuItem value={"garbage"}>garbage</MenuItem>
                                            <MenuItem value={"recuriter"}>recuriter</MenuItem>
                                          </Select>
                                      </FormControl>   
                                    </TableCell>)
                            }
                            else{
                              return (<TableCell key={column.id} align="center">
                                        {row.status}
                                      </TableCell>)
                            }
                          case "leadStatus":
                            return(
                              <TableCell key={column.id} align="center">
                                {row.lead_status}
                              </TableCell>
                            )
                          case "callTime":
                            return(               
                              <TableCell key={column.id} align="center">
                                {row.call_time} ({row.time_zone})
                              </TableCell>
                            )
                          case "callDate":
                            return(     
                              <TableCell key={column.id} align="center">
                                {row.call_date}
                              </TableCell>
                            )
                          case "voice":
                            return(<TableCell key={column.id} align="center">
                                    <FormControl className={classes.formControl}>
                                      <InputLabel id="profile-label">Voice</InputLabel>
                                      <Select
                                        labelId="profile-label"
                                        id="profile-select">
                                        <MenuItem value={"person 1"}>person 1</MenuItem>
                                        <MenuItem value={"person 2"}>person 2</MenuItem>
                                        <MenuItem value={"person 3"}>person 3</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>)
                          case "jobUrl":
                            return(     
                              <TableCell key={column.id} align="left">{row.url}</TableCell>  
                            )
                          case "jobApplyButton":
                            return(     
                            <TableCell  key={column.id} align="center">
                              <Button variant="contained" disabled>
                                  Applied 
                              </Button>
                              <Button variant="contained" color="secondary">
                                  Apply
                              </Button>    
                            </TableCell>)
                          case "editButton":
                            return (<TableCell key={column.id} align="center">
                                      <IconButton 
                                        aria-label="edit"
                                        onClick={() =>
                                          history.push({
                                            pathname: "/",
                                            state: { detail: row }
                                          })}
                                      >
                                        <EditIcon fontSize="large"/>
                                      </IconButton>
                                    </TableCell>)
                          case "updateButton" :
                            return(<TableCell key={column.id} align="center">
                                    <Button 
                                      variant="contained" 
                                      color="primary"
                                      onClick={() =>
                                        history.push({
                                          pathname: "/",
                                          state: { detail: row }
                                        })}
                                    >
                                        Update
                                    </Button>
                                  </TableCell>
                            )
                          default:
                            return  (<TableCell component="th" scope="row">
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

export default  managerJobLinks