import React,{useEffect} from 'react'
import { useSelector } from 'react-redux';
import './style.css';
import { useDispatch } from 'react-redux'
import {loginHistory} from '../components/actions/auth.js'

export default function AnsPrice() {

const User = useSelector((state) => state.reducer);
const dispatch = useDispatch()


useEffect(() => {
  dispatch(loginHistory())
},[dispatch]) 

const qnAnswered = User?.data?.length
console.log(qnAnswered)


console.log(User)
  return (
    <div>
    <h1>Get Reward System For More than 4 Questions Answerd by user</h1>
   {/*  it will be worked on those who are answered actively */}
     <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Answer Points</th>
          <th>Answer Badges</th>
          <th>UserName</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
      {User?.data?.map((ans)=> (
        <tr key={ans._id}>
        
           { //only get awarded thoese who actively answered...
                ans.qnAnswered >=4 &&( //if get 4 answer, you will get 10 points...(0,1,2,3)...//also you get extra points means you will earn some points....
                     <>
                     <td>{ans.ansPoints}</td>
                     <td>Award- {ans.badges}  <i class="fa-solid fa-award"></i></td>
                     <td>Answerd by-{ans.name}</td>
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
