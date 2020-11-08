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
        this.state = {lista: [{nome: 'teste', senha: 'teste', acoes: [{ticker: 'teste', preco: '1', qtd: '1', lucro: '1'}]}],usuario: {nome: user, senha: '', acoes: [{ticker: 'teste', preco: '1', qtd: '1', lucro: '1'}]}, adiciona:false}
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
        this.add=this.add.bind(this);
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
 
        
        var usuarios=this.state.lista
        console.log("state no render", this.state.lista)
        if (this.state.adiciona === true){
            return (
                <div>
                    <header><h1>Adicionar ação na carteira</h1></header>
                        <label>Ticker: </label>
                        <input name="ticker"/>
                        <label>    Preço médio: </label>
                        <input name="preco"/>
                        <label>    Quantidade: </label>
                        <input name="qtd"/>
                        <script>
                            var ticker = (""+document.getElementsByName("ticker")[0].value);
                            console.log("TICKER", ticker)
                            var preco = (""+document.getElementsByName("preco")[0].value);
                            console.log("PRECO", preco)
                            var qtd = (""+document.getElementsByName("qtd")[0].value);
                            console.log("QUANTIDADE", qtd)
                        </script>
                        <button onClick={() => this.handleSubmit([(""+document.getElementsByName("ticker")[0].value),(""+document.getElementsByName("preco")[0].value),(""+document.getElementsByName("qtd")[0].value)])}>Inserir</button>
                    <a href='http://localhost:3001/usuarios'> Voltar</a>
                </div>
                
            )





        }else{
        var liUsuario = usuarios.map(usuario => {
        var liAcoes = usuario.acoes.map(acao => {
            return (
                <li 
                key={acao.ticker}>Ticker: {acao.ticker} -- Preço Médio: {acao.preco} -- Quantidade de ações: {acao.qtd} -- Lucro obtido: {acao.lucro}
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
                <button onClick={this.add}>Adicionar ação</button>
                <a href='http://localhost:3001/'> Logout</a>
            </div>
        )
    }}
    add(){
        console.log("STATE NO ADD", this.state)
        if (this.state.adiciona===false){
            var handleState = (state) => {
                state.adiciona = true
                return state
            }
            this.setState(handleState(this.state))
        }else{
            var handleState = (state) => {
                state.adiciona = false
                return state
            }
            this.setState(handleState(this.state))

        }

        
    }




    handleChange(event){
        var handleState = (state, event) => {
            state.usuario[event.target.name] = event.target.value 
            return state
        }
        this.setState(handleState(this.state,event))
    }
    handleSubmit(event){
        var handleState = (state, array) => {
            console.log("PROPS NO HANDLESUBMIT", array)
            var tick = array[0]
            var price = array[1]
            var vol = array[2]
            var acao = {ticker: tick, preco: price, qtd: vol}
            state.lista[0].acoes.push(acao)
            state.adiciona=false
            var link = 'http://localhost:3000/users/'+this.state.usuario.nome
            console.log("LINK PUT", link)
            axios.put(link, state.lista)
            return state
        }
        
        
        this.setState(handleState(this.state,event))
        console.log("STATE NO HANDLESUBMIT", this.state)
    }
}