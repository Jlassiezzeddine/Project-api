import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const useStyle=makeStyles({
    root:{
        color: '#8a8d97',
        textTransform:'lowercase'

    }
})
export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyle() ; 
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button className={classes.root} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
    Genre 
<ArrowDropDownIcon htmlColor='white'/>       
      </Button>
     
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        
      >
        <MenuItem onClick={handleClose}>Drama</MenuItem>
        <MenuItem onClick={handleClose}>Action</MenuItem>
        <MenuItem onClick={handleClose}>Thriller</MenuItem>
      </Menu> */}
        
      <FormControl >
        <InputLabel id="demo-customized-select-label">Age</InputLabel>
        <Select
          color='white'
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Thriller</MenuItem>
          <MenuItem value={20}>Drama</MenuItem>
          <MenuItem value={30}>Action</MenuItem>
        </Select>
      </FormControl>
    </div>

  )
  
}
