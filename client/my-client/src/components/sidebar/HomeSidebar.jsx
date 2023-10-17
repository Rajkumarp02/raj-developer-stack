import React, { useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';


export default function HomeSidebar() {
const {t} = useTranslation(["common"]);
const User = useSelector((state) => state.currentuserReducer);

const location = useLocation();

const navigate = useNavigate()

const redirect = () => {

  if(User === null) {
    alert("Please do Login or signup")
    navigate('/Auth')
  }else{
    navigate('/AskQuestion')
  }
   
} 

 
  

 
 

const questionList = useSelector(data => data.question)



  return (


    <div className='main-bar'>
      
      
      <div className='main-bar-header'>
       {
        location.pathname === "/" ? <h1>topQuestions</h1> : <h1>AllQuestions</h1>
       }
     
     <button onClick={redirect} className='qn-link'>Askquestion</button>
      </div>
      {
      questionList.data === null ? 
      <h1>Loading...</h1> :
      <>
      <p style={{color:"black",fontSize:"13px",marginLeft:"10px",fontWeight:"bold"}}>{questionList.data.length}questions</p>
      {questionList.data.map((qn,i) => (
     
        <QuestionList key={i} id={qn._id} 
            votes={qn.upvotes.length - qn.downvotes.length}
            noOfAns={qn.noOfAns}
            title={qn.qnTitle}
            tags={qn.qnTags}
            qnTime={qn.askedOn}
            qnPosted={qn.userPosted}
            points = {qn.points}

        />
       
      ))}
      
      </>
    }
    </div>
   
  )
}
