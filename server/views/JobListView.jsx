import React, { useEffect, useState } from 'react';

function JobListView({ presenter }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    presenter.searchJobs('java developer');
  }, [presenter]);

  function showJobs(jobs) {
    setJobs(jobs);
  }

  function showJobDetails(job) {
    setSelectedJob(job);
  }

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <button onClick={() => presenter.onJobSelected(job)}>View Details</button>
        </div>
      ))}
      {selectedJob && (
        <div>
          <h2>{selectedJob.title}</h2>
          <p>{selectedJob.description}</p>
        </div>
      )}
    </div>
  );
}

export default JobListView;

