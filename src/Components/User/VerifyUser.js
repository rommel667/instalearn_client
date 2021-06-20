import React, { useState } from 'react'
import './VerifyUser.css'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Paper, TextField } from '@material-ui/core'
import { useMedia } from 'react-use-media';


const VerifyUser = () => {

    const matches = useMedia('(min-width: 768px)');

    const history = useHistory()

    const [code, setCode] = useState('')

    const logInDispatch = useDispatch()

    



    const [verifyUser, { loading }] = useMutation(VERIFY_USER, {
        update(proxy, result) {
            console.log(result);
            localStorage.removeItem('email')
            logInDispatch({ type: "LOGIN", payload: {user : result.data.verifyUser} })
        },
        variables: {
            email: localStorage.getItem('email'), code
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (code === "") {
            return
        }
        verifyUser()
        history.push('/')
    }


    return (
        <div className="verify">
        <Paper style={{display:'flex', flexDirection:'column', padding:'20px', width: matches ? '35%' : '90%', gap:'20px'}}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" type='text' label="Verification Code" placeholder='Enter 4-digit verification code' value={code} onChange={e => setCode(e.target.value)} />
                <Button type='Submit'>Verify and Login</Button>
            </form>
            </Paper>
        </div>
    )
}

export const VERIFY_USER = gql`
mutation verifyUser(
    $email: String!
    $code: String!
) {
    verifyUser(
            email: $email
            code: $code
        ) {
            _id
            email
            name
            token
            verified
    }
}

`

export default VerifyUser