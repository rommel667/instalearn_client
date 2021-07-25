import React, { useContext } from 'react'
import './ExamPage.css'
import { useSelector } from 'react-redux'
import { Paper, Radio, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import ExamResult from '../Results/ExamResult'
import { ExtraContext } from '../../App'

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);



const ExamPage = ({ catloading, subloading, retry }) => {

    const { state, extraDispatch } = useContext(ExtraContext)

    const showExamResult = useSelector(state => state.test.showExamResult)
    
    const handleChooseAnswer = (index, option) => {
        const tempArray = state.chosenAnswers
        tempArray[index] = option
        extraDispatch({ type: "CHOSEN_ANSWERS", payload: { chosenAnswers: tempArray } })        
    }

    return (
        <div className="exampage" >
            {catloading || subloading ? <h1>Loading....</h1> :
                    <div>
                        {state.randomQuestions.map((question, index) => {
                            return (
                                <div style={{marginBottom: '10px', display:'flex', flexDirection:'column', gap:'1px'}} key={question._id}>
                                    <Paper style={{padding: '5px'}}>
                                        <Typography variant="h6">
                                            {question?.question} {question.image ? <img src='https://react.semantic-ui.com/images/avatar/large/patrick.png' alt="question" /> : null}
                                        </Typography>
                                    </Paper>

                                    <Paper
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                        onClick={() => handleChooseAnswer(index, question.option1)}>
                                        <GreenRadio
                                            checked={state.chosenAnswers[index] === question.option1}
                                            onChange={() => handleChooseAnswer(index, question.option1)}
                                            
                                            name={question._id}
                                        />
                                        <Typography>{question.option1}</Typography>
                                    </Paper>

                                    <Paper
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                        onClick={() => handleChooseAnswer(index, question.option2)}>
                                        <GreenRadio
                                            checked={state.chosenAnswers[index] === question.option2}
                                            onChange={() => handleChooseAnswer(index, question.option2)}
                                            
                                            name={question._id}
                                        />
                                        <Typography>{question.option2}</Typography>
                                    </Paper>

                                    <Paper
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                        onClick={() => handleChooseAnswer(index, question.option3)}>
                                        <GreenRadio
                                            checked={state.chosenAnswers[index] === question.option3}
                                            onChange={() => handleChooseAnswer(index, question.option3)}
                                           
                                            name={question._id}
                                        />
                                        <Typography>{question.option3}</Typography>
                                    </Paper>

                                    <Paper
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                        onClick={() => handleChooseAnswer(index, question.option4)}>
                                        <GreenRadio
                                            checked={state.chosenAnswers[index] === question.option4}
                                            onChange={() => handleChooseAnswer(index, question.option4)}
                                            
                                            name={question._id}
                                        />
                                        <Typography>{question.option4}</Typography>
                                    </Paper>
                                    
                                </div>
                               
                            )
                        })}
                    </div>
            }
            <ExamResult
                open={showExamResult}
                retry={retry}
            />
        </div>
    )
}



export default ExamPage