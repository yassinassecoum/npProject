import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer';
import './Home.css'
export class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount(){

        //fetching meteo API
        fetch('http://api.weatherstack.com/current?access_key=517f4af44a62308c1ca67254975142bd&query=Brussels')
        .then((res) =>{
            if(res.status === 200){
                return res.json()
            }else{
                return false
                
            }
        })
        .then((data) => {
            this.setState({
                temperature:data.current.temperature,
                weathericon:data.current.weather_icons[1]
            })  

        })
    }

    render() {
        return (
            <div id="home" >
                <NavBar />
                <div id="mainHome">
                <h1 id ="title"><span id="black">Etes vous prets </span ><span id="yellow"> a découvrir </span><span id="red"> Bruxelles ?</span></h1>
        <h2 id="meteo"><i>Il fais actuellement {this.state.temperature} ° a Bruxelles ! </i> </h2>
                </div>
                <div class="container">
                <div class="article" id="firstArt">
                <div id="back"></div>
                    <div class="articleHeader">
                        <h1>Votre hiver a Bruxelles</h1>
                    </div>
                     <p class="articleContent">
                     Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprime
                          </p>
                  <button class="articleBut">En savoir plus</button>  
                </div>
                <div class="article" id="secondArt">
                <div id="back"></div>
                    <div class="articleHeader">
                        <h1>Brusselious</h1>
                    </div>
                     <p class="articleContent">
                     L’offre en matière de restaurants belgo-bruxellois est particulièrement grande dans la capitale. Le label Brusselicious répertorie les meilleures adresses qui se revendiquent de cette cuisine belge et qui y font honneur.
                          </p>
                  <button class="articleBut" >En savoir plus</button>  
                </div>

                <div class="article" id="thirdArt">
                <div id="back"></div>
                    <div class="articleHeader">
                        <h1>Bières hivernales</h1>
                    </div>
                     <p class="articleContent">
                     Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprime
                          </p>
                  <button class="articleBut">En savoir plus</button>  
                </div>


                </div>
                 <Footer />
            </div>
            
        )
    }
}

export default Home
