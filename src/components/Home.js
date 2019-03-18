import React from 'react'
import Carousel from './Carousel'
import ProductList from './ProductList'
import {connect} from 'react-redux'

class Home extends React.Component{
    // state={search:''}
    onBtnSearch=()=>{
        var search=this.refs.searchBook.value
        // this.setState({search})
    }

    render(){
        return(
            <div className="container">
        <div className="row">
            <div className="col-lg-3 mt-4">
                <div className="input-group mb-2">
                    <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... "  />
                    <div className="input-group-append">
                        <button onClick={this.onBtnSearch} className="btn btn-info" type="button" id="button-addon2" ><i className="fas fa-search" /></button>
                    </div>
                </div> 
                <div className="card p-2">
                    
                    <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                        <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  -1">Cari Produk</div>
                        <input className="form-control form-control-sm mb-2" placeholder="Cari Produk"></input>
                        
                        <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari Toko</div>
                        <input className="form-control form-control-sm mb-2" placeholder="Cari Toko"></input>
                        
                        <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Cari User</div>
                        <input className="form-control form-control-sm mb-2" placeholder="Cari User"></input> 

                        <button  className="btn btn-info"><i class="fas fa-filter"></i> Filter</button>                               
                    </form>

                </div>
                
            </div>
        
            <div className="col-lg-9">
                <div className="my-4">
                    <Carousel/>
                    <div style={{color:'blue', fontSize:'18px', fontWeight:'700'}}>
                        Selamat berbelanja, <span style={{textTransform:'capitalize'}}>{this.props.username}</span>!
                    </div>
                </div>
            </div>
        </div>
        <ProductList/>
        {/* <ProductList search={this.state.search}/> */}
    </div>
        )  
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username
    }
}

export default connect(mapStateToProps)(Home)