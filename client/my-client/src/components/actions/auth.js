import * as api from '../Api/index'
import {currentuser} from './currentuser'




export const login= (authdata,nav) => async (dispatch) => {
    console.log(authdata)
try{
    const {data} = await api.logIn(authdata)
    dispatch({type:'AUTH',data})
    dispatch(loginHistory())
    dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))
   nav("/");

}catch(err){
   console.log(err)
}
}
export const sign_up= (authdata,nav) => async (dispatch) => {

    try{
        const {data} = await api.signUp(authdata)
        dispatch({type:'AUTH',data})
        dispatch(loginHistory())
        dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))
        nav("/");
    
    }catch(err){
       console.log(err)
    }

}


 export const loginHistory = () => async (dispatch) => {
   try{
        const {data} = await api.getLog()
        dispatch({type:'FETCH-DATA',payload:data})
        dispatch(currentuser(JSON.parse(localStorage.getItem('profile'))))
       
    }catch(err){
        console.log(err)
    }
 }

    
  


 


