import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:'80%',
    marginLeft: '20px'
  },
  formControl: {    
    margin: theme.spacing(3),
    color : '#a7aab0'
  },
  formGroup:{
      display: 'flex',
      flexWrap:'wrap',
      flexDirection:'row',
      color: '#a7aab0'
  }
  ,
  checkBox:{
      color:'#a7aab0',
  }
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { Thriller, Action, Drama , Historical,Comedy,Fantasy,
    Adventure,CrimeAndMystery,MusicalFilm,animation,Romance,Horror,Documentary,ScienceFiction,Western } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.formGroup} component="legend">Genres</FormLabel>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            control={<Checkbox checked={Thriller} onChange={handleChange} className={classes.checkBox} name="Thriller" />}
            label="Thriller"
          />
          <FormControlLabel
            control={<Checkbox checked={Action} onChange={handleChange}  className={classes.checkBox} name="Action" />}
            label="Action"
          />
          <FormControlLabel
            control={<Checkbox checked={Drama} onChange={handleChange} className={classes.checkBox} name="Drama" />}
            label="Drama"
          />
          <FormControlLabel
            control={<Checkbox checked={Historical} onChange={handleChange} className={classes.checkBox} name="Historical" />}
            label="Historical"
          />
          <FormControlLabel
            control={<Checkbox checked={Comedy} onChange={handleChange} name="Comedy" className={classes.checkBox}/>}
            label="Comedy"
          />
          <FormControlLabel
            control={<Checkbox checked={Fantasy} onChange={handleChange} name="Fantasy" className={classes.checkBox} />}
            label="Fantasy"
          />
          <FormControlLabel
            control={<Checkbox checked={Adventure} onChange={handleChange} name="Adventure" className={classes.checkBox}/>}
            label="Adventure"
          />
          <FormControlLabel
            control={<Checkbox checked={CrimeAndMystery} onChange={handleChange} name="Crime and mistery" className={classes.checkBox}/>}
            label="Crime and mistery"
          />
          <FormControlLabel
            control={<Checkbox checked={Documentary} onChange={handleChange} name="Documentary" className={classes.checkBox}/>}
            label="Documentary"
          />
          <FormControlLabel
            control={<Checkbox checked={Horror} onChange={handleChange} name="Horror" className={classes.checkBox}/>}
            label="Horror"
          />
          <FormControlLabel
            control={<Checkbox checked={Romance} onChange={handleChange} name="Romance" className={classes.checkBox}/>}
            label="Romance"
          />
          <FormControlLabel
            control={<Checkbox checked={ScienceFiction} onChange={handleChange} name="Science Fiction" className={classes.checkBox} />}
            label="Science Fiction"
          />
          <FormControlLabel
            control={<Checkbox checked={Western} onChange={handleChange} name="Western" className={classes.checkBox}/>}
            label="Western"
          />
        <FormControlLabel
            control={<Checkbox checked={MusicalFilm} onChange={handleChange} name="Musical film" className={classes.checkBox} />}
            label="Musical film"
          />
          <FormControlLabel
            control={<Checkbox checked={animation} onChange={handleChange} name="Animation" className={classes.checkBox}/>}
            label="Animation"
          />
        </FormGroup>
    
      </FormControl>
    </div>
  );
}
