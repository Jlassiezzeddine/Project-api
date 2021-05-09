const ErrorHandler= require('../helpers/errorHandler') ; 
const Movie = require('../models/Movie') ; 
const Genre = require('../models/Genre') ; 
const { response } = require('express');
var _ = require('lodash');


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
const getMovieByName =async (req,res,next)=>{
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
        const movieGenres = newMovie.movieInfos.genres ; 
        if (!newMovie){
            throw new ErrorHandler(500 , 'Movie has not been created ')
        } 
        movieGenres.map(async genre=>{
           try{
            const sweet = await Genre.findByIdAndUpdate(genre,{$addToSet : {movieId:newMovie._id}})
           }
           
            catch(err){
                console.log(err)
            }
          
       }) 
      
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
        console.log(movie.movieInfos.genres) ; 

       const ancientGenres = movie.movieInfos.genres ; 
       const newGenres = editedMovie.movieInfos.genres ; 
       
       
        ancientGenres.map(async element => {
           !newGenres.includes(element) && await Genre.findByIdAndUpdate(element,{$pull:{movieId:id}}).exec();
       })
    
   
       newGenres.map(async element=>{
           !(ancientGenres.includes(element))  &&  await Genre.findByIdAndUpdate(element,{$push:{movieId: id }})
       })

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

                deletedMovie.movieInfos.genres.map(async element=>{
                    const y = await Genre.findByIdAndUpdate(element,{$pull:{movieId:id}})
                })
            
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
const getMoviesByGenre=async(req,res,next)=>{
    const genresIDS = req.body.id ;
    let x = []
    try{
        Genre.find().where('_id').in(genresIDS).exec().then(response=>{
            const movies = response.map(element=>element.movieId) ; 
            for(let i = 0 ; i<movies.length ; i++)
            {   
                x=[...x,...movies[i]]; 
            }
            const y = x.sort().map((element,index)=> {
                if(!x.indexOf(element,index+1)==index)
                {
                    return null ; 
                }
                return element 
            }).filter(el=> el!=null) ;  ; 
           
           
                    res.status(200).json({
                        success: true , 
                        movies : y , 
                    })
        })
           
          
    }
    catch(err){
        next(err)
    }
   


}
const getMoviesbyId=async(req,res,next)=>{   
    const id = req.body.params ; 

    try {
        const movie = await Movie.findById(id) ;
        if (!movie)
        {
            throw new ErrorHandler(404, ' There is no movie with this id in the database ')
        } 
        res.status(200).json({
            success: true , 
            movie , 
        })
    }
    catch (error)
    {

    }

}

module.exports={
    getAllMovies,createMovie,getMovieByName,editMovie,deleteMovie,getMoviesbyId,getMoviesByGenre
}