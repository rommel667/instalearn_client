import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux'
import { Button, FormControlLabel, Switch } from '@material-ui/core'
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
        width: '50%'
    },
}));



const SettingsModal = ({ showSettings, cancelSettings }) => {
    const classes = useStyles();

    const matches = useMedia('(min-width: 768px)');

    const dispatch = useDispatch()
    const showFloatingButton = useSelector(state => state.settings.showFloatingButton)

    const [showFab, setShowFab] = useState(false)

    useEffect(() => {
        setShowFab(showFloatingButton)
    }, [])


    const cancel = () => {
        cancelSettings()
    }

    const handleSaveChanges = () => {
        cancel()
        dispatch({ type: "SHOW_FLOATING_BUTTON", payload: { showFloatingButton: showFab } })
        
    }

    return (
        <Modal
            className={classes.modal}
            open={showSettings}
            onClose={cancel}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showSettings}>
                <div style={{width: matches ? '50%' : '80%'}} className={classes.paper}>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFab}
                                onChange={e => setShowFab(e.target.checked)}
                                name="floating_button"
                                color="primary"
                            />
                        }
                        label="Show Floating Button"
                    />


                    <Button color="secondary" onClick={cancel}>Cancel</Button>
                    <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>



                </div>
            </Fade>
        </Modal>
    );
}

export default SettingsModal