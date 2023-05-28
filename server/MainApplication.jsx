const { Sequelize } = require('sequelize');
const React = require('react');
const ReactDOM = require('react-dom');
const JobListView = require('./JobListView');
const JobListPresenter = require('./JobListPresenter');

const sequelize = new Sequelize('jobportal', 'username', 'password', {
  host: 'localhost',
  dialect: 'mariadb',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MariaDB');

    const presenter = new JobListPresenter(new JobListView());
    presenter.searchJobs('java developer');

    // Render the JobListView component in the root DOM element
    ReactDOM.render(<JobListView presenter={presenter} />, document.getElementById('root'));
  })
  .catch((error) => {
    console.error('Error connecting to MariaDB:', error);
  });

