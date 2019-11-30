const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var session = require('express-session')


//require pour le fichier.env
require('dotenv').config();
//creation du serveur sur le port au choix
const app = express();
const port = process.env.PORT || 8080;
//ejs
app.set('view-engine','ejs');
//middleware
app.use(session({secret: 'ssshhhhh'}));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true}
    );
//verif si la connexion a bien été effectuer
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB db connexion succces");
    }) 
const usersRouter = require('./routes/users')
//actual user
var maint = usersRouter.currentUser;
var connected=false;
console.log(maint)
app.use(express.static(__dirname + '/public'));
var idUser=usersRouter.idUser;
console.log(idUser)
        //page d'acceuil route
        app.get('/', function(req,res){
            res.redirect('./index')
})

        app.get('/index', function(req,res){
            maint=usersRouter.currentUser;
            connected=usersRouter.connected;
            console.log("on entre dans lindex",maint)
            res.render('index.ejs',{msg:maint,connected:connected})
})
        app.get('/login', function(req,res){
            if(maint!="Guest"){
            res.redirect('./index')
            }else{
                res.render('login.ejs',{connected:connected})
            }
            
});
        app.get('/register', function(req,res){
            if(maint!="Guest"){
                res.redirect('./index')
                }else{
            res.render('register.ejs',{connected:connected})
                }
})
        app.get('/logout', function(req,res){
            usersRouter.currentUser="Guest"
            usersRouter.connected=false;
            res.redirect('/index')
        })

        app.post('/login',usersRouter, function(req,res){
           
})
        app.post('/register',usersRouter, function(req,res){
            
})

        //route non definis redirige sur ca :
        app.use(function(req,res,next){
            res.setHeader('Content-Type','text/plain');
            res.status(404).send('Page introuvable');
 });

app.listen(port,()=>{
     console.log(`server is running on port: ${port}`)
})