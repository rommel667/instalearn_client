import React from 'react'
import './Welcome.css'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useDispatch } from 'react-redux'
import { useMedia } from 'react-use-media';

const Welcome = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const matches = useMedia('(min-width: 768px)');

    const [tryDemo, { data, loading }] = useMutation(TRIAL_ACCOUNT, {
        update(proxy, result) {
            dispatch({ type: "LOGIN", payload: { user: result.data.tryDemo } })
        },
        // onError(err) {
        //   setError(err.graphQLErrors[0].message.split(': ')[1]);
        // }
    })

    return (
        <div className="welcome">

            <div className="bg-image"></div>
           
            <div className={matches ? "bg-text1" : "bg-text2"}>
                <h1 style={{fontSize: !matches && 22}}>Ready on your Engineering Board Exam?</h1>
                <h2 style={{ textAlign: "justify", fontSize: !matches && 14 }}>In InstaLearn. We test your knowledge. We track your progress. So you are ready to ACE YOUR BOARD EXAM.</h2>
                <p style={{ marginTop: 40, fontSize: !matches && 14 }}>There is no substitute for hard work. -Thomas Edison</p>
                <div style={{ marginTop: 50 }}>

                    <div style={{ display: "flex", gap: 5, justifyContent: "center" }}>
                        <Button onClick={() => history.push('/register')} className="newAccountButton" variant='contained' color='primary' type='Submit' style={{padding: !matches && 6, width: !matches && '48%'}}>
                            <div style={{ display: "flex", alignItems: "center", textTransform: "none", fontWeight: "bold", fontSize: !matches && 12 }}>Create Account</div>
                        </Button>
                        <Button onClick={tryDemo} className="newAccountButton" variant='outlined' color='inherit' type='Submit' style={{padding: !matches && 6, width: !matches && '48%'}}>
                            <div style={{ display: "flex", alignItems: "center", textTransform: "none", fontWeight: "bold", fontSize: !matches && 12 }}>Try Demo</div>
                        </Button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <p style={{ fontWeight: "lighter" }}>Already have an account?</p>
                        <div onClick={() => history.push('/login')} style={{ cursor: "pointer" }}>Login</div>
                    </div>
                </div>
            </div>
        </div>

    )
}


const TRIAL_ACCOUNT = gql`
mutation {
    tryDemo {
      _id
      email
      name
      photo
      token
    }
} 

`

export default Welcome