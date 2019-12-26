const 
    jwt = require('jsonwebtoken'),
    User = require('../models/UserModel')

const auth = async (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;

    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1] // Bearer <token>

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '2 days' })
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

            if (!user) throw new Error()

            req.token = token
            req.user = user
            next()
        } catch (error) {
            res.status(401).send({
                error: `Authentication error. Token required.`,
                status: 401
            })
        }
    } else {
        res.status(500).send({
            error: 'Server error',
            status: 500
        })
    }
}

module.exports = auth