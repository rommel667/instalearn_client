import React, { useEffect, useState, useContext } from 'react'
import './QuizPage.css'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import QuizResult from '../Results/QuizResult'
import { Button, Paper, Popover, Typography, Box, Avatar } from '@material-ui/core'
import { ExtraContext } from '../../App'
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


const QuizPage = ({ catloading, subloading, retry, showResult, setShowResult }) => {
    const classes = useStyles();

    const { state, extraDispatch } = useContext(ExtraContext)


    const history = useHistory()
    const [question, setQuestion] = useState('')
    const [showAnswer, setShowAnswer] = useState(false)
    const [chosenAnswer, setChosenAnswer] = useState('')
    const dispatch = useDispatch()

    const questionSize = useSelector(state => state.settings.questionSize)
    const score = useSelector(state => state.test.score)

    const showQuizResult = useSelector(state => state.test.showQuizResult)
    const currentQuestionNumber = useSelector(state => state.test.currentQuestionNumber)
    const showCorrectOrWrong = useSelector(state => state.test.showCorrectOrWrong)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = showCorrectOrWrong ? 'simple-popover' : undefined;



    const [submitResult, { loading }] = useMutation(SUBMIT_QUIZ_RESULT, {
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query: FETCH_USERINFO_QUERY
            })
            if (data) {
                data.userInfo.correctExamCategory = [ ...result.data.submitResultExam.correctExamCategory ]
                data.userInfo.correctExamSubcategory = [ ...result.data.submitResultExam.correctExamSubcategory ]
                data.userInfo.wrongExamCategory = [ ...result.data.submitResultExam.wrongExamCategory ]
                data.userInfo.wrongExamSubcategory = [ ...result.data.submitResultExam.wrongExamSubcategory ]
                console.log(data.userInfo);
                proxy.writeQuery({
                    query: FETCH_USERINFO_QUERY,
                    data
                })
            }
        },
        onError(err) {
            //   setError(err.graphQLErrors[0].message.split(': ')[1]);
            console.log(err);
        }
    })

    useEffect(() => {
        console.log("USE EFFECT CASE 1");
        if (state.randomQuestions.length === 0) {
            history.push('./')
        } else {
            setQuestion(state.randomQuestions[0])
        }

    }, [])




    const nextQuestion = () => {
        let nextIndex = currentQuestionNumber + 1;
        if (nextIndex === questionSize) {
            return;
        }
        setQuestion(state.randomQuestions[nextIndex])
        dispatch({ type: "SET_CURRENT_QUESTION_NUMBER", payload: { currentQuestionNumber: nextIndex } })
        setChosenAnswer('')
        setShowAnswer(false)
        dispatch({ type: "SHOW_CORRECT_OR_WRONG_MODAL", payload: { showCorrectOrWrong: false } })
    }

    const endQuiz = () => {
        submitHandler()
        dispatch({ type: "SHOW_QUIZ_RESULT", payload: { showQuizResult: true } })
        setQuestion('')
        setShowAnswer(false)
        setChosenAnswer('')
        dispatch({ type: "SHOW_CORRECT_OR_WRONG_MODAL", payload: { showCorrectOrWrong: false } })

    }


    const checkAnswer = (chosen) => {
        if (chosen === question.answer) {
            dispatch({ type: "SET_SCORE", payload: { score: +score + 1 } })
        }
        setChosenAnswer(chosen)
        setShowAnswer(true)
        if (currentQuestionNumber === questionSize - 1) {
            setTimeout(() => endQuiz(), 3000)
        }

        const tempArray = state.chosenAnswers
        tempArray[currentQuestionNumber] = chosen
        extraDispatch({ type: "CHOSEN_ANSWERS", payload: { chosenAnswers: tempArray } })
        dispatch({ type: "CORRECT_OR_WRONG", payload: { correctOrWrong: chosen === question.answer } })
        dispatch({ type: "SHOW_CORRECT_OR_WRONG_MODAL", payload: { showCorrectOrWrong: true } })
    }




    const submitHandler = () => {
        // dispatch({ type: "SHOW_EXAM_RESULT", payload: true })
        let tempCorrectArray = []
        let tempWrongArray = []
        state.randomQuestions.map((question, index) => {
            if (state.chosenAnswers[index] === state.correctAnswers[index]) {
                tempCorrectArray.push(question._id)
            } else {
                tempWrongArray.push(question._id)
            }
        })
        console.log(tempCorrectArray, tempWrongArray);
        submitResult({
            variables: {
                correctArray: tempCorrectArray,
                wrongArray: tempWrongArray
            },
            onCompleted() {
                // dispatch({ type: "RANDOM_QUESTIONS", payload: [] })
                // dispatch({ type: "CHOOSE_ANSWER", payload: [] })
                // dispatch({ type: "CORRECT_ANSWER", payload: [] })
            }
        })
    }



    if (showCorrectOrWrong) {
        setTimeout(() => dispatch({ type: "SHOW_CORRECT_OR_WRONG_MODAL", payload: { showCorrectOrWrong: false } }), 1500)
    }

    return (
        catloading || subloading ? <h1>Loading....</h1> :
            <div className="quizpage" onClick={handleClick} aria-describedby={id}>
                {showAnswer ?
                    <div className="quizpage__quiz">
                        <Paper className="quizpage__question">
                            <Typography variant="h5">{question?.question}</Typography>
                        </Paper>

                        <div className="quizpage__options">
                            <Paper className="quizpage__option" style={{ backgroundColor: (chosenAnswer === question.answer && chosenAnswer === question.option1 || question.answer === question.option1) ? 'green' : (chosenAnswer !== question.answer && chosenAnswer === question.option1) ? 'red' : '' }}>
                                <Typography variant="h6">A. {question.option1}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" style={{ backgroundColor: (chosenAnswer === question.answer && chosenAnswer === question.option2 || question.answer === question.option2) ? 'green' : (chosenAnswer !== question.answer && chosenAnswer === question.option2) ? 'red' : '' }}>
                                <Typography variant="h6">B. {question.option2}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" style={{ backgroundColor: (chosenAnswer === question.answer && chosenAnswer === question.option3 || question.answer === question.option3) ? 'green' : (chosenAnswer !== question.answer && chosenAnswer === question.option3) ? 'red' : '' }}>
                                <Typography variant="h6">C. {question.option3}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" style={{ backgroundColor: (chosenAnswer === question.answer && chosenAnswer === question.option4 || question.answer === question.option4) ? 'green' : (chosenAnswer !== question.answer && chosenAnswer === question.option4) ? 'red' : '' }}>
                                <Typography variant="h6">D. {question.option4}</Typography>
                            </Paper>
                        </div>


                    </div>
                    :
                    <div className="quizpage__quiz">

                        <Paper className="quizpage__question">
                            <Typography variant="h5">{question?.question}</Typography>
                        </Paper>

                        <div className="quizpage__options">
                            <Paper className="quizpage__option" onClick={() => checkAnswer(question.option1)}>
                                <Typography variant="h6">A. {question.option1}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" onClick={() => checkAnswer(question.option2)}>
                                <Typography variant="h6">B. {question.option2}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" onClick={() => checkAnswer(question.option3)}>
                                <Typography variant="h6">C. {question.option3}</Typography>
                            </Paper>
                            <Paper className="quizpage__option" onClick={() => checkAnswer(question.option4)}>
                                <Typography variant="h6">D. {question.option4}</Typography>
                            </Paper>
                        </div>

                    </div>
                }

                <div className="quizpage__buttons">
                    <Button 
                     variant='contained' color='primary' onClick={nextQuestion}>
                     <div style={{display:'flex', flexDirection:'column', padding: '0 30px'}}>
                    <NavigateNextIcon style={{fontSize:'40px'}}  />
                    <Typography variant="p">Next</Typography>
                    </div>
                    </Button>
                    
                </div>

                <Popover
                    id={id}
                    open={showCorrectOrWrong}
                    anchorEl={anchorEl}
                    // onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography >The content of the Popover.</Typography>
                </Popover>



                <QuizResult
                    open={showQuizResult}
                    retry={retry}
                />




            </div>

    )
}







const SUBMIT_QUIZ_RESULT = gql`
mutation submitResultQuiz(
  $correctArray: [String]!
  $wrongArray: [String]!
) {
    submitResultQuiz(
        correctArray: $correctArray
        wrongArray: $wrongArray
    ) {
        _id
      correctExamCategory {
        category
        count
      }
      correctExamSubcategory {
        subcategory
        count
      }
      wrongExamCategory {
        category
        count
      }
      wrongExamSubcategory {
        subcategory
        count
      }
    }
}

`

export const FETCH_USERINFO_QUERY = gql`
query {
    userInfo {
        correctExamCategory {
            category
            count
          }
        correctExamSubcategory {
            subcategory
            count
          }
        wrongExamCategory {
            category
            count
          }
        wrongExamSubcategory {
            subcategory
            count
          }
        correctQuizCategory {
            category
            count
          }
        correctQuizSubcategory {
            subcategory
            count
          }
        wrongQuizCategory {
            category
            count
          }
        wrongQuizSubcategory {
            subcategory
            count
          }
    }
}
    
`




export default QuizPage