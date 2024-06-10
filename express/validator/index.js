

exports.createPostValidator = (req, res, next)=>{
    req.body.check('title',"Write a title").nonEmpty();
    req.body.check('title',"Title must be  4 to 150 characters").isLength({
        min:4,
        max:150
    });
    req.body.check('body',"Write a body").nonEmpty();
    req.body.check('title',"Title must be  4 to 150 characters").isLength({
        min:4,
        max:2000
    });
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map((error)=> error.msg);
        return res.status(400).json({error:firstError});
    }
    next();
}


exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4-10 characters
    req.body.check('name', 'Name is required').notEmpty();
    // email is not null, valid and normalized
    req.body.check('email', 'Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        });
    // check for password
    req.body.check('password', 'Password is required').notEmpty();
    req.body.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};