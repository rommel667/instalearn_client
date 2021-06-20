import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ExamTimer from './ExamTimer'
import { Button, Paper, Popover, Typography } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

const QuizHeader = () => {

    const history = useHistory()

    const [date, setDate] = useState(Date.now() + 10 * 60 * 1000)

    const dispatch = useDispatch()
    const questionSize = useSelector(state => state.settings.questionSize)
    const timerReset = useSelector(state => state.test.timerReset)
    
    const score = useSelector(state => state.test.score)
    const currentQuestionNumber = useSelector(state => state.test.currentQuestionNumber)

    





    return (
        <Paper style={{marginBottom:'20px', padding:'20px 10px', display:'flex', justifyContent:'space-between'}}>
            <Typography>
                Question {currentQuestionNumber + 1} of {questionSize}
            </Typography>

            <Typography id="simple-popover">
                <ExamTimer date={timerReset} />
            </Typography>

            <Typography>
                Score: {score}/{questionSize}
            </Typography>



            


        </Paper>
    )
}





export default QuizHeader