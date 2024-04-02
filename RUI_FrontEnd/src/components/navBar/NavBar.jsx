import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import styles from "./navBar.module.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import { UserContext } from '../../context/UserProvider';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { UserContext } from '../../context/User';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const { setUser ,user} = React.useContext(UserContext);
const {logOutHandler}=React.useContext(UserContext)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSignIn = () => {
    Navigate('/signin');
  };
  
  const handleSignOut = () => {
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    <MenuItem component={Link} to="/signin" onClick={handleMenuClose}>Sign In</MenuItem>
      <MenuItem onClick={logOutHandler}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"

        >
          {/* <Badge badgeContent={4} color="error"> */}
          <HomeIcon />
          {/* </Badge> */}
        </IconButton >
        <Link to={"/"}>Home</Link>
      </MenuItem>
      <MenuItem>
        <IconButton
           size="large"
          aria-label="show 4 new mails"
          color="inherit"
          component={Link} to="/streetProducts"

        > 
          {/* <Badge badgeContent={4} color="error"> */}
          <EmojiTransportationIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Street Products</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          component={Link} to="/favourites"

        >
          {/* <Badge badgeContent={17} color="error"> */}
          <FavoriteBorderOutlinedIcon />
          {/* </Badge> */}
        </IconButton>
        <p>Favourites</p>
      </MenuItem>


      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          component={Link} to="/profile"


        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.appNAv} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            // component="div"
            component={Link} to="/"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            RUI
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>



            <IconButton
              component={Link} to="/"
              size="large" aria-label="show 4 new mails" color="inherit"
            >
              {/* <Badge badgeContent={4} color="error"> */}
              <HomeIcon />
              {/* </Badge> */}
            </IconButton>

            <IconButton
              component={Link} to="/streetProducts"

              size="large"
              // aria-label="show 17 new notifications"
              color="inherit"
            >
              {/* <Badge badgeContent={17} color="error"> */}
              <EmojiTransportationIcon />
             {/* </Badge>  */}
             </IconButton> 

            <IconButton
              component={Link} to="/favourites"

              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {/* <Badge badgeContent={17} color="error"> */}
              <FavoriteBorderOutlinedIcon />
              {/* </Badge> */}
            </IconButton>

         


            <IconButton
              component={Link} to="/profile"

              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
