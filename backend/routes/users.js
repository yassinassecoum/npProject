const router = require('express').Router();
let User= require('../models/user.model');
var currentUser = "Guest";
const bcrypt = require('bcrypt');
var idUser;


router.route('/register').post((req,res)=>{
    console.log("1")
    if((req.body.name!="" && req.body.name !="undefined") && (req.body.email!=""&& req.body.email !="undefined") && (req.body.password!=""&& req.body.password !="undefined") && (req.body.confirmPassword!=""&& req.body.confirmPassword !="undefined")&&(req.body.password==req.body.confirmPassword)){
        console.log("tout les champs sont remplis")
        const name = req.body.name;
        const email = req.body.email;
        var password = req.body.password;
        const power =0;
        //hash
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            password=hash;
            const newUser= new User({
                name,
                email,
                password,
                power});
        //save in DB
            newUser.save()
          });
        res.render('./register.ejs',{msg : "Register GOOD "})
    }
    else{
        res.render('./register.ejs',{msg : "Register not GOOD , try again "})
    }
})

//login

router.route('/login').post((req,res,next)=>{

    if((req.body.email!=""&& req.body.email !="undefined") && (req.body.password!=""&& req.body.password !="undefined")){
        var pass=req.body.password;
        User.find({ email: req.body.email}, function (err, docs) {
            if(docs.length){
                console.log("dans la table")
                console.log(docs)
                if(bcrypt.compareSync(pass, docs[0].password)){
                    currentUser=docs[0].name;
                    idUser=docs[0].id;
                    var connected=true;
                    module.exports.connected=connected;
                    module.exports.currentUser=currentUser
                    module.exports.idUser=idUser;
                    console.log("set current user"+currentUser)
                    res.redirect("./index")
                    next();
                }
                else{
                    res.redirect("./login")
                }
 
            }
            else{
                console.log("pas dans la table"+docs)
                res.render('./login.ejs',{msg : "try again "})
            }
        });
        //delete user
        // User.deleteOne({email:req.body.email}).then(next)
 
    }
    else{
        res.render('./login.ejs',{msg : "try again "})
    }

})

module.exports = router;
module.exports.currentUser=currentUser;