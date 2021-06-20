import React from 'react'
import './Welcome.css'
import { Paper } from '@material-ui/core'
import bgImage from '../../assets/welcome.jpg'

const Welcome = () => {
    return (
        <div className="welcome">

            <div class="bg-image" style={{ backgroundImage: `url(${bgImage})` }}></div>

            <div class="bg-text">
                <h1>Good day Engineer</h1>
                <h2>Test your knowledge. Track your progress. ACE YOUR BOARD EXAM.</h2>
                <p style={{ marginTop: 40 }}>There is no substitute for hard work. -Thomas Edison</p>

            </div>

        </div>

    )
}

export default Welcome