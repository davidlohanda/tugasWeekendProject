import React from 'react'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, NavLink,DropdownToggle,DropdownItem,DropdownMenu} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import {resetUser} from '../1.actions'
import axios from 'axios'

const Cookie=new cookie()

class Header extends React.Component{
    state={cart:[]}
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    onBtnLogout=()=>{
        Cookie.remove('userData')
        this.props.resetUser()
    }

    componentDidUpdate(){
        this.renderCartLength()
    }

    
    renderCartLength=()=>{
        axios.get('http://localhost:2000/cart?userId='+this.props.id)
        .then((res)=>{
            var cartLength=0
            res.data.map((val)=>{
                cartLength+=val.quantity
            })
            this.setState({cartLength:cartLength})
        })
        .catch((err)=>console.log(err))
    }
    
    render(){
        if(this.props.username !== ''){
            return  <div style={{marginBottom:"75px"}}>
            <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <div className="input-group border-right" style={{width:"350px"}}>
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                            <div className="input-group-append mr-2">
                                <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        </NavItem>
                        
                        <NavItem>
                            <NavLink>Hi , {this.props.username}</NavLink>
                        </NavItem>
                        <NavItem>
                            <Link to="/cart"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i class="fas fa-shopping-cart"></i> Cart <span style={{color:'blue'}}>{this.state.cartLength}</span> </NavLink></Link>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            Menu
                            </DropdownToggle>
                            <DropdownMenu right>
                            {
                                this.props.role === 'admin' 
                                ? 
                                <Link to='/manage'> 
                                    <DropdownItem>
                                        Manage Product
                                    </DropdownItem> 
                                </Link>
                                :
                                null
                            }
                            
                            <Link to='/history'>
                                <DropdownItem>
                                    Histori Transaksi
                                </DropdownItem>
                            </Link>
                            <DropdownItem>
                                Edit Profile
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.onBtnLogout}>
                                Log Out
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        }

        return(
            <div style={{marginBottom:"75px"}}>
            <Navbar color="light" light expand="md" fixed="top">
                <NavbarBrand className="ml-2" ><Link to='/'> <img src="http://www.logospng.com/images/43/letter-f-bootstrap-logos-43177.png" alt="brand" width="30px" /> </Link> </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <div className="input-group border-right" style={{width:"350px"}}>
                            <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                            <div className="input-group-append mr-2">
                                <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                            </div>
                        </div> 
                        </NavItem>
                        
                        <NavItem>
                            <Link to="/register"><NavLink className="btn btn-default border-secondary mr-1" style={{fontSize:"14px"}}><i className="fas fa-user-plus" /> Register</NavLink></Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login"><NavLink className="btn btn-default border-primary" style={{fontSize:"14px"}}><i className="fas fa-sign-in-alt" /> Login </NavLink></Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        username:state.user.username,
        role:state.user.role,
        id:state.user.id
    }
}

export default connect(mapStateToProps,{resetUser})(Header)