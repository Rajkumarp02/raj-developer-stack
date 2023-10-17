import React, { useState } from 'react'
import logo from '../../assests/logo.png'
import AboutAuth from './AboutAuth';
import './Auth.css'
import { useDispatch } from 'react-redux';
import { sign_up,login } from '../actions/auth'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Auth() {

  const [signup,setSignup]  = useState(false);
  const [name,setName]   = useState('');
  const [email,setEmail]   = useState('');
  const [password,setPassword]   = useState('');
  const [number,setNumber] = useState('');
  
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userAgent = window.navigator.userAgent;
  
 const handleSubmit =  async (e) => {
    e.preventDefault()
   const userIp = await axios.get("https://api.ipify.org").then(res => res.data)
    if(!email && !password){
    alert('please enter email and pw')
    }

    if(signup){
      if(!name){
        alert('please enter the name')
      }
      dispatch(sign_up({name,email,password,number,userAgent,ipAdd:userIp
      },nav))
    }else{
        dispatch(login({email,
          password,
          },nav))
    }
    console.log({userAgent,email,password});
    
    setEmail("");
    setName("");
    setPassword("");
    setNumber("");
  }
  


  const handleClick = () => {
    setSignup(!signup);
  }
  return (

    
   <div class='auth'>
   

   {
    signup && <AboutAuth />
   }

    <div class='container'>
    {!signup && <img class='logoa' src={logo} alt='logo'/>}
   

    <form onSubmit={(e) => handleSubmit(e)}>
    {
      signup && (
       <>
       
      <div style={{display:"flex"}}>  
         <h4>DisplayName</h4>
      </div>
      <input type='name' name='name' onChange={(e) => setName(e.target.value)} />
      </>
      )
    }
     { !signup && (
      <>
       <div style={{display:"flex"}}>  
       <h4>Email</h4>
      </div>
     
      <input type='email' name='email'  onChange={(e) => setEmail(e.target.value)} />
      <div style={{display:"flex"}}>
      <h4>Password</h4>
      {!signup && <h4 style={{marginLeft:"50px", marginTop:"3px" ,fontSize:"13px" , fontWeight:"400",color:"rgb(21, 158, 212)"}}>Forget Password?</h4>}
      </div>
      <input type='password' name='pass'   onChange={(e) => setPassword(e.target.value)} />
      </>
     )}


   {signup && (
      <>
      <div style={{display:"flex"}}>  
      <h4>Email</h4>
      </div>
      
     <input type='email' name='email'  onChange={(e) => setEmail(e.target.value)} />
     <div style={{display:"flex"}}>  
      <h4>Number</h4>
      </div>
      <input type='text' name='number'  onChange={(e) => setNumber(e.target.value)} />
      <div style={{display:"flex"}}>
      <h4>Password</h4>
      {signup && <h4 style={{marginLeft:"50px", marginTop:"3px" ,fontSize:"13px" , fontWeight:"400",color:"rgb(21, 158, 212)"}}>Forget Password?</h4>}
      </div>
      <input type='password' name='pass'   onChange={(e) => setPassword(e.target.value)} />
      </>
     )}
     
     
       {
        signup && (
          <p style={{color:"rgb(143, 140, 140)",fontSize:"13px" , fontWeight:"400",marginRight:"49%"}}>
            Passwords must contain at least eight characters,<br/> 
            including at least 1 letter and 1 number.
          </p>   
        )
       }
  <br/>
      {
        signup && (
          <label htmlFor='label'>
            <div className='label'>
            <div className='div-1'>
            <input type='checkbox'/>
            </div>
            <div className='div-2'>
            <p style={{color:"rgb(58, 57, 57)",fontSize:"13px" , fontWeight:"500"}}>
            Opt-in to receive occasional product  
            updates, user research invitations, company 
            announcements, and digests.
            </p>
            </div>
            </div>
          </label>
        )
      }
      <br/>
      
      <button type='submit'>{signup? "sign up" : "Log in"}</button>
      <br/>
      {
        signup && (
          <p style={{color:"rgb(143, 140, 140)",fontSize:"13px" , fontWeight:"400"}}>
            By clicking “Sign up”, you agree to our <span style={{color:"rgb(21, 158, 212)" }}>terms of <br/> service</span>  
            and acknowledge that you have read and <br/>
             understand our
             <span style={{color:"rgb(21, 158, 212)" }}>privacy policy</span>and 
             <span style={{color:"rgb(21, 158, 212)" }}>code of<br/>conduct.</span>
          </p>
        )
      }
       
    </form>
    <div style={{padding:"10px 20px",margin:"10px 20px",textAlign:"center",fontSize:"13px" }}>
    {
        signup? "Already have an account?" : "Don’t have an account?"
       }
     
       <button type='button' style={{border:"none", color:"rgb(21, 158, 212)",fontSize:"13px" , fontWeight:"400"}}
        onClick={() => handleClick() }>{signup? "sign in" : "Sign up"}</button>
        </div>
    </div>
    </div>
  )
}
