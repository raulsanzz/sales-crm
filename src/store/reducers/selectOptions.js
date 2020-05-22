
const initialState = {
  leadStatus: [
    'lead',
    'good',
    'hot',
    'closed',
    'garbage',
    'dead lead',
    'Rejected by client',
    'in-communication'
  ],
  jobStatus: [
    'lead',
    'garbage',
    'recruiter',
    'in-house',
    'rejected by client'
  ],
  callStatus: [
    'done',
    'not taken',
    'rescheduled by client'
  ],
  testStatus: [
    'Passed',
    'Failed',
    'No Response',
    'Dropped'
  ],
  allTestStatus: [
    'Passed',
    'Failed',
    'No Response',
    'Dropped',
    'In progress',
    'Completed'
  ]
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    
    default:
      return state;
  }
}
