const UserModel = require('../db/models/user');

async function updateUser(req, res) {

    let result = false
    var update = { [req.body.keyToUpdate]: req.body.newValue }

    const updateDb = await UserModel.updateOne(
        {
            token: req.body.token
        }, update
    )
    if (updateDb.nModified === 1) {
        result = true
    }

    // Retrieve user updated
    const answerDb = await UserModel.findOne({ token: req.body.token });

    res.json({ result, user: answerDb })
}

module.exports = updateUser;