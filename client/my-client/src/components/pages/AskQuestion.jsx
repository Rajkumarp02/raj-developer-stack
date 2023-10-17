import React, { useEffect, useState } from 'react'
import './Ask.css'
import { useDispatch, useSelector } from 'react-redux';
import {question} from "../../components/actions/question"
import { useNavigate } from 'react-router-dom';
import { subscriptionValidationCheck } from "../actions/subscription";


export default function AskQuestion() {

const[qnTitle,setQnTitle] = useState("");
const[qnBody,setQnBody] = useState("");
const[qnTags,setQnTags] = useState("");

const dispatch = useDispatch();
const User =useSelector((state) => state.currentuserReducer)
const navigator = useNavigate()
const subscriptionDetails = User?.result?.subscription;
let numberOfQues = subscriptionDetails?.attempts;



// Check it user subscription-plan's Validity expire or not
useEffect(() => {
   const id = User?.result?._id;
   dispatch(subscriptionValidationCheck({ id }));
 }, [User, dispatch]);

 useEffect(() => {
   if (User !== null) {
     if (!localStorage.getItem("TryLeft")) {
       // If there is no data for create a data ( its happens after 24hrs)
       localStorage.setItem("TryLeft", JSON.stringify({ attempt: numberOfQues }));
     }
   }
 }, [User, numberOfQues]);

 // if After Create , Get data
 if (localStorage.getItem("TryLeft")) {
   var attempt_Left = JSON.parse(localStorage.getItem("TryLeft")).attempt;
 }

 const handleSubmit = (e) => {
   e.preventDefault();
   if (User) {
     // if check Subscription
     if (attempt_Left === 0) {
       alert("Number of Post Exceed the limit \nAdvance Your Subscription !! ");
     } else {
       if (qnTitle && qnBody && qnTags) {
         // Decrease the Number
         attempt_Left = attempt_Left - 1;
         localStorage.setItem("TryLeft", JSON.stringify({ attempt: attempt_Left }));
         dispatch(question({qnTitle,qnBody,qnTags, userPosted:User.result.name,userId:User?.result._id},navigator))
        } else alert("Please enter all the fields");
     }
   } else alert("Login to ask question");
 };




const handleEnter = (e) => {
   if(e.key === 'Enter'){
    setQnBody(qnBody + "\n")
   }
}

  return (
    <>
     {
       
        <div className='ask-qn'>
            <div className='ask-head'>
                <h1>Ask a public Question</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='ask-container'>
                      <div className='qn-title'>
                       <h4>Title</h4>
                       <p>Be specific and imagine you're asking a question to another person</p>
                       <input type='text' placeholder='e.g what is array' name='text' onChange={(e) =>setQnTitle(e.target.value) } required/>
                      </div>

                      <div className='qn-title'>
                       <h4>Body</h4>
                       <p>Include all the information someone would need to answer your question</p>
                       <textarea type='text' name='text' className='text-area' onChange={(e) =>setQnBody(e.target.value)} onKeyPress={handleEnter} required></textarea>
                       </div>


                      <div className='qn-title'>
                       <h4>Tags</h4>
                       <p>Add up to 5 tags to describe what your question is about</p>
                       <input type='text' placeholder='e.g {xml typescript wordpress}' name='text' onChange={(e) =>setQnTags(e.target.value.split(" ")) } required/>
                      </div>
                    </div>
                   <button type='submit' className='btn'> submit AskQuestion</button>
                </form>

            </div>

        </div>
     } 
    </>
  )
}
