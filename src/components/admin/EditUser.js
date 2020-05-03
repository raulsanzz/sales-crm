/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Edit from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { updateUser, updateUserPassword } from "../../store/actions/user";

const useStyles = makeStyles(theme => ({
  layout: {
    width: "100%",
    display: "block",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "80%"
    },
    [theme.breakpoints.up("md")]: {
      width: "65%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "45%"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: `${theme.spacing()}px auto`,
    backgroundColor: theme.palette.secondary.main
  },
  textField: {
    width: "100%"
  },
  button: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto'
  }
}));

const editUser = ({ history, location, updateUser, updateUserPassword }) => {
  const alert = useAlert();
  const classes = useStyles();

  const [formData, setFormData] = useState(location.state.detail);
  const [password, setPassword] = useState('');
  
  const onChangeHandler = e => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const res = await updateUser( formData.registration_number, { name: formData.name, role: formData.role });
    if(res){
      alert.success("User Updated...!");
      history.push("/user_list/");
    }
    else{
      alert.success("Failed to Update User..!!");
    }
  };

  const updatePassword = async(e) => {
    e.preventDefault();
    const res = await updateUserPassword( formData.registration_number, { password: password });
    if(res){
      alert.success("Password Updated...!");
    }
    else{
      alert.success("Failed to UpdatePassword..!!");
    }
  };
  const roleHandler = e => {
    setFormData({
      ...formData,
      role: e.target.value
    });
  };

  return (
    <Fragment>
      <main className={classes.layout}>
        {/* Update name and role */}
        <Paper className={classes.paper}>
          <IconButton 
            aria-label="edit"
            onClick={() => history.push("/user_list/")}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>

          <Typography align="center">
            Edit User
          </Typography>
          <form onSubmit={onSubmitHandler} style={{width:'100%'}}>
            <TextField
              disabled
              id="registration_number"
              label="Employee Number"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.registration_number}
              onChange={onChangeHandler} />
            <TextField
              disabled
              id="designation"
              label="Designation"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.designation}
              onChange={onChangeHandler} />
            <TextField
              id="name"
              label="Name"
              margin="normal"
              type="text"
              className={classes.textField}
              value={formData.name}
              onChange={onChangeHandler} />
            <FormControl className={classes.textField}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId={'role-label'}
                id="role"
                value={formData.role}
                onChange={roleHandler}>
                <MenuItem value="Sales Voice">Sales Voice</MenuItem>
                <MenuItem value="Sales Executive">Sales Executive</MenuItem>
                <MenuItem value="Sales Manager">Sales Manager</MenuItem>
                <MenuItem value="Asst. Sales Manager">Asst. Sales Manager</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}>
              Update User
            </Button>
          </form>
        </Paper>

        {/* Update password */}
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Edit />
          </Avatar>
          <Typography align="center">
            Update Password
          </Typography>
          <form onSubmit={updatePassword} style={{width:'100%'}}>
            <TextField
              id="password"
              label="Password"
              margin="normal"
              type="text"
              className={classes.textField}
              value={password}
              onChange={(event) => {setPassword(event.target.value)}} />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}>
              Update Password
            </Button>
          </form>
        </Paper>
      </main>
    </Fragment>
  );
};

export default connect(null, { updateUser, updateUserPassword })(editUser);
