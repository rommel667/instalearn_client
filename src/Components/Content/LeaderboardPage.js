import React, { useContext, useEffect, useState } from 'react'
import './LeaderboardPage.css'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Moment from 'react-moment'
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, deepGreen, green } from '@material-ui/core/colors';
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Card, CardContent, CardHeader, CircularProgress, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core'
import { FETCH_LEADERBOARD_QUERY, FETCH_LEADERBOARD_SUBSCRIPTION } from '../../Layout'


const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        marginRight: '10px'
    },
    rating: {
        width: theme.spacing(11),
        height: theme.spacing(11),
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        marginLeft: 'auto'
    },
}));


const LeaderboardPage = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const leaderboards = useSelector(state => state.leaderboards.leaderboards)

    const [category, setCategory] = useState('OVERALL')


    const handleRadioChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <div className="leaderboardpage">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose Category</FormLabel>
                        <RadioGroup aria-label="category" name="category" value={category} onChange={handleRadioChange}>
                            <div style={{ display: 'flex' }}>
                                <FormControlLabel value='OVERALL' control={<Radio />} label="All Category" />
                                <FormControlLabel value='MATHEMATICS' control={<Radio />} label="Mathematics" />
                                <FormControlLabel value='ELECTRONICS ENGINEERING' control={<Radio />} label="Electronics" />
                                <FormControlLabel value='ELECTRONICS SYSTEMS AND TECHNOLOGIES' control={<Radio />} label="EST" />
                                <FormControlLabel value='GENERAL ENGINEERING & APPLIED SCIENCES' control={<Radio />} label="GEAS" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>

            <Paper>
                {leaderboards.map((ranker, index) => {
                    console.log("MAPPING LB", ranker)
                    if (ranker.category === category) {
                        return (
                            <Card key={ranker._id} style={{display:'flex', alignItems: 'center', padding: '10px 15px', margin: '5px 0'}}>

                                <Avatar className={classes.avatar} src={ranker.ranker.photo} />
                                <div style={{display:'flex', flexDirection: 'column'}}>
                                    <Typography variant="h5" color="textPrimary">{ranker.ranker.name}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{<Moment fromNow>{ranker.updatedAt}</Moment>}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{`Total MCQs Answered: ${ranker.totalQuestions}`}</Typography>
                                </div>
                                {/* <Typography variant="body2" color="textSecondary" component="p">{`${(ranker.rating).toFixed(2)} %`}</Typography> */}

                                <Avatar variant="square" className={classes.rating}>{`${(ranker.rating).toFixed(2)} %`}</Avatar>
                            </Card>
                        )
                    }
                })}
            </Paper>
        </div>
    )
}







export default LeaderboardPage