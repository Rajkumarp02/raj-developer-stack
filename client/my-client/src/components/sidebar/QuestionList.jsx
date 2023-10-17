import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'


export default function QuestionList(props) {

  return (
    <>
    <div className='display-question-container'>

    

     <div className="display-votes-ans">
        <p>{props.votes}</p>
        <p>votes</p>
      </div>

   

    <div className="display-votes-ans">
        <p>{props.noOfAns}</p>
        <p>answers</p>
      </div>

     <div className='display-question-details'>
    <Link to={`/Question/${props.id}`} className='link-qn'>{props.title}</Link>
   

     <div className="display-tags-time">
          <div className="display-tags">
            {props.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
          <p className="display-time">
            asked-
            {moment(props.qnTime).fromNow()} #{props.qnPosted}
          </p>
        </div> 
    </div>
    </div>
    </>
  )
}
