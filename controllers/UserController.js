require('../db/database')

// Only for autocomplete //
// const express = require('express')
// const app = express()
// const router = express.Router()
// router.get('/', (req, res) => {
//   res.s
// })

const
  User = require('../models/UserModel')
  userData = {}

module.exports = {
  add: async (req, res) => {
    const user = new User(req.body)

    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
    } catch (error) {
      res.status(400).send({
        message: 'Check the fields',
        status: 400,
        error
      })
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      userData.name = user.name
      userData.email = user.email
      res.send({ token })
    } catch (error) {
      res.status(400).send({
        message: 'Unable to login, contact support!',
        status: 400,
        error: error.toString()
      })
    }
  },


  getHome: async (req, res, next) => {
    try {
      const user = await User.find({ email: userData.email })
      res.send(user)
    } catch (error) {
      res.status(500).send(error.toString())
    }
  }
}