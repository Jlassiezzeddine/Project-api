

const router = require('express').Router() ; 
const {createMovie,deleteMovie,editMovie,getAllMovies,getMovie,populateGenre}=require('../controllers/movieController')
//Movies routes 
//
//Public 
router.get('/',getAllMovies) ; 
router.get('/:id' , getMovie);
router.post('/createMovie',createMovie); 
router.patch('/:id',editMovie) ; 
router.delete('/:id',deleteMovie) ; 


module.exports= router ; 


