/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

// import table from "../table";

import { fetchJob } from "../../actions/job";

const columns = [
    { id: "name", label: "Company Name", minWidth: 170 },
    { id: "profile", label: "Profile", minWidth: 100, align: "center" },
    { id: "button", label: "Action", minWidth: 100, align: "center" }
];
  
  const useStyles = makeStyles(theme => ({
    root:{
      width: "100%"
    },
    tableWrapper: {
      overflow: "auto"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    textField: {
      marginTop: "12px",
      marginRight: "22px",
      width: "100%"
    },
    jobHeader: {
      textAlign: "center",
      fontFamily: "initial",
      color: "blue"
    },  
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

const managerJobLinks = ({fetchJob, jobs, history}) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [match, setMatch] = useState("Search");

    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        fetchJob();
        // let arr = jobs.filter(job => {
        //   return(
        //       job.status === 'job' ? job : null
        //   )
        // })
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
        console.log("search", lists);
        if (e.target.value) {
          const newList = lists.filter(item => {
            const list = item.companyName.toLowerCase();
            const filter = e.target.value.toLowerCase();
            return list.includes(filter);
          });
          if (newList.length > 0) {
            console.log("in newlist", lists);
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
      <div className={classes.tableWrapper}>
        <h1 className={classes.jobHeader}>Leads</h1>
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
                    <TableCell component="th" scope="row">
                      {row.companyName}
                    </TableCell>

                    <TableCell align="center">
                        {row.profile}
                    </TableCell>
                    <TableCell align="center">
                    <IconButton aria-label="edit">
                          <EditIcon
                            fontSize="large"
                            onClick={() =>
                              history.push({
                                pathname: "/",
                                state: { detail: row }
                              })
                            }
                          />
                        </IconButton>
                    </TableCell>
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

const mapStateToProps = state => ({
    jobs: state.JobReducer.job
  });

export default  connect(mapStateToProps, { fetchJob })(managerJobLinks);