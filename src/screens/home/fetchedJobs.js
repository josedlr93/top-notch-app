export const fetchedJobs = [
  {
    _id: '_id-02',
    name: 'James Doe',
    date: new Date('2020-08-05'),
    trucks: [
      {
        _id: '_id-01',
        truck_num: 1,
        cdl_required: false
      }
    ],
    employees: [
      {
        _id: '_id-01',
        name: 'Jose, De La Rosa',
        hasCdl: false
      }
    ]
  }, {
    _id: '_id-01',
    name: 'John Doe',
    date: new Date('2020-08-05'),
    trucks: [
      {
        _id: '_id-01',
        truck_num: 1,
        cdl_required: false
      }
    ],
    employees: [
      {
        _id: '_id-01',
        name: 'Jose, De La Rosa',
        hasCdl: false
      }
    ]
  }, {
    _id: '_id-03',
    name: 'Jane Doe',
    date: new Date('2020-09-05'),
    trucks: [
      {
        _id: '_id-01',
        truck_num: 1,
        cdl_required: false
      }
    ],
    employees: [
      {
        _id: '_id-01',
        name: 'Jose, De La Rosa',
        hasCdl: false
      }
    ]
  },
];

/**
 * @param {object} newJob 
 * @example
 * //adds job object to fetchedJobs
 */
export const addJob = (newJob) => {
  fetchedJobs.push(newJob);
}

export default { fetchedJobs, addJob };