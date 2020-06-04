/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RingVolumeOutlinedIcon from '@material-ui/icons/RingVolumeOutlined';
import PowerInputOutlinedIcon from '@material-ui/icons/PowerInputOutlined';
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
}));

const NavSide = ({ user}) => {
  const classes  = useStyles();
  const [open, setOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [userOpen, setuserOpen] = useState(false);
  const [salesVoiceOpen, setsalesVoiceOpen] = useState(false);
  const [salesTestOpen, setsalesTestOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const ManagerHandleClick = () => {
    setManagerOpen(!managerOpen);
  };

  const userHandleClick = () => {
    setuserOpen(!userOpen);
  };

  const salesVoiceHandleClick = () => {
    setsalesVoiceOpen(!salesVoiceOpen);
  };

  const salesTestHandleClick = () => {
    setsalesTestOpen(!salesTestOpen);
  };
  
  if (user) {
    for (var i = 0; i < user.length; i++) {
      var raceName = user[i].role;
      var name = user[i].name;
    }
  }

  const salesExecutive = () =>{
    return(
      <Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <WorkOutlineIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Executive" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/add_job">
              <ListItemIcon>
                <AddCircleOutlineIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Add Job" />
            </ListItem>
            <ListItem button component={Link} to="/manager_job_links">
              <ListItemIcon>
                <LinkIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Links" />
            </ListItem>
            <ListItem button component={Link} to="/daily_job_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Report" />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )//end of return 
  }

  const salesManager = () =>{
    return(
      <Fragment>
        <ListItem button onClick={ManagerHandleClick}>
          <ListItemIcon>
            <WorkOutlineIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Manager" />
          {managerOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={managerOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/manager_job_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job List" />
            </ListItem>
            <ListItem button component={Link} to="/manager_leads">
              <ListItemIcon>
                <LaunchOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Leads" />
            </ListItem>
            <ListItem button component={Link} to="/scheduled_leads">
              <ListItemIcon>
                <AssignmentTurnedInOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Scheduled Leads" />
            </ListItem>
            <ListItem button component={Link} to="/leads">
              <ListItemIcon>
                <AssignmentLateOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Leads Status" />
            </ListItem>
            <ListItem button component={Link} to="/appliedJobs">
              <ListItemIcon>
                <AssignmentLateOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Jobs Status" />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )//end of return 
  }

  const salesVoice = () =>{
    return(
      <Fragment>
        <ListItem button onClick={salesVoiceHandleClick}>
          <ListItemIcon>
            <RingVolumeOutlinedIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Voice" />
          {salesVoiceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={salesVoiceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/voice">
              <ListItemIcon>
                <PhoneOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Call Scheduled" />
            </ListItem>
            <ListItem button component={Link} to="/voice_stauts">
              <ListItemIcon>
                <PermPhoneMsgOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Calls Status" />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )//end of return 
  }

  const salesTest = () =>{
    return(
      <Fragment>
        <ListItem button onClick={salesTestHandleClick}>
          <ListItemIcon>
            <SettingsEthernetOutlinedIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Test" />
          {salesTestOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={salesTestOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/pipeline_test">
              <ListItemIcon>
                <PowerInputOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test In pipeline" />
            </ListItem>
            <ListItem button component={Link} to="/complete_test">
              <ListItemIcon>
                <DoneAllOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test Completed" />
            </ListItem>
            <ListItem button component={Link} to="/test">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test Report" />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )//end of return 
  }
  
  const admin = () =>{
    return(
      <Fragment>
        <ListItem button onClick={userHandleClick}>
          <ListItemIcon>
            <PersonIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={userOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/user_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User List" />
            </ListItem>
             <ListItem button component={Link} to="/executive_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Executive Report" />
            </ListItem>
             <ListItem button component={Link} to="/job_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Report" />
            </ListItem>
             <ListItem button component={Link} to="/lead_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Lead Report" />
            </ListItem>
             <ListItem button component={Link} to="/test_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test Report" />
            </ListItem>
             <ListItem button component={Link} to="/voice_report">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Voice Report" />
            </ListItem>
          </List>
        </Collapse>
      </Fragment>
    )//end of return 
  }
  
  return (
    <Fragment>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon className={classes.root} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {raceName === "Sales Executive" || raceName === "Admin" ? salesExecutive() : null }
      {raceName === "Sales Manager" || raceName === "Admin" ? salesManager() : null }
      {raceName === "Sales Voice" || raceName === "Admin" ? salesVoice() : null }
      {raceName === "Sales Voice" || raceName === "Admin" ? salesTest() : null }
      {raceName === "Admin" ? admin() : null }
    </Fragment>
  );
};

export default NavSide;