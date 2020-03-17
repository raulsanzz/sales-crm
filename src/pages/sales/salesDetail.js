/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import Badge from "@material-ui/core/Badge";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  center: {
    textAlign: "center"
  },
  text: {
    padding: "28px",
    fontFamily: "initial",
    fontSize: "18px",
    fontWeight: "bold"
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

  useEffect(() => {
    axios.get ( BASE_URL + "/api/job/count").then(res => {
      SetData(res.data.result);
    });
  }, []);
  
  if (data.length > 0) {
    var Total = data.reduce(
      (prev, cur) => parseInt(prev) + parseInt(cur.count),
      0
    );
  }

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id="Lead-status-label">Lead Status</InputLabel>
        <Select
          labelId="Lead-status-label"
          id="Lead-status-select">
          <MenuItem value={"Good Leads"}>Good Leads</MenuItem>
          <MenuItem value={"Hot Leads"}>Hot Leads</MenuItem>
          <MenuItem value={"Closed Leads"}>Closed Leads</MenuItem>
          <MenuItem value={"Rejected By Clients"}>Rejected By Clients</MenuItem>
          <MenuItem value={"Dead Leads"}>Dead Leads</MenuItem>
          <MenuItem value={"Garbage"}>Garbage</MenuItem>
        </Select>
      </FormControl>
      <h1 className={classes.center}>Daily Applied Job Details</h1>
      <span className={classes.text}>Total Applied Job:</span>
      <Badge badgeContent={Total} color="secondary"></Badge>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Fetched Jobs</TableCell>
            <TableCell>Applied Job</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                temp User
              </TableCell>
              <TableCell component="th" scope="row">
                  temp Fetched jobs
              </TableCell>
              <TableCell component="th" scope="row">
                temp Applied jobs
                {/* <Badge badgeContent={row.count} color="primary"></Badge> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
