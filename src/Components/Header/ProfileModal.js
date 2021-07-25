import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Badge, Button, TextField, Typography, Icon, Fade, Backdrop, Modal  } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
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
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

const SmallIcon = withStyles((theme) => ({
    root: {
        width: 35,
        height: 35,
        // border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Icon);





const ProfileModal = ({ showProfile, cancelProfile }) => {
    const classes = useStyles();

    const matches = useMedia('(min-width: 768px)');

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)

    const [name, setName] = useState('')
    const [showNameInput, setShowNameInput] = useState(false)
    const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        setPhotoUrl(user.photo)
        setName(user.name)
    }, [])

    const [editProfile, { data: newProfile, loading: editProfileLoading }] = useMutation(EDIT_PROFILE, {
        update(proxy, result) {
            setName('')
            setPhotoUrl('')
            dispatch({ type: "EDIT_PROFILE", payload: { user: result.data.editProfile } })
        },
        variables: {
            _id: user._id, name, photo: photoUrl
        },
        onError(err) {
            // setError(err.graphQLErrors[0].message.split(': ')[1]);
            console.log(err);
        }
    })

    const handleSaveChanges = () => {
        if (photoUrl === user.photo && name === user.name) {
            return
        }
        if (photoUrl !== user.photo) {
            editProfile()
        } else {
            setPhotoUrl('same')
            editProfile()
        }
        cancel()
    }

    const cancel = () => {
        setName('')
        setPhotoUrl('')
        setShowNameInput(false)
        cancelProfile()
    }

    const setImageHandler = (e) => {
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset', 'instagram')
        data.append('cloud_name', 'rommel')
        fetch('https://api.cloudinary.com/v1_1/rommel/image/upload', {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(async data => {
                setPhotoUrl(data.secure_url)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const setShowNameInputHandler = () => {
        setShowNameInput(true)
        setName(user.name)
    }

    return (
        <Modal
            className={classes.modal}
            open={showProfile}
            onClose={cancel}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={showProfile}>
                <div style={{width: matches ? '50%' : '80%'}} className={classes.paper}>

                    <div style={{display:'flex', alignItems: 'center', gap: '30px'}}>
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={<SmallIcon>
                                <input id="file-input" type="file" onChange={setImageHandler} style={{ display: 'none' }} />
                                <label htmlFor="file-input" style={{ border: 'none' }}><AddAPhotoIcon /></label>
                            </SmallIcon>}>
                            <Avatar className={classes.large} src={photoUrl} />
                        </Badge>



                        {showNameInput ? <TextField value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" /> :
                            <Typography variant="body1" component="h2">{user.name}<EditIcon onClick={setShowNameInputHandler} /></Typography>}
                    </div>



                    <Button color="secondary" onClick={cancel}>Cancel</Button>
                    <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>



                </div>
            </Fade>
        </Modal>
    );
}

const EDIT_PROFILE = gql`
mutation editProfile(
    $_id: String!
  $name: String!
  $photo: String!
) {
    editProfile(
        _id: $_id
        name: $name
        photo: $photo
    ) {
      _id
      email
      name
      photo
      token
    }
}

`

export default ProfileModal