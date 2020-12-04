import React, { useState, useEffect } from 'react'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import HeaderBar from '../includes/header'
import Blog from '../Blog/blogCard'

function Profile() {
  const classes = useStyles()
  const [blogs, setblogs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    try {
      axios.post('/blogs/list')
        .then(res => {
          if (res.data.logged_in === false)
            window.location.replace('/login')
          else if (res.data.msg)
            alert(res.data.msg)
          else {
            setLoggedIn(res.data.logged_in)
            setblogs(res.data.blog_list)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <HeaderBar />
      <Card className={classes.root}>
        <CardContent>
          <Link className={classes.link} to={'./write'}>
            <Tooltip title="Add" aria-label="add">
              <Fab color="secondary" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <Typography variant="body" color="textSecondary" component="h3">Write Blog</Typography>
          </Link>
        </CardContent>
      </Card>
      <div>
        {blogs.map(blog => <Blog role="admin" loggedIn={loggedIn} data={blog} />)}
      </div>
    </>
  )
}

export default Profile;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 440,
    minHeight: 463,
    marginTop: 50, marginLeft: 30,
    float: "left", textAlign: 'center'
  },
  fab: {
    position: 'relative',
    left: -30,
    maxWidth: 395,
    padding: 0,
    margin: window.screen.availWidth < 500 ? 120 : 160
  },
  link: {
    color: '#fff',
    textDecoration: 'none'
  }
}));