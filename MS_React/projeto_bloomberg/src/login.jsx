import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Route} from 'react-router-dom'
import Routes from './routes'


export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {usuario: {nome: '', senha: ''}, redirectToReferrer: false}
        this.handleChange= this.handleChange.bind(this)
        this.login = this.login.bind(this)
    
    }


    render(){

        if (this.state.redirectToReferrer===true){
            return(
                <Redirect to='/usuarios'/>
            )
        }

        return (
            <div>
                <header>Página de login</header>
                <ul>
 
                        <label>Nome: </label>
                        <input name="nome"
                        value = {this.state.usuario.nome}
                        onChange={this.handleChange}/>
                        <label>    Senha: </label>
                        <input name="senha"
                        value = {this.state.usuario.senha}
                        onChange={this.handleChange}/>

                        <button onClick={this.login}> Login</button>
                        <a href='http://localhost:3001/cadastro'> Ir pra página de cadastro</a>
 
                </ul>
            </div>
        )
    }


    login(){
        console.log("entrou no login")
        console.log(this.state.usuario)
        axios.post('http://localhost:3000/user', this.state.usuario).then(resp=>{
            if(Math.floor(resp.status/100)===2 && resp.data.worked === true){
                console.log("RESP:",resp)
                this.setState((state) => {
                    return {
                        
                        usuario: {nome: this.state.usuario.nome, senha: this.state.usuario.senha},
                        redirectToReferrer: true
                        
                    }
                 })
                
                return;
            }
            
        }).catch(erro => console.log(erro))
    }


    handleChange(event){
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value 
            return state
        }
        this.setState(handleState(this.state,event))
    }
}