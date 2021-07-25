import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux'
import { Button, MenuItem, Slider, TextField, Typography } from '@material-ui/core'
import { useMedia } from 'react-use-media';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const OptionsModal = ({ visible, setVisible, cancel, startQuiz, startExam, categories }) => {
  const classes = useStyles();

  const [subcategory, setSubcategory] = useState('')

  const matches = useMedia('(min-width: 768px)');

  const categoryId = useSelector(state => state.options.categoryId)
  const testType = useSelector(state => state.options.testType)

  const questionSize = useSelector(state => state.settings.questionSize)
  const theme = useSelector(state => state.settings.theme)


  const dispatch = useDispatch()



  const handleChangeQuestionSize = (event, newValue) => {
    dispatch({ type: "QUESTION_SIZE", payload: { questionSize: newValue } })
  }

  const handleChangeSubcategory = (event) => {
    setSubcategory(event.target.value)
    if (event.target.value !== "" && event.target.value !== "All Subcategory") {
      categories && categories.categories.map(cat => {
        if (cat._id === categoryId) {
          cat.subcategory.map(subcat => {
            if (subcat.subcategory === event.target.value) {
              dispatch({ type: "SUBCATEGORY_ID", payload: { subcategoryId: subcat._id } })
            }
          })
        }
      })
    } else {
      dispatch({ type: "SUBCATEGORY_ID", payload: { subcategoryId: "All Subcategory" } })
    }
  }


  let subcategoryOptions = [{ key: "sub1", text: "All Subcategory", value: "All Subcategory" }]
  categories && categories.categories.map(cat => {
    if (cat._id === categoryId) {
      cat.subcategory.map(subcat => {
        subcategoryOptions.push({ key: subcat._id, text: subcat.subcategory, value: subcat.subcategory })
      })
    }
  })



  return (
    <Modal
      className={classes.modal}
      open={visible}
      onClose={setVisible}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <div style={{width: matches ? '50%' : '90%'}} className={classes.paper}>

          <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              id="standard-select-currency"
              select
              label="Select a topic"
              value={subcategory}
              onChange={handleChangeSubcategory}
            >
              {subcategoryOptions.map((subcat) => (
                <MenuItem key={subcat.key} value={subcat.value}>
                  {subcat.text}
                </MenuItem>
              ))}
            </TextField>
          </form>



          <div style={{display:'flex', marginTop: '20px'}}>
          <Typography style={{fontSize:'.8rem', flexGrow:'1'}} id="discrete-slider" gutterBottom>How many items?</Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={100}
            onChange={handleChangeQuestionSize}
            value={questionSize}
          />
          
          </div>

          <Button color="secondary" onClick={cancel}>CANCEL</Button>
          {testType === 'quiz' && <Button color={theme === 'dark' ? 'default' : 'primary'} onClick={startQuiz}>START POP QUIZ</Button>}
          {testType === 'exam' && <Button color={theme === 'dark' ? 'default' : 'primary'} onClick={startExam}>START MOCK EXAM</Button>}


        </div>
      </Fade>
    </Modal>
  );
}

export default OptionsModal