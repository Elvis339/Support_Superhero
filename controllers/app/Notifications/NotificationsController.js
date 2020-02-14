const Notification = require('../../../models/NotificationsModel');
const emitter = require('../../events/Event');

const saveEmitter = emitter.myEmitter;

module.exports = {
  onDBSave: async (prop) => {
    try {
      const notification = new Notification(prop);
      await notification.save();
      saveEmitter.emit('notification', prop);
    } catch (error) {
      // onrada izuzteka ovde
      console.log(error);
    }
  },
};
