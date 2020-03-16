/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState}from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LinkIcon from '@material-ui/icons/Link';
import ListIcon from "@material-ui/icons/List";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import WorkIcon from "@material-ui/icons/Work";
import PersonIcon from "@material-ui/icons/Person";

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    color: "white"
  }
});
const mailFolderListItems = ({ user, classes }) => {
  const [open, setOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [userOpen, setuserOpen] = useState(false);
  const [leadsOpen, setleadsOpen] = useState(false);

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
      {raceName === "sales_executive" || raceName === "admin" ? (
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
          {raceName === "sales_executive" || raceName === "admin" ? (
            <ListItem button component={Link} to="/job_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Add Job" />
            </ListItem>
          ) : (
            ""
          )}
          
          {raceName === "admin" ? (
            <ListItem button component={Link} to="/manager_job_links">
              <ListItemIcon>
                <LinkIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="job Links" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "admin" ? (
            <ListItem button component={Link} to="/admin_job_list">
              <ListItemIcon>
                <SupervisorAccountIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Sales Admin" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <WorkIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job Report" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {/*  */}
      {raceName === "sales_manager" || raceName === "admin" ? (
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
          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/manager_job_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Job List" />
            </ListItem>
          ) : (
            ""
          )}
          
          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/manager_leads">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/admin_job_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
            </ListItemIcon>
              <ListItemText primary="Scheduled Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Good Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Hot Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Closed Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Rejected by Clients" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Dead Leads" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "sales_manager" || raceName === "admin" ? (
            <ListItem button component={Link} to="/sales_daily_details">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="Garbage/Recuriter" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>

      {/*  */}
      {raceName === "admin" || raceName === "manager" ? (
        <ListItem button onClick={userHandleClick}>
          <ListItemIcon>
            <PersonIcon className={classes.root} />
          </ListItemIcon>
          <ListItemText primary="User" />
          {userOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      ) : (
        ""
      )}

      <Collapse in={userOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {raceName === "admin" ? (
            <ListItem button component={Link} to="/user_list">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User List" />
            </ListItem>
          ) : (
            ""
          )}

          {raceName === "manager" && name === "Muddasir Ahmed" ? (
            <ListItem button component={Link} to="/user_report">
              <ListItemIcon>
                <ListIcon className={classes.root} />
              </ListItemIcon>
              <ListItemText primary="User Report" />
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Collapse>
      {raceName === "manager" || raceName === "admin" ? (
        <React.Fragment>
          <ListItem button onClick={leadsHandleClick}>
            <ListItemIcon>
              <WorkOutlineIcon className={classes.root} />
            </ListItemIcon>
            <ListItemText primary="Leads" />
            {leadsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={leadsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {raceName === "admin" ? (
                <ListItem button component={Link} to="/leads_list">
                  <ListItemIcon>
                    <ListIcon className={classes.root} />
                  </ListItemIcon>
                  <ListItemText primary="Leads List" />
                </ListItem>
              ) : (
                ""
              )}
              {raceName === "admin" || raceName === "manager" ? (
                <ListItem button component={Link} to="/my_leads">
                  <ListItemIcon>
                    <ListIcon className={classes.root} />
                  </ListItemIcon>
                  <ListItemText primary="My Leads" />
                </ListItem>
              ) : (
                ""
              )}
              {raceName === "admin" || raceName === "manager" ? (
                <ListItem button component={Link} to="/lead_scedule">
                  <ListItemIcon>
                    <ListIcon className={classes.root} />
                  </ListItemIcon>
                  <ListItemText primary="Lead Scheduler" />
                </ListItem>
              ) : (
                ""
              )}
            </List>
          </Collapse>
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default compose(withStyles(styles, { withTheme: true }))(
  mailFolderListItems
);
