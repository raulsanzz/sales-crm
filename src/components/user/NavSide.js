/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LinkIcon from "@material-ui/icons/Link";
import ListIcon from "@material-ui/icons/List";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ViewListIcon from '@material-ui/icons/ViewList';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import RingVolumeOutlinedIcon from '@material-ui/icons/RingVolumeOutlined';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
import PowerInputOutlinedIcon from '@material-ui/icons/PowerInputOutlined';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
  },
}));

const mailFolderListItems = ({ user}) => {
  const classes  = useStyles();
  const [open, setOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [userOpen, setuserOpen] = useState(false);
  const [leadsOpen, setleadsOpen] = useState(false);
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

  const leadsHandleClick = () => {
    setleadsOpen(!leadsOpen);
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
  return (
    <div>
      <ListItem button component={Link} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon className={classes.root} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {raceName === "Sales Executive" || raceName === "Admin" ? (
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <WorkOutlineIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Executive" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "Sales Executive" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/job_list">
              <ListItemIcon>
                <AddCircleOutlineIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Add Job" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Executive" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/manager_job_links">
              <ListItemIcon>
                <LinkIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Links" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Executive" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Report" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>

      {raceName === "Sales Manager" || raceName === "Admin" ? (
        <ListItem button onClick={ManagerHandleClick}>
          <ListItemIcon>
            <WorkOutlineIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Manager" />
          {managerOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}
      <Collapse in={managerOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "Sales Manager" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/manager_job_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job List" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Manager" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/manager_leads">
              <ListItemIcon>
                <LaunchOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Manager" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/scheduled_leads">
              <ListItemIcon>
                <AssignmentTurnedInOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Scheduled Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Manager" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/leads">
              <ListItemIcon>
                <AssignmentLateOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Leads Status" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "Sales Manager" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/appliedJobs">
              <ListItemIcon>
                <AssignmentLateOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Jobs Status" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>

      {/*  */}
      {raceName === "Sales Voice" || raceName === "Admin" ? (
        <ListItem button onClick={salesVoiceHandleClick}>
          <ListItemIcon>
            <RingVolumeOutlinedIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Voice" />
          {salesVoiceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}
      <Collapse in={salesVoiceOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "Sales Voice" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/voice">
              <ListItemIcon>
                <PhoneOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Call Scheduled" />
            </ListItem>
          ) : (
            ""
          )}
          {raceName === "Sales Voice" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/voice_stauts">
              <ListItemIcon>
                <PermPhoneMsgOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Calls Status" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {/*  */}
      {raceName === "Sales Voice" || raceName === "Admin" ? (
        <ListItem button onClick={salesTestHandleClick}>
          <ListItemIcon>
            <SettingsEthernetOutlinedIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Sales Test" />
          {salesVoiceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}
      <Collapse in={salesTestOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "Sales Voice" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/pipeline_test">
              <ListItemIcon>
                <PowerInputOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test In pipeline" />
            </ListItem>
          ) : (
            ""
          )}
          {raceName === "Sales Voice" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/complete_test">
              <ListItemIcon>
                <DoneAllOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test Completed" />
            </ListItem>
          ) : (
            ""
          )}
          {raceName === "Sales Voice" || raceName === "Admin" ? (
            <ListItem button component={Link} to="/test">
              <ListItemIcon>
                <PollOutlinedIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Test Report" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {/*  */}
      {raceName === "Admin" ? (
        <ListItem button onClick={userHandleClick}>
          <ListItemIcon>
            <PersonIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}
      <Collapse in={userOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "Admin" ? (
            <ListItem button component={Link} to="/user_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User List" />
            </ListItem>
          ) : (
            ""
          )}

          {/* {name === "Muddasir Ahmed" ? (
            <ListItem button component={Link} to="/user_report">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User Report" />
            </ListItem>
          ) : (
            ""
          )} */}
        </List>
      </Collapse>
    </div>
  );
};

export default mailFolderListItems;
