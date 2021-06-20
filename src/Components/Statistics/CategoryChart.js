import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import { useMedia } from 'react-use-media';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
        width: '100%',
    },
});


const CategoryChart = ({ correctArrayCategory, wrongArrayCategory, setOptionCatChart, catLoading, subcatLoading, userInfoLoading }) => {
    const classes = useStyles();
    const [value, setValue] = useState('both');
    const matches = useMedia('(min-width: 768px)');

    const categories = useSelector(state => state.statistics.categories)

    const correctCounter = (category) => {
        let correctSum = 0
        categories?.map(cat => {
            if(cat.category === category) {
                correctArrayCategory.map(cor => {
                    if(cor.category === cat._id) {
                        correctSum = correctSum + cor.count
                    }
                })
            } 
        })
        return correctSum
    }

    const wrongCounter = (category) => {
        let wrongSum = 0
        categories?.map(cat => {
            if(cat.category === category) {
                wrongArrayCategory.map(wro => {
                    if(wro.category === cat._id) {
                        wrongSum = wrongSum + wro.count
                    }
                })
            } 
        })
        return wrongSum
    }




    const data1 = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [ correctCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES"), wrongCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES") ],
            backgroundColor: [
                '#00cc44',
                '#ff3333'
            ],
            hoverBackgroundColor: [
                '#00cc44',
                '#ff3333'
            ]
        }],
        text: isNaN(correctCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES")/(correctCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES") + wrongCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES"))) ? "No Data" :
        `${(correctCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES")/(correctCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES") + wrongCounter("ELECTRONICS SYSTEMS AND TECHNOLOGIES"))*100).toFixed(2)} %`

    };


    const data2 = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [ correctCounter("ELECTRONICS ENGINEERING"), wrongCounter("ELECTRONICS ENGINEERING") ],
            backgroundColor: [
                '#00cc44',
                '#ff3333'
            ],
            hoverBackgroundColor: [
                '#00cc44',
                '#ff3333'
            ]
        }],
        text: isNaN(correctCounter("ELECTRONICS ENGINEERING")/(correctCounter("ELECTRONICS ENGINEERING") + wrongCounter("ELECTRONICS ENGINEERING"))) ? "No Data" :
        `${(correctCounter("ELECTRONICS ENGINEERING")/(correctCounter("ELECTRONICS ENGINEERING") + wrongCounter("ELECTRONICS ENGINEERING"))*100).toFixed(2)} %`
    };

    const data3 = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [ correctCounter("MATHEMATICS"), wrongCounter("MATHEMATICS") ],
            backgroundColor: [
                '#00cc44',
                '#ff3333'
            ],
            hoverBackgroundColor: [
                '#00cc44',
                '#ff3333'
            ]
        }],
        text: isNaN(correctCounter("MATHEMATICS")/(correctCounter("MATHEMATICS") + wrongCounter("MATHEMATICS"))) ? "No Data" :
        `${(correctCounter("MATHEMATICS")/(correctCounter("MATHEMATICS") + wrongCounter("MATHEMATICS"))*100).toFixed(2)} %`
    };

    const data4 = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [ correctCounter("GENERAL ENGINEERING & APPLIED SCIENCES"), wrongCounter("GENERAL ENGINEERING & APPLIED SCIENCES") ],
            backgroundColor: [
                '#00cc44',
                '#ff3333'
            ],
            hoverBackgroundColor: [
                '#00cc44',
                '#ff3333'
            ]
        }],
        text: isNaN(correctCounter("GENERAL ENGINEERING & APPLIED SCIENCES")/(correctCounter("GENERAL ENGINEERING & APPLIED SCIENCES") + wrongCounter("GENERAL ENGINEERING & APPLIED SCIENCES"))) ? "No Data" :
        `${(correctCounter("GENERAL ENGINEERING & APPLIED SCIENCES")/(correctCounter("GENERAL ENGINEERING & APPLIED SCIENCES") + wrongCounter("GENERAL ENGINEERING & APPLIED SCIENCES"))*100).toFixed(2)} %`
    };


    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setOptionCatChart(event.target.value)
    };



    return (

        <Paper style={{padding:'25px'}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>


                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Category</FormLabel>
                    <RadioGroup  aria-label="category" name="category" value={value} onChange={handleRadioChange}>
                        <div style={{ display: 'flex' }}>
                        <FormControlLabel value='both' control={<Radio />} label="Quiz & Exam" />
                        <FormControlLabel value='exam' control={<Radio />} label="Exam Only" />
                        <FormControlLabel value='quiz' control={<Radio />} label="Quiz Only" />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <Grid container spacing={1}>

                <Grid item xs={matches ? 6 : 12}>
                    <Card elevation={5} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom  variant="body1" component="h3">MATHEMATICS</Typography>
                                {catLoading || userInfoLoading ?
                                    <CircularProgress /> :
                                    <div>
                                        <Pie
                                            data={data3}
                                            options={{
                                                responsive: true
                                            }}
                                        />
                                    </div>}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px'  }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{color: parseInt(data3.text) < 70 || data3.text === "No Data" ? 'red' : 'green' }}>
                                        {data3.text}
                                    </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={matches ? 6 : 12}>
                    <Card elevation={5} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom  variant="body1" component="h3">ELECTRONICS ENGINEERING</Typography>
                                
                                {catLoading || userInfoLoading ?
                                    <CircularProgress /> :
                                    <div>
                                        <Pie
                                            data={data2}
                                            options={{
                                                responsive: true
                                            }}
                                        />
                                    </div>}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: parseInt(data2.text) < 70 || data2.text === "No Data" ? 'red' : 'green' }}>
                                        {data2.text}
                                    </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={matches ? 6 : 12}>
                    <Card elevation={5} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom  variant="body1" component="h3">ELECTRONICS SYSTEMS AND TECHNOLOGIES</Typography>
                              
                                {catLoading || userInfoLoading ?
                                    <CircularProgress /> :
                                    <div >
                                        <Pie
                                            data={data1}
                                            options={{
                                                responsive: true
                                            }}
                                        />
                                    </div>}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: parseInt(data1.text) < 70 || data1.text === "No Data" ? 'red' : 'green' }}>
                                        {data1.text}
                                    </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={matches ? 6 : 12}>
                    <Card elevation={5} className={classes.root}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom  variant="body1" component="h3">GENERAL ENGINEERING & APPLIED SCIENCES</Typography>
                                
                                {catLoading || userInfoLoading ?
                                    <CircularProgress /> :
                                    <div>
                                        <Pie
                                            data={data4}
                                            options={{
                                                responsive: true
                                            }}
                                        />
                                    </div>}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: parseInt(data4.text) < 70 || data4.text === "No Data" ? 'red' : 'green' }}>
                                        {data4.text}
                                    </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>
        </Paper>
    )

}



export default CategoryChart