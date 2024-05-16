import cors from "cors"
import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
import movie from './models/movie.js'
const app= express();
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))

app.use(cors())
dotenv.config({ path: '.env' })
app.get('/',(req,res)=>{
    res.send("Movie Details API")
})
app.post('/api/create', async (req, res) => {
    const {name,img,summary}=req.body
    console.log(req)
    try {
        const existinguser = await movie.findOne({ name });
        if (existinguser) {
          return res.status(404).json({ message: "Movie already Exist." });
        }
        const newUser = await movie.create({name,img,summary});
        res.status(200).json({ result: newUser});
      } catch (error) {
        console.log(error);
        res.status(500).json("Something went worng...");
      }
});


app.get('/api/read',async(req,res)=>{
    try{
        const movieList=await movie.find()
        res.status(200).json(movieList)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
})

app.post('/api/updateSummary',async(req,res)=>{
    const {name,summary}= req.body
    const updatedDetails= await movie.findOneAndUpdate({name:name},{$set:{ 'summary': summary }});
    //const movieList=await movie.find()
    res.status(200).json(updatedDetails)

})
app.post('/api/updateImg',async(req,res)=>{
    const {name,img}= req.body
    const updatedDetails= await movie.findOneAndUpdate({name:name},{$set:{ 'img': img }});
    res.status(200).json(updatedDetails)

})

app.delete('/api/delete', async(req,res)=>{
    const{name}=req.body
    const existinguser= await movie.findOne({name})
    if (!existinguser){
        res.status(200).json({"msg":"No such details available"})
    }
    await movie.findByIdAndDelete(existinguser._id);
    res.status(200).json({"msg":"Deleted Succesfully"})
})
const PORT = process.env.PORT || 8000

const DATABASE_URL=process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=>{
        console.log(`server running on ${PORT}`)
    }))
    .catch((err)=>{
        console.log(err.message)
    })