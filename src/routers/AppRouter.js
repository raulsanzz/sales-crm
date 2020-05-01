import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import Alert from "../pages/Alert";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// User
import SignIn from "../pages/user/SignIn";
import SignUp from "../pages/user/SignUp";
import Dashboard from "../pages/user/Dashboard";
// Sales Executive 
import JobList from "../pages/sales/salesExecutive/JobList";
import ManagerJobLinks from "../pages/sales/salesExecutive/managerJobLinks";
import SalesDetails from "../pages/sales/salesExecutive/salesDetail";
// Sales Manager
import ManagerJobList from '../pages/sales/salesManager/managerJobList';
import ManagerLeads from '../pages/sales/salesManager/managerLeads';
import ScheduledLeads from '../pages/sales/salesManager/scheduledLeads';
import LeadStatus from '../pages/sales/salesManager/leadStatus';
import JobStatus from '../pages/sales/salesManager/jobStatus';
import EditLead from "../pages/sales/salesManager/LeadEdit";
// Voice
import Voice from '../pages/sales/voice/voice';
import VoiceStatus from '../pages/sales/voice/voiceStatus';
// Agenda
import Agenda from "../pages/sales/agenda/agenda";
// Test
import AddTest from "../pages/sales/test/addTest";
import EditTest from "../pages/sales/test/editTest";
import TestInPipeline from "../pages/sales/test/testInPipeline";
import CompletedTest from "../pages/sales/test/completedTest";
import Tests from "../pages/sales/test/test";
// Admin
import UserList from "../pages/admin/UserList";
import EditUser from "../pages/admin/EditUser";
import UserReport from "../pages/admin/UserReport";
import UserDetails from "../pages/admin/UserDetails";

const history = createBrowserHistory();

export default () => {
  return (
    <Fragment>
      <Alert />
      <Router history={history}>
        <Switch>
          {/* User */}
          <PublicRoute exact path="/" component={SignIn} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          {/* Sales Executive */}
          <PrivateRoute path="/job_list" component={JobList} />
          <PrivateRoute path="/manager_job_links" component={ManagerJobLinks} />
          <PrivateRoute path="/sales_daily_details" component={SalesDetails} />
          {/* Sales Manager */}
          <PrivateRoute path="/manager_job_list" component={ManagerJobList} />
          <PrivateRoute path="/manager_leads" component={ManagerLeads} />
          <PrivateRoute path="/scheduled_leads" component={ScheduledLeads} />
          <PrivateRoute path="/leads" component={LeadStatus} />
          <PrivateRoute path="/appliedJobs" component={JobStatus} />
          <PrivateRoute path="/lead_edit" component={EditLead} />
          {/* Voice */}
          <PrivateRoute path="/voice" component={Voice} />
          <PrivateRoute path="/voice_stauts" component={VoiceStatus} />
          {/* Test */}
          <PrivateRoute path="/add_test" component={AddTest} />
          <PrivateRoute path="/edit_test" component={EditTest} />
          <PrivateRoute path="/pipeline_test" component={TestInPipeline} />
          <PrivateRoute path="/complete_test" component={CompletedTest} />
          <PrivateRoute path="/test" component={Tests} />
          {/* Admin */}
          <PrivateRoute path="/user_list" component={UserList} />
          <PrivateRoute path="/edit" component={EditUser} />
          <PrivateRoute path="/user_report" component={UserReport} />
          <PrivateRoute path="/user_details" component={UserDetails} />
          {/* others */}
          <PrivateRoute path="/agenda" component={Agenda} />
        </Switch>
      </Router>
    </Fragment>
  );
};
