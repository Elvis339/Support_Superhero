const 
  controller = require('../../controllers/app/App/ActiveCollab/http/http'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  router.route('/activecollab/task-lists')
    .get(controller.getTaskLists)
};