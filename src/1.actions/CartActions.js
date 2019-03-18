
export const cartLength=(qty)=>{
    return{
        type:'ADD_TO_CART',
        payload: qty
    }
}