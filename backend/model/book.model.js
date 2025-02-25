const mongoose=require('mongoose')
const User=require('./user.model')

const bookModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number
    },
    availableCopies:{
        type:Number,
        required:true
    },
    borrowedBy:{
        type:[String],
        required:true,
        ref:User
    }
})

const book=mongoose.model('book', bookModel)
module.exports=book