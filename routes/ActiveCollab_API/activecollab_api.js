const modules = require('../../modules/ActiveCollab/bootstrap_activecollab');
const controller = require('../../modules/ActiveCollab/AC_Controller');
const auth = require('../../middleware/auth');

module.exports = (router) => {
  router
    .route('/activecollab')
    .get(auth, modules.activeCollabTasks, controller.container);

  router
    .route('/activecollab/task-lists')
    .get(auth, modules.activeCollabProjects, controller.getTaskLists);

  router
    .route('/activecollab/tasks')
    .get(auth, modules.activeCollabTasks, controller.getTasks);
};
