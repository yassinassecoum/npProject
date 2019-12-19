import React, { Component } from 'react'
import './Footer.css'
import logo from '../../atomium.svg'

export class Footer extends Component {
    render() {
        return (
            <div>
            <footer  id="footer" >
                <img src={logo} alt="logo brussels"></img>
                <p>Copyright Yassin Assecoum</p>
                <ul>
                    <li>Bla</li>
                    <li>Bla</li>
                    <li>Bla</li>
                </ul>
                

            </footer>
            </div>
        )
    }
}

export default Footer
