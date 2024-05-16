import mongoose from "mongoose"



const MoiveSchema=mongoose.Schema({
    name:{type:String,required:"Movie requires Name"},
    img:{type:String,required:"Movie requires an Img Link"},
    summary:{type:String,required:"Movie requires an summary"},

})


export default mongoose.model('movie',MoiveSchema)
