import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Countdown from 'react-countdown';


const ExamTimer = ({ date }) => {


    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Paper message="TIME IS UP" style={{backgroundColor: "#ff3333"}}/>
            
        } else {
          return <>{hours}:{minutes}:{seconds}</>
        }
      };

      return (
        <Countdown date={date} renderer={renderer} />
      )
}

export default ExamTimer;