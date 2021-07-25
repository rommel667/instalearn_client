import React, { useState } from 'react'
import './Register.css'
import { Button, Paper, TextField } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMedia } from 'react-use-media';

const Register = () => {

    const matches = useMedia('(min-width: 768px)');

    const history = useHistory()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            localStorage.setItem('email', result.data.registerUser.email)
        },
        variables: {
            name, email, password
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            return
        }
        if (password !== confirmPassword) {
            return
        }
        addUser()
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        history.push('/verification')
    }



    return (
        <div className="register">
        <Paper style={{display:'flex', flexDirection:'column', padding:'20px', width: matches ? '35%' : '90%', gap:'20px'}}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <TextField id="standard-basic" type='text' label="Username" value={name} onChange={e => setName(e.target.value)} />
                <TextField id="standard-basic" type='email' label="E-mail Address" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField id="standard-basic" type='password' label="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <TextField id="standard-basic" type='password' label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <Button variant='contained' color='primary' type='Submit'>Register</Button>
            </form>
        </Paper>
        </div>
    )
}


const REGISTER_USER = gql`
mutation registerUser(
    $name: String!
    $email: String!
    $password: String!
) {
    registerUser(
        userInput: {
            name: $name
            email: $email
            password: $password
        }) {
          _id
          email
        name
        verified
    }
}

`




export default Register