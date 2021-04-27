const ErrorHandler = require('../helpers/errorHandler');

const Genre = require('../models/Genre') ; 
const Movie = require('../models/Movie');

const getAllGenres = async (req,res,next)=>{


    try {
        const genres = await Genre.find({}) ; 
        if (!genres)
        {
            throw new ErrorHandler(404,'No genres found in the database ') ; 

        }
        res.status(200).json({
            success: true  ,
            message :'Here is a list of genres found in database  ' , 
            genres  
        })
    }
    catch(err)
    {
            next(err) ; 
    }

}

const getGenre = async (req,res,next)=>{
    const id= req.params.id ; 
    try {
        const genreFound = await Genre.findById(id) ; 
        if (!genreFound)
        {
            throw new ErrorHandler(404,'There is no genre with this id ') ; 

        }
        res.status(200).json({
            success: true  ,
            genreFound
        })
    }
    catch(err)
    {
            next(err) ; 
    }

}
const createGenre = async (req,res,next)=>{
        const genre = req.body ; 

    try {
        const newGenre = await Genre.create(genre) ; 
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
        if (!deletedGenre)
        {
            throw new ErrorHandler(500, 'Problem updating Movies with deleted genre ')
        } 
        const movieUpdate = await Movie.findByIdAndUpdate(deletedGenre.movieId, {$pullAll:{movieInfos :{genre :id}}}) ; 
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


module.exports = {
    deleteGenre,editGenre,createGenre,getAllGenres,getGenre 
}