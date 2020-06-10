
const initialState = {
  leadStatus: [
    'lead',
    'good',
    'hot',
    'closed',
    'legal',
    'garbage',
    'dead lead',
    'Rejected by client',
    'in-communication'
  ],
  jobStatus: [
    'lead',
    'legal',
    'garbage',
    'in-house',
    'recruiter',
    'rejected by client'
  ],
  callStatus: [
    'done',
    'not taken',
    'rescheduled by client'
  ],
  pipelineTestStatus: [
    'In progress',
    'Completed',
    'Dropped'
  ],
  CompletedTestStatus: [
    'Passed',
    'Failed',
    'No Response'
  ],
  testStatus: [  //for 'test' under test drop down(test report)
    'Passed',
    'Failed',
    'No Response',
    'Dropped'
  ],
  allTestStatus: [ //for admin reports (test Report)
    'Passed',
    'Failed',
    'No Response',
    'Dropped',
    'In progress',
    'Completed'
  ],
  userRole: [ 
    'Sales Executive',
    'Sales Manager',
    'Sales Voice',
    'Admin'
  ]
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}
