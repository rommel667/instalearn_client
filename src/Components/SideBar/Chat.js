import React from 'react'
import Moment from 'react-moment'
import { Avatar, Card, CardContent, Typography } from '@material-ui/core';



const Chat = ({ item }) => {
    return (

        <Card style={{ margin: '3px 0' }}>
            <CardContent>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Avatar alt="Remy Sharp" src={item.senderPhoto} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" color="textPrimary" component="h4">{item.senderName}</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">{<Moment fromNow>{item.createdAt}</Moment>}</Typography>
                        <Typography variant="body2" color="textPrimary" component="p">{item.message}</Typography>
                    </div>
                </div>

            </CardContent>

        </Card>

    )
}

export default Chat