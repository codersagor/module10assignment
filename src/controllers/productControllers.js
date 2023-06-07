exports.home = (req, res, next) => {
    res.status(200).json({ msg: "Home Page" })
}