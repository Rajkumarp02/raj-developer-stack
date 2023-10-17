import mongoose from "mongoose";
import Question from "../models/Question.js";
import User from '../models/auth.js';

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAns, answerBody, userAnswer,userId } = req.body;
  console.log(req.body)
  const user = await User.findById(userId);
     
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  updateNoOfQuestions(_id, noOfAns);
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswer, userId }] },
     
 });
    
   await updateUserAnswer(userId);
   const user = await User.findById(userId);
   if(user.qnAnswered >= 4){ //if user answered actively 4(0,1,2,3) , points added =10 also badges added =1,
    //await updateUser(userId,{$addToSet:{badges:"Honor Badge"},$inc:{points:10}});
    const updateUser = await User.findByIdAndUpdate(userId,{$inc:{badges:1,ansPoints:10}});//if answered more than 5 0r 5(0,1,2,3,4,5) ,it will be increase(like points 20,badges 2)
    return res.status(200).json({message:"Honor Badge earned",updateUser});
    }
     
 
     
   return res.status(200).json(updatedQuestion);
   }catch(error) {
    console.log(error)
    return res.status(400).json("error in updating");
    
  }
};

const updateNoOfQuestions = async (_id, noOfAns) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noOfAns: noOfAns },
    });
  }catch(error) {
    console.log(error);
  }
};

const updateUserAnswer = async (userId) => {
  try{
   const user = await User.findByIdAndUpdate(userId, {$inc:{qnAnswered:1}});
   console.log(user)
   return user;
  }catch(error) {
   console.log(error) 
  }
}




export const deleteAnswer = async (req,res) => {
  const {id:_id} = req.params;
  const {answerId,noOfAns,userId} = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("question unavailable...");
  }
  updateNoOfQuestions(_id, noOfAns);
  
  
  try {
      await Question.updateOne(
        {_id},
        {$pull:{answer: {_id:answerId}}}
      )
      await updateUserAnswer(userId);
      const user = await User.findById(userId);
   if(user.qnAnswered -=1){  
    const updateUser = await User.findByIdAndUpdate(userId,{$inc:{badges:-1,ansPoints:-10}});
    return res.status(200).json({message:"Honor Badge earned",updateUser});
    }
     res.status(200).send("successfully...");

    
  }catch(error){
    console.log(error)
    res.status(404).json(error)
  }

}