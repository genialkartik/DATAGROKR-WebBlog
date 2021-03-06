import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

export default function Blog(props) {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false)
  const [liked, setLiked] = useState(false)
  const [impressed, setImpression] = useState(false)
  const [likeCount, setLCount] = useState(0)
  const [impCount, setICount] = useState(0)
  const [visiCount, setVCount] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tags, setTags] = useState([])
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setLoggedIn(props.loggedIn)
    setLCount(props.data.Likes.length)
    // reacted on post?
    setLiked(props.data.Likes.find(name => name === props.activeUser.fullname))
    setImpression(props.data.Impressions.find(name => name === props.activeUser.fullname))
    setICount(props.data.Impressions.length)
    setVCount(props.data.visitorsCount)
    setTags(props.data.Tags.split(',', 4))
  }, [props])

  const deleteBlog = (id) => {
    try {
      if (props.role === 'admin') {
        axios.post('/blog/delete', { blogId: id })
          .then(res => {
            alert(res.data.is_deleted ? 'Blog delete successfully' : 'Something went Wrong')
            window.location.reload();
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addLike = (id) => {
    setLiked(!liked);
    setLCount(liked ? likeCount - 1 : likeCount + 1)
    try {
      axios.post('/like/reaction', { id, add: !liked })
        .then(res => {
          if (!res.data.liked) {
            setLiked(liked)
            setLCount(likeCount)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const addImpression = (id) => {
    setImpression(!impressed);
    setICount(impressed ? impCount - 1 : impCount + 1)
    try {
      axios.post('/impression/reaction', { id, add: !impressed })
        .then(res => {
          if (!res.data.impressed) {
            setImpression(impressed);
            setICount(impCount)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'more-option';
  const moreOption = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'right', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className={classes.link} to={`/write?blogId=${props.data.BlogId}&mode=edit`}>
        <MenuItem >
          <IconButton aria-label="Edit Blog" color="inherit">
            <EditIcon />
          </IconButton>
          <p>Edit</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={() => deleteBlog(props.data.BlogId)} >
        <IconButton aria-label="Edit Blog" color="inherit">
          <DeleteIcon />
        </IconButton>
        <p>Delete</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div key={props.data.BlogId}>
      <Card className={classes.root}>
        <CardMedia
          href={'https://el-testing.s3.amazonaws.com/' + props.data.Cover}
          className={classes.media}
          image={'https://el-testing.s3.amazonaws.com/' + props.data.Cover}
          title={props.data.Cover}
        />
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.data.Author.substring(0, 1)}
            </Avatar>
          }
          action={
            props.role === 'admin' ? <>
              <IconButton
                aria-label="settings"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <MoreVertIcon />
              </IconButton>
              {moreOption}
            </> : <></>
          }
          title={props.data.Author}
          subheader={new Date(props.data.date_created).toString().substring(0, 15)}
        />

        <Link to={'/read?blogId=' + props.data.BlogId} >
          <CardContent className={classes.shortdesc}>
            <div className={classes.tagsCont}>
              {tags.map(tag => (
                <a href="/t/webdev" key={Math.random()} style={{ backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), }}
                  className={classes.tags}>#{tag}</a>
              ))}
            </div>
            <br /><br />
            <Typography variant="bold" color="textPrimary" component="bold" className={classes.title}>
              {props.data.Title}
            </Typography>
          </CardContent>
        </Link>
        <CardActions disableSpacing className={classes.react}>
          <IconButton aria-label="add to favorites" onClick={() => loggedIn ? addLike(props.data.BlogId) : alert('Login to React')} >
            {!liked ? <FavoriteBorderOutlinedIcon /> :
              <FavoriteIcon style={{ color: 'red' }} />
            }
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;{likeCount}
            </Typography>
          </IconButton>
          <IconButton aria-label="Like" onClick={() => loggedIn ? addImpression(props.data.BlogId) : alert("Login to React")}>
            {!impressed ? <OfflineBoltOutlinedIcon /> :
              <OfflineBoltIcon style={{ color: 'orange' }} />
            }
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;{impCount}
            </Typography>
          </IconButton>
          <IconButton aria-label="Visitor's Count">
            <PeopleAltIcon />
            <Typography variant="body1" color="textPrimary" component="h6">
              &nbsp;{visiCount}
            </Typography>
          </IconButton>
          <IconButton aria-label="share" style={{ left: 160, position: 'relative' }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div >
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 440, minHeight: 436,
    marginTop: 50, marginLeft: 30,
    marginBottom: 30, float: "left",
    borderRadius: '10px 10px 5px 5px'
  },
  media: { height: 0, paddingTop: '57.25%', },
  avatar: { backgroundColor: red[500], },
  shortdesc: {
    position: 'relative', bottom: 20, maxHeight: 37, overflow: 'hidden',
  },
  react: { position: 'relative', bottom: 10 },
  title: { position: 'relative', fontSize: 22, bottom: 25 },
  tags: {
    position: 'relative', marginRight: 10, fontSize: 14, padding: 2,
    borderRadius: 5, color: '#ffffff',
  },
  tagsCont: { position: 'relative', overflow: 'hidden', height: 20 },
  link: { color: '#fff', textDecoration: 'none' }
}));