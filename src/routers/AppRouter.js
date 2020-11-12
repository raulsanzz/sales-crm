import React, { Fragment } from 'react';
import {createBrowserHistory} from 'history';
import { Router, Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
// User
import SignIn from '../components/user/SignIn';
import SignUp from '../components/user/SignUp';
import Dashboard from '../components/user/Dashboard';
// Sales Executive 
import AddJob from '../components/sales/salesExecutive/AddJob';
import DailyJobReport from '../components/sales/salesExecutive/dailyJobReport';
import ManagerJobLinks from '../components/sales/salesExecutive/managerJobLinks';
// Sales Manager
import AddLead from '../components/sales/salesManager/addLead';
import EditLead from '../components/sales/salesManager/LeadEdit';
import JobStatus from '../components/sales/salesManager/jobStatus';
import LeadStatus from '../components/sales/salesManager/leadStatus';
import ManagerLeads from '../components/sales/salesManager/managerLeads';
import ManagerJobList from '../components/sales/salesManager/managerJobList';
import ScheduledLeads from '../components/sales/salesManager/scheduledLeads';
// Voice
import Voice from '../components/sales/voice/voice';
import VoiceStatus from '../components/sales/voice/voiceStatus';
// Agenda
import Agenda from '../components/sales/agenda/agenda';
// Test
import Tests from '../components/sales/test/test';
import AddTest from '../components/sales/test/addTest';
import EditTest from '../components/sales/test/editTest';
import CompletedTest from '../components/sales/test/completedTest';
import TestInPipeline from '../components/sales/test/testInPipeline';
// Admin
import UserList from '../components/admin/UserList';
import EditUser from '../components/admin/EditUser';
// Admin - Reports
import LeadReports from '../components/admin/Reports/lead';
import TestReports from '../components/admin/Reports/test';
import VoiceReports from '../components/admin/Reports/voice';
import AppliedJobsReports from '../components/admin/Reports/appliedJob';
import SalesExecutiveReports from '../components/admin/Reports/SalesExecutive';
import VoicePerPerson from "../components/admin/Reports/voicePerPerson";
import AllReports from "../components/admin/Reports/allReports";
import ReportDetails from "../components/admin/Reports/reportDetails";
import SalesReportDetail from "../components/admin/Reports/SalesReport";


const history = createBrowserHistory();

export default () => {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          {/* User */}
          <PublicRoute exact path='/' component={SignIn} />
          <PublicRoute path='/signup' component={SignUp} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          {/* Sales Executive */}
          <PrivateRoute path='/add_job' component={AddJob} />
          <PrivateRoute path='/manager_job_links' component={ManagerJobLinks} />
          <PrivateRoute path='/daily_job_report' component={DailyJobReport} />
          {/* Sales Manager */}
          <PrivateRoute path='/manager_job_list' component={ManagerJobList} />
          <PrivateRoute path='/manager_leads' component={ManagerLeads} />
          <PrivateRoute path='/scheduled_leads' component={ScheduledLeads} />
          <PrivateRoute path='/leads' component={LeadStatus} />
          <PrivateRoute path='/appliedJobs' component={JobStatus} />
          <PrivateRoute path='/lead_edit' component={EditLead} />
          <PrivateRoute path='/add_lead' component={AddLead} />
          {/* Voice */}
          <PrivateRoute path='/voice' component={Voice} />
          <PrivateRoute path='/voice_stauts' component={VoiceStatus} />
          {/* Test */}
          <PrivateRoute path='/add_test' component={AddTest} />
          <PrivateRoute path='/edit_test' component={EditTest} />
          <PrivateRoute path='/pipeline_test' component={TestInPipeline} />
          <PrivateRoute path='/complete_test' component={CompletedTest} />
          <PrivateRoute path='/test' component={Tests} />
          {/* Admin */}
          <PrivateRoute path='/user_list' component={UserList} />
          <PrivateRoute path='/edit' component={EditUser} />
          <PrivateRoute path='/sales_executive_reports' component={SalesExecutiveReports} />
          <PrivateRoute path='/sales_report' component={SalesReportDetail} />
          <PrivateRoute path='/job_report' component={AppliedJobsReports} />
          <PrivateRoute path='/lead_report' component={LeadReports} />
          <PrivateRoute path='/test_report' component={TestReports} />
          <PrivateRoute path='/voice_report' component={VoiceReports} />
          <PrivateRoute path='/voice_report_person' component={VoicePerPerson} />
          <PrivateRoute path='/report' component={AllReports} />
          <PrivateRoute path='/detail' component={ReportDetails} />
          {/* others */}
          <PrivateRoute path='/agenda' component={Agenda} />
        </Switch>
      </Router>
    </Fragment>
  );
};
