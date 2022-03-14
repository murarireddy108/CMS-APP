const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const { mongoDbUrl, PORT, globalVariables } = require('./config/configuration')
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { selectOption } = require('./config/customFunctions');
const fileUpload = require('express-fileupload');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
var passport = require('passport');

const app = express();

/*===============DB CONNECTION==========================*/
//configure mongoose to connect to MongoDB 
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log('Mongoose connected successfully');

    }).catch(err => {
        console.log('Error connecting to MongoDB')
    });



/*=================EXPRESS CONFIG=======================*/
/* configure express */
app.use(express.json());
//passing a configurational object in the express.urlencoded
app.use(express.urlencoded({ extended: true }));
//to match the paths of public folder
app.use(express.static(path.join(__dirname, 'public')))

/*==================flash and session====================*/
app.use(session({
    secret: 'any secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(passport.authenticate('session'));


/*===================GLOBAL VARIABLES=====================*/

app.use(globalVariables);


/*====================FILE UPLOAD MIDDLEWARE================ */

app.use(fileUpload());


/*==================VIEW ENGINE SETUP=====================*/

//*setup view engine to use handle bars */
// app.engine('handlebars', exphbs.engine({ defaultLayout: "default", helpers: { select: selectOption } }))
// app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'default',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars), helpers: { select: selectOption }
})
);
app.set('view engine', 'handlebars');


/*=================METHOD OVERRIDE MIDDLEWARE================ */
app.use(methodOverride('newMethod'));



/*=======================ROUTES========================*/
/*routes - taking connection from rotues-default-defaultRoutes.js*/
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes)


/*=================PORT DETAILS=========================*/
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
