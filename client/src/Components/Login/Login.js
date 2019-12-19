import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer';
import './Login.css'

export class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            message: "",
            password: "",
            status: "",
            messageRegister: "",
            emailRegister: "",
            nameRegister: "",
            passwordRegister: "",
        }
    }
    componentDidMount() {
        this.setState({
            message: "",
            messageRegister: ""
        })
        fetch('http://localhost:4000/api/user/status')
            .then((res) => {
                if (res.status === 200) {
                    console.log(' Already connected ')
                    return res.json()
                } else {
                    console.log("Not connected")
                    return false
                }
            })
            .then((data) => {
                this.setState({
                    status: data
                })
            })
    }

    logout(e) {
        e.preventDefault();
        fetch('http://localhost:4000/api/user/logout')
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    return false
                }
            })
            .then((data) => {
                this.setState({
                    status: data
                })
            })

    }
    async register(e) {
        e.preventDefault();
        if (this.refs.emailRegister.value == "" || this.refs.nameRegister.value == "" || this.refs.passwordRegister.value == "" || this.refs.passwordRegisterConfirm.value == "") {
            this.setState({
                messageRegister: "Remplissez tout les champs !"
            })
        } else {
            if (this.refs.passwordRegister.value != this.refs.passwordRegisterConfirm.value) {
                this.setState({
                    messageRegister: "Veuillez entrer le meme mot de passe "
                })
            } else {

                await this.setState({
                    nameRegister: this.refs.nameRegister.value,
                    emailRegister: this.refs.emailRegister.value,
                    passwordRegister: this.refs.passwordRegister.value
                })

                fetch('http://localhost:4000/api/user/register',
                    {
                        method: "POST",
                        headers: new Headers({
                            'Content-Type': 'application/json',
                        }),
                        body: JSON.stringify(
                            this.state
                        ),
                    })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log('Register good in ')
                            this.setState({
                                messageRegister: "Votre inscription est réussi , connectez vous !",
                            })
                            this.refs.passwordRegister.value="";
                            this.refs.nameRegister.value="";
                            this.refs.emailRegister.value="";
                            this.refs.passwordRegisterConfirm.value="";
                            return res.json()
                        } else if (res.status === 402) {
                            this.setState({
                                messageRegister: "Email déja utilisé !",
                            })
                            return res.json()
                        }
                        else {
                            this.setState({
                                messageRegister: "Veuillez réesayer!",
                            })
                            return res.json()
                        }
                    })

            }
        }
    }

    async reset(e){
        e.preventDefault();
        console.log(this.refs.emailReset.value)

        
        await this.setState({
            emailReset: this.refs.emailReset.value,
        })

        fetch('http://localhost:4000/api/user/reset',
        {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(
                this.state
            ),
        })
        .then((res) => {
            if (res.status === 200) {
                this.setState({
                    messageReset:"Votre mdp a bien été réinitialiser , check tes mails!"
                })
                return res.json()
            } else {
                this.setState({
                    messageReset:"Email pas dans la DB"
                })
                return res.json()
            }
        })

    }
    async loginVerify(e) {
        e.preventDefault();
        await this.setState({
            email: this.refs.email.value,
            password: this.refs.password.value,
        })

        fetch('http://localhost:4000/api/user/login',
            {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(
                    this.state
                ),
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('Logged in ')
                    this.setState({
                        message: "",
                    })
                    return res.json()
                } else {
                    console.log("Erreur veuillez reesayer")
                    this.setState({
                        message: "Veuillez Réesayer",
                    })
                    return res.json()
                }
            })
            .then(data => {
                console.log(data);
                this.setState({
                    status: data,
                })
                window.location.href = "http://localhost:3000/";
            })
    }
    render() {
        return (
            <div>
                <NavBar status={this.state} />
                <h2 id="titleLogin">En vous connectant sur le site , vous aurez la possibilité de contribuer au site.<br></br><h6>Partagez vos activités/endroits préferés a Bruxelles !</h6></h2>
                <div id="containerLogin">
                    <div className="loginForm">
                        <h2>CONNEXION</h2>
                        <form>
                            <p>Email :</p>
                            <input ref="email" type="email" name="email" ></input>
                            <p>Mot de passe :</p>
                            <input ref='password' type="password" name="password" ></input><br></br>
                            <input id="confirm"type="submit" value="CONFIRMER" onClick={(e) => this.loginVerify(e)}></input><br></br>

                            {(this.state.message ? <p id="error"> {this.state.message} </p> : '')}
                        </form><br></br>
                    </div>
                    <div className="resetForm" id="reset"> 
                        <p>Réinitialiser le mot de passe en entrant l'email ! </p>
                            <input type="email" name="email" ref="emailReset"></input><br></br>
                            <a href="" onClick={(e)=> this.reset(e)} > Réinitialiser le mdp</a><br></br>
                            {(this.state.messageReset ? <p id="succes"> {this.state.messageReset} </p> : '')}
                        </div>
                    <div className="registerForm">
                        <h2>INSCRIPTION</h2>
                        <form>
                        <p>Nom :</p>
                            <input ref="nameRegister" type="name" ></input>
                            <p>Email :</p>
                            <input ref="emailRegister" type="email" name="email" ></input>
                            <p>Mot de passe :</p>
                            <input ref='passwordRegister' type="password" name="password" ></input>
                            <p>Confirmation mot de passe :</p>
                            <input ref='passwordRegisterConfirm' type="password" name="password" ></input><br></br>
                            <input id="confirm" type="submit" value="CONFIRMER" onClick={(e) => this.register(e)}></input>
                            {(this.state.messageRegister ? <p id="error"> {this.state.messageRegister} </p> : '')}
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Login
