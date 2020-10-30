import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Usuarios extends Component{
    constructor(props){
        super(props)
        this.state = {lista: [{nome: 'teste', senha: 'teste'}], usuario: {nome: ''}}
        this.handleChange= this.handleChange.bind(this)
        this.cadastro = this.cadastro.bind(this)
        axios.get('http://localhost:3000/users').then(resp=> {
            if(Math.floor(resp.status/100)===2){
                this.setState({lista:resp.data})
                return;
            }
            console.log(resp)
        }).catch(erro => console.log(erro))
    }


    render(){
        var usuarios = this.state.lista
        var liUsuarios = usuarios.map(usuario => {
            return (
                <li key={usuario.nome}>{usuario.nome}:{usuario.senha}</li>
                
            )
        })
        return (
            <div>
                <ul> {liUsuarios} </ul>
                <ul>
                    <li>
                        <label>Nome</label>
                        <input name="nome"
                        value = {this.state.usuario.nome}
                        onChange={this.handleChange}/>
                        <label>Senha</label>
                        <input name="senha"
                        value = {this.state.usuario.senha}
                        onChange={this.handleChange}/>

                    </li>
                    <li>
                        <button onClick={this.cadastro}>Registrar</button>
                    </li>
                </ul>
            </div>
        )
    }


    cadastro(){
        axios.post('http://localhost:3000/users', this.state.usuario).then(resp=>{
            if(Math.floor(resp.status/100)===2){
                this.setState((state) => {
                    return {
                        lista: [...state.lista, state.usuario],
                        usuario: {username: ''},
                        redirectToRefferer: true
                    }
                 })
                return;
        }
        console.log(resp)
    })
    .catch(erro => console.log(erro))
    }


    handleChange(event){
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value 
            return state
        }
        this.setState(handleState(this.state,event))
    }
}