import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import { useHistory } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid green',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ExamResult = ({ open, retry }) => {
    const classes = useStyles();

    const history = useHistory()

    const dispatch = useDispatch()
    const questionSize = useSelector(state => state.settings.questionSize)
    const score = useSelector(state => state.test.score)



    const data = {
        labels: [
            'Correct',
            'Wrong'
        ],
        datasets: [{
            data: [score, questionSize - score],
            backgroundColor: [
                '#00cc44',
                '#ff3333'
            ],
            hoverBackgroundColor: [
                '#00cc44',
                '#ff3333'
            ]
        }],

    };



    const closeModal = () => {
        dispatch({ type: "UNSHOW_RESULTS" })
        dispatch({ type: "RESET_OPTIONS" })
        dispatch({ type: "RESET_QUESTIONS" })
        history.push('/')
    }



    return (

        <Modal

            className={classes.modal}
            open={open}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >

            <div className={classes.paper}>
                {data && (

                    <h1 style={{ color: 'white' }}>
                        {`${((score / questionSize) * 100).toFixed(2)} %`}
                    </h1>


                )}
                <div>
                    <Doughnut
                        data={data}
                        legend={{
                            labels: false
                        }
                        }
                        options={{
                            responsive: true
                        }}
                    />
                </div>
                
                
                <Button color='secondary' onClick={closeModal}>Back to Menu</Button>
                <Button color='primary' onClick={retry}>Retry</Button>
            </div>



        </Modal>
    )
}


export default ExamResult