import React, {Fragment} from 'react';
import { connect } from 'react-redux';

const h1 = {
  marginTop: '-45px',
  fontFamily: 'serif',
  color: 'white'
};

const jumbo = {
  backgroundColor: '#285151'
};
const ul = {
  fontWeight: 'bold',
  fontFamily: 'serif',
  fontSize: '15px'
};

const DashboardPage = ({ user, history }) => {
  if (user) {
    for (var i = 0; i < user.length; i++) {
      var raceName = user[i].role;
      var name = user[i].name;
    }
  }

  return (
    <Fragment>
      {raceName === 'Admin' ? (
        <div className='row'>
          <div className='col-md-5 offset-md-1'>
            <div style={jumbo} className='jumbotron jumbotron-fluid'>
              <h1 style={h1} className='text-center'>
                Previous Week Report
              </h1>
              <ul style={ul} className='list-group'>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Applied Job
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Good Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Hot Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Closed Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Rejected Leads
                  <span className='badge badge-primary badge-pill'>
                   
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-md-5'>
            <div style={jumbo} className='jumbotron jumbotron-fluid'>
              <h1 style={h1} className='text-center'>
                Previous Month Report
              </h1>
              <ul style={ul} className='list-group'>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Applied Job
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Good Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Hot Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Closed Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
                <li className='list-group-item d-flex justify-content-between align-items-center'>
                  Total Rejected Leads
                  <span className='badge badge-primary badge-pill'>
                    
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <h1>Welcome '{name}' to Sales CRM</h1>
      )}
      {raceName === undefined ? (
        <p>Thanks for Registration wait Untill an Admin Verified you</p>
      ) : (
        ''
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.UserReducer.user
});

export default connect(mapStateToProps, {})(DashboardPage);
