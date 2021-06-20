import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import ExamTimer from './ExamTimer'
import { Button, Paper, Typography } from '@material-ui/core'
import { FETCH_USERINFO_QUERY } from '../Content/StatisticsPage'
import { useDispatch, useSelector } from 'react-redux'
import { ExtraContext } from '../../App'


const ExamHeader = () => {

    const { state, extraDispatch } = useContext(ExtraContext)

    const dispatch = useDispatch()
    const questionSize = useSelector(state => state.settings.questionSize)
    

    const history = useHistory()
    const [date, setDate] = useState(Date.now() + 10 * 60 * 1000)

    const [submitResult, { loading }] = useMutation(SUBMIT_EXAM_RESULT, {
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query: FETCH_USERINFO_QUERY
            })
            console.log(data);
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


    const backToMenuHandler = () => {
        history.push('/')
    }

    const submitHandler = () => {
        setTimeout(() => dispatch({ type: "SHOW_EXAM_RESULT", payload: { showExamResult: true } }), 3000)
        dispatch({ type: "SHOW_EXAM_CORRECT_ANSWERS", payload: { showExamCorrectAnswers: true } })
        
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
            }
        })
        dispatch({ type: "SET_SCORE", payload: { score: tempCorrectArray.length } })
    }




    return (
        <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '10px' }}>
          
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <Typography>Progress: {state.chosenAnswers.filter(v => v !== undefined).length}/{questionSize}</Typography>
                    <Typography>Time Remaining: <ExamTimer date={date} /></Typography>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button variant='outlined' onClick={backToMenuHandler}>QUIT</Button>
                    <Button variant='outlined'  onClick={submitHandler}>SUBMIT</Button>
                </div>
           
        </Paper>
    )
}

const SUBMIT_EXAM_RESULT = gql`
mutation submitResultExam(
  $correctArray: [String]!
  $wrongArray: [String]!
) {
    submitResultExam(
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



export default ExamHeader