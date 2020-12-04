import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));

function Signup(props) {
  const classes = useStyles();
  let [fullname, setName] = useState()
  let [username, setUsername] = useState()
  let [password, setPassword] = useState()
  let [snackOpen, setSnackOpen] = useState(false)
  let [msg, setMsg] = useState('')

  useEffect(() => {
    axios.get('/user/login')
      .then(res => {
        if (res.data.logged_in) {
          window.location.replace('/')
        }
      })
  }, [])

  const signUp = () => {
    axios.post('/user/signup', { fullname, username, password })
      .then(res => {
        console.log(res.data)
        if (res.data.sign_up) {
          setMsg('Signed Up Successfully')
          setTimeout(() => { props.history.push('/') }, 1000)
        } else
          setMsg('Something went Wrong')
        setSnackOpen(true);
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Link className={classes.link} to={`/`} style={{ position: 'absolute', fontSize: '1em', left: '30px', top: '20px' }}>
        <ArrowBackIcon /></Link>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="fullname"
              name="fullName"
              variant="outlined"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={signUp}
        >
          Sign Up
          </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link className={classes.link} to={'/login'} variant="body2">
              Already have an account? Sign in
              </Link>
          </Grid>
        </Grid>
      </div>
      {/* snack bar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        message={msg}
        autoHideDuration={6000}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

export default withRouter(Signup)