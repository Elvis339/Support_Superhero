const 
    Notification = require('../../../models/NotificationsModel');

module.exports = {
    onDBSave: async prop => {
        try {
            let notification = new Notification(prop)
            await notification.save()
        } catch (error) {
            // onrada izuzteka ovde 
            console.log(error)
        }
    }
}