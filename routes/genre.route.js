
const router = require('express').Router() ; 
const {getGenre,getAllGenres,editGenre,createGenre,deleteGenre} = require('../controllers/genreController') ; 


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

router.patch("/:id/add-movie/:movieId", genreController.pushMovieId);
router.patch("/:id/remove-movie/:movieId", genreController.pullMovieId);

//to test
router.get("/test/:id", genreController.populateMovie);

module.exports = router;
