import React, { useEffect, useState } from 'react'
import './SideBar.css'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import Scroll from 'react-scroll'
import Chat from '../Components/SideBar/Chat';
import NewRanker from '../Components/SideBar/NewRanker';
import { Button, Divider, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';


let scroll = Scroll.animateScroll
let Element = Scroll.Element
let Events = Scroll.Events
let scrollSpy = Scroll.scrollSpy

const SideBar = () => {

    const dispatch = useDispatch()
    const chatsArray = useSelector(state => state.chats.chats)
    const newChatsCount = useSelector(state => state.chats.newChatsCount)

    const [message, setMessage] = useState('')

    const [newChat, { data: newChatEntry, loading: loadingNewChat }] = useMutation(NEW_CHAT_MUTATION, {
        update(proxy, result) {
            console.log("RESULT", result);
        },
        variables: {
            message: message, createdAt: new Date(Date.now()).toISOString()
        },
        onError(err) {
            console.log(err);
            //   setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    useEffect(() => {

        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", to, element);
        })
        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", to, element);
        })
        scrollSpy.update()
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }, [])

    useEffect(() => {
        dispatch({ type: "NEW_CHATS_COUNT", payload: { newChatsCount: 0 } })
        scroll.scrollToBottom({
            duration: 1000,
            smooth: true,
            containerId: 'main',
            offset: 200,
        })
    }, [chatsArray])

    const handleSendClick = () => {
        if (message === '') {
            return
        }
        newChat()
        setMessage('')
    }

    const handleSendEnter = (event) => {
        event.preventDefault()
        if (message === '') {
            return
        }
        newChat()
        setMessage('')
    }


    return (

        <div className="sidebar">
            <div className="sidebar__header">
                <Typography variant="h5" gutterBottom>Chats</Typography>
                <Tooltip title="More Options"><MoreVertIcon onClick={() => alert("to follow")} /></Tooltip>

            </div>
            <Divider />
            <Paper id="main" className="sidebar__chats">
                {chatsArray.map((item, index) => {
                    if (item.message) {
                        return (
                            <Element key={item._id} name={item._id} className="element">
                                <Chat item={item} />
                            </Element>
                        )
                    }
                    if (item.rating) {
                        return (
                            <Element key={item._id + index} name={item._id} className="element">
                                <NewRanker item={item} />
                            </Element>
                        )
                    }
                })}
            </Paper>

            <div className="sidebar__input">
                <form onSubmit={handleSendEnter} noValidate autoComplete="off" style={{ display: 'flex'}}>
                    <TextField fullWidth
                        placeholder="Tell what's on your mind"
                        name='comment'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        id="outlined-basic"
                        variant="outlined" />
                    <Button
                        
                        type='submit'
                        onClick={handleSendClick}
                        variant="contained"
                        color="primary"
                    ><SendIcon />
                    </Button>
                </form>
            </div>


        </div>

    )
}



const NEW_CHAT_MUTATION = gql`
mutation newChat(
  $message: String!
  $createdAt: String!
) {
    newChat(
        message: $message
        createdAt: $createdAt
    ) {
        _id
        senderId
        senderName
        senderPhoto
        message
        createdAt
    }
}

`





export default SideBar