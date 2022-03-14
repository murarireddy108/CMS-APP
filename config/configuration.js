module.exports = {
    mongoDbUrl: 'mongodb+srv://murarireddy:9591983109@cluster0.muwrl.mongodb.net/test',
    
    PORT: process.env.PORT || 3002,
    //this will act as middleware and we will use all over our project
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.use || null;
        next();
    }
};