import React from 'react'
import Axios from 'axios';
import { connect } from 'react-redux'
import swal from 'sweetalert'

class ProductDetail extends React.Component{
    state = {product : {}}
    

    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var idUrl=this.props.match.params.id
        Axios.get('http://localhost:2000/products/'+idUrl)
        .then((res)=>this.setState({product:res.data}))
        .catch((err)=>console.log(err))
    }


    qtyValidation =() => {
        var qty = this.refs.inputQty.value
        if(qty < 1) {
            this.refs.inputQty.value = 1
        }
    }

    btnAddtoCart=(id)=>{
        var qty=parseInt(this.refs.inputQty.value)
        
        
        Axios.get('http://localhost:2000/products/'+id)
        .then((res)=>{
            console.log(res.data)
            var newItem={...res.data, quantity:qty, subtotal:qty*((1-res.data.discount/100)*res.data.harga) , username:this.props.username, userId:this.props.userId}
  
            Axios.get('http://localhost:2000/cart?userId='+this.props.userId+'&id='+id)
            .then((res)=>{
                if(res.data.length>0){
                    var updateItem={...newItem, quantity: res.data[0].quantity+qty , subtotal:(res.data[0].quantity+qty)*((1-res.data[0].discount/100)*res.data[0].harga) }
                    Axios.put('http://localhost:2000/cart/'+id, updateItem)
                    .then((res)=>{
                      console.log(res)
                      swal("Add To Cart","Success added more of this item","success")
                    })
                    .catch((err)=>console.log(err))
                }else{
                    Axios.post('http://localhost:2000/cart',newItem)
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


     render(){
        var {id,nama,img,discount,deskripsi,harga} = this.state.product
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                    <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={img} alt="Card image cap" />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',
                                     width:"50px",
                                     height:'22px',
                                     color : 'white',
                                     textAlign:'center',
                                     display:'inline-block'}} >
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px',
                                      fontWeight:'600',
                                      color:'#606060',
                                      marginLeft:'10px',
                                      textDecoration:'line-through'}}> Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                     fontWeight : '700',
                                     color:'#FF5722',
                                     marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px',
                                        color:'#606060',
                                        fontWeight:'700',
                                        fontSize:'14px'}}>Jumlah</div>
                                <input type='number' onChange={this.qtyValidation}  ref='inputQty' min={1} className='form-control' style={{width : '60px',
                                                                                              marginTop:'10px'}} />
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px',
                                            color:'#606060',
                                            fontWeight:'700',
                                            fontSize:'14px'}}>Catatan Untuk Penjual (Opsional)
                                </div>
                                <input type='text' style={{marginTop:'13px'}} placeholder='Contoh Warna Putih, Ukuran XL, Edisi Kedua' className='form-control'/>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>

                        </div>
                        {this.props.username === "" 
                        ?
                            <div className='row mt-4'>
                                <input type='button' disabled className='btn btn-danger col-md-3' value='Add To Wishlist' />
                                <input type='button' disabled className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input type='button' disabled className='btn btn-success col-md-3' value='Masukan Ke Keranjang' />
                            </div>
                        :
                            <div className='row mt-4'>
                                <input type='button' className='btn btn-danger col-md-3' value='Add To Wishlist' />
                                <input type='button' className='btn btn-primary col-md-3' value='Beli Sekarang' />
                                <input type='button' className='btn btn-success col-md-3' value='Masukan Ke Keranjang' onClick={()=>this.btnAddtoCart(id)} />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        userId:state.user.id
    }
}

export default connect(mapStateToProps)(ProductDetail);