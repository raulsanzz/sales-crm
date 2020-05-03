import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import Alert from "../components/Alert";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// User
import SignIn from "../components/user/SignIn";
import SignUp from "../components/user/SignUp";
import Dashboard from "../components/user/Dashboard";
// Sales Executive 
import JobList from "../components/sales/salesExecutive/JobList";
import ManagerJobLinks from "../components/sales/salesExecutive/managerJobLinks";
import SalesDetails from "../components/sales/salesExecutive/salesDetail";
// Sales Manager
import ManagerJobList from '../components/sales/salesManager/managerJobList';
import ManagerLeads from '../components/sales/salesManager/managerLeads';
import ScheduledLeads from '../components/sales/salesManager/scheduledLeads';
import LeadStatus from '../components/sales/salesManager/leadStatus';
import JobStatus from '../components/sales/salesManager/jobStatus';
import EditLead from "../components/sales/salesManager/LeadEdit";
// Voice
import Voice from '../components/sales/voice/voice';
import VoiceStatus from '../components/sales/voice/voiceStatus';
// Agenda
import Agenda from "../components/sales/agenda/agenda";
// Test
import AddTest from "../components/sales/test/addTest";
import EditTest from "../components/sales/test/editTest";
import TestInPipeline from "../components/sales/test/testInPipeline";
import CompletedTest from "../components/sales/test/completedTest";
import Tests from "../components/sales/test/test";
// Admin
import UserList from "../components/admin/UserList";
import EditUser from "../components/admin/EditUser";
import UserReport from "../components/admin/UserReport";
import UserDetails from "../components/admin/UserDetails";

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
