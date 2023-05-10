const getHomePage = async (req, res, next) => {
    res.render('index');
};

module.exports = getHomePage;
