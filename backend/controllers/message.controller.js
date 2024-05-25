export const sendMessage=(req,res)=>{
    console.log("hello",req.params.id)
    res.send(`successfully ${req.params.id}`)
}