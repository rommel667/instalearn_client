import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { BarChart, ChevronLeft, Home, Facebook, YouTube, GitHub, Twitter, FormatListNumbered } from '@material-ui/icons'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  toolbar: {
    height: "60px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});

const SideDrawer = ({ open, handleDrawerClose }) => {

  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()

  const clickHandler = (route) => {
    dispatch({ type: 'SHOW_CHATS', payload: { showChats: false } })
    history.push(route)
  }


  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>

      <Divider />

      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '20px' }}>
        <div onClick={() => clickHandler('/')} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Home />
          <Typography variant="h6" >Back to Homepage</Typography>
        </div>

        <div onClick={() => clickHandler('/mystats')} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <BarChart />
          <Typography variant="h6" >My Statistics</Typography>
        </div>

        <div onClick={() => clickHandler('/leaderboard')} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FormatListNumbered />
          <Typography variant="h6" >LeaderBoard</Typography>
        </div>
      </div>

    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={handleDrawerClose}>
        {list()}
        <Divider style={{ marginTop: "32px" }} />

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <p>Follow me on:</p>
          <div style={{ display: 'flex', gap: '5px' }} >
            <Facebook fontSize="default" className="icon-facebook" />
            <YouTube fontSize="default" className="icon-youtube" />
            <GitHub fontSize="default" className="icon-github" />
            <Twitter fontSize="default" className="icon-twitter" />
          </div>
        </div>

        <Divider style={open ? { display: "flex", marginTop: "16px" } : { display: "none" }} />
        <div style={open ? { display: "flex", justifyContent: "center", marginTop: "32px" } : { display: "none" }}>
          <p>&copy; Rommel Velasco {new Date().getFullYear()}</p>
        </div>
      </Drawer>
    </div>
  );
}


export default SideDrawer
