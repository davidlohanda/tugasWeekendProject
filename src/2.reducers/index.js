import {combineReducers} from 'redux'
import  UserGlobal from './UserGlobal'
import ProductGlobal from './ProductGlobal'

export default combineReducers({
    user:UserGlobal,
    cart:ProductGlobal
})