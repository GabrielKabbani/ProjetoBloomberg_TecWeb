import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Route} from 'react-router-dom'

export default class Usuarios extends Component{
    constructor(props){
        super(props)
        console.log("LOCAL STORAGE NOME NO USUARIOS: ", localStorage.getItem('usuario'))
        var user = localStorage.getItem('usuario')
        var link = ("http://localhost:3000/user/" + user)
        console.log("LINK: ",link)
        this.state = {lista: [{nome: 'teste', senha: 'teste', acoes: [{ticker: 'teste', preco: '1', qtd: '1'}]}],usuario: {nome: user, senha: '', acoes: [{ticker: 'teste', preco: '1', qtd: '1'}]}}
        this.handleChange= this.handleChange.bind(this)
        axios.get(link).then(resp=> {
            if(Math.floor(resp.status/100)===2){
                this.state={lista: resp.data,redirectToReferrer: false}
                this.setState(this.state)
                        

                
                console.log("RESP DATA:", resp.data)
                console.log("STATE DEPOIS DE RESPDATA: ", this.state)
                return;
            }
            
        }).catch(erro => console.log(erro))
    }


    render(){

        if (this.state.redirectToReferrer===true){
            return(
                <Redirect to='/'/>
            )
        }
        var usuarios=this.state.lista
        console.log("state no render", this.state.lista)
        var liUsuario = usuarios.map(usuario => {
        var liAcoes = usuario.acoes.map(acao => {
            return (
                <li 
                key={acao.ticker}>Ticker: {acao.ticker} -- Preço Médio: {acao.preco} -- Quantidade de ações: {acao.qtd}
                </li> 
            )
        })
        return(
            <ul>{liAcoes}</ul>
        )
    })
    
        return (
            <div>
                <header><h1>Carteira de {this.state.lista[0].nome}:</h1></header> 
                <ul> {liUsuario} </ul>
    
                <a href='http://localhost:3001/'> Logout</a>
            </div>
        )
    }




    handleChange(event){
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value 
            return state
        }
        this.setState(handleState(this.state,event))
    }
}