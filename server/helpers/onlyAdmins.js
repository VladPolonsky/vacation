module.exports.onlyAdmins = (req, res, next) => {
    if (req.session.username  == 'admin') {
        next()
    } else {
        res.status(401).send({err:"sensetive content for logged users only, plesae log in"})
    }
}