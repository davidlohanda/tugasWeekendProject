import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { connect } from 'react-redux'
import swal from 'sweetalert'



const urlApi='http://localhost:2000'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  componentDidMount(){
    this.getDataCart()
  }

  getDataCart =() => {
      Axios.get('http://localhost:2000/cart')
      .then((res) => this.setState({rows : res.data}) )
      .catch((err) => console.log(err))
  }  

  plus=(id)=>{
    Axios.get('http://localhost:2000/cart/'+id)
    .then((res)=>{
        var update={...res.data, quantity:res.data.quantity+1}
        Axios.put('http://localhost:2000/cart/'+id, update)
        this.getDataCart()
    })
    .catch((err)=>console.log(err))
  }

  minus=(id)=>{
    Axios.get('http://localhost:2000/cart/'+id)
    .then((res)=>{
        if(res.data.quantity<2){
            Axios.delete('http://localhost:2000/cart/'+id)
            this.getDataCart()    
        }
        var update={...res.data, quantity:res.data.quantity-1}
        Axios.put('http://localhost:2000/cart/'+id, update)
        this.getDataCart()
    })
    .catch((err)=>console.log(err))
  }

    renderTotalPrice=()=>{
        var totalPrice=0
        this.state.rows.map((val)=>{
            totalPrice+=val.subtotal
        })
        return totalPrice
    }

  renderJsx = () => {
    var jsx =  this.state.rows.slice(this.state.page * this.state.rowsPerPage,  this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
    .map((val) => {
        return (
            <TableRow key={val.id}>
                <TableCell>{val.id}</TableCell>
                <TableCell><img src={val.img} width='50px'/></TableCell>
                <TableCell component="th" scope="row">
                {val.nama}
                </TableCell>
                <TableCell>{val.category}</TableCell>
                <TableCell>Rp. {val.harga}</TableCell>
                <TableCell>{val.discount}</TableCell>
                <TableCell><button onClick={()=>this.plus(val.id)}>+</button> {val.quantity} <button onClick={()=>this.minus(val.id)}>-</button></TableCell>
                <TableCell>
                    <button onClick={()=> this.onBtnDelete(val.id)}>Delete</button>
                </TableCell>
            </TableRow>
        )
    })
    return jsx
  }

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onBtnDelete = (id) => {
    Axios.delete('http://localhost:2000/cart/'+ id)
    .then((res) => {
      this.getDataCart()
    })
    .catch((err) => console.log(err))
}


btnCheckOut=()=>{
  Axios.get(urlApi+'/cart?userId='+this.props.id)
  .then((res)=>{
    if (res.data.length>0){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = dd + '/' + mm + '/' + yyyy;
      
      var cart = this.state.rows
 
          Axios.post(urlApi+"/history/",{...cart,tanggal:today})
          .then((res)=>{
            swal("Thank you","Please Come Again","success")
          })
          .catch((err)=>console.log(err))

          Axios.delete(urlApi+"/cart/")
          .then((res)=>{console.log(res)
            this.getDataCart()
          })
          .catch((err)=>console.log(err))
          
    }else{
      swal("Item Kosong","Blank","error")
    }
  })
  .catch((err)=>console.log(err))
}



  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
   
    
    return (
    <div className='container'>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>#</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>IMG</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>NAMA</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>CAT</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>HARGA</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>DISC</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}>QUANTITY</TableCell>
                  <TableCell style={{fontSize:'24px', fontWeight:'600'}}></TableCell>
              </TableRow>
          </TableHead>
            <TableBody>
               {this.renderJsx()}

              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
      <Paper className='mt-3'>
          <h2>Order</h2>
          <h3>Total : Rp.{this.renderTotalPrice()} </h3>
          <button onClick={this.btnCheckOut}>Checkout</button>
      </Paper>
      
      </div>
    );
  } 
  
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));