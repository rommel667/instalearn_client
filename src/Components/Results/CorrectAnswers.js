import React, { useEffect, useContext } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Paper, Radio, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';



const CorrectAnswers = () => {

    const randomQuestions = useSelector(state => state.questions.randomQuestions)
    const chosenAnswers = useSelector(state => state.questions.chosenAnswers)
    const correctAnswers = useSelector(state => state.questions.correctAnswers)

    return (


        <div>

            <div>
                {randomQuestions?.map((question, index) => {
                    return (

                        <div key={question._id}>
                            <Paper>
                                {chosenAnswers[index] === correctAnswers[index] ? <CheckCircleIcon /> : <HighlightOffIcon />}
                                <Typography>
                                    {question?.question}
                                </Typography>
                                {question.image ? <img  src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> : null}
                            </Paper>


                            <Paper
                                style={{ backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option1 || correctAnswers[index] === question.option1) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option1) ? 'red' : 'grey' }}
                            >
                                <Radio
                                    checked={chosenAnswers[index] === question.option2}
                                    name={question._id}
                                />
                                <Typography>{question.option1}</Typography>
                            </Paper>

                            <Paper
                                style={{ backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option2 || correctAnswers[index] === question.option2) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option2) ? 'red' : 'grey' }}
                            >
                                <Radio
                                    checked={chosenAnswers[index] === question.option3}
                                    name={question._id}
                                />
                                <Typography>{question.option2}</Typography>
                            </Paper>

                            <Paper
                                style={{ backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option3 || correctAnswers[index] === question.option3) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option3) ? 'red' : 'grey' }}
                            >
                                <Radio
                                    checked={chosenAnswers[index] === question.option4}
                                    name={question._id}
                                />
                                <Typography>{question.option3}</Typography>
                            </Paper>

                            <Paper
                                style={{ backgroundColor: (chosenAnswers[index] === correctAnswers[index] && chosenAnswers[index] === question.option4 || correctAnswers[index] === question.option4) ? 'green' : (chosenAnswers[index] !== correctAnswers[index] && chosenAnswers[index] === question.option4) ? 'red' : 'grey' }}
                            >
                                <Radio
                                    checked={chosenAnswers[index] === question.option1}
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