import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import io from 'socket.io-client'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import OfflineBoltOutlinedIcon from '@material-ui/icons/OfflineBoltOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import BookIcon from '@material-ui/icons/Book';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

import HeaderBar from '../includes/header'
import './details.css';
import CommentCard from './commentCard'

let socket;
function BlogDetail(props) {
  const classes = useStyles();
  let blogId = new URLSearchParams(props.location.search).get('blogId')
  const [loggedIn, setLoggein] = useState(false)
  const [liked, setLiked] = useState(false)
  const [impressed, setImpression] = useState(false)
  const [likeCount, setLCount] = useState(0)
  const [impCount, setICount] = useState(0)
  const [visiCount, setVCount] = useState(0)
  const [activeReaders, setActiveReaders] = useState(0)
  const [BlogData, setBlogData] = useState({})
  const [tags, setTags] = useState([])
  const [commentInput, setCommentInput] = useState([])
  const [reply_bool, setReplyBool] = useState(true)
  const [replyInput, setreplyInput] = useState([])
  const [commentData, setCommentData] = useState([])
  const [selectedComment, setSelectedComment] = useState('');

  useEffect(() => {
    try {
      socket = io('https://datagrokrwebapp.herokuapp.com/')
      // get blog details
      axios({
        method: 'POST',
        url: '/read',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        data: { blogId }
      })
        .then(res => {
          if (!res.data) alert('NO data found')
          else {
            setBlogData(res.data.blogData)
            setLiked(res.data.like_bool)
            setImpression(res.data.impress_bool)
            setLCount(res.data.blogData.Likes.length)
            setICount(res.data.blogData.Impressions.length)
            setVCount(res.data.blogData.visitorsCount)
            setTags(res.data.blogData.Tags.split(','))
            setLoggein(res.data.logged_in)
            // get comments' detail
            axios.post('/get/comment', { blogId })
              .then(res => {
                setCommentData(res.data)
              })
          }
        })
      // count this user as active reader

      socket.on('connect', () => {
        socket.emit('readBlog', { blogId }, (currentViewers) => {
          console.log(currentViewers)
          setActiveReaders(currentViewers)
        });
      });
    } catch (error) {
      console.log(error)
    }
  }, [blogId])

  function Comment({ comment }) {
    const nestedComments = (comment.Comments || []).map(comment => {
      return <Comment key={comment.commentId} comment={comment} type="child" />
    })

    return (
      <div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
        <div className="comment-form" id="new_comment">
          <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png"
              width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
          </span>
          <div className="comment-form__field">
            <p className="comment-show" style={{ border: '1px', padding: '10px' }}>
              <div className="article__subheader">
                <a href="/bytebodger" style={{ color: '#fff' }} className="flex items-center mr-4 mb-4 s:mb-0 fw-medium blog-link">
                  {comment.author}</a>
                <span className="fs-s mb-4 s:mb-0">
                  ・<time dateTime="2020-11-27T04:56:11Z" style={{ color: '#999' }} title="Friday, 27 November 2020, 10:26:11">27 Nov</time>
                </span>
              </div>{comment.text}
            </p>
          </div>
        </div>
        {selectedComment === comment._id && replyInput}
        <div className="reply-btn">
          {reply_bool && loggedIn &&
            <Button startIcon={<ReplyIcon />} onClick={() => addReplyCard(comment._id)} size="small">Reply</Button>
          }
        </div>
        {nestedComments}
      </div>
    )
  }


  const uploadReply = async (id) => {
    try {
      axios.post('/add/reply', {
        blogId: blogId,
        commentText: document.getElementById('replytext' + id).value,
        id: id
      }).then(res => {
        if (res.data.replied)
          window.location.reload()
        else
          alert("Something went Wrong")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addReplyCard = (id) => {
    setSelectedComment(id)
    setReplyBool(false)
    setreplyInput(replyInput.concat(
      <div className="reply-container" key={Math.random()} data-commentable-type="Article">
        <form className="comment-form" id="new_comment" action="/comments" acceptCharset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓" />
          <span className="blog-avatar m:blog-avatar--l mr-2 shrink-0">
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--RmY55OKL--/c_limit,f_auto,fl_progressive,q_auto,w_256/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png"
              width="32" height="32" alt="pic" className="blog-avatar__image overflow-hidden" id="comment-primary-user-profile--avatar" />
          </span>
          <div className="comment-form__field">
            <textarea placeholder="Add Reply" id={'replytext' + id}
              className="blog-textfield comment-textarea blog-textfield--ghost"
              aria-label="Add a Reply"
              name="comment[body_markdown]"
            >
            </textarea>
          </div>
        </form>
        <Button variant="outlined" size="small" className={classes.pushComment}
          onClick={() => uploadReply(id)}>Reply it!</Button><br /><br />
      </div>
    ))
  }
  const addCommentCard = () => {
    setCommentInput(commentInput.concat(
      <div>
        <CommentCard blogId={blogId} key={commentInput.length} />
      </div>
    ))
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



  return (
    <>
      < HeaderBar />
      <div className="blog-container">
        <div className="blog-actions">
          <div className="actions-details">
            <div className="actions__inner">
              <button className="actionBox" title="Like" onClick={() => loggedIn ? addLike(blogId) : alert('Login to React')} >
                {!liked ? <FavoriteBorderOutlinedIcon /> :
                  <FavoriteIcon style={{ color: 'red' }} />
                }
                <div className="actionCouter">
                  <span>{likeCount}</span>
                </div>
              </button>
              <button className="actionBox" title="Impression" onClick={() => loggedIn ? addImpression(blogId) : alert('Login to React')}>
                {!impressed ? <OfflineBoltOutlinedIcon /> :
                  <OfflineBoltIcon style={{ color: 'orange' }} />
                }
                <div className="actionCouter">
                  <span>{impCount}</span>
                </div>
              </button>
              <button className="actionBox" title="Visitor's Count">
                <BookIcon style={{ color: 'green' }} />
                <div className="actionCouter">
                  <span>{visiCount}</span>
                </div>
              </button>
              <button className="actionBox" title="Read Now">
                <VisibilityIcon style={{ color: 'blue' }} />
                <div className="actionCouter">
                  <span>{activeReaders}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="blog-details">
          <div className="article-wrapper">
            <article className="blog-card blog-article">
              <header className="article__header" id="main-title">
                <div className="article__cover">
                  <img src={'https://el-testing.s3.amazonaws.com/' + BlogData.Cover}
                    style={{ backgroundColor: '#dddddd' }}
                    className="article__cover__image" alt={BlogData.Cover} />
                </div>
                <div className="article__header__meta">
                  <h1 className="blog_header">
                    {BlogData.Title}
                  </h1><br />
                  {tags.map(tag => (
                    <a href="/t/webdev" key={Math.random()} style={{ backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), }}
                      className={classes.tags}>#{tag}</a>
                  ))}<br /><br />
                  <div className="article__subheader">
                    <time dateTime={BlogData.date_created} className="date-no-year" title={BlogData.date_created}>{new Date(BlogData.date_created).toString().substring(0, 15)}</time>
                    <span className="mr-4">・14 min read</span>
                  </div>
                </div>
              </header>

              <div className="article__main">
                <nav className="blog-card blog-card--secondary">
                  <div dangerouslySetInnerHTML={{ __html: BlogData.Description }} />
                </nav>
              </div>

              <section id="comments" data-updated-at="2020-12-01 07:48:04 UTC" className="text-padding mb-4 border-t-1 border-0 border-solid border-base-10">
                <header className="relative flex justify-between items-center mb-6">
                  <h3 className="blog-subtitle-1">Discussion</h3>
                  <div id="comment-subscription">
                    {loggedIn ?
                      <div role="presentation" className="blog-btn-group">
                        <span onClick={addCommentCard} className="blog-btn blog-btn--outlined">Add Comment</span>
                      </div> :
                      <Link to={'/login'}>
                        <div role="presentation" className="blog-btn-group">
                          <span className="blog-btn blog-btn--outlined">Login to Comment</span>
                        </div>
                      </Link>
                    }
                  </div>
                </header>

                {commentInput.map(input => { return input })}
                <div id="comments-container" data-commentable-id="519528" data-commentable-type="Article">
                  <div>
                    {
                      commentData.map((comment) => {
                        return (
                          <Comment key={comment.commentId} comment={comment} />
                        )
                      })
                    }
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>

        <div className="author-details">
          <div className="blog-card blog-card--secondary branded-7 p-4 pt-0 gap-4 grid" style={{ borderTopColor: '#0b4442' }}>
            <div className="-mt-4">
              <a href="/bytebodger" className="flex">
                <span className="blog-avatar blog-avatar--xl  mr-2 shrink-0">
                  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--MMbZqYXw--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/337841/18d07d43-995c-4ec9-b6b5-be71c843e803.jpeg" className="blog-avatar__image" alt="Adam Nathaniel Davis profile" />
                </span>
                <span className="blog-link blog-subtitle-2 mt-5">{BlogData.Author}</span>
              </a>
            </div>
            <div className="color-base-70">
              Backend Web Developer
              </div>
            <div className="user-metadata-details">
              <ul className="user-metadata-details-inner">
                <li>
                  <div className="key">Work</div>
                  <div className="value">
                    Web Developer at DataGrokr
                    </div>
                </li>
                <li>
                  <div className="key">
                    Location
                    </div>
                  <div className="value">
                    New Delhi, India
                    </div>
                </li>
                <li>
                  <div className="key">
                    Joined
                    </div>
                  <div className="value">
                    <time dateTime="2020-02-18T16:12:37Z" className="date">Jan 01, 2021</time>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogDetail;

const useStyles = makeStyles((theme) => ({
  tags: {
    position: 'relative',
    marginRight: 10,
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
    color: '#ffffff'
  },
  pushComment: {
    position: 'relative',
    marginLeft: 45
  }
}));