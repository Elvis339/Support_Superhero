const 
  controller = require('../../controllers/ActiveCollab/http/http'),
  activecollabMiddleware = require('../../middleware/external/ActiveCollab/bootstrap_api'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/activecollab')
    .get(auth, activecollabMiddleware.bootstrapTasksApiCall, controller.container)
    
  router.route('/activecollab/task-lists')
    .get(auth, activecollabMiddleware.bootstrapApiCall, controller.getTaskLists)

  router.route('/activecollab/tasks')
    .get(auth, activecollabMiddleware.bootstrapTasksApiCall, controller.getTasks)
};