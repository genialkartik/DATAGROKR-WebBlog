import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import HeaderBar from '../includes/header'
import Blog from '../includes/blog'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 50, marginLeft: 30,
    float: "left", textAlign: 'center'
  },
  fab: {
    position: 'relative',
    left: -30,
    maxWidth: 345,
    padding: 0,
    margin: window.screen.availWidth < 500 ? 120 : 160
  }
}));

function Profile() {
  const classes = useStyles()

  return (
    <>
      <HeaderBar />
      <Card className={classes.root}>
        <CardContent>
          <Tooltip title="Add" aria-label="add">
            <Fab color="secondary" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Typography variant="body" color="textSecondary" component="h3">
            Write Blog
            </Typography>
        </CardContent>
      </Card>
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
      <Blog role='admin' />
    </>
  )
}

export default Profile
