import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';

const useStyles = makeStyles((theme) => ({
  root: {

    maxWidth: window.screen.availWidth < 500 ? '94%' : '40%',
    marginTop: 20, marginLeft: 10,
    borderRadius: 10
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContainer: window.screen.availWidth < 500 ? {
    position: 'relative',
  } : {
      position: 'relative',
      left: '30%'
    },
  comment: {
    position: 'relative',
    border: '1px solid #fff',
    padding: 10,
    borderRadius: 5
  }
}))

export default function NotiCard(props) {
  const classes = useStyles();
  var user = 'Kartik'

  return (
    <>
      <div className={classes.cardContainer}>
        <Card className={classes.root}>
          <CardHeader
            title={(props.react === 'comments') ? user + ' commented on' : user + ' reacted on'}
            subheader="At the development build is not optimized.
          To create a production build, us"
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
          </Avatar>
            }
            action={
              <IconButton aria-label="reaction">
                {props.react === 'comments' ?
                  <CommentIcon style={{ fontSize: '1.5em' }} /> :
                  props.react === 'likes' ?
                    <FavoriteIcon style={{ color: 'red', fontSize: '1.5em' }} /> :
                    <OfflineBoltOutlinedIcon style={{ color: 'orange', fontSize: '1.5em' }} />
                }
              </IconButton>
            }
          />
          {props.react === 'comments' ?
            <CardContent>
              <Typography className={classes.comment} variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.</Typography>
            </CardContent> :
            <></>
          }
        </Card>
      </div>
    </>
  )
}