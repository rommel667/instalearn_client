import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Paper, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ExtraContext } from '../../App'


const ExamAnswersHeader = ({ retry }) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const backToMenuHandler = () => {
        history.push('/')
    }

    return (
        <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '10px' }}>
          
                
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button variant='outlined' onClick={backToMenuHandler}>BACK TO MENU</Button>
                    <Button variant='outlined'  onClick={retry}>RETRY</Button>
                </div>
           
        </Paper>
    )
}





export default ExamAnswersHeader