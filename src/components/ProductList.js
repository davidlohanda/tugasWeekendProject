import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../support/ProductList.css'
import {connect} from 'react-redux'
import swal from 'sweetalert'

class ProductList extends React.Component{
    state={listProduct:[]}

    componentDidMount(){
        this.getProduct()
    }    
        
    getProduct=()=>{
        axios.get('http://localhost:2000/products')
        .then((res)=>this.setState({listProduct:res.data}))
        .catch((err)=>console.log(err))
    }

    btnAddtoCart=(id)=>{
      axios.get('http://localhost:2000/products/'+id)
      .then((res)=>{
          console.log(res.data)
          var newItem={...res.data, quantity:1, subtotal: ((1-res.data.discount/100)*res.data.harga) ,username:this.props.username, userId:this.props.userId}

          axios.get('http://localhost:2000/cart?userId='+this.props.userId+'&id='+id)
          .then((res)=>{
              if(res.data.length>0){
                  var updateItem={...newItem, quantity:res.data[0].quantity+1 , subtotal:(res.data[0].quantity+1)* ((1-res.data[0].discount/100)*res.data[0].harga)}
                  axios.put('http://localhost:2000/cart/'+id, updateItem)
                  .then((res)=>{
                    console.log(res)
                    swal("Add To Cart","Success added more of this item","success")
                  })
                  .catch((err)=>console.log(err))
              }else{
                  axios.post('http://localhost:2000/cart',newItem)
                  .then((res)=>{
                    console.log(res)
                    swal("Add To Cart","Success","success")
                  })
                  .catch((err)=>console.log(err))
              }
          })
          .catch((err)=>console.log(err))
      })
      .catch((err)=>console.log(err))
    }

    renderProductJsx=()=>{
        var jsx = this.state.listProduct.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3" style={{width: '18rem'}}>
                    <Link to={'/product-detail/' + val.id}><img className="card-img-top img" height='200px' src={val.img} alt="Card" /></Link>
                    
                    {/* { Pake if ternary (karena melakukan pengkondisian di dalam return)} */}


                    {   
                        val.discount > 0 ?
                        <div className='discount'>{val.discount}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama}</h4>

                    {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                        : null
                    }

                    <p style={{display:'inline' , marginLeft:'10px',fontWeight:'500'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                    <input type='button' className='d-block btn btn-primary' value='Add To Cart' onClick={()=>this.btnAddtoCart(val.id)} />
                    </div>
                </div>
            )
        })
        return jsx
    }


    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                    {this.renderProductJsx()}
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username,
        userId:state.user.id
    }
}

export default connect(mapStateToProps)(ProductList)