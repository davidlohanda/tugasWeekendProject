import React from 'react'
import Axios from 'axios'

class Detail extends React.Component{
    state = {history : {}}
    

    componentDidMount(){
        this.getDataApi()
    }
    getDataApi=()=>{
        var idUrl=this.props.match.params.id
        Axios.get('http://localhost:2000/history/'+idUrl)
        .then((res)=>{
            console.log(res.data)
            this.setState({history:res.data})})
        .catch((err)=>console.log(err))
    }


    historyDetail=()=>{
        // var showHistoryDetail=''
        // for(let i=0;i<this.state.history.item.length;i++){
        //     showHistoryDetail+=`<tr>
        //     <th scope="row">{i+1}</th>
        //     <td>{val.nama}</td>
        //     <td>{val.harga}</td>
        //     <td>{val.discount}%</td>
        //     <td>{val.quantity}</td>
        //     <td>Rp.{val.subtotal}</td>
        // </tr>`
        // }
        // return showHistoryDetail

                var showHistoryDetail=this.state.history.item.map((val,i)=>{
                        return      <tr>
                                    <th scope="row">{i+1}</th>
                                    <td>{val.nama}</td>
                                    <td>{val.harga}</td>
                                    <td>{val.discount}%</td>
                                    <td>{val.quantity}</td>
                                    <td>Rp.{val.subtotal}</td>
                                </tr>        
                    
                })
                return showHistoryDetail
            }
            
    
    
    render(){
        return(
            <div>
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
                    KAK FIKRI SAYA SUDAH BUNTU KENAPA DIA GAMAU GET RES.DATANYA, SEHARUSNYA MUNCUL,MOHON DILIHAT KODENYA DI Detail.js
                    {/* {this.historyDetail()}             */}
                </table> 
            </div>
        )
    }
}

export default Detail