import React, { Component } from 'react'
import './NavBar.css'
import logo from '../../atomium.svg'

export class NavBar extends Component {
    constructor(){
        super()
        this.state={
            status:false,       
        }
    }

    componentDidMount(){

        fetch('http://localhost:4000/api/user/status')
        .then((res) =>{
            if(res.status === 200){
                console.log(' Already connected ')
                return res.json()
            }else{
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
    logout(e){
        e.preventDefault();
        fetch('http://localhost:4000/api/user/logout')
        .then((res) =>{
            if(res.status === 200){
                return res.json()
            }else{
                return false
            }
        })
        .then((data) => {
            this.setState({
                status: data
            })
        })
        window.location.href = "http://localhost:3000/";
    }
    
    render() {
        return (
            
    <div className="navbar">
        <a href="/"><img id="logo" src={logo} alt="logo" width="100px" height="100px"></img></a>
        <ul>

        <li id="firstNav" className=""><a href="/decouvrir">Découvrir</a>
            {/* <ul>
                <li><a href="/musées">Musées</a></li>
                <li><a href="/monuments">Monuments</a></li>
                <li><a href="/parcs">Parcs</a></li>
            </ul> */}
            
            </li>
            <li><a href="/dormir">Dormir</a>
            </li>
            <li><a href="/restaurants">Manger & Boire</a>
            </li>
            <li><a href="/vienocturne">Vie Nocturne</a></li>
            {(this.state.status ? <li id="connexion"><a  onClick={(e)=> this.logout(e)}>Deconnexion</a></li>  : <li id="connexion"><a  href="/login">Connexion</a></li>)}
            
        </ul> 

    </div>
        )
    }
}

export default NavBar;
