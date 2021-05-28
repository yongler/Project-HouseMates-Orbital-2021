// import React, { useState } from 'react'
// import { NavLink, useHistory, Redirect } from 'react-router-dom'
// import {connect} from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
// import Box from '@material-ui/core/Box' 
// import Container from '@material-ui/core/Container'
// import FormControl from '@material-ui/core/FormControl'
// import Grid from '@material-ui/core/Grid'
// import InputLabel from '@material-ui/core/InputLabel'
// import MenuItem from '@material-ui/core/MenuItem'
// import Select from '@material-ui/core/Select'
// import TextField from '@material-ui/core/TextField'
// import Typography from '@material-ui/core/Typography'
// import Footer from '../components/Footer'

// import {reset_password_confirm} from '../actions/auth'


// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }))

// const ResetPasswordConfirm = ({match, reset_password_confirm}) => {
//   const classes = useStyles()
//   const history = useHistory()

//   const [password, setPassword] = useState('')
//   const [passwordError, setPasswordError] = useState(false)
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [confirmPasswordError, setConfirmPasswordError] = useState(false)

//   const [requestSent, setRequestSent] = useState(false);


//   const handleSubmit = e => {
//     e.preventDefault()

//     const uid = match.params.uid;
//     const token = match.params.token;

//     setPasswordError(false)
//     if (password === '') { setPasswordError(true) }
//     setConfirmPasswordError(false)
//     if (confirmPassword === '') { setConfirmPasswordError(true) }
//     if (confirmPassword !== password) { setConfirmPasswordError(true) }

//     if (confirmPassword && confirmPassword) { history.push("/") }

//     reset_password_confirm(uid, token, password, confirmPassword);
//     setRequestSent(true);
//   }

//   if (requestSent) {
//     return <Redirect to='/' />
// }

//   const handlePasswordChange = e => {
//     setPassword(e.target.value)
//     if (e.target.value === '') { setPasswordError(true) } else { setPasswordError(false) }
//   }
//   const handleConfirmPasswordChange = e => {
//     setConfirmPassword(e.target.value)
//     if (e.target.value === '' || e.target.value !== password) {
//       setConfirmPasswordError(true)
//     } else {
//       setConfirmPasswordError(false)
//     }
//   }

//   return (
//     <Container maxWidth="xs">
//       <div className={classes.paper}>
//         <img alt="logo" src="housemates-logo-with-text-black.svg" width="150" height="150" />

//         <Typography variant="h6" gutterBottom>Reset Password Confirmation</Typography>

//         <form
//           className={classes.form}
//           noValidate
//           onSubmit={handleSubmit}
//         >

//         <TextField
//             variant="outlined"
//             required
//             fullWidth
//             name="newPassword"
//             label="New Password"
//             type="password"
//             margin="normal"
//             onChange={handlePasswordChange}
//             error={passwordError}
//           />
//           <TextField
//             variant="outlined"
//             required
//             fullWidth
//             name="confirmNewPassword"
//             label="Confirm New Password"
//             type="password"
//             margin="normal"
//             onChange={handleConfirmPasswordChange}
//             error={confirmPasswordError}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Submit
//           </Button>

//         </form>
//       </div>

//       <Box mt={8}>
//         <Footer />
//       </Box>
//     </Container>
//   )
// }


// export default connect(null, {reset_password_confirm}) (ResetPasswordConfirm)


  
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (

        <div className='container mt-5'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='New Password'
                        name='new_password'
                        value={new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm New Password'
                        name='re_new_password'
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Reset Password</button>
            </form>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);