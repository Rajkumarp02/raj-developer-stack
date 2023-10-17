
//import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
//import Navbar from './components/Navbar/Navbar';
import Rootlayout from './components/Navbar/Rootlayout';
import About from './components/Navbar/About';
import Auth from './components/pages/Auth';
import Home from './components/Home';
import Question from './components/pages/Question';
import AskQuestion from './components/pages/AskQuestion';
import Display from './components/pages/Display';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { allQuestion } from './components/actions/question';
import Tags from './components/pages/Tags';
import User from './components/pages/User';
import { getAlluser } from './components/actions/user';
import UserProfile from './components/pages/Profileuser';
import {Suspense} from "react"
//import ChatBot from './components/Chat_Bot/chatbot'
import Subscriptionplan from './components/Subscription/Subscriptionplan'
import OtpAuth from './components/Otp/OtpAuth'
import Create from './components/chatbot/Create';
import Success from './components/Subscription/Succes';
import { paymentApikey} from './components/actions/payment.js';
import Price from './RewardSystem/Price';
import { loginHistory } from './components/actions/auth.js';
import UserloginHistory from './components/loginHistory/UserloginHistory';

function App() {

  const dispatch = useDispatch()
 
 
  useEffect(() => {
    dispatch(allQuestion())
    dispatch(getAlluser())
    dispatch(paymentApikey())
    dispatch(loginHistory())
   }, [dispatch])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Rootlayout />}>
        <Route index element={<Home />} />
        <Route path='/Question' element={<Question />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/AskQuestion' element={<AskQuestion />} />
        <Route path='/Question/:id' element={<Display />} />
        <Route path='/tags' element={<Tags />} />
        <Route path='/user' element={<User />} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path="/OtpAuth" element={<OtpAuth />} />

        <Route path="/Chatbot" element={<Create/>} 
        />
        <Route path="/Subscription" element={<Subscriptionplan/>}
      />
        <Route path="/paymentsuccess" element={<Success/>} />
        <Route path="/price" element={<Price/>} />
        <Route path='/loginHistory' element={<UserloginHistory/>} />
       </Route>
    )
  )
 
  return (
    <div className="App">
      
      <Suspense fallback={null}>
      <RouterProvider router={router} />
      </Suspense>
     
    </div>

  );
}

export default App;
