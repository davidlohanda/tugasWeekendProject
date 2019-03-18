const INITIAL_STATE={cart:0}

export default(state=INITIAL_STATE,action)=>{
    if(action.type='ADD_TO_CART'){
        return{...INITIAL_STATE, cart:action.payload}
    }else{
        return state
    }
}