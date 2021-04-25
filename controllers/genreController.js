const { catch, catch } = require('../config/db');
const ErrorHandler = require('../helpers/errorHandler');

const Genre = require('../models/Genre') ; 


const createGenre = async (req,res,next)=>{
        const genre = req.body ; 

    try {
        const newGenre = await Genre.create(genre) ; 
        if (!newGenre)
        {
            throw new ErrorHandler(500,'Genre creation failed !') ; 

        }
        res.status(200).json({
            success: true  ,
            message :'Genre creation was successfull ' , 
            newGenre 
        })
    }
    catch(err)
    {
            next(err) ; 
    }
}
const editGenre = async(req,res,next)=>{
    const id = req.params.id ; 
    const body = req.body
    try {
        const editedGenre = await Genre.findByIdAndUpdate(id,{$set:body},{new:true}) ;
        if (!editedGenre)
        {
            throw new ErrorHandler(404,'There is no genre with this id') ; 
        } 
        res.status(200).json({
            succes: true , 
            message : 'Genre edited with success',
            editedGenre ,
        })
    }
    catch(err)
    {
            next(err) ; 
    }
}

const deleteGenre = async(req,res,next)=>{

    const id = req.params.id 
    try {
        const deletedGenre = await Genre.findByIdAndDelete(id) ; 
        if (!deletedGenre)
        {
            throw new ErrorHandler(404,'There is no such genre with id ') ;  
        }
        res.status(200).json({
            success: true, 
            message : 'Genre deleted with success',
            deletedGenre , 
        })

    }
    catch(err)
    {
            next(err) ; 
    }
    
}
const populateMovie= async(req,res,next)=>{
    const id = req.params.id ; 
    try{
        const GenreOfMovie = await Genre.findById(id).populate('Movie') ; 
        res.status(200).json({
            success: true , 
            GenreOfMovie
        })
    }
    catch(error)
    {
        next(error) ; 
    }
}

module.exports{
    deleteGenre,editGenre,createGenre,populateMovie
}