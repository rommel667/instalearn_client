import React, { useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { useMedia } from 'react-use-media';
import { Card, CardActionArea, CardContent, CircularProgress, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const SubcategoryChart = ({ correctArraySubcategory, wrongArraySubcategory, setOptionSubChart, userInfoLoading, catLoading, subcatLoading }) => {

    const [value, setValue] = useState('both');
    const matches = useMedia('(min-width: 768px)');


    const subcategories = useSelector(state => state.statistics.subcategories)


    const labelsHandler = (subcategory) => {
        const labels = subcategories?.filter(subcat => {
            return subcat.category.category === subcategory
        }).map(subcat2 => {
            return subcat2.subcategory
        })
        return labels
    }

    const labelsIdHandler = (subcategory) => {
        const labels = subcategories?.filter(subcat => {
            return subcat.category.category === subcategory
        }).map(subcat2 => {
            return subcat2._id
        })
        return labels
    }


    const dataHandler = (subIds) => {
        const correct = []
        const wrong = []
        const data = []
        subIds?.map(subId => {
            if(correctArraySubcategory.some(ca => ca.subcategory === subId)) {
                correctArraySubcategory.map(cor => {
                    if(cor.subcategory === subId) {
                        correct.push(Object.assign({}, { id: subId, count: cor.count }) )
                    } 
                })
            } else {
                correct.push(Object.assign({}, { id: subId, count: null }) )
            }

            if(wrongArraySubcategory.some(wa => wa.subcategory === subId)) {
                wrongArraySubcategory.map(wro => {
                    if(wro.subcategory === subId) {
                        wrong.push(Object.assign({}, { id: subId, count: wro.count }) )
                    }
                })
            } else {
                wrong.push(Object.assign({}, { id: subId, count: null }) )
            }
        })
        correct.map(corEl => {
            wrong.map(wroEl => {
                if(wroEl.id === corEl.id) {
                    data.push((corEl.count/(corEl.count + wroEl.count)*100).toFixed(2))
                }
            })
        })
        return data
    }

    const backgroundHandler = (data, type) => {
        return data.map(item => {
            if(item >= 70) {
                if(type === "backgroundColor") return 'rgb(0, 230, 77, 0.6)' 
                if(type === "borderColor") return 'rgb(0, 230, 77, 1)'
                if(type === "hoverBackgroundColor") return 'rgb(0, 230, 77, 0.9)'
                if(type === "borderColor") return 'rgb(0, 230, 77, 1)' 
            } else {
                if(type === "backgroundColor") return 'rgb(255, 51, 51, 0.6)'
                if(type === "borderColor") return 'rgb(255, 51, 51, 1)'
                if(type === "hoverBackgroundColor") return 'rgb(255, 51, 51, 0.9)'
                if(type === "borderColor") return 'rgb(255, 51, 51, 1)'
            }
        })
    }

    const data1 = {
            labels: labelsHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES"),
            datasets: [
                {
                    label: 'My Ratings',
                    backgroundColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES")),'backgroundColor') ,
                    borderColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES")),'borderColor'),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES")),'hoverBackgroundColor'),
                    hoverBorderColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES")),'hoverBorderColor'),
                    data: dataHandler(labelsIdHandler("ELECTRONICS SYSTEMS AND TECHNOLOGIES"))

                }
            ]
        }
    

    const data2 = {
            labels: labelsHandler("ELECTRONICS ENGINEERING"),
            datasets: [
                {
                    label: 'My Ratings',
                    backgroundColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS ENGINEERING")),'backgroundColor') ,
                    borderColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS ENGINEERING")),'borderColor'),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS ENGINEERING")),'hoverBackgroundColor'),
                    hoverBorderColor: backgroundHandler(dataHandler(labelsIdHandler("ELECTRONICS ENGINEERING")),'hoverBorderColor'),
                    data: dataHandler(labelsIdHandler("ELECTRONICS ENGINEERING"))
                }
            ]
        }


    const data3 = {
            labels: labelsHandler("MATHEMATICS"),
            datasets: [
                {
                    label: 'My Ratings',
                    backgroundColor: backgroundHandler(dataHandler(labelsIdHandler("MATHEMATICS")),'backgroundColor') ,
                    borderColor: backgroundHandler(dataHandler(labelsIdHandler("MATHEMATICS")),'borderColor'),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundHandler(dataHandler(labelsIdHandler("MATHEMATICS")),'hoverBackgroundColor'),
                    hoverBorderColor: backgroundHandler(dataHandler(labelsIdHandler("MATHEMATICS")),'hoverBorderColor'),
                    data: dataHandler(labelsIdHandler("MATHEMATICS"))
                }
            ]
        }
    



    const data4 = {
            labels: labelsHandler("GENERAL ENGINEERING & APPLIED SCIENCES"),
            datasets: [
                {
                    label: 'My Ratings',
                    backgroundColor: backgroundHandler(dataHandler(labelsIdHandler("GENERAL ENGINEERING & APPLIED SCIENCES")),'backgroundColor') ,
                    borderColor: backgroundHandler(dataHandler(labelsIdHandler("GENERAL ENGINEERING & APPLIED SCIENCES")),'borderColor'),
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundHandler(dataHandler(labelsIdHandler("GENERAL ENGINEERING & APPLIED SCIENCES")),'hoverBackgroundColor'),
                    hoverBorderColor: backgroundHandler(dataHandler(labelsIdHandler("GENERAL ENGINEERING & APPLIED SCIENCES")),'hoverBorderColor'),
                    data: dataHandler(labelsIdHandler("GENERAL ENGINEERING & APPLIED SCIENCES"))
                }
            ]
        }



    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setOptionSubChart(event.target.value)
    };



    return (

        <Paper style={{ padding: '25px', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose Category</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                        <div style={{ display: 'flex' }}>
                            <FormControlLabel value='both' control={<Radio />} label="Quiz & Exam" />
                            <FormControlLabel value='exam' control={<Radio />} label="Exam Only" />
                            <FormControlLabel value='quiz' control={<Radio />} label="Quiz Only" />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <Card style={{margin: '10px 0'}} elevation={5}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom  variant="body1" component="h3">MATHEMATICS</Typography>
                        {!subcategories ?
                            <CircularProgress /> :
                                <div>
                                    <HorizontalBar
                                        data={data3}
                                        width={100}
                                        height={200}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display: false
                                                    },
                                                    ticks: {
                                                        max: 100,
                                                        min: 0,

                                                    }
                                                }],
                                                yAxes: [{
                                                    afterFit: function (scaleInstance) {
                                                        scaleInstance.width = matches ? 150 : 0 // sets the width to 100px
                                                    },
                                                    gridLines: {
                                                        display: true
                                                    },

                                                    position: 'right',
                                                    ticks: {
                                                        display: matches ? true : false,

                                                    }
                                                }],
                                            }
                                        }}
                                    />
                                </div>}
                        
                    </CardContent>
                </CardActionArea>
            </Card>


            <Card style={{margin: '10px 0'}} elevation={5}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom  variant="body1" component="h3">ELECTRONICS ENGINEERING</Typography>
                        {!subcategories && userInfoLoading ?
                            <CircularProgress /> :
                                <div>
                                    <HorizontalBar
                                        data={data2}
                                        width={100}
                                        height={200}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display: false
                                                    },
                                                    ticks: {
                                                        max: 100,
                                                        min: 0
                                                    }
                                                }],
                                                yAxes: [{
                                                    afterFit: function (scaleInstance) {
                                                        scaleInstance.width = matches ? 150 : 0 // sets the width to 100px
                                                    },
                                                    gridLines: {
                                                        display: true
                                                    },

                                                    position: 'right',
                                                    ticks: {
                                                        display: matches ? true : false,

                                                    }
                                                }],
                                            }
                                        }}
                                    />
                                </div>}
                        
                    </CardContent>
                </CardActionArea>
            </Card>


            <Card style={{ margin: '10px 0' }} elevation={5}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="h3">ELECTRONICS SYSTEMS AND TECHNOLOGIES</Typography>
                        {!subcategories && userInfoLoading ?
                            <CircularProgress /> :
                            <div>
                                <HorizontalBar
                                    data={data1}
                                    width={100}
                                    height={200}
                                    options={{
                                        legend: {
                                            display: false
                                        },
                                        maintainAspectRatio: false,
                                        scales: {
                                            xAxes: [{
                                                gridLines: {
                                                    display: false
                                                },
                                                ticks: {
                                                    max: 100,
                                                    min: 0
                                                }
                                            }],
                                            yAxes: [{
                                                afterFit: function (scaleInstance) {
                                                    scaleInstance.width = matches ? 150 : 0 // sets the width to 100px
                                                },
                                                gridLines: {
                                                    display: true
                                                },

                                                position: 'right',
                                                ticks: {
                                                    display: matches ? true : false,

                                                }
                                            }],
                                        }
                                    }}
                                />
                            </div>}

                    </CardContent>
                </CardActionArea>
            </Card>
            
            <Card style={{margin: '10px 0'}} elevation={5}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom  variant="body1" component="h3">GENERAL ENGINEERING & APPLIED SCIENCES</Typography>
                        {!subcategories && userInfoLoading ?
                             <CircularProgress /> :
                                <div>
                                    <HorizontalBar
                                        data={data4}
                                        width={100}
                                        height={200}
                                        options={{
                                            legend: {
                                                display: false
                                            },
                                            maintainAspectRatio: false,
                                            scales: {
                                                xAxes: [{
                                                    gridLines: {
                                                        display: false
                                                    },
                                                    ticks: {
                                                        max: 100,
                                                        min: 0
                                                    }
                                                }],
                                                yAxes: [{
                                                    afterFit: function (scaleInstance) {
                                                        scaleInstance.width = matches ? 150 : 0 // sets the width to 100px
                                                    },
                                                    gridLines: {
                                                        display: true
                                                    },

                                                    position: 'right',
                                                    ticks: {
                                                        display: matches ? true : false,

                                                    }
                                                }],
                                            }
                                        }}
                                    /></div>}
                        
                    </CardContent>
                </CardActionArea>
            </Card>


        </Paper>
    )

}





export default SubcategoryChart