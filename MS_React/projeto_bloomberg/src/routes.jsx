import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Usuarios from './usuarios'
import Login from './login'
import Cadastro from './cadastro'

export default props => (
    <Router>
    <Switch>
        <Route exact path='/'> 
            <Login />
        </Route>
        <Route path='/usuarios'> 
            <Usuarios />
        </Route>
        <Route path='/cadastro'> 
            <Cadastro />
        </Route>
    </Switch>
    </Router>
)



