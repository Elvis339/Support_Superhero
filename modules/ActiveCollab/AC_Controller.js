/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable radix */
/* eslint-disable camelcase */
const { TASK_LIST_IDS } = require('./task_lists');

module.exports = {
  getTaskLists: async (req, res) => {
    try {
      const project = await req.ActiveCollabProjects;
      const task_list = project.task_lists.filter((list) => TASK_LIST_IDS.includes(list.id));
      res.status(200).send(task_list);
    } catch (error) {
      res.status(500).send({
        message: 'Failed to fetch task-lists',
        status: 500,
        error: error.toString(),
      });
    }
  },

  getTasks: async (req, res) => {
    try {
      const query = parseInt(req.query.task_list_id);

      for (const _id of TASK_LIST_IDS) {
        if (query === _id) {
          const filtered = await req.ActiveCollabTasks.tasks.filter(
            (item) => item.task_list_id === query,
          );
          return res.status(200).send(filtered);
        }
        continue;
      }
      throw new Error('Invalid task_list_id.');
    } catch (error) {
      res.status(500).send({
        message: 'Failed to fetch tasks.',
        error: error.toString(),
        status: 500,
      });
    }
  },

  container: async (req, res) => {
    try {
      const tasks = await req.ActiveCollabTasks.tasks;
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({
        error: error.toString(),
      });
    }
  },
};
