//ada waktu transaksi, ada detail transaksi
//setelah checkout
//{id,iduser,tanggal,item}
//dari cart dihapus lalu dipindah ke history

//id,tanggal checkout,jumlah item,total harga

//history detail, nama harga qty total

import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PageNotFound from './PageNotFound'

class HistoryTransaksi extends React.Component{
    state={history:[]}

    componentDidMount(){
        this.getDataHistory()
    }

    getDataHistory=()=>{
        axios.get("http://localhost:2000/history")
        .then((res)=>this.setState({history:res.data}))
        .catch((err)=>console.log(err))
    }

    historyDetail=(id)=>{
        for(let i=0;i<this.state.history.length;i++){
            var showHistoryDetail=this.state.history[i].item.map((val,i)=>{
                    return      <tr>
                                <th scope="row">{i+1}</th>
                                <td>{val.nama}</td>
                                <td>{val.harga}</td>
                                <td>{val.discount}%</td>
                                <td>{val.quantity}</td>
                                <td>Rp.{val.subtotal}</td>
                            </tr>
                
                
            })
        }
        return showHistoryDetail

        // swal(
        //     <div>
        //         <h2>{val.item.nama}</h2>
        //         <img src={val.item.img} width='80px'></img>
        //         <h3>Checkout Date: {val.tanggal}</h3>
        //         <hr></hr>
        //         <h4>ProductId: {val.item.id}</h4>
        //         <h4>Price:Rp. {val.item.harga}</h4>
        //         <h4>Discount: {val.item.discount}%</h4>
        //         <h4>Quantity: {val.item.quantity}</h4>
        //         <h4>Subtotal: Rp.{val.item.subtotal}</h4>
        //     </div>
        // )
    }

    renderHistory=()=>{
        var showHistory=this.state.history.map((val,i)=>{
            return <tbody>
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{val.tanggal}</td>
                        <td>{val.itemVar}</td>
                        <td>Rp.{val.total}</td>
                        {/* onClick={()=>this.historyDetail(val.id) */}
                        <td><Link to={'history-detail/'+val.id}><input type='button'  value='detail'/></Link></td>
                    </tr>
                    </tbody>
          
        })
        return showHistory
    }

    // renderTotalPrice=()=>{
    //     var totalPrice=0
    //     this.state.history.map((val)=>{
    //         totalPrice+=val.subtotal
    //     })
    //     return totalPrice
    // }

    render(){
        if(this.props.username===''){
            return <PageNotFound/>
        }
        return(
            <div>
                {this.state.history.length>0?
                <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Item</th>
                            <th scope="col">Total</th>
                            <th scope="col">Act</th>

                        </tr>
                    </thead>
                    {this.renderHistory()}
                </table>
                    <br></br><br></br><br></br>
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Disc</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Total</th>

                        </tr>
                    </thead>
                    {this.historyDetail()}
                </table>

                </div>
                :
                <div className='container'> 
                <h2>No History Yet</h2>
                </div>
                }
            </div>
        
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username
    }
}
export default connect(mapStateToProps)(HistoryTransaksi)