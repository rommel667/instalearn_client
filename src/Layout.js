import React, { useState } from 'react';
import './Layout.css'
import CssBaseline from '@material-ui/core/CssBaseline';
import gql from 'graphql-tag'
import Header from './Layout/Header';
import Content from './Layout/Content';
import SideDrawer from './Layout/SideDrawer';
import { ThemeProvider, createMuiTheme, Grid } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Route, useHistory, useLocation } from 'react-router-dom';
import QuizHeader from './Components/TestHeaders/QuizHeader';
import ExamHeader from './Components/TestHeaders/ExamHeader';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from './Layout/SideBar';
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { FETCH_USERINFO_QUERY } from './Components/Content/QuizPage';
import { useMedia } from 'react-use-media';
import HomeIcon from '@material-ui/icons/Home';
import BarChartIcon from '@material-ui/icons/BarChart';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MessageIcon from '@material-ui/icons/Message';


const useStyles = makeStyles((theme) => ({

    toolbar: {
        height: "50px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        height: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center'

    },
    welcome: {
        flexGrow: 1,
        padding: theme.spacing(0),
        height: '100vh',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center'

    },
    speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    speedDialChats: {
        position: 'absolute',
        bottom: theme.spacing(15),
        right: theme.spacing(2),
    },
}));


const Layout = (props) => {

    
    const classes = useStyles();

    const matches = useMedia('(min-width: 768px)');

    const history = useHistory()

    const location = useLocation()
   
    const [open, setOpen] = useState(false);
    const [openFab, setOpenFab] = useState(false)
    const [hidden, setHidden] = useState(false);

    const dispatch = useDispatch()
    const theme = useSelector(state => state.settings.theme)
    const user = useSelector(state => state.user.user)
    const newChatsCount = useSelector(state => state.chats.newChatsCount)
    const showFloatingButton = useSelector(state => state.settings.showFloatingButton)
    const leaderboards = useSelector(state => state.leaderboards.leaderboards)
    const showChats = useSelector(state => state.chats.showChats)

    const { loading: loadingUserInfo, data: userInfo } = useQuery(FETCH_USERINFO_QUERY)

    const { loading: loadingNewChatEntry, data: newMessage } = useSubscription(FETCH_NEWCHAT_SUBSCRIPTION,
        {
            onSubscriptionData: ({ subscriptionData }) => {
                dispatch({ type: "NEW_CHAT", payload: { newChat: subscriptionData.data.newChat } })
                dispatch({ type: "NEW_CHATS_COUNT", payload: { newChatsCount: newChatsCount + 1 } })
            }
        }
    );

    const { loading: catLoading, data: categories } = useQuery(
        FETCH_CATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "CATEGORIES", payload: { categories: categories.categories } })
            }
        })

    const { loading: subcatLoading, data: subcategories } = useQuery(
        FETCH_SUBCATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "SUBCATEGORIES", payload: { subcategories: subcategories.subcategories } })
            }
        })

    const { loading: loadingLeaderboard, data: rankers, refetch: refetchRankers } = useQuery(
        FETCH_LEADERBOARD_QUERY,
        {
            onCompleted() {
                dispatch({ type: "LEADERBOARDS", payload: { leaderboards: rankers.leaderboards } })
            }
        })

    const { loading: loadingNewRanker, data: newRanker } = useSubscription(FETCH_LEADERBOARD_SUBSCRIPTION,
        {
            onSubscriptionData: ({ subscriptionData }) => {
                dispatch({ type: "NEW_LEADERBOARD", payload: { newLeaderboard: subscriptionData.data.newRanker } })
                dispatch({ type: "NEW_CHAT", payload: { newChat: subscriptionData.data.newRanker } })
                dispatch({ type: "NEW_CHATS_COUNT", payload: { newChatsCount: newChatsCount + 1 } })
            }
        }
    );

    const { loading: loadingChats, data: chats } = useQuery(
        FETCH_CHATS_QUERY,
        {
            onCompleted() {
                dispatch({ type: "CHATS", payload: { chats: chats.chats } })
            }
        }
    )



    const handleOpen = () => {
        setOpenFab(true);
    };

    const handleClose = () => {
        setOpenFab(false);
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const themechoice = createMuiTheme({
        palette: {
            type: theme
        }
    })

    const chooseHome = () => {
        dispatch({ type: 'SHOW_CHATS', payload: { showChats: false } })
        history.push('/')
    }

    const chooseStats = () => {
        dispatch({ type: 'SHOW_CHATS', payload: { showChats: false } })
        history.push('/mystats')
    }

    const chooseLeaderBoard = () => {
        dispatch({ type: 'SHOW_CHATS', payload: { showChats: false } })
        history.push('/leaderboard')
    }

    const actions = [
        { icon: <HomeIcon onClick={chooseHome} />, name: 'Home' },
        { icon: <BarChartIcon onClick={chooseStats} />, name: 'Stats' },
        { icon: <FormatListNumberedIcon onClick={chooseLeaderBoard} />, name: 'LeaderBoard' },
        { icon: <MessageIcon onClick={() => dispatch({ type: 'SHOW_CHATS', payload: { showChats: true } })} />, name: 'Chats' },
    ];




    return (
        <main className={ location.pathname === '/welcome' ? classes.welcome : classes.content}>
            <div className={classes.toolbar} />

            <Backdrop open={openFab} />

            <ThemeProvider theme={themechoice}>
                <CssBaseline />
                <SideDrawer handleDrawerClose={handleDrawerClose} open={open} />
                <Header handleDrawerOpen={handleDrawerOpen} open={open} theme={theme} user={user} />

                {matches ?
                    <Grid container spacing={1}>
                        <Grid item xs={user ? 8 : 12}>
                            <Route path='/exam' component={ExamHeader} />
                            <Route path='/quiz' component={QuizHeader} />
                            <Content />
                        </Grid>
                        {user ?
                            <Grid item xs={4}>
                                <SideBar />
                            </Grid> : null}
                    </Grid> :

                    <Grid container spacing={1}>
                        {showChats ? null :
                            <Grid item xs={12}>
                                <Route path='/exam' component={ExamHeader} />
                                <Route path='/quiz' component={QuizHeader} />
                                <Content />
                            </Grid>}
                        {(user && showChats) ?

                            <Grid item xs={12}>
                                <SideBar />
                            </Grid>
                            : null}

                    </Grid>

                }
                {showFloatingButton && user ?
                    matches ? null :
                        <SpeedDial
                            ariaLabel="SpeedDial tooltip example"
                            className={showChats ? classes.speedDialChats : classes.speedDial}
                            hidden={hidden}
                            icon={<SpeedDialIcon />}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={openFab}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    tooltipOpen
                                    onClick={handleClose}
                                />
                            ))}
                        </SpeedDial> : null}

            </ThemeProvider>

        </main>
    );
}


export const FETCH_LEADERBOARD_SUBSCRIPTION = gql`
subscription {
        newRanker {
            _id
            category
            rating
            updatedAt
            totalQuestions
            status
            ranker {
                _id
                name
                photo
                updatedAt
            }
    }
}
    
`

export const FETCH_LEADERBOARD_QUERY = gql`
        query {
                leaderboards {
                _id
                category
                rating
                updatedAt
                totalQuestions
                status
                ranker {
                    _id
                    name
                    photo
                    updatedAt
                }
            }
        }
            
        `


export const FETCH_CHATS_QUERY = gql`
query {
        chats {
        _id
        senderId
        senderName
        senderPhoto
        message
        createdAt
    }
}
    
`


export const FETCH_NEWCHAT_SUBSCRIPTION = gql`
subscription {
        newChat {
            _id
            senderId
            senderName
            senderPhoto
            message
            createdAt
    }
}
    
`

export const FETCH_CATEGORIES_QUERY = gql`
query {
    categories {
        _id
        category
        subcategory {
            _id
            subcategory
        }
    }
}
    
`

export const FETCH_SUBCATEGORIES_QUERY = gql`
query {
    subcategories {
        _id
        subcategory
        category {
            category
        }
    }
}
    
`




export default Layout;
