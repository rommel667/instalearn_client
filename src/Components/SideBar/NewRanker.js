import React from 'react'
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import Moment from 'react-moment'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';


const NewRanker = ({ item }) => {
    return (
        <Card style={{ margin: '3px 0' }}>
            <CardContent>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Avatar alt="Remy Sharp" src={item.ranker.photo} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Typography variant="body2" color="textPrimary" component="h4">{item.ranker.name}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{<Moment fromNow>{item.updatedAt}</Moment>}</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">Category: {item.category}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Rating: {item.rating}</Typography>
                    </div>
                </div>

            </CardContent>

        </Card>

    )
}

export default NewRanker