import React, { useState } from 'react'
import './Login.css'
import { Button, Divider, Paper, TextField } from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useDispatch } from 'react-redux'
import { VERIFY_USER } from './VerifyUser'

import { useMedia } from 'react-use-media';

const Login = () => {

    const matches = useMedia('(min-width: 768px)');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [code, setCode] = useState('')

    const logInDispatch = useDispatch()

    const [loginUser, { data: loginData, loading: loginLoading }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            setEmail('')
            setPassword('')
            logInDispatch({ type: "LOGIN", payload: { user: result.data.login } })
        },
        variables: {
            email, password
        },
        onError(err) {
            localStorage.setItem('email', email)
            setError(err.graphQLErrors[0].message.split(': ')[1]);
        }
    })

    const [verifyUser, { loading }] = useMutation(VERIFY_USER, {
        update(proxy, result) {
            localStorage.removeItem('email')
            logInDispatch({ type: "LOGIN", payload: { user: result.data.verifyUser } })
        },
        variables: {
            email: localStorage.getItem('email'), code
        }
    })

    const [googleSignin, { data: signInWithGoogle, loading: googleLoading }] = useMutation(SIGN_IN_WITH_GOOGLE, {
        update(proxy, result) {
            logInDispatch({ type: "LOGIN", payload: { user: result.data.signInWithGoogle } })
        },
        // onError(err) {
        //   setError(err.graphQLErrors[0].message.split(': ')[1]);
        // }
    })

    const handleSubmit = (e) => {
        if (email === "" || password === "") {
            return
        }
        e.preventDefault()
        loginUser()
    }

    const responseGoogle = (response) => {
        googleSignin({
            variables: {
                name: response.profileObj.name, email: response.profileObj.email, photo: response.profileObj.imageUrl, token: response.tokenId
            }
        })
    }


    return (
        <div className="login">
            <Paper style={{ display: 'flex', flexDirection: 'column', padding: '20px', width: matches ? '35%' : '90%', gap: '20px' }}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField id="standard-basic" type='email' label="E-mail Address" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextField id="standard-basic" type='password' label="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button variant='contained' color='primary' type='Submit'>Sign In</Button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    Or
            </div>

                <GoogleLogin
                    className="google-button"
                    clientId='636676601431-sptc6rv74plhkf97huu822bl2vdq6rre.apps.googleusercontent.com'
                    buttonText='Sign in with Google'
                    cookiePolicy={'single_host_origin'}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />


                {error === 'Please check your email for verification code to proceed' ?
                    <div>
                        <p>{error}</p>
                        <form noValidate autoComplete="off" onSubmit={verifyUser}>
                            <TextField id="standard-basic" label="Verification Code" placeholder='Enter 4-digit verification code' value={code} onChange={(e) => setCode(e.target.value)} />
                            <Button type='Submit'>Verify & Login</Button>
                        </form>
                    </div>
                    :
                    error === "" ? null :
                        <p>{error}</p>}
            </Paper>
        </div>
    )
}

const LOGIN_USER = gql`
mutation login(
  $email: String!
  $password: String!
) {
    login(
        email: $email
        password: $password
    ) {
      _id
      email
      name
      photo
      token
      verified
    }
}

`

const SIGN_IN_WITH_GOOGLE = gql`
mutation signInWithGoogle(
  $name: String!
  $email: String!
  $photo: String!
  $token: String!
) {
  signInWithGoogle(
        name: $name 
        email: $email
        photo: $photo
        token: $token
    ) {
      _id
      email
      name
      photo
      token
    }
}

`

export default Login