const JobModel = require('./JobModel');

class JobListPresenter {
  constructor(view) {
    this.view = view;
  }

  async searchJobs(searchQuery) {
    try {
      const jobs = await JobModel.getJobs(searchQuery);
      this.view.showJobs(jobs);
    } catch (error) {
      console.error(error);
    }
  }

  async onJobSelected(job) {
    try {
      const detailedJob = await JobModel.getJobDetails(job.id);
      this.view.showJobDetails(detailedJob);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = JobListPresenter;

