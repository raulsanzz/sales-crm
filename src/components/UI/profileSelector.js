/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  paper: {
    color: theme.palette.text.secondary,
    textAlign: "right",
    marginBottom: "20px",
    border:'1px solid rgba(0,0,0,0.125)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
}));

const profileSelector = ({profileChangeHandler, meassage }) => {
  const classes = useStyles();
  const didMountRef = useRef(false);
  const [profiles, setProfiles] = useState([]);

useEffect(() => {
    if(didMountRef.current === false){ //only for component did mount
      fetchProfiles();
      didMountRef.current = true
    }
  }, []);

  const fetchProfiles = async () => {
    try {
      const profiles = await axios.get ( BASE_URL + '/api/profile');
      setProfiles(profiles.data.profiles);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper className={classes.paper}>
      <FormControl variant="outlined" className={classes.formControl} error={meassage}>
        <InputLabel id="profile-select-label" className={classes.profileDropDown}>Profile</InputLabel>
        <Select
          labelId="profile-select-label"
          id="profile-select"
          onChange={(event) => {
            profileChangeHandler(event.target.value);
          }}
          label="Profile" >
          {profiles.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText> {meassage}</FormHelperText>
      </FormControl>
    </Paper>
  );
};

export default profileSelector;
