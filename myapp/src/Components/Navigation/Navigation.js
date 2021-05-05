import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Avatar,
  Box,
  Typography,
  makeStyles,
  InputBase,
  Select,
  fade,
  FormControl,
  MenuItem,
  Menu,
  Divider,
  Button,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  search: {
    position: "relative",
    borderRadius: "50px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    width: 80,
    "&::before": {
      display: "none",
    },
    "&::after": {
      display: "none",
    },
  },
  icon: {
    fill: "#eeeeee",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navigation = ({ location, setLocation, auth, setAuth }) => {
  const classes = useStyles();

  const [desktopAccountAnchorEl, setDesktopAccountAnchorEl] = React.useState(
    null
  );
  const [mobileAccountAnchorEl, setMobileAccountAnchorEl] = React.useState(
    null
  );
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = React.useState(null);

  const handleAccountDesktopMenuOpen = (event) => {
    setDesktopAccountAnchorEl(event.currentTarget);
  };
  const handleAccountDesktopMenuClose = () => {
    setDesktopAccountAnchorEl(null);
  };
  const handleAccountMobileMenuOpen = (event) => {
    setMobileAccountAnchorEl(event.currentTarget);
  };
  const handleAccountMobileMenuClose = () => {
    setMobileAccountAnchorEl(null);
  };

  const handleMobileMenueOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };
  const handleMobileMenueClose = (event) => {
    setMobileMenuAnchorEl(null);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSignIn = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    setMobileAccountAnchorEl(null);
    setDesktopAccountAnchorEl(null);
    setAuth(false);
  };

  const isAccountMenuOpen = Boolean(desktopAccountAnchorEl);
  const isAccountMobileMenuOpen = Boolean(mobileAccountAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const accountMenuId = "desktop-account-menu";
  const renderAccountMenu = (
    <Menu
      anchorEl={desktopAccountAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isAccountMenuOpen}
      onClose={handleAccountDesktopMenuClose}
    >
      <MenuItem
        onClick={handleAccountDesktopMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-account">
          My account
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleAccountDesktopMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-reservations">
          My Reservations
        </Link>
      </MenuItem>
      <MenuItem
        onClick={handleAccountDesktopMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-favorites">
          My Favorites
        </Link>
      </MenuItem>

      <Divider />
      <MenuItem onClick={handleLogout} style={{ color: "#182131" }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileAccountMenuId = "mobile-account-menu";
  const renderAccountMenuMobile = (
    <Menu
      anchorEl={mobileAccountAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileAccountMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isAccountMobileMenuOpen}
      onClose={handleAccountMobileMenuClose}
    >
      <MenuItem
        onClick={handleAccountMobileMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-account">
          My account
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleAccountMobileMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-reservations">
          My Reservations
        </Link>
      </MenuItem>
      <MenuItem
        onClick={handleAccountMobileMenuClose}
        style={{ color: "#182131" }}
      >
        <Link component={RouterLink} to="/my-favorites">
          My Favorites
        </Link>
      </MenuItem>

      <Divider />
      <MenuItem onClick={handleLogout} style={{ color: "#182131" }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "mobile-account-menu";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenueClose}
    >
      <MenuItem onClick={handleMobileMenueClose} style={{ color: "#182131" }}>
        Movie Theaters
      </MenuItem>
      <MenuItem onClick={handleMobileMenueClose} style={{ color: "#182131" }}>
        About Us
      </MenuItem>
      <MenuItem onClick={handleMobileMenueClose} style={{ color: "#182131" }}>
        Contact
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.sectionDesktop}>
        <AppBar>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={4} color="inherit" edge="start">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Link color="inherit" component={RouterLink} to="/">
                    <Typography>CinemaApp</Typography>
                  </Link>

                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={location}
                      onChange={handleLocation}
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      <MenuItem style={{ color: "#182131" }} value="Tunis">
                        Tunis
                      </MenuItem>
                      <MenuItem style={{ color: "#182131" }} value="Sousse">
                        Sousse
                      </MenuItem>
                      <MenuItem style={{ color: "#182131" }} value="Sfax">
                        Sfax
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={4} color="inherit">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
              <Grid item md={4} color="inherit" edge="end">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  {auth ? (
                    <>
                      <Typography
                        variant="body2"
                        style={{ marginRight: "1rem" }}
                      >
                        Welcome back, John Doe
                      </Typography>
                      <Avatar
                        alt="John Doe"
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        edge="end"
                        className={classes.small}
                      />

                      <IconButton
                        aria-label="account of current user"
                        aria-controls={accountMenuId}
                        aria-haspopup="true"
                        onClick={handleAccountDesktopMenuOpen}
                      >
                        <ArrowDropDownIcon style={{ color: "#eeeeee" }} />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleSignIn}>Login</Button>
                      <Button>Singup</Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderAccountMenu}
      </div>
      <div className={classes.sectionMobile}>
        <AppBar>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={4} xs={4} color="inherit" edge="start">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <IconButton
                    aria-label="menu"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenueOpen}
                  >
                    <MenuIcon style={{ color: "#eeeeee" }} />
                    <Typography
                      style={{ color: "#eeeeee", marginLeft: ".5rem" }}
                      variant="body2"
                    >
                      Menu
                    </Typography>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item sm={4} xs={4} color="inherit" edge="start">
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Link color="inherit" component={RouterLink} to="/">
                    <Typography>CinemaApp</Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid item sm={4} xs={4} color="inherit" edge="end">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  {auth ? (
                    <>
                      <Avatar
                        alt="John Doe"
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                        edge="end"
                        className={classes.small}
                      />

                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileAccountMenuId}
                        aria-haspopup="true"
                        onClick={handleAccountMobileMenuOpen}
                      >
                        <ArrowDropDownIcon style={{ color: "#eeeeee" }} />
                      </IconButton>
                    </>
                  ) : (
                    <Button onClick={handleSignIn}>Sign In</Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Toolbar>

          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6} xs={6} color="inherit" edge="start">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={location}
                      onChange={handleLocation}
                      className={classes.select}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                    >
                      <MenuItem style={{ color: "#182131" }} value="Tunis">
                        Tunis
                      </MenuItem>
                      <MenuItem style={{ color: "#182131" }} value="Sousse">
                        Sousse
                      </MenuItem>
                      <MenuItem style={{ color: "#182131" }} value="Sfax">
                        Sfax
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item md={6} xs={6} color="inherit" edge="end">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <IconButton>
                    <SearchIcon style={{ color: "#eeeeee" }} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderAccountMenuMobile}
        {renderMobileMenu}
      </div>
    </>
  );
};

export default Navigation;
