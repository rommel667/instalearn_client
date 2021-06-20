import React from 'react'
import Moment from 'react-moment'
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


const Chat = ({ item }) => {
    return (

        <Card style={{ margin: '3px 0' }}>
            <CardContent>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Avatar alt="Remy Sharp" src={item.senderPhoto} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Typography variant="body2" color="textPrimary" component="h4">{item.senderName}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{<Moment fromNow>{item.createdAt}</Moment>}</Typography>
                        </div>
                        <Typography variant="body2" color="textPrimary" component="p">{item.message}</Typography>
                    </div>
                </div>

            </CardContent>

        </Card>

    )
}

export default Chat