import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import upvote from '../../assests/sort-up.svg';
import downvote from '../../assests/sort-down.svg';
import Avatar from '../Avatar/Avatar'
import '../pages/Display.css'
import { deleteQuestion, postAnswer , deleteAnswer,voteQuestion } from '../actions/question.js'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

export default function DisplayAns() {

     const {id} = useParams()
    
    const questionList = useSelector(data => data.question)
    console.log(questionList)
    //const Award = useSelector((state) => state.reducer);
     const [Answer, setAnswer] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector((state) => state.currentuserReducer);
    const location = useLocation();
    const url = 'https://server-side-ur49.onrender.com';
    useEffect(()=>{
    console.log(Answer)
    },[Answer])
  // Function for Submit answer
    const handlePostAns = (e, answerLength) => {
      e.preventDefault();
    
      if (User === null) {
        alert("Login or Signup to answer a question");
        Navigate("/auth");
      } else {
        if (Answer === "") {
          alert("Enter an answer before submitting");
        }else{
          dispatch(
            postAnswer({
              id,
              noOfAns: answerLength + 1,
              answerBody: Answer,
              userAnswer: User.result.name,
              userId: User.result?._id,
            })
           
          );
          setAnswer("");
          
        }
      }
    };


     // Function for delete a question
    const handleDelete = () =>{
      dispatch(deleteQuestion(id,Navigate))
    }

     // Answer deleting method
  const handleDeleteAns = (answerId, noOfAns) => {
    dispatch(deleteAnswer(id, answerId, noOfAns -1));
  };
  
   // Function for Copy the Url
    const handleShare = () => {
      copy(url + location.pathname);
      alert("Copied url : " + url + location.pathname);
    };

    // Function for Up voting
    const handleUpVote = () => {
      if (User === null) {
        alert("Login or Signup to up vote a question");
        Navigate("/auth");
      } else {
        dispatch(voteQuestion(id, "upvotes",User?.result?._id));
      }
    };

    // Function for Down voting
    const handleDownVote = () => {
      if (User === null) {
        alert("Login or Signup to down vote a question");
        Navigate("/auth");
      } else {
        dispatch(voteQuestion(id, "downvotes",User?.result?._id));
      }
    };

  return (
    
    <>
      <div className='view-ans'>
        {
            questionList === null?
            <h1>Loading...</h1>
            :
            <>
            {questionList.data?.filter((ans) => ans._id === id).map((ans)=> (
              
                <div key={ans._id}>
            
                <div className='view-container'>
                <h1>{ans.qnTitle}</h1>

              
                <div className='view-container2'>

                 <div className='vote'>
                 <img src={upvote} alt='' className='logo2' onClick={() =>handleUpVote()} width="158" height="70"/>
                 <p style={{marginLeft:"43%"}}>{ans.upvotes.length - ans.downvotes.length}</p> 
                 <img src={downvote} alt='' className='logo2' onClick={handleDownVote} width="158"  height="70" /> 
                 </div>


                 <div className='view-body'>
                  <p>{ans.qnBody}</p>
                  <div className='names-tag'>
                    
                
                
            <div className="display-tags">
            {ans.qnTags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
           </div>
                  
                  </div>
                   

                  <div className='btn-sp'>

                  <div>
                  <button type='button' className='btn-1' onClick={()=> handleShare()}>share</button>
                 
                  { 
                    User?.result?._id === ans?.userId &&(
                     <button type='button' className='btn-1'onClick={ ()=> handleDelete()}>delete</button>
                  )}   
                    </div>
                    </div>
                  </div>
                  </div>
                
                 <div className='view-user'>
                    
                        <div>
                        <p>asked {moment(ans.askedOn).fromNow()}</p>
                        </div>
                        
                        <div>

                   <Link to={`/user/${ans.userId}`} style={{color:"black" ,textDecoration : "none" }}>
                      <div className='view-user-bio'>     
                    <Avatar backgroundColor='rgb(20, 194, 194)' color='white' borderRadius='40px' px='13px' py='7px' width='10px'>
                            {ans.userPosted.charAt(0).toUpperCase()} 
                    </Avatar>
                    <h2 style={{fontSize:"15px"}}>{ans.userPosted}</h2>
                    </div>
                     </Link>
                </div> 
                      </div>
               
                        </div>
<br/>
                    {
                        ans.noOfAns !== 0 && (
                            <>

                            <h4>{ans.noOfAns}Answers</h4>
                            {
                              ans.answer.map((answer) => (
                                
                              <div className="display-ans" key={answer._id}>
                                <p>Answer by {answer.userAnswer}</p>
                                <h5>{answer.answerBody}</h5>
                              <div className="question-actions-user">
                              <div>
                              <div className='btn-sp'>
                             <button type='button' className='qn-link' onClick={handleShare}>share</button>

                       {User?.result?._id === answer?.userId && (
                <button type="button"className='qn-link' onClick={() => handleDeleteAns(answer?._id, ans.noOfAns)}>
                  Delete
                </button>
                          )}
                           
                           </div>
                            </div>
                               
                            
                            
                      <div className='view-user'>
                           
                        
                             
                        <>
                        <div> <p> answered {moment(answer.answerdOn).fromNow()}</p></div>
                       
   
                             
                       <Link to={`/user/${answer.userId}`} style={{color:"black" ,textDecoration : "none" }}>
                       <div className='view-user-bio'> 
                       <Avatar backgroundColor='rgb(20, 194, 194)' color='white' borderRadius='40px' px='13px' py='7px' width='10px'>
                               {answer.userAnswer.charAt(0).toUpperCase()} 
                       </Avatar>
                       <h1>{answer.userAnswer}</h1>
                       </div>
                        </Link>
                       

                        </>
                          
                   
                            </div>
                            </div>
                         </div> 
                              ))}
                            </>
                           
                            )
                          }
                           
                      
               






                         <div className='your-ans'>
                          
                            <h2 style={{fontSize:"15px",color:"white"}}>Your Answer:</h2>
                            <form onSubmit={(e) => {handlePostAns(e,ans.answer.length)}}>
                            <textarea type='text' onChange={(e) => setAnswer(e.target.value)} value={Answer} ></textarea>
                            <input type='submit' className='qn-link' value="Post Your Answer" />
                             </form>
                          </div>
                          
                          <div className='end'>
                            <p>
                        Browse other questions tagged{
                        ans.qnTags.map((tag) =>(
                          <Link to='/tags' key={tag} style={{color:"skyblue" ,textDecoration : "none",padding:"5px 5px" }}>{tag}</Link>
                           ))
                            }or 
                            <Link to='/AskQuestion' style={{color:"skyblue" ,textDecoration : "none" }}> Ask Your own question</Link>
                            </p>
                          </div>
                     
                         
                          
                         
                        
                       </div>
                      
               
            ))}
            </>
        }
      </div>
   
    </>
  )
}
