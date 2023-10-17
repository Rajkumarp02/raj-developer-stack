import Question from "../models/Question.js";
import mongoose from "mongoose";


export const AskQuestion =  async (req,res) => {
      const postQuestionData = req.body;
      const postQuestion = new Question({...postQuestionData})
      try{
        await postQuestion.save();
        res.status(200).json("posted a question")

      }catch(err){
        res.status(404).json("coudn't posted question")
        console.log(err);
      } 
}


export const getAllQuestion = async (req,res) =>{
 try{
  const questionList = await Question.find().sort({ askedOn: -1 });
  res.status(200).json(questionList)
 }catch(err){
  res.status(404).json("coudn't posted question")
 }

}

export const deleteQuestion = async (req,res) => {
  const {id:_id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try{
    await Question.findByIdAndRemove(_id);
    return res.status(200).json("question deleted..");

  }catch(err){
    return res.status(404).json("question not deleted..");
  }
}

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value,userId } = req.body;
  

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  
  try {
    const question = await Question.findById(_id)
    const upIndex = question.upvotes.findIndex((id) => id === String(userId))
    const downIndex = question.downvotes.findIndex((id) => id === String(userId))
    const upvotes = question.upvotes.length;
   
    if(value === 'upvotes'){
        if(downIndex !== -1){
            question.downvotes = question.downvotes.filter((id) => id !== String(userId))
        } 
        if(upvotes >= 4){ //if morethan 5 votes and 5 votes , we will get 10 points....
          question.points += 10;//and you will get extra points, if you get extra votes...
        }
        if(upvotes -= 1){ //if morethan 5 votes and 5 votes , we will get 10 points....
          question.points -= 10;//and you will get extra points, if you get extra votes...
        }
        if(upIndex === -1){
            question.upvotes.push(userId)
        }else{
            question.upvotes = question.upvotes.filter((id) => id !== String(userId))
        }
    }
    else if(value === 'downvotes'){
        if(upIndex !== -1){
            question.upvotes = question.upvotes.filter((id) => id !== String(userId))
        } 
        if(downIndex === -1){
            question.downvotes.push(userId)
        }else{
            question.downvotes = question.downvotes.filter((id) => id !== String(userId))
        }
    }
    await Question.findByIdAndUpdate( _id, question )
    res.status(200).json({ message: "voted successfully..."})
} catch (error) {
    res.status(404).json({ message: "id not found"})
}
}