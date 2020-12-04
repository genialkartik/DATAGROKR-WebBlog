import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function Login(props) {
  const classes = useStyles();
  let [username, setUsername] = useState()
  let [password, setPwd] = useState()
  let [snackOpen, setSnackOpen] = useState(false)
  let [msg, setMsg] = useState('')
  const [login, setLogin] = React.useState(false)

  useEffect(() => {
    axios.get('/user/login')
      .then(res => {
        if (res.data.logged_in) {
          setLogin(true)
        }
      })
  }, [])

  const signIn = () => {
    axios.post('/user/login', { username, password })
      .then(res => {
        if (res.data.logged_in) {
          setMsg('Logged In successfully')
          setTimeout(() => { props.history.push('/') }, 1000)
        } else
          setMsg('Wrong Credentials')
        setSnackOpen(true)
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
      {(login) ?
        <Redirect to='/' /> :
        <>
          <Link className={classes.link} to={`/`} style={{ position: 'absolute', fontSize: '1em', left: '30px', top: '20px' }}>
            <ArrowBackIcon /></Link>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
        </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPwd(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link className={classes.link} to={'#'} variant="body2">
                  Forgot password?
              </Link> */}
              </Grid>
              <Grid item>
                <span>Don't have an account?</span>
                <Link className={classes.link} to={'/signup'} variant="body2"> Sign Up
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
        </>
      }
    </Container>
  );
}

export default withRouter(Login);

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));