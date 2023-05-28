const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('jobportal', 'username', 'password', {
  host: 'localhost',
  dialect: 'mariadb',
});

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Other job fields
});

async function getJobs(searchQuery) {
  // Retrieve jobs from the database based on the search query
  return Job.findAll({
    where: {
      title: {
        [Sequelize.Op.like]: `%${searchQuery}%`,
      },
    },
  });
}

async function getJobDetails(jobId) {
  // Retrieve job details from the database using the job ID
  return Job.findByPk(jobId);
}

module.exports = {
  getJobs,
  getJobDetails,
};
