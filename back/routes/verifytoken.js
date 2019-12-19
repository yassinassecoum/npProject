const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if (!token) return res.status(400).send('Acces denied');

    try{
        const verified = jwt.verify(tokn,process.env.TOKEN_SECRET)
        req.user= verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token')
    }
}