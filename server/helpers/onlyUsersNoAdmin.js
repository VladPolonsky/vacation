module.exports.onlyUsersNoAdmin = (req, res, next) => {
    if (req.session.username && req.session.role == 0) {
        next()
    } else {
        res.status(401).send({err:"sensetive content for logged users only, plesae log in"})
    }
}