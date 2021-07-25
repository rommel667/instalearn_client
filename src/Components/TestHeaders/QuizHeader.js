import React from 'react'
import ExamTimer from './ExamTimer'
import { Paper, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

const QuizHeader = () => {

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