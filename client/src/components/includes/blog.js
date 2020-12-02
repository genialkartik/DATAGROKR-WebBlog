import React, { useState, useEffect } from 'react';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import DeleteIcon from '@material-ui/icons/Delete';

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
    bottom: 20,
    maxHeight: 37,
    overflow: 'hidden',
  },
  react: {
    position: 'relative',
    bottom: 10
  },
  title: {
    position: 'relative',
    fontSize: 16,
  },
  tags: {
    position: 'relative',
    marginRight: 10,
    fontSize: 14,
    padding: 2,
    borderRadius: 5,
    color: '#ffffff'
  }
}));

export default function Blog(props) {
  const classes = useStyles();
  const [liked, setLiked] = useState(false)
  const [impressed, setImpression] = useState(false)
  const [likeCount, setLCount] = useState(0)
  const [impCount, setICount] = useState(0)
  const [tags, setTags] = useState([])
  useEffect(() => {
    setLCount(props.data.Likes)
    setICount(props.data.Impressions)
    setTags(props.data.Tags.split(','))
  }, [props])
  return (
    <div key={props.data.BlogId}>
      <Card className={classes.root}>
        <CardMedia
          href={'/blogdesc'}
          className={classes.media}
          image="/goodies.jpg"
          title={props.data.Cover}
        />
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
          </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              {props.role === 'admin' ? <DeleteIcon /> : <></>}
            </IconButton>
          }
          title={props.data.Author}
          subheader={new Date(props.data.date_created).toString().substring(0, 15)}
        />

        <Link to={'/read?blogId=' + props.data.BlogId} >
          <CardContent className={classes.shortdesc}>
            {tags.map(tag => (
              <a href="/t/webdev" key={Math.random()} style={{ backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), }}
                className={classes.tags}>#{tag}</a>
            ))}<br />
            <Typography variant="bold" color="textPrimary" component="bold" className={classes.title}>
              {props.data.Title}xamples of Chips, using an image Avatar, SVG Icon Avatar, "Letter" and (string) Avatar.
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing className={classes.react}>
          <IconButton aria-label="add to favorites" onClick={() => {
            setLiked(!liked)
            setLCount(liked ? likeCount - 1 : likeCount + 1)
          }} >
            {!liked ? <FavoriteBorderOutlinedIcon /> :
              <FavoriteIcon style={{ color: 'red' }} />
            }
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;{likeCount}
            </Typography>
          </IconButton>
          <IconButton aria-label="Like" onClick={() => {
            setImpression(!impressed)
            setICount(impressed ? impCount - 1 : impCount + 1)
          }}>
            {!impressed ? <OfflineBoltOutlinedIcon /> :
              <OfflineBoltIcon style={{ color: 'orange' }} />
            }
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;{impCount}
            </Typography>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div >
  )
}