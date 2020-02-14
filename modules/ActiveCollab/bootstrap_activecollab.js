/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const { Client } = require('activecollab_node_sdk');

const constructClient = async () => {
  try {
    const client = new Client(
      process.env.ACTIVECOLLAB_MAIL,
      process.env.ACTIVECOLLAB_PW,
      'SupportSuperhero',
      'A51',
      process.env.ACTIVECOLLAB_API_URL,
      1,
    );
    await client.issueToken();
    return client;
  } catch (error) {
    throw new Error(error.response);
  }
};

const __client__ = (async () => await constructClient())();

const activecollab_projects = async (req, res, next) => {
  try {
    req.ActiveCollabProjects = await (await __client__)._get(
      `projects/${process.env.ACTIVECOLLAB_PROJECT_ID}`,
    );
    next();
  } catch (error) {
    res.status(500).send({
      message: 'Failed to bootstrap API...',
      error: error.toString(),
      status: 500,
    });
  }
};

const activecollab_tasks = async (req, res, next) => {
  try {
    req.ActiveCollabTasks = await (await __client__)._get(
      `projects/${process.env.ACTIVECOLLAB_PROJECT_ID}/tasks`,
    );
    next();
  } catch (error) {
    res.status(500).send({
      message: 'Failed to bootstrap tasks API...',
      error: error.toString(),
      status: 500,
    });
  }
};

module.exports = {
  activecollab_projects,
  activecollab_tasks,
};
