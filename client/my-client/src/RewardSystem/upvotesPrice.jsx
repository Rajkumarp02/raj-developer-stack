import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import './style.css';

export default function UpvotesPrice() {
const QuestionList = useSelector(data => data.question)
console.log(QuestionList)


useEffect(()=>{
  console.log("data");
},[QuestionList])
  return (
    <div>
    <h1>User Get Reward System For 5-Upvotes</h1>
   <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Question Points</th>
          <th>Question Upvotes</th>
          <th>Question Posted</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
      {QuestionList?.data?.map((qn)=> (
        <tr key={qn._id}>
      
               { 
                   qn.upvotes.length >=5 &&( //if get 5 votes, you will get 10 points...(0,1,2,3,4)
                     <>
                     <td>{qn.points}</td>
                     <td>{qn.upvotes.length}</td>
                     <td>{qn.userPosted}</td>
                     </>
                  )} 
       
       
        </tr>
      ))
      }
      </tbody>
    </table>
  </div>
</div>
  )
}
