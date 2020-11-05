import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Route} from 'react-router-dom'
import Routes from './routes'


export default class Cadastro extends Component{
    constructor(props){
        super(props)
        this.state = {lista: [{nome: 'teste', senha: 'teste'}], usuario: {nome: '', senha: ''}, redirectToReferrer:false}
        this.handleChange= this.handleChange.bind(this)
        this.cadastro = this.cadastro.bind(this)
    }


    render(){
        var usuarios = this.state.lista
        
        if (this.state.redirectToReferrer===true){
            return(
                <Redirect to='/'/>
            )
        }

        return (
            <div>
                <header>Página de cadastro</header>
                <ul>
 
                        <label>Nome: </label>
                        <input name="nome"
                        value = {this.state.usuario.nome}
                        onChange={this.handleChange}/>
                        <label>    Senha: </label>
                        <input name="senha"
                        value = {this.state.usuario.senha}
                        onChange={this.handleChange}/>

                        <button onClick={this.cadastro}>   Registrar</button>
 
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
                        usuario: {nome: ''},
                        redirectToReferrer: true
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