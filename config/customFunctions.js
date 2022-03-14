module.exports = {

    selectOption: function (status, options) {
        //regular expression searching for the value of category and put the selected  
        //attribute at the database for particular database
        return options.fn(this).replace(new RegExp('value=\"' + status + '\"'), '$&selected="selected"');
    },

    isEmpty: function (obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    },
    isUserAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/login');
        }
    }


};
