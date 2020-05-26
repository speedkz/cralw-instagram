const User = require("../model/user_model");

exports.addUser = async (req, res, next) => {
    let filter = {
        $or: [
            {
                username: req.body.username,
                email: req.body.email
            }
        ]
    }
    let valid = await !User.exists(filter);
    if (!valid) {
        res.send('user is exsited');
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save().then(() => {
        // console.log(req.body.title);
        res.send('post added successfully');
    })
        .catch(err => {
            res.status(400).send(err);
        });
}
exports.authorizeUser = (req, res, next) => {
    let filter = {
        username: req.body.username,
        password: req.body.password,
    }
    User.exists(filter).then(result => {
        res.send(result);
    })
        .catch(err => res.status(400).send(err));
}