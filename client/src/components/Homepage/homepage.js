import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HeaderBar from '../includes/header'
import Blog from '../includes/blog'

const useStyles = makeStyles((theme) => ({
  
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div>
      <HeaderBar />
      <div>
        <Blog role="visitor" />
      </div>
    </div>
  )
}
