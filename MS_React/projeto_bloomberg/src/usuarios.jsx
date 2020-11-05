import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class Usuarios extends Component{
    constructor(props){
        super(props)
        this.state = {lista: [{nome: 'teste', senha: 'teste', acoes: [{ticker: 'teste', preco: '1', qtd: '1'}]}], usuario: {nome: '', senha: '', acoes: [{ticker: '', preco: '', qtd: ''}]}}
        this.handleChange= this.handleChange.bind(this)
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
        console.log(usuarios)
        var liUsuarios = usuarios.map(usuario => {
            
            var liAcoes = usuario.acoes.map(acao => {
                return (
                    <li 
                    key={acao.ticker}>Ticker: {acao.ticker} -- Preço Médio: {acao.preco} -- Quantidade de ações: {acao.qtd}
                    </li> 
                )
            })
            return (

                <li key={usuario.nome}>{usuario.nome}:{usuario.senha}:<ul>{liAcoes}</ul></li>
                
            )
        })
        return (
            <div>
                <ul> {liUsuarios} </ul>
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