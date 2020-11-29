import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: window.screen.availWidth < 500 ? '94%' : '40%',
    marginTop: 20, marginLeft: 10
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContainer: window.screen.availWidth < 500 ? {
    position: 'relative',
  } : {
      position: 'relative',
      left: '30%',
    }
}))

export default function NotiCard(props) {
  const classes = useStyles();
  
  return (
    <>
      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <CardHeader
            title="Kartik Tyagi reacted on"
            subheader="At the development build is not optimized.
          To create a production build, us"
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
          </Avatar>
            }
            action={
              <IconButton aria-label="reaction">
                {props.react !== 'likes' ?
                  <FavoriteIcon style={{ color: 'red', fontSize: '1.5em' }} /> :
                  <OfflineBoltOutlinedIcon style={{ color: 'orange' }} />}
              </IconButton>
            }
          />
        </Card>
      </div>
    </>
  )
}