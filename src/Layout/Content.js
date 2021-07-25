import React, { useContext, useState, } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ExamPage from '../Components/Content/ExamPage'
import HomePage from '../Components/Content/HomePage'
import LeaderboardPage from '../Components/Content/LeaderboardPage'
import QuizPage from '../Components/Content/QuizPage'
import StatisticsPage from '../Components/Content/StatisticsPage'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useSelector, useDispatch } from 'react-redux'
import Welcome from '../Components/User/Welcome'
import Login from '../Components/User/Login'
import Register from '../Components/User/Register'
import VerifyUser from '../Components/User/VerifyUser'
import { ExtraContext } from '../App'
import CorrectAnswers from '../Components/Results/CorrectAnswers'



const Content = () => {

    const { state, extraDispatch } = useContext(ExtraContext)

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const questionSize = useSelector(state => state.settings.questionSize)
    const categoryId = useSelector(state => state.options.categoryId)
    const subcategoryId = useSelector(state => state.options.subcategoryId)
    const testType = useSelector(state => state.options.testType)
    const categories = useSelector(state => state.statistics.categories)

    const history = useHistory()


    const [catIdForCat, setCatIdForCat] = useState('')
    const [qSizeForCat, setQSizeForCat] = useState(0)

    const [catIdForSub, setCatIdForSub] = useState('')
    const [subIdForSub, setSubIdForSub] = useState('')
    const [qSizeForSub, setQSizeForSub] = useState(0)




    const [fetchByCat, { loading: catloading, data: randomQuestionsByCategory, refetch: refetchByCat, called: calledFetchByCat }] = useLazyQuery(
        FETCH_RANDOM_BY_CATEGORY,
        {
            variables: { category: catIdForCat, size: qSizeForCat },
            onCompleted() {
                initialSetup(randomQuestionsByCategory.randomQuestionsByCategory)
                testType === 'quiz' ? history.replace('/quiz') : history.replace('/exam')
            },
        })

    const [fetchBySub, { loading: subloading, data: randomQuestionsByCategoryAndSubcategory, refetch: refetchBySub, called: calledFetchBySub }] = useLazyQuery(
        FETCH_RANDOM_BY_CATEGORY_AND_SUBCATEGORY,
        {
            variables: { category: catIdForSub, subcategory: subIdForSub, size: qSizeForSub },
            onCompleted() {
                initialSetup(randomQuestionsByCategoryAndSubcategory.randomQuestionsByCategoryAndSubcategory)
                testType === 'quiz' ? history.replace('/quiz') : history.replace('/exam')
            }
        })


    const initialSetup = (questionsArray) => {
        let tempChosenArray = []
        let tempCorrectArray = []

        extraDispatch({ type: "RANDOM_QUESTIONS", payload: { randomQuestions: questionsArray } })

        for (let i = 0; i < questionSize; i++) {
            tempChosenArray = [...tempChosenArray, undefined]
        }
        extraDispatch({ type: "CHOSEN_ANSWERS", payload: { chosenAnswers: tempChosenArray } })

        for (let i = 0; i < questionSize; i++) {
            tempCorrectArray = [...tempCorrectArray, questionsArray[i].answer]
        }
        extraDispatch({ type: "CORRECT_ANSWERS", payload: { correctAnswers: tempCorrectArray } })
        dispatch({ type: "RETRY_TIMER_RESET", payload: { timerReset: Date.now() + 10 * 60 * 1000 } })
        dispatch({ type: "SET_CURRENT_QUESTION_NUMBER", payload: { currentQuestionNumber: 0 } })
    }


    const startTest = () => {
        dispatch({ type: "RESET_SCORE" })
        if (subcategoryId === "All Subcategory") {
            setCatIdForCat(categoryId)
            setQSizeForCat(questionSize)
            if (calledFetchByCat) {
                refetchByCat({
                    variables: { category: catIdForCat, size: qSizeForCat },
                    onCompleted() {
                        initialSetup(randomQuestionsByCategory.randomQuestionsByCategory)
                        testType === 'quiz' ? history.replace('/quiz') : history.replace('/exam')
                    },
                })
            } else {
                fetchByCat()
            }
        } else {
            setCatIdForSub(categoryId)
            setSubIdForSub(subcategoryId)
            setQSizeForSub(questionSize)
            if (calledFetchBySub) {
                refetchBySub({
                    variables: { category: catIdForSub, subcategory: subIdForSub, size: qSizeForSub },
                    onCompleted() {
                        initialSetup(randomQuestionsByCategoryAndSubcategory.randomQuestionsByCategoryAndSubcategory)
                        testType === 'quiz' ? history.replace('/quiz') : history.replace('/exam')
                    },
                })
            } else {
                fetchBySub()
            }
        }
    }



    const retryHandler = () => {
        dispatch({ type: "UNSHOW_RESULTS" })
        dispatch({ type: "RESET_SCORE" })
        history.replace('/')
        
        if (subcategoryId === "All Subcategory") {
            refetchByCat({
                variables: { category: categoryId, size: questionSize },
                onCompleted() {
                    initialSetup(randomQuestionsByCategory.randomQuestionsByCategory)
                }
            })
        } else {
            refetchBySub({
                variables: { category: categoryId, subcategory: subcategoryId, size: questionSize },
                onCompleted() {
                    initialSetup(randomQuestionsByCategoryAndSubcategory.randomQuestionsByCategoryAndSubcategory)
                }
            })
        }

    }



    return (
        <>
            {user ? <Redirect to='/' /> :
                <div>
                    {user ? <Redirect to='/' /> : <Route path='/welcome' component={Welcome} />}
                    {user ? <Redirect to='/' /> : <Route path='/login' component={Login} />}
                    {user ? <Redirect to='/' /> : <Route path='/register' component={Register} />}
                    {user ? <Redirect to='/' /> : <Route path='/verification' component={VerifyUser} />}
                </div>}


            {user ?
                <Switch>
                    <Route path='/mystats' component={StatisticsPage} />
                    <Route path='/leaderboard' component={LeaderboardPage} />


                    <Route path='/quiz' render={(props) => (
                        <QuizPage {...props}
                            catloading={catloading}
                            subloading={subloading}
                            retry={retryHandler}
                        />)}
                    />


                    <Route path='/exam' render={(props) => (
                        <ExamPage {...props}
                            catloading={catloading}
                            subloading={subloading}
                            retry={retryHandler}
                        />)}
                    />

                    <Route path='/examanswers' render={(props) => (
                        <CorrectAnswers {...props}
                            retry={retryHandler}
                        />)}
                    />


                    <Route
                        path='/'
                        render={(props) => (
                            <HomePage {...props}
                                startQuiz={startTest}
                                startExam={startTest}
                            />)}
                    />
                </Switch> : <Redirect to='/welcome' />
            }
        </>
    )
}

export const FETCH_RANDOM_BY_CATEGORY = gql`
query randomQuestionsByCategory(
    $category: String!
    $size: Int!
    ) {
        randomQuestionsByCategory( category: $category, size: $size ) {
        _id
        question
        option1
        option2
        option3
        option4
        answer
        image
    }
}
    
`

export const FETCH_RANDOM_BY_CATEGORY_AND_SUBCATEGORY = gql`
query randomQuestionsByCategoryAndSubcategory(
    $category: String!
    $subcategory: String!
    $size: Int!
    ) {
        randomQuestionsByCategoryAndSubcategory( category: $category, subcategory: $subcategory size: $size ) {
        _id
        question
        option1
        option2
        option3
        option4
        answer
        image
    }
}
    
`

export default Content
