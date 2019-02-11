const { OAuth2Client } = require('google-auth-library');
const { getToken } = require('../helpers/auth')
const { User } = require('../models')

class GoogleController {
    static async loginVerify(req, res) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.googletoken,
                audience: process.env.GOOGLE_CLIENTID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            let userData = await User.findOne({ googleClientId: payload.sub }).lean()
            if (!userData) {
                let newUserData = await User.create({
                    email: payload.email,
                    name: payload.name,
                    password: Math.random().toString(),
                    googleClientId: payload.sub
                })
                userData = await User.findOne({ googleClientId: payload.sub }).lean()
            }
            let token = await getToken(userData)
            res.status(200).json({ userData, token })
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
        } catch (err) {
            res.status(500).json({ error: err.message })
            console.log(err)
        }
    }
}

module.exports = GoogleController
