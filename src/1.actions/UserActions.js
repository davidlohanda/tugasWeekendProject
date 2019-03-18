import axios from 'axios'



// =============================LOGIN==================================================
export const onLogin=(username,password)=>{
    return(dispatch)=>{
        dispatch({
            type:'LOADING'
        })
    
        axios.get('http://localhost:2000/users',{params:{username,password}})
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:{username:res.data[0].username, role:res.data[0].role, id:res.data[0].id}
                })
            }else{
                dispatch({
                    type:'USER_NOT_FOUND'
                })
            }
        })
        .catch((err)=>{
            dispatch({
                type:'SYSTEM_ERROR'
            })
        })
    }
}

export const keepLogin=(cookie)=>{
    return(dispatch)=>{
        axios.get('http://localhost:2000/users?username='+cookie)
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:{username:res.data[0].username, role:res.data[0].role, id:res.data[0].id}
                })
            }
        })
    }
}

export const resetUser=()=>{
    return{
        type:'RESET_USER'
    }
}

// =============================REGISTER==============================================
export const userRegister=(username,password,email,phone)=>{
    return(dispatch)=>{
        dispatch({
            type:'LOADING'
        })

        axios.get('http://localhost:2000/users?username='+username)
        .then((res)=>{
            if(res.data.length>0){
                dispatch({
                    type:'USERNAME_NOT_AVAILABLE'
                })
            }else{
                axios.post('http://localhost:2000/users',{username,password,email,phone})
                .then((res)=>{
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        payload:username
                    })
                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>{
            dispatch({
                type:'SYSTEM_ERROR'
            })
        })
    }
}

