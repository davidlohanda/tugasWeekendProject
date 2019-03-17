import React, { Component } from 'react';
import './App.css';
import {Route,withRouter} from 'react-router-dom'
import cookie from 'universal-cookie'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import {keepLogin} from './1.actions'
import {connect} from 'react-redux'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import ManageProducts from './components/admin/ManageProducts';
import Cart from './components/Cart'

const Cookie=new cookie()

class App extends Component {
  componentDidMount(){
    var dataCookie=Cookie.get('userData') 
    if(dataCookie!==undefined){
      this.props.keepLogin(dataCookie)
    }
  }
  
  
  render() {
    return (
      <div>
        <Header/>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/products' exact component={ProductList}/>
        <Route path='/product-detail/:id' exact component={ProductDetails}/>
        <Route path='/manage' exact component={ManageProducts}/>
        <Route path='/cart' exact component={Cart}/>
      </div>
    );
  }
}

export default withRouter(connect(null,{keepLogin})(App))
