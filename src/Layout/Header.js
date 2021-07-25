import React, { useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu'
import MessageIcon from '@material-ui/icons/Message';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { InputBase, MenuItem, Menu, Badge } from '@material-ui/core';
import { AccountBox, SettingsApplications, ExitToApp, Brightness4, BrightnessHigh, Search } from '@material-ui/icons'
import { useMedia } from 'react-use-media';
import ProfileModal from '../Components/Header/ProfileModal';
import SettingsModal from '../Components/Header/SettingsModal';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const Header = ({ handleDrawerOpen, theme, user }) => {
  const classes = useStyles();

  const history = useHistory()

  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  

  const matches = useMedia('(min-width: 768px)');

  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch()
  const showFloatingButton = useSelector(state => state.settings.showFloatingButton)
  const newChatsCount = useSelector(state => state.chats.newChatsCount)
  const showChats = useSelector(state => state.chats.showChats)


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = () => {
    dispatch({ type: "LOGOUT" })
    setAnchorEl(null);
  }

  const showProfileHandler = () => {
    setShowProfile(true)
    setAnchorEl(null);
  }

  const showSettingsHandler = () => {
    setShowSettings(true)
    setAnchorEl(null);
  }




  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={showProfileHandler}><AccountBox />My Profile</MenuItem>
      <MenuItem onClick={showSettingsHandler}><SettingsApplications />My Settings</MenuItem>
      <MenuItem onClick={logOutHandler}><ExitToApp />Sign out</MenuItem>
    </Menu>
  );

  const chatsBadgeHandler = () => {
    
    dispatch({ type: 'SHOW_CHATS', payload: { showChats: true } })
  }



  return (
    <div className={classes.root}>
      <AppBar color="primary" >
        <Toolbar>

          {showFloatingButton ? null :
            matches ? null :
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                <MenuIcon />
              </IconButton>}

          {(!matches && showFloatingButton) ?
            <Typography className={classes.title} style={{ cursor: "pointer", marginRight: '20px' }} variant="h6" onClick={() => history.push('/')}>
              insta<span style={{ color: 'yellow' }}>LEARN</span>
            </Typography> : null
          }

          {matches ?
            <div className={classes.title} style={{ display: 'flex' }}>
              <Typography style={{ cursor: "pointer", marginRight: '20px' }} variant="h6" onClick={user ? () => history.push('/') : () => history.push('/welcome')}>
                insta<span style={{ color: 'yellow' }}>LEARN</span>
              </Typography>


              {user && <Button color="inherit" onClick={() => history.push('/')}>Home</Button>}
              {user && <Button color="inherit" onClick={() => history.push('/mystats')}>My Stats</Button>}
              {user && <Button color="inherit" onClick={() => history.push('/leaderboard')}>LeaderBoard</Button>}
            </div> : null}


          
            {/* THINK OF A FEATURE TO UTILIZE THIS SEARCH FUNCTION  */}
          {/* {user ?
            <div style={{ flexGrow: matches ? null : '1' }} className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div> : null} */}



          {theme === 'light' ? <Tooltip title="Toggle Light/Dark Mode"><BrightnessHigh onClick={() => dispatch({ type: "CHOOSE_THEME" })} /></Tooltip> :
            <Tooltip title="Toggle Light/Dark Mode"><Brightness4 onClick={() => dispatch({ type: "CHOOSE_THEME" })} /></Tooltip>}

          {matches ? null : 
           (showFloatingButton ? null :
           showChats ? <HomeIcon style={{ margin: '0 20px' }} onClick={() => dispatch({ type: 'SHOW_CHATS', payload: { showChats: false } })} /> :
           <Badge onClick={chatsBadgeHandler} style={{ margin: '0 20px' }} badgeContent={newChatsCount} color="secondary"><MessageIcon /></Badge>)} 

          {user && <Avatar style={{ marginLeft: (showFloatingButton || matches) && '15px' }}  alt="Remy Sharp" src={user?.photo} onClick={handleProfileMenuOpen} />}

          {user ? null : <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>}
          {user ? null : <Button color="inherit" onClick={() => history.push('/register')}>Register</Button>}

          {renderMenu}
        </Toolbar>
      </AppBar>

      {(user && showProfile) &&
        <ProfileModal
          showProfile={showProfile}
          cancelProfile={() => setShowProfile(false)}
        />}
      {(user && showSettings) &&
        <SettingsModal
          showSettings={showSettings}
          cancelSettings={() => setShowSettings(false)}
        />}
    </div>
  )
}

export default Header;





