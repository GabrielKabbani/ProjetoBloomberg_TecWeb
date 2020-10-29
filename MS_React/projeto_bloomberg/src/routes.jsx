import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Usuarios from './usuarios'

export default props => (
    <Router>
        <Route path='/usuarios' component={Usuarios}/>
        <Redirect from='*' to='/usuarios'/>
    </Router>
)