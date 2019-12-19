import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import './Decouvrir.css'
import couteau from '../../ato.svg'
import beer from '../../cinq.svg'
export class Decouvrir extends Component {

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
                window.location.href = "http://localhost:3000/decouvrir";
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
                if(elem.category=="Musée" || elem.category=="Monuments" || elem.category=="Autre"){
                const obj= <div className="articles">
                <img src={elem.img}></img>
                <h4 id="titreArticle">{elem.title}</h4>
                <p><b>Categorie : </b> {elem.category} <br></br> <i>{elem.description} </i></p>
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
                window.location.href = "http://localhost:3000/dormir";
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
        console.log(this.state)
        return (
            <div>
                <NavBar />
                <div id="homeDecouvrir">
                <h1> <img id="fork" src={beer}></img> Decouvre les bons coins sur Bruxelles <img id="beer" src={couteau}></img> </h1>
                    {(this.state.status ? <div className="addPlace">
                    <h3>Ajouter un endroit a découvrir a bruxelles</h3>
                    <form id="formDecouvrir">
                            <label>Titre :</label>
                            <input ref="title" type="name" name="titre" ></input><br></br>
                            <label>Description :</label>
                            <input ref='description' type="name" name="description" ></input><br></br>
                            <label>Lien image :</label>
                            <input ref='img' type="img" name="img" ></input>  <br></br>
                            <label>Site web :</label>
                            <input ref="site" type="site" name="site"></input><br></br>
                            <label>Catégorie</label>
                            <select ref="category" name="category">
                                <option value="">Sélectionez une catégorie.</option>
                                <option value="Musée">Musée</option>
                                <option value="Monuments">Monuments</option>
                                <option value="Autre">Autres</option>
                            </select>
                            <br></br>
                            <input id="confirm"type="submit" value="CONFIRMER" onClick={(e) => this.addPost(e)}></input>
                            {(this.state.message ? <p id="error"> {this.state.message} </p> : '')}
                        </form>
                    </div> : <p>Connectez vous pour ajouter des lieux.</p>)}
                    
                    <div className="decouvrirContainer">
                    {this.state.contenu}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Decouvrir;