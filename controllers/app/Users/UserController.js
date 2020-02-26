const User = require('../../../models/UserModel');

module.exports = {
  addUser: async (req, res) => {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      res.status(406).send({
        err: error.toString(),
        message: 'Not acceptable',
        status: 406,
      });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password,
      );
      const token = await user.generateAuthToken();
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(403).send({
        message: 'Unable to login, contact support!',
        status: 403,
        err: error,
      });
    }
  },

  logOut: async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById({ _id });
      if (!user) throw new Error('No user found, something reeeaaallly went wrong.');
      user.tokens = [];
      await user.save();
      res.status(200).send();
    } catch (error) {
      res.status(500).send({
        message: 'Contact support!',
        status: 403,
        err: error.toString(),
      });
    }
  },

  validate: async (req, res) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      res.status(500).send({
        message: 'Server error',
        err: error.toString(),
        status: 500,
      });
    }
  },

  editMe: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({
        error: 'Invalid updates!',
      });
    }

    try {
      updates.map((update) => {
        req.user[update] = req.body[update];
      });
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.sendStatus(405).send({
        message: 'Not allowed!',
        err: error.toString(),
        status: 405,
      });
    }
  },
};
