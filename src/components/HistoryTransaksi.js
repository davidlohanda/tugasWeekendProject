//ada waktu transaksi, ada detail transaksi
//setelah checkout
//{id,iduser,tanggal,item}
//dari cart dihapus lalu dipindah ke history

//id,tanggal checkout,jumlah item,total harga

//history detail, nama harga qty total

import React from 'react'
import axios from 'axios'
import swal from '@sweetalert/with-react'


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

    historyDetail=(val)=>{
        swal(
            <div>
                <h2>{val.nama}</h2>
                <img src={val.img} width='80px'></img>
                <h3>Checkout Date: {val.tanggal}</h3>
                <hr></hr>
                <h4>ProductId: {val.id}</h4>
                <h4>Price:Rp. {val.harga}</h4>
                <h4>Discount: {val.discount}%</h4>
                <h4>Quantity: {val.quantity}</h4>
                <h4>Subtotal: Rp.{val.subtotal}</h4>
            </div>
        )
    }

    renderHistory=()=>{
        var showHistory=this.state.history.map((val,i)=>{
            return <tbody>
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{val.tanggal}</td>
                        <td>{val.nama}</td>
                        <td>{val.quantity}</td>
                        <td>{val.harga}</td>
                        <td>{val.discount}</td>
                        <td>{val.subtotal}</td>
                        <td><input type='button' onClick={()=>this.historyDetail(val)} value='detail'/></td>
                    </tr>
                    </tbody>
          
        })
        return showHistory
    }

    renderTotalPrice=()=>{
        var totalPrice=0
        this.state.history.map((val)=>{
            totalPrice+=val.subtotal
        })
        return totalPrice
    }

    render(){
        return(
            <div>
                {this.state.history.length>0?
                <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">Button</th>
                        </tr>
                    </thead>
                    {this.renderHistory()}
                </table>
                
                <h4>Total : Rp.{this.renderTotalPrice()}</h4>
                <h4>Total Item : {this.state.history.length}</h4> 
                </div>
                : 
                <h1>No History Yet</h1>
                }
            </div>
        
        )
    }
}

export default HistoryTransaksi