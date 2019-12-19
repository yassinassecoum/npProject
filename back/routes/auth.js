const router = require('express').Router();
const User = require('../model/User');
const  {registerValidation,loginValidation} = require('../routes/validation')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
let status = false;
const nodemailer=require('nodemailer')


router.post('/register',async (req,res)=>{
    //Lets validate data before adding user
    console.log(req.body)
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).send('Erreur'+error.details[0].message);

    //Check if user already in DB
    const emailExist = await User.findOne({email:req.body.emailRegister})
    if (emailExist) return res.status(402).send('Email already exists');


    //Hash password
    const salt= await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.passwordRegister,salt);
//create newUSer
    const user = new User({
        name: req.body.nameRegister,
        email: req.body.emailRegister,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
 })
//password reset

router.post('/reset',async(req,res)=>{
    
    console.log(req.body.emailReset)
    const user = await User.findOne({email:req.body.emailReset})
    if (!user) return res.status(400).send('Not registered')
    const salt= await bcrypt.genSalt(10);
    var val = Math.floor(1000 + Math.random() * 9000);
    const hashPassword = await bcrypt.hash(val.toString(),salt);
    const newUser = new User({
        name:user.name,
        email:user.email,
        password:hashPassword
    })
    
    User.deleteOne({email : req.body.emailReset},(err) =>{
        console.log(err)
    })
    newUser.save();

    //send mail
    var smtpTransport = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'yassin.assecoum@hotmail.com',
            pass: process.env.HOTMAILPASS
        }
    });
    var mailOptions = {
        to: newUser.email,
        from: 'yassin.assecoum@hotmail.com',
        subject: 'Node.js Password Reset',
        text: 'Here is your new password : '+val+' ! If you did not request the reset , please contact Admin ! '
    };
    smtpTransport.sendMail(mailOptions, function (err) {
        console.log('mail sent');
    });
    res.json("good")
})


//LOGIN
router.post('/login', async (req,res)=>{
    console.log("rentre"+req.body.password)
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send('Error');
        //Check if email exist in DB
        const user = await User.findOne({email:req.body.email})
        if (!user) return res.status(400).send('Not registered')
        //PASSWORD is correct 
        const validPass= await bcrypt.compare(req.body.password,user.password)
        if(!validPass) return res.status(400).send('user / password incorrect')
        //create and assign a token
        
        const token = jwt.sign({_id:user._id,name:user.name},process.env.TOKEN_SECRET)
        status = {id:user._id,name:user.name, token: token,power:user.power};
        res.json(status)
});

router.get('/status', (req, res) => {
    if(status) res.json(status)
    else res.sendStatus(400)
})

router.get('/logout', (req, res) => {
    if(status){
        status=false;
        res.json(status)
    }
    else{ 
        res.sendStatus(400)
    }
})


module.exports = router;