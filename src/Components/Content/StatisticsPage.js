import React, { useEffect, useContext, useState } from 'react'
import './StatisticsPage.css'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import CategoryChart from '../../Components/Statistics/CategoryChart'
import SubcategoryChart from '../../Components/Statistics/SubcategoryChart'
import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CATEGORIES_QUERY } from '../../Layout'
import { CircularProgress } from '@material-ui/core'


const StatisticsPage = () => {

    const dispatch = useDispatch()
    const categoriesStats = useSelector(state => state.statistics.categories)
    const subcategoriesStats = useSelector(state => state.statistics.subcategories)


    const [correctArrayCategory, setCorrectArrayCategory] = useState([])
    const [correctArraySubcategory, setCorrectArraySubcategory] = useState([])
    const [wrongArrayCategory, setWrongArrayCategory] = useState([])
    const [wrongArraySubcategory, setWrongArraySubcategory] = useState([])

    const [optionCatChart, setOptionCatChart] = useState('both')
    const [optionSubChart, setOptionSubChart] = useState('both')





    const { loading: catLoading, data: categories } = useQuery(
        FETCH_CATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "CATEGORIES", payload: { categories: categories.categories }  })
            }
        })


    const [fetchSubs, { loading: subcatLoading, data: subcategories }] = useLazyQuery(
        FETCH_SUBCATEGORIES_QUERY,
        {
            onCompleted() {
                dispatch({ type: "SUBCATEGORIES", payload: { subcategories: subcategories.subcategories }  })
                setData()
            }
        })


    const { loading: userInfoLoading, data: userInfo } = useQuery(
        FETCH_USERINFO_QUERY,
        {
            onCompleted() {
                if (subcategoriesStats && categoriesStats) {
                    setData()
                } else {
                    fetchSubs()
                }

            }
        })


    useEffect(() => {
        if (userInfo && subcategoriesStats) {
            setData()
        }
    }, [optionCatChart, optionSubChart])


    const setData = () => {
        setCorrectArrayCategory([])
        setCorrectArraySubcategory([])
        setWrongArrayCategory([])
        setWrongArraySubcategory([])
        

        if (optionCatChart === "both") {
            setCorrectArrayCategory([ ...userInfo.userInfo.correctExamCategory, ...userInfo.userInfo.correctQuizCategory ])
            setWrongArrayCategory([ ...userInfo.userInfo.wrongExamCategory, ...userInfo.userInfo.wrongQuizCategory ])
        }
        if (optionCatChart === "exam") {
            setCorrectArrayCategory([ ...userInfo.userInfo.correctExamCategory ])
            setWrongArrayCategory([ ...userInfo.userInfo.wrongExamCategory ])
        }
        if (optionCatChart === "quiz") {
            setCorrectArrayCategory([ ...userInfo.userInfo.correctQuizCategory ])
            setWrongArrayCategory([ ...userInfo.userInfo.wrongQuizCategory ])
        }

        if (optionSubChart === 'both') {
            setCorrectArraySubcategory([ ...userInfo.userInfo.correctExamSubcategory, ...userInfo.userInfo.correctQuizSubcategory ])
            setWrongArraySubcategory([ ...userInfo.userInfo.wrongExamSubcategory, ...userInfo.userInfo.wrongQuizSubcategory ])
        }
        if (optionSubChart === 'exam') {
            setCorrectArraySubcategory([ ...userInfo.userInfo.correctExamSubcategory ])
            setWrongArraySubcategory([ ...userInfo.userInfo.wrongExamSubcategory ])
        }
        if (optionSubChart === 'quiz') {
            setCorrectArraySubcategory([ ...userInfo.userInfo.correctQuizSubcategory ])
            setWrongArraySubcategory([ ...userInfo.userInfo.wrongQuizSubcategory ])
        }


    }

    




    return (
        <div className="statisticspage">
                <CategoryChart
                    userInfoLoading={userInfoLoading}
                    catLoading={catLoading}
                    subcatLoading={subcatLoading}
                    correctArrayCategory={correctArrayCategory}
                    wrongArrayCategory={wrongArrayCategory}
                   
                    optionCatChart={optionCatChart}
                    setOptionCatChart={(value) => setOptionCatChart(value)}
                />
           
           
                <SubcategoryChart
                    userInfoLoading={userInfoLoading}
                    catLoading={catLoading}
                    subcatLoading={subcatLoading}
                    subcategories={subcategoriesStats}
                    correctArraySubcategory={correctArraySubcategory}
                    wrongArraySubcategory={wrongArraySubcategory}
                   
                    optionSubChart={optionSubChart}
                    setOptionSubChart={(value) => setOptionSubChart(value)}
                />
        </div>
    )

}

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

export default StatisticsPage