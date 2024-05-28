import User from "../models/user.model.js"


const getAllUsers=async (req,res)=>{
    const loggedInUserId=req.user._id

    const filteredUsers= await User.find({_id : {$ne : loggedInUserId }}).select("-password")

    if(!filteredUsers) res.status(404).json([])

    res.status(200).json(filteredUsers)
}

export default getAllUsers