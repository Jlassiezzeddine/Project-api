const router = require('express').Router() ; 
const {getGenre,getAllGenres,editGenre,createGenre,deleteGenre} = require('../controllers/genreController') ; 

// Routes for Genre 
//
//Should be public for Admin/MovieTheater ???


// Find all Genres 
router.get('/',getAllGenres) ; 
//CreateGenre 
router.post('/',createGenre) ;
//Find specific genre by id ; 
router.get('/:id', getGenre) ; 
// Delete particular genre ; 
router.delete('/:id',deleteGenre) ; 
//edit specific genre ; 
router.patch('/:id' , editGenre)



module.exports= router ; 