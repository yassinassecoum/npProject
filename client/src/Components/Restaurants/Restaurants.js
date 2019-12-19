import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import './Restaurants.css'
import couteau from '../../fork.svg'
import beer from '../../beer.svg'
export class Restaurants extends Component {

    constructor() {
        super()
        this.state = {
            status:"",
            contenu:"",
            message:"",
            idDelete:""
        }
    }
    async deletePost(e,id){
        e.preventDefault()
        await this.setState({
            idDelete:id
        })
        console.log(id)
        fetch('http://localhost:4000/api/posts/delete',
            {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(
                    this.state
                ),
            })
            .then((res)=>{
                window.location.href = "http://localhost:3000/restaurants";
            })
        
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
        fetch('http://localhost:4000/api/posts/')
        .then((res) =>{
            if(res.status === 200){
                return res.json()
            }else{
                console.log("Erreur")
                return false
            }
        })
        .then((data)=>{
            console.log(data[0])
            const contenu=data;
            const listObj=[]
            data.forEach((elem)=>{
                if(elem.category=="Restaurants" || elem.category=="Bars"){
                const obj= <div className="articles">
                <img src={elem.img}></img>
                <h4 id="titreArticle">{elem.title}</h4>
                <p><b> Categorie :  </b> {elem.category} <br></br> <i>{elem.description} </i></p>
            <p><b>Partagé par : </b> {elem.user}</p>
            {(this.state.status.power==1 ?<p  id="close" onClick={(e)=> this.deletePost(e,elem._id)}>X</p> :"" )}
            <a href={elem.site} target="_blank" rel="noopener noreferrer" >Site web</a>
                </div>;
                listObj.push(obj)
            }
        })
            this.setState({
                contenu:listObj
            })
        })

    }
    async addPost(e){
        e.preventDefault()
        //check if input are empty
        if(this.refs.title.value=="" || this.refs.description.value=="" ||this.refs.img.value=="" ||this.refs.site.value=="" ||this.refs.category.value==""){
            this.setState({
                message:"Veuillez remplir tout les champs !"
            })
        }
        else{
           await this.setState({
                title:this.refs.title.value,
                description:this.refs.description.value,
                img:this.refs.img.value,
                site:this.refs.site.value,
                category:this.refs.category.value,
                user:this.state.status.name
            })

            fetch('http://localhost:4000/api/posts/add',
                    {
                        method: "POST",
                        headers: new Headers({
                            'Content-Type': 'application/json',
                        }),
                        body: JSON.stringify(
                            this.state
                        ),
                    })
                    .then((res) =>{
                        if(res.status === 200){
                            console.log("Good add")
                            this.setState({
                                message:"Votre ajout a été effectuer avec succes!"
                            })
                            return res.json()
                        }else{
                            console.log("Erreur adding")
                            return false
                        }
                    })

        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div id="homeRestaurants">
                    
                    <h1> <img id="fork" src={couteau}></img> Decouvre les meilleurs Restaurants/Bars sur Bruxelles <img id="beer" src={beer}></img> </h1>
                    
                    {(this.state.status ? <div className="addPlace">
                    <h3>Partage un Restaurants/Bars</h3>
                    <form id="formRestaurants">
                            <label>Titre :</label>
                            <input ref="title" type="name" name="titre" ></input><br></br>
                            <label>Description :</label>
                            <input ref='description' type="name" name="description" ></input><br></br>
                            <label>Lien image :</label>
                            <input ref='img' type="img" name="img" ></input>  <br></br>
                            <label>Site web :</label>
                            <input ref="site" type="site" name="site"></input><br></br>
                            <label>Catégorie :</label>
                            <select ref="category" name="category">
                                <option value="Restaurants">Restaurants</option>
                                <option value="Bars">Bars</option>
                            </select>
                            <br></br>
                            <input id="confirm"type="submit" value="CONFIRMER" onClick={(e) => this.addPost(e)}></input>
                            {(this.state.message ? <p id="error"> {this.state.message} </p> : '')}
                        </form>
                    </div> : <p>Connectez vous pour ajouter des restaurants.</p>)}
                    
                    <div className="restaurantsContainer">
                    {this.state.contenu}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Restaurants;