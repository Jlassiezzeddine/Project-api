const ErrorHandler= require('../helpers/errorHandler') ; 
const Movie = require('../models/Movie') ; 
const Genre = require('../models/Genre') ; 


// NOT SURE IF REQUIRED AS A METHOD  
// FOR testing purposes 
const getAllMovies = async(req,res,next)=>{
    
    
    try {

    const movies = await Movie.find({}) ; 
    if (!movies) {
        throw new ErrorHandler(404,'There are no movies in the database ') ; 
    }
    res.status(200).json({
        success: true , 
        message : 'Movies fetched from database !',
        movies
    }) 

    }
    catch(error)
    {
        next(error) ; 
    }
}

// Fetch one movie by name (FOR TESTING)
const getMovie =async (req,res,next)=>{
    const movieTitle = req.body.original_title 
    try {
        const movie = await Movie.findOne({movieInfos:{original_title: movieTitle}}) ; 
        if(!movie){
            throw new ErrorHandler('404','There are no movies with this title in the database ')
        }
       console.log(movie)
        res.status(200).json({
            success: true , 
            message : 'Here is the list of movies' , 
            movie 
        })
       
    }
    catch(error){
        next(error) ; 
    }
}
const createMovie = async(req,res,next)=>{
    const body =req.body
    try{
        const newMovie = await Movie.create(body) ;
        
        
        if (!newMovie){
            throw new ErrorHandler(500 , 'Movie has not been created ')
        } 
        newMovie.movieInfos.genres.forEach(el=>{
            const GenreUpdate =  Genre.findByIdAndUpdate(el, {$set:{movieId :newMovie._id}}) ; 
        })
       
        
        if (!GenreUpdate){
            throw new ErrorHandler(500,'ERROR WHILE UPDATE OF GENRE ')
        }
        res.status(200).json({
            success: true , 
            message : 'Movie creation has been successful' , 
            newMovie ,
        })
    }
    catch(err)
    {
        next(err) ; 
    }


}

const editMovie = async(req,res,next)=>{
    const id = req.params.id ; 
    const body = req.body
    try{
        const movie = await Movie.findById(id) ; 
        const editedMovie = await Movie.findByIdAndUpdate(id ,{$set:body},{new:true}) ; 
        if (!editedMovie){
            throw new ErrorHandler(404,'There is no such movie in the database ')
        }
        editedMovie.movieInfos.genres.forEach(el=>{
            const genreFound = Genre.findById(el) ; 
            if (!genreFound)
            {

            }
            const GenreUpdate =  Genre.findByIdAndUpdate(el, {$set:{movieId :id}}) ; 
        })
        
        if(!Genreupdate)
        {
            throw new ErrorHandler("update of genre failed ")
        }
        res.status(200).json({
            success: true , 
            message : 'Movie edited successfully '  , 
            editedMovie , 
        })
    }
    catch(error){
        next(error) ; 
    }
}
const deleteMovie = async(req,res,next)=>{
    const id = req.params.id ; 
    try{

            const deletedMovie = await Movie.findByIdAndDelete(id) ; 
            if(!deletedMovie) {
                throw new ErrorHandler(404,'There is no movie to delete in the first place')
            }
            const GenreUpdate = await Genre.findByIdAndUpdate(deletedMovie.movieInfos.genres , {$pullAll:{movieId :id}}) ; 
            res.status(200).json({
                success: true , 
                message : 'Movie deleted successfully ' , 
                deletedMovie 
            })
    }
    catch(error){
        next(error)
    }
}

module.exports={
    getAllMovies,createMovie,getMovie,editMovie,deleteMovie
}