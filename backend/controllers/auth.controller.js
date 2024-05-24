export const signup=async (req,res)=>{
   try{
    const {fullName,username,password,confirmPassword,gender}=req.body
   }
   catch(error){
    console.log(error)
   }
}

export const login=(req,res)=>{
    res.send("Login")
}


export const logout=(req,res)=>{
    res.send("Logout")
}

