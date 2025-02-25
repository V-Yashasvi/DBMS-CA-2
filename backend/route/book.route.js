const express=require('express')
const bookRouter=express.Router()
const bookModel=require('../model/book.model')
//to get all books
bookRouter.get('/getAll', async(req, res)=>{
    try {
        const booksData=await bookModel.find()
        if(!booksData){
            return res.status(404).json({"message":"Could not find books"})
        }
        res.status(200).json({"message":"Books fetched successfully", booksData})
        console.log("successful get request")
    } catch (error) {
        res.status(500).json({"error":err.message})
        console.log(error)
    }
})
//to get a book with its id
bookRouter.get('/get/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const bookData=await bookModel.findById(id)
        if(!bookData){
            return res.status(404).json({"message":"Could not find book"})
        }
        res.status(200).json({"message":"Book fetched successfully", bookData})
        console.log("successful get by id request")
    } catch (error) {
        res.status(500).json({"error":err.message})
        console.log(error)
    }
})
bookRouter.post('/create', async(req, res)=>{
    const {title, author, genre, publishedYear, availableCopies, borrowedBy}=req.body
    const payload={title, author, genre, publishedYear, availableCopies, borrowedBy}
    if (!title){
        return res.status(400).json({"message":"title is required"})
    }
    if(!author){
        return res.status(400).json({"message":"author is required"})
    }
    if(!genre){
        return res.status(400).json({"message":"genre is required"})
    }
    if(!availableCopies){
        return res.status(400).json({"message":"availableCopies is required"})
    }
    if(!borrowedBy){
        return res.status(400).json({"message":"borrowedBy is required"})
    }
    try {
        const bookData=new bookModel(payload)
        await bookData.save()
        if(!bookData){
            return res.status(404).json({"message":"Could not create book"})
        }
        res.status(200).json({"message":"Book created successfully", bookData})
        console.log("successful post request")
    } catch (error) {
        res.status(500).json({"error":err.message})
        console.log(error)
    }
})
bookRouter.put('/update/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const updated_book=await bookModel.findByIdAndUpdate(id, req.body, {new:true})
        if(!updated_book){
            return res.status(404).json({"message":"Could not update book"})
        }
        res.status(200).json({"message":"Book updated successfully", updated_book})
        console.log("successful put request")
    } catch (error) {
        res.status(500).json({"error":err.message})
        console.log(error)
    }
})
bookRouter.delete('/delete/:id', async(req, res)=>{
    const id=req.params.id
    try {
        const deleted_book=await bookModel.findByIdAndDelete(id)
        if(!deleted_book){
            return res.status(404).json({"message":"Could not delete book"})
        }
        res.status(200).json({"message":"Book deleted successfully", deleted_book})
        console.log("successful delete request")
    } catch (error) {
        res.status(500).json({"error":err.message})
        console.log(error)
    }
})


module.exports=bookRouter