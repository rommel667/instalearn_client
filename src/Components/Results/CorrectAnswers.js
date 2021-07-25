import React, { useContext } from 'react'
import './CorrectAnswers.css'
import { Paper, Radio, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import ExamAnswersHeader from '../TestHeaders/ExamAnswersHeader';
import { ExtraContext } from '../../App';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const CorrectAnswers = ({ retry }) => {

    const { state, extraDispatch } = useContext(ExtraContext)

    const { randomQuestions, chosenAnswers, correctAnswers } = state

    return (


        <div>
            <ExamAnswersHeader retry={retry} />
            <div className="examanswers">

                {randomQuestions?.map((question, index) => {
                    return (

                        <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '1px' }} key={question._id}>
                            <Paper style={{ padding: '5px' }}>

                                <Typography variant="h6">
                                    {question?.question}
                                </Typography>
                                {question.image ? <img src='https://react.semantic-ui.com/images/avatar/large/patrick.png' alt='question' /> : null}
                            </Paper>


                            <Paper
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option1 || correctAnswers[index] === question.option1) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option1) ? 'red' : 'grey' }}
                            >
                                <GreenRadio
                                    checked={chosenAnswers[index] === question.option1}
                                    name={question._id}
                                />
                                <Typography>{question.option1}</Typography>
                            </Paper>

                            <Paper
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option2 || correctAnswers[index] === question.option2) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option2) ? 'red' : 'grey' }}
                            >
                                <GreenRadio
                                    checked={chosenAnswers[index] === question.option2}
                                    name={question._id}
                                />
                                <Typography>{question.option2}</Typography>
                            </Paper>

                            <Paper
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option3 || correctAnswers[index] === question.option3) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option3) ? 'red' : 'grey' }}
                            >
                                <GreenRadio
                                    checked={chosenAnswers[index] === question.option3}
                                    name={question._id}
                                />
                                <Typography>{question.option3}</Typography>
                            </Paper>

                            <Paper
                                style={{ display: 'flex', alignItems: 'center', backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option4 || correctAnswers[index] === question.option4) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option4) ? 'red' : 'grey' }}
                            >
                                <GreenRadio
                                    checked={chosenAnswers[index] === question.option4}
                                    name={question._id}
                                />
                                <Typography>{question.option4}</Typography>
                            </Paper>
                        </div>)
                })}

            </div>


        </div>
    )
}



export default CorrectAnswers