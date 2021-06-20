import React, { useState } from 'react'
import './HomePage.css'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import Math from '../../assets/math.png'
import Elecs from '../../assets/electronics.png'
import Comms from '../../assets/est.png'
import Geas from '../../assets/geas.png'
import CategoryCard from '../HomePage/CategoryCard'
import OptionsModal from '../HomePage/OptionsModal'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core';
import { useMedia } from 'react-use-media';


const HomePage = ({ startQuiz, startExam }) => {


    const history = useHistory()
    const [visible, setVisible] = useState(false)
    const matches = useMedia('(min-width: 768px)');
    const questionSize = useSelector(state => state.settings.questionSize)



    const dispatch = useDispatch()

    const { loading: catLoading, data: categories } = useQuery(
        FETCH_CATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "CATEGORIES", payload: { categories: categories.categories } })
                fetchQuestionsCount()
            }
        })

    const { loading: subcatLoading, data: subcategories } = useQuery(
        FETCH_SUBCATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "SUBCATEGORIES", payload: { subcategories: subcategories.subcategories } })
            }
        })


    const [fetchQuestionsCount, { loading: countsLoading, data: qCounts }] = useLazyQuery(FETCH_QUESTIONS_COUNT)


    const choseQuiz = (categoryId) => {
        console.log(categoryId);
        dispatch({ type: "UNSHOW_RESULTS" })
        dispatch({ type: "CATEGORY_ID", payload: { categoryId: categoryId } })
        setVisible(true)
        dispatch({ type: "TEST_TYPE", payload: { testType: 'quiz' } })
        // dispatch({ type: "SET_SCORE", payload: 0 })
    }

    const choseExam = (categoryId) => {
        dispatch({ type: "UNSHOW_RESULTS" })
        dispatch({ type: "CATEGORY_ID", payload: { categoryId: categoryId } })
        setVisible(true)
        dispatch({ type: "TEST_TYPE", payload: { testType: 'exam' } })
        // dispatch({ type: "SET_SCORE", payload: 0 })
    }

    const cancel = () => {
        setVisible(false)
        dispatch({ type: "TEST_TYPE", payload: { testType: '' } })
        dispatch({ type: "CATEGORY_ID", payload: { categoryId: '' } })
        dispatch({ type: "SUBCATEGORY_ID", payload: { subcategoryId: '' } })
    }



    return (

        <div className="homepage">
            <Grid container spacing={1} className="homepage__grid__container">
                <Grid item xs={matches ? 6 : 12}>
                    <CategoryCard

                        image={Math}
                        category={categories?.categories[0].category}
                        categories={categories?.categories}
                        questionCounts={qCounts?.questionCounts}
                        choseQuiz={() => choseQuiz(categories?.categories[0]._id)}
                        choseExam={() => choseExam(categories?.categories[0]._id)}
                    />
                </Grid>
                <Grid item xs={matches ? 6 : 12}>
                    <CategoryCard

                        image={Elecs}
                        category={categories?.categories[2].category}
                        categories={categories?.categories}
                        questionCounts={qCounts?.questionCounts}
                        choseQuiz={() => choseQuiz(categories?.categories[2]._id)}
                        choseExam={() => choseExam(categories?.categories[2]._id)}
                    />
                </Grid>
                <Grid item xs={matches ? 6 : 12}>
                    <CategoryCard

                        image={Comms}
                        category={categories?.categories[3].category}
                        categories={categories?.categories}
                        questionCounts={qCounts?.questionCounts}
                        choseQuiz={() => choseQuiz(categories?.categories[3]._id)}
                        choseExam={() => choseExam(categories?.categories[3]._id)}
                    />
                </Grid>
                <Grid item xs={matches ? 6 : 12}>
                    <CategoryCard

                        image={Geas}
                        category={categories?.categories[1].category}
                        categories={categories?.categories}
                        questionCounts={qCounts?.questionCounts}
                        choseQuiz={() => choseQuiz(categories?.categories[1]._id)}
                        choseExam={() => choseExam(categories?.categories[1]._id)}
                    />
                </Grid>
            </Grid>
            <OptionsModal
                visible={visible}
                setVisible={() => setVisible(false)}
                cancel={cancel}
                startQuiz={startQuiz}
                startExam={startExam}
                categories={categories}
                questionSizeProp={questionSize}
            />
        </div>

    )
}

export const FETCH_CATEGORIES_QUERY = gql`
query {
    categories {
        _id
        category
        subcategory {
            _id
            subcategory
        }
    }
}
    
`

export const FETCH_SUBCATEGORIES_QUERY = gql`
query {
    subcategories {
        _id
        subcategory
        category {
            category
        }
    }
}
    
`

export const FETCH_QUESTIONS_COUNT = gql`
query {
    questionCounts {
        category
        count
    } 
}
    
`

export default HomePage