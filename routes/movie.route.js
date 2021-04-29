

const router = require('express').Router() ; 
const {createMovie,deleteMovie,editMovie,getAllMovies,getMovieByName,getMoviesbyId,getMoviesByGenre}=require('../controllers/movieController')
//Movies routes 
//
//Public 
router.get('/',getAllMovies) ; 

router.get('/:id',getMoviesbyId);

router.get('/',getMovieByName); 
// /movie/genre
router.get('/whatever/genre',getMoviesByGenre)
router.post('/createMovie',createMovie); 
router.patch('/:id',editMovie) ; 
router.delete('/:id',deleteMovie) ; 

module.exports= router ; 


