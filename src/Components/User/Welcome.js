import React from 'react'
import './Welcome.css'
import bgImage from '../../assets/welcome.jpg'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Welcome = () => {

    const history = useHistory()

    return (
        <div className="welcome">

            <div class="bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
    
            <div class="bg-text">
                <h1>Good day Engineer</h1>
                <h2>Test your knowledge. Track your progress. ACE YOUR BOARD EXAM.</h2>
                <p style={{ marginTop: 40 }}>There is no substitute for hard work. -Thomas Edison</p>
                <div style={{ marginTop: 50 }}>
                <Button onClick={() => history.push('/register')} className="newAccountButton" variant='contained' color='primary' type='Submit'>
                <div style={{ display: "flex", alignItems: "center", textTransform: "none"}}>Create an Account</div>
                </Button>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <p style={{ fontWeight: "lighter" }}>Already have an account?</p>
                <div onClick={() => history.push('/login')} style={{ cursor: "pointer" }}>Login</div>
                </div>
                
                </div>
                
            </div>
            
            

        </div>

    )
}

export default Welcome