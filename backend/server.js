const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const URL=process.env.URL
const port=process.env.PORT
const Book=require('./route/book.route')

app.use(express.json())

const connection=mongoose.connect(URL).then(()=>{
    console.log("Connected to mongoDB successfully")
}).catch((err)=>{
    console.log(err)
})

app.use('/book', Book)

app.listen(port, async()=>{
    try {
        await connection
        console.log(`Server is running on http://localhost:${3010}`)
    } catch (error) {
        console.log(error)
    }
})