import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 440,
    minHeight: 436,
    marginTop: 50, marginLeft: 30,
    float: "left",
    borderRadius: '10px 10px 5px 5px'
  },
  media: {
    height: 0,
    paddingTop: '57.25%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  shortdesc: {
    position: 'relative',
    bottom: 10,
    maxHeight: 27,
    overflow: 'hidden',
  },
  react: {
    position: 'relative',
    bottom: 10
  },
  title: {
    fontSize: 18
  }
}));

export default function Blog(props) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          href={'/blogdesc'}
          className={classes.media}
          image="/goodies.jpg"
          title="Paella dish"
        />
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
          </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {props.role === 'admin' ? <MoreVertIcon /> : <></>}
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <Link to={'/blogdesc'} >
          <CardContent className={classes.shortdesc}>
            <Typography variant="bold" color="textPrimary" component="bold" className={classes.title}>
              This impressive paella is a perfect party dish dtufyguhjfcgvhbj
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing className={classes.react}>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon />
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;12
            </Typography>
          </IconButton>
          <IconButton aria-label="Like">
            <OfflineBoltOutlinedIcon />
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;12
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
}