const 
  controller = require('../../controllers/app/App/ActiveCollab/http/http'),
  activecollabMiddleware = require('../../middleware/external/ActiveCollab/bootstrap_api'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/activecollab/task-lists')
    .get(auth, activecollabMiddleware.bootstrapApiCall, controller.getTaskLists)

  router.route('/activecollab/tasks')
    .get(auth, activecollabMiddleware.bootstrapTasksApiCall, controller.getTasks)

  router.route('/activecollab')
    .get(activecollabMiddleware.bootstrapTasksApiCall, controller.container)
};