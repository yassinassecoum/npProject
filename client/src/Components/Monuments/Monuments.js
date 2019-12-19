import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
export class Monuments extends Component {
    constructor(){
        super()
        this.state={
            test:"123",
            status:"false"       
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
    render() {
        console.log(this.state,"monuments state")
        return (
            <div>
                <NavBar />
                <h1>Welcome to Monuments</h1>
                {(!this.state.status ? <p>Tu n'as pas accès a cet page , <a href="/login">Connecte toi</a></p> : <div>
                    <h1>Voici tout les monuments de la ville auquels tu as accès</h1>
                    <p>Musée a</p>
                     </div> 
                )}
            </div>
        )
    }
}

export default Monuments
