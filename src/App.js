import React, { Component } from 'react';
import './App.css';
import {Route,withRouter,Switch} from 'react-router-dom'
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
import PageNotFound from './components/PageNotFound'
import ScrollToTop from './components/scrollToTop'
import HistoryTransaksi from './components/HistoryTransaksi'
import Detail from './components/Detail';


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
        <ScrollToTop>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/products' exact component={ProductList}/>
            <Route path='/product-detail/:id' exact component={ProductDetails}/>
            <Route path='/manage' exact component={ManageProducts}/>
            <Route path='/cart' exact component={Cart}/>
            <Route path='/history' exact component={HistoryTransaksi}/>
            <Route path='/history-detail/:id' exact component={Detail}/>
            <Route path='*' component={PageNotFound} exact/>
          </Switch>
        </ScrollToTop>
      </div>
    );
  }
}

export default withRouter(connect(null,{keepLogin})(App))
