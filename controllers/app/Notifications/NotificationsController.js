const fs = require('fs');
const Notification = require('../../../models/NotificationsModel');
const { GET_ROOT_PATH } = require('../../../utils');

const socket = require('../../../services/socket/socket');

module.exports = {
  onDBSave: async (prop) => {
    try {
      const notification = new Notification(prop);
      await notification.save();
      socket.emitToSocketId('notification', prop);
    } catch (error) {
      const path = GET_ROOT_PATH('controllers').slice(0, 44);
      fs.appendFileSync(`${path}/onDBSave.error.txt`, error);
    }
  },
};
