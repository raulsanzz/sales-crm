import React, { Fragment } from "react";
import { Router, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import DashboardPage from "../pages/DashboardPage";
import AddPostPage from "../pages/AddPostPage";
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

// import UiAgenda from "../pages/sales/aged";
import Alert from "../pages/Alert";
import AdminJobList from "../pages/sales/adminJobList";
import EditJob from "../pages/sales/JobEdit";
import UserList from "../pages/sales/UserList";
import EditUser from "../pages/sales/EditUser";
import LeadsList from "../pages/sales/leads/LeadList";
import MyLeads from "../pages/sales/leads/MyLead";
import LeadSchedule from "../pages/sales/leads/LeadCallList";
import UserReport from "../pages/sales/user/UserReport";
import UserDetails from "../pages/sales/user/UserDetails";
import completedTest from "../pages/sales/test/completedTest";
const history = createBrowserHistory();

export default () => {
  return (
    <Fragment>
      <Alert />
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SignInPage} />
          <PublicRoute path="/signup" component={SignUpPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/addpost" component={AddPostPage} />
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
          {/* others */}
          <PrivateRoute path="/agenda" component={Agenda} />
          {/* Test */}
          <PrivateRoute path="/add_test" component={AddTest} />
          <PrivateRoute path="/edit_test" component={EditTest} />
          <PrivateRoute path="/pipeline_test" component={TestInPipeline} />
          <PrivateRoute path="/complete_test" component={completedTest} />
          {/* <PrivateRoute path="/working" component={UiAgenda} /> */}
          <PrivateRoute path="/user_list" component={UserList} />
          <PrivateRoute path="/edit" component={EditUser} />
          <PrivateRoute path="/admin_job_list" component={AdminJobList} />
          <PrivateRoute path="/job_edit" component={EditJob} />
          <PrivateRoute path="/leads_list" component={LeadsList} />
          <PrivateRoute path="/my_leads" component={MyLeads} />
          <PrivateRoute path="/lead_scedule" component={LeadSchedule} />
          <PrivateRoute path="/user_report" component={UserReport} />
          <PrivateRoute path="/user_details" component={UserDetails} />
        </Switch>
      </Router>
    </Fragment>
  );
};
