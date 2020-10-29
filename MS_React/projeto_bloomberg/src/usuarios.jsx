import React, { Component } from 'react'
import axios from 'axios'

export default class Usuarios extends Component{
    constructor(props){
        super(props)
        this.state = {lista: [{nome: 'testenome1'},{nome: 'testenome2'}]}
        axios.get('http://localhost:3000/users').then(resp=> {
            if(Math.floor(resp.status/100)===2){
                this.setState({lista:resp})
                return;
            }
            console.log(resp)
        }).catch(erro => console.log(erro))
    }
    render(){
        var usuarios = this.state.lista
        var liUsuarios = usuarios.map(usuario => {
            return (
                <li key={usuario.nome}>{usuario.nome}</li>
            )
        })
        return (
            <div>
                <ul> {liUsuarios} </ul>
            </div>
        )
    }

}