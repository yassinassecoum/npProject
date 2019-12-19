import React, { Component } from 'react'
import './Footer.css'
import logo from '../../atomium.svg'

export class Footer extends Component {
    render() {
        return (
            <div>
            <footer  id="footer" >
                <img src={logo} alt="logo brussels"></img>
                <p>Copyright : <a href="https://github.com/yassinassecoum/npProject" target="_blank" rel="noreferer noopener">Yassin Assecoum </a> </p>
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
