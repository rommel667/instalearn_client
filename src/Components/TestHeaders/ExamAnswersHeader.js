import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Paper } from '@material-ui/core'


const ExamAnswersHeader = ({ retry }) => {

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