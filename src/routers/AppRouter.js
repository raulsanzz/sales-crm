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
import AddJob from "../components/sales/salesExecutive/AddJob";
import ManagerJobLinks from "../components/sales/salesExecutive/managerJobLinks";
import DailyJobReport from "../components/sales/salesExecutive/dailyJobReport";
// Sales Manager
import ManagerJobList from '../components/sales/salesManager/managerJobList';
import ManagerLeads from '../components/sales/salesManager/managerLeads';
import ScheduledLeads from '../components/sales/salesManager/scheduledLeads';
import LeadStatus from '../components/sales/salesManager/leadStatus';
import JobStatus from '../components/sales/salesManager/jobStatus';
import EditLead from "../components/sales/salesManager/LeadEdit";
import AddLead from "../components/sales/salesManager/addLead";
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
// Admin - Reports
import SalesExecutiveReports from "../components/admin/Reports/SalesExecutive";
import AppliedJobsReports from "../components/admin/Reports/appliedJob";
import LeadReports from "../components/admin/Reports/lead";
import TestReports from "../components/admin/Reports/test";
import VoiceReports from "../components/admin/Reports/voice";

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
          <PrivateRoute path="/add_job" component={AddJob} />
          <PrivateRoute path="/manager_job_links" component={ManagerJobLinks} />
          <PrivateRoute path="/daily_job_report" component={DailyJobReport} />
          {/* Sales Manager */}
          <PrivateRoute path="/manager_job_list" component={ManagerJobList} />
          <PrivateRoute path="/manager_leads" component={ManagerLeads} />
          <PrivateRoute path="/scheduled_leads" component={ScheduledLeads} />
          <PrivateRoute path="/leads" component={LeadStatus} />
          <PrivateRoute path="/appliedJobs" component={JobStatus} />
          <PrivateRoute path="/lead_edit" component={EditLead} />
          <PrivateRoute path="/add_lead" component={AddLead} />
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
          <PrivateRoute path="/executive_report" component={SalesExecutiveReports} />
          <PrivateRoute path="/job_report" component={AppliedJobsReports} />
          <PrivateRoute path="/lead_report" component={LeadReports} />
          <PrivateRoute path="/test_report" component={TestReports} />
          <PrivateRoute path="/voice_report" component={VoiceReports} />
          {/* others */}
          <PrivateRoute path="/agenda" component={Agenda} />
        </Switch>
      </Router>
    </Fragment>
  );
};
